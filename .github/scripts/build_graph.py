"""
Graphify CI build script.
- AST extraction: tree-sitter, free, runs on code files
- Semantic extraction: Anthropic API, runs on all files in parallel chunks
Set ANTHROPIC_API_KEY in GitHub Actions secrets for semantic extraction.
Without it the script falls back to AST-only.
"""
import json
import os
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

import anthropic
from graphify.analyze import god_nodes, surprising_connections, suggest_questions
from graphify.build import build_from_json
from graphify.cluster import cluster, score_all
from graphify.detect import detect
from graphify.export import to_html, to_json
from graphify.extract import collect_files, extract
from graphify.report import generate

CHUNK_SIZE = 20
MODEL = "claude-sonnet-4-6"

EXTRACTION_SYSTEM = (
    "You are a graphify extraction subagent. "
    "Output ONLY valid JSON — no markdown fences, no explanation, no preamble."
)

EXTRACTION_RULES = """Rules:
- EXTRACTED: relationship explicit in the source (import, call, citation)
- INFERRED: reasonable inference (shared data structure, implied dependency)
- AMBIGUOUS: uncertain — include but flag

Code files: focus on semantic edges AST cannot find (architectural patterns, shared state,
  cross-module coupling). Do NOT re-extract imports — AST already has those.
Doc/markdown files: extract named concepts, decisions, rationale nodes (WHY something was built).

confidence_score is REQUIRED on every edge:
  EXTRACTED → 1.0 | INFERRED → 0.6-0.9 | AMBIGUOUS → 0.1-0.3

Output exactly this JSON shape (arrays may be empty but keys must exist):
{"nodes":[{"id":"stem_name","label":"Human Name","file_type":"code|document","source_file":"rel/path","source_location":null,"source_url":null,"captured_at":null,"author":null,"contributor":null}],"edges":[{"source":"id","target":"id","relation":"calls|implements|references|conceptually_related_to|shares_data_with|rationale_for","confidence":"EXTRACTED|INFERRED|AMBIGUOUS","confidence_score":1.0,"source_file":"rel/path","source_location":null,"weight":1.0}],"hyperedges":[],"input_tokens":0,"output_tokens":0}"""


