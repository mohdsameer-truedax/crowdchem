---
name: graphify
description: Build a knowledge graph for a folder using graphifyy Python library
trigger: /graphify
---

# /graphify

Build a knowledge graph for the given PATH (default ".").

## Step 1 - Build graph (pure Python, no API calls)

Run this bash command:

```bash
python << 'PY'
import json, os, sys
from pathlib import Path
from graphify.detect import detect
from graphify.extract import collect_files, extract
from graphify.build import build_from_json
from graphify.cluster import cluster, score_all
from graphify.analyze import god_nodes, surprising_connections

target = Path(".")
d = detect(target)
if d['total_files'] == 0:
    print("No files found"); sys.exit(0)

code = []
for f in d.get('files',{}).get('code',[]):
    p = Path(f)
    code.extend(collect_files(p) if p.is_dir() else [p])

ext = extract(code) if code else {'nodes':[],'edges':[],'input_tokens':0,'output_tokens':0}
ext['hyperedges'] = []

os.makedirs('graphify-out', exist_ok=True)
G = build_from_json(ext)
communities = cluster(G)

previews = {
    str(cid): [G.nodes[n].get('label', n) for n in nodes[:10]]
    for cid, nodes in communities.items()
}

Path('.gf_stage.json').write_text(json.dumps({
    'extract': ext,
    'detect': d,
    'communities': {str(k): v for k,v in communities.items()},
    'cohesion': {str(k): v for k,v in score_all(G, communities).items()},
    'gods': god_nodes(G),
    'surprises': surprising_connections(G, communities),
}))
Path('.gf_previews.json').write_text(json.dumps(previews))
print(f"{G.number_of_nodes()} nodes, {G.number_of_edges()} edges, {len(communities)} communities")
PY
```

## Step 2 - Name each community

Read `.gf_previews.json`. For each community ID, look at its node labels and write a 2-5 word plain-language name (e.g. "Auth Flow", "Data Models", "Routing Layer"). Build a dict mapping community id → name.

Save the labels:

```bash
cat > .gf_labels.json << 'EOF'
LABELS_JSON_HERE
EOF
```

Replace `LABELS_JSON_HERE` with a JSON dict like `{"0":"Auth Flow","1":"Data Layer","2":"Routing"}`.

## Step 3 - Finalize outputs

Run this bash command:

```bash
python << 'PY'
import json
from pathlib import Path
from graphify.build import build_from_json
from graphify.analyze import suggest_questions
from graphify.report import generate
from graphify.export import to_html, to_json

s = json.loads(Path('.gf_stage.json').read_text())
labels_raw = json.loads(Path('.gf_labels.json').read_text())

G = build_from_json(s['extract'])
communities = {int(k): v for k,v in s['communities'].items()}
cohesion = {int(k): v for k,v in s['cohesion'].items()}
labels = {int(k): v for k,v in labels_raw.items()}

questions = suggest_questions(G, communities, labels)
report = generate(G, communities, cohesion, labels, s['gods'], s['surprises'], s['detect'], {'input':0,'output':0}, '.', suggested_questions=questions)
Path('graphify-out/GRAPH_REPORT.md').write_text(report)
to_json(G, communities, 'graphify-out/graph.json')
if G.number_of_nodes() <= 5000:
    to_html(G, communities, 'graphify-out/graph.html', community_labels=labels)
print("Complete")
PY
```

Then report:
```
Graph complete. Outputs in graphify-out/: graph.html, graph.json, GRAPH_REPORT.md
```
