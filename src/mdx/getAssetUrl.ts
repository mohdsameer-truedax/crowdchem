export interface GetAssetUrlOptions {
  w?: number; // width for responsive images
  q?: number; // quality (0-100)
  v?: string; // version string for cache busting
}


export default function getAssetUrl(path: string, opts?: GetAssetUrlOptions): string {
  if (!path) return "";

  // Ensure leading slash
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const ASSET_SERVER_URL = import.meta.env.VITE_ASSET_SERVER_URL
  const params = new URLSearchParams();
  if (opts?.w) params.append("w", opts.w.toString());
  if (opts?.q) params.append("q", opts.q.toString());
  if (opts?.v) params.append("v", opts.v);
  const query = params.toString();
  return `${ASSET_SERVER_URL}${cleanPath}${query ? `?${query}` : ""}`;
}
