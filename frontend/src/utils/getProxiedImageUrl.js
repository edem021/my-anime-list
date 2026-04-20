const API_BASE = "http://localhost:5000/api/vtuber";
const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect fill='%23666' width='64' height='64'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='10'%3E?%3C/text%3E%3C/svg%3E";

export const getProxiedImageUrl = (url) => {
  if (!url || typeof url !== "string" || !url.trim()) return PLACEHOLDER;
  return `${API_BASE}/proxy-image/${encodeURIComponent(url)}`;
};