def read_file_safe(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8", errors="ignore")[:8000]
    except Exception:
        return ""


def extract_chunk(client: anthropic.Anthropic, files: list, chunk_num: int, total: int) -> dict:
    parts = []
    for f in files:
        content = read_file_safe(Path(f))
        if content:
            parts.append(f"=== {f} ===\n{content}")

    if not parts:
        return {"nodes": [], "edges": [], "hyperedges": [], "input_tokens": 0, "output_tokens": 0}

    user_msg = (
        f"Files (chunk {chunk_num} of {total}):\n\n"
        + "\n\n".join(parts)
        + f"\n\n{EXTRACTION_RULES}"
    )

    response = client.messages.create(
        model=MODEL,
        max_tokens=8192,
        system=EXTRACTION_SYSTEM,
        messages=[{"role": "user", "content": user_msg}],
    )

    raw = response.content[0].text.strip()
    # Strip accidental markdown fences
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    result = json.loads(raw)
    result["input_tokens"] = response.usage.input_tokens
    result["output_tokens"] = response.usage.output_tokens
    return result


def run_semantic_extraction(all_files: list) -> dict:
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("ANTHROPIC_API_KEY not set — skipping semantic extraction (AST-only graph)")
        return {"nodes": [], "edges": [], "hyperedges": [], "input_tokens": 0, "output_tokens": 0}

    client = anthropic.Anthropic(api_key=api_key)
    chunks = [all_files[i: i + CHUNK_SIZE] for i in range(0, len(all_files), CHUNK_SIZE)]
    total = len(chunks)
    print(f"Semantic extraction: {len(all_files)} files → {total} chunks (parallel)")

    all_nodes, all_edges, all_hyperedges = [], [], []
    total_in, total_out = 0, 0

    with ThreadPoolExecutor(max_workers=min(total, 5)) as pool:
        futures = {
            pool.submit(extract_chunk, client, chunk, i + 1, total): i
            for i, chunk in enumerate(chunks)
        }
        for future in as_completed(futures):
            i = futures[future]
            try:
                r = future.result()
                all_nodes.extend(r.get("nodes", []))
                all_edges.extend(r.get("edges", []))
                all_hyperedges.extend(r.get("hyperedges", []))
                total_in += r.get("input_tokens", 0)
                total_out += r.get("output_tokens", 0)
                print(f"  chunk {i+1}/{total} done — {len(r.get('nodes',[]))} nodes, {len(r.get('edges',[]))} edges")
            except Exception as e:
                print(f"  chunk {i+1}/{total} failed: {e}")

    print(f"Semantic total: {len(all_nodes)} nodes, {len(all_edges)} edges ({total_in:,} in / {total_out:,} out tokens)")
    return {
        "nodes": all_nodes,
        "edges": all_edges,
        "hyperedges": all_hyperedges,
        "input_tokens": total_in,
        "output_tokens": total_out,
    }


# ── main ──────────────────────────────────────────────────────────────────────

target = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(".")

corpus = detect(target)
print(f"Corpus: {corpus['total_files']} files ({corpus.get('total_words', 0):,} words)")

if corpus["total_files"] == 0:
    print("No supported files found — nothing to graph.")
    sys.exit(0)

# AST extraction (free, code only)
code_files = []
for f in corpus.get("files", {}).get("code", []):
    p = Path(f)
    code_files.extend(collect_files(p) if p.is_dir() else [p])

if code_files:
    ast = extract(code_files)
    print(f"AST: {len(ast['nodes'])} nodes, {len(ast['edges'])} edges")
else:
    ast = {"nodes": [], "edges": [], "input_tokens": 0, "output_tokens": 0}

# Semantic extraction (all file types via Anthropic API)
all_files = [f for files in corpus.get("files", {}).values() for f in files]
sem = run_semantic_extraction(all_files)

# Merge AST + semantic (AST nodes take priority, deduplicate by id)
seen_ids = {n["id"] for n in ast["nodes"]}
merged_nodes = list(ast["nodes"])
for n in sem["nodes"]:
    if n["id"] not in seen_ids:
        merged_nodes.append(n)
        seen_ids.add(n["id"])

merged = {
    "nodes": merged_nodes,
    "edges": ast["edges"] + sem["edges"],
    "hyperedges": sem.get("hyperedges", []),
    "input_tokens": sem.get("input_tokens", 0),
    "output_tokens": sem.get("output_tokens", 0),
}
print(f"Merged: {len(merged['nodes'])} nodes, {len(merged['edges'])} edges")

os.makedirs("graphify-out", exist_ok=True)

G = build_from_json(merged)
if G.number_of_nodes() == 0:
    print("ERROR: Graph is empty — no nodes extracted.")
    sys.exit(1)

communities = cluster(G)
cohesion = score_all(G, communities)
gods = god_nodes(G)
surprises = surprising_connections(G, communities)
labels = {cid: "Community " + str(cid) for cid in communities}
questions = suggest_questions(G, communities, labels)
tokens = {"input": merged["input_tokens"], "output": merged["output_tokens"]}

report = generate(
    G, communities, cohesion, labels, gods, surprises,
    corpus, tokens, str(target), suggested_questions=questions,
)
Path("graphify-out/GRAPH_REPORT.md").write_text(report)
to_json(G, communities, "graphify-out/graph.json")

if G.number_of_nodes() <= 5000:
    to_html(G, communities, "graphify-out/graph.html")
    print("graph.html written")

print(f"\nDone: {G.number_of_nodes()} nodes, {G.number_of_edges()} edges, {len(communities)} communities")
print(f"Tokens used: {merged['input_tokens']:,} input / {merged['output_tokens']:,} output")
print("graphify-out/ ready")
