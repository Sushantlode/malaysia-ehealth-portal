/** Proxies /TATA_postgres/* to Tata MD HMIS API (used from Vercel rewrites). */
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
  const path = req.query.path;
  const pathStr = Array.isArray(path) ? path.join("/") : path || "";
  if (!pathStr) {
    res.status(400).json({ msg: "Missing path" });
    return;
  }

  const target = `${HMIS_API}/${pathStr}`;
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
    res.end(Buffer.from(await upstream.arrayBuffer()));
  } catch (err) {
    res.status(502).json({ login_status: false, msg: String(err?.message || err) });
  }
}
