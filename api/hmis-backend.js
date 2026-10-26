/** Proxies /ehs_beta/* to the EHS HMIS API (used from Vercel rewrites). */
const HMIS_API = "http://15.252.193.15:8080/ehs_beta";
const PASS_HEADERS = [
  "accept",
  "authorization",
  "content-type",
  "x-tenantid",
  "x-unitid",
  "x-staffid",
  "x-userfullname",
  "x-username",
  "x-refresh-token",
  "x-master-authorization",
];

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function targetUrl(req) {
  const path = req.query.path;
  const pathStr = Array.isArray(path) ? path.join("/") : path || "";
  if (!pathStr || pathStr.includes("..")) return "";

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(req.query || {})) {
    if (key === "path") continue;
    const values = Array.isArray(value) ? value : [value];
    for (const item of values) {
      if (item != null) params.append(key, String(item));
    }
  }
  const query = params.toString();
  return `${HMIS_API}/${pathStr}${query ? `?${query}` : ""}`;
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-tenantId, X-unitId, X-Refresh-Token");
    res.status(204).end();
    return;
  }

  const target = targetUrl(req);
  if (!target) {
    res.status(400).json({ msg: "Missing path" });
    return;
  }

  const headers = {};
  for (const name of PASS_HEADERS) {
    const value = req.headers[name];
    if (value) headers[name] = value;
  }
  if (!headers["content-type"]) headers["Content-Type"] = "application/json";

  let body;
  if (req.method !== "GET" && req.method !== "HEAD") {
    body = await readBody(req);
  }

  try {
    const upstream = await fetch(target, { method: req.method, headers, body });
    res.status(upstream.status);
    const contentType = upstream.headers.get("content-type");
    if (contentType) res.setHeader("Content-Type", contentType);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.end(Buffer.from(await upstream.arrayBuffer()));
  } catch (err) {
    res.status(502).json({ login_status: false, msg: String(err?.message || err) });
  }
}
