/** Proxies HMIS API (/TATA_postgres/*) to Tata MD Tomcat (Vercel cannot use raw IP rewrites reliably). */
const HMIS_API = "http://15.252.193.15:8080/TATA_postgres";

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  const parts = req.query.path;
  const path = Array.isArray(parts) ? parts.join("/") : parts || "";
  const target = `${HMIS_API}/${path}`;

  const headers = {
    "Content-Type": req.headers["content-type"] || "application/json",
  };
  if (req.headers["x-tenantid"]) headers["X-tenantId"] = req.headers["x-tenantid"];

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
    const buf = Buffer.from(await upstream.arrayBuffer());
    res.end(buf);
  } catch (err) {
    res.status(502).json({ login_status: false, msg: String(err?.message || err) });
  }
}
