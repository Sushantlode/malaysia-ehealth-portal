/** Proxies the EHS HMIS UI and rewrites the API host for same-origin calls. */
const EHS_ORIGIN = "http://15.252.193.15:8080/EHS";
const EHS_API_ABS = "http://15.252.193.15:8080/ehs_beta";

function rewriteEhsApiUrls(text) {
  return text.replaceAll(`${EHS_API_ABS}/`, "/ehs_beta/").replaceAll(EHS_API_ABS, "/ehs_beta");
}

function shouldRewrite(contentType, path) {
  const ct = String(contentType || "").toLowerCase();
  return (
    ct.includes("javascript") ||
    ct.includes("ecmascript") ||
    ct.includes("text/html") ||
    ct.includes("json") ||
    path.endsWith(".js") ||
    path.endsWith(".html") ||
    path === "" ||
    path.endsWith("/")
  );
}

export default async function handler(req, res) {
  const rawPath = typeof req.query.path === "string" ? req.query.path : "";
  const path = rawPath.replace(/^\/+/, "");
  if (path.includes("..")) {
    res.status(400).json({ msg: "Invalid path" });
    return;
  }

  try {
    const upstream = await fetch(`${EHS_ORIGIN}/${path}`, {
      headers: {
        Accept: req.headers.accept || "*/*",
        "Accept-Encoding": "identity",
      },
    });
    const contentType = upstream.headers.get("content-type") || "application/octet-stream";
    let body = Buffer.from(await upstream.arrayBuffer());
    if (shouldRewrite(contentType, path)) {
      body = Buffer.from(rewriteEhsApiUrls(body.toString("utf8")), "utf8");
    }

    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", upstream.headers.get("cache-control") || "public, max-age=60");
    res.status(upstream.status).send(body);
  } catch (err) {
    res.status(502).json({ msg: String(err?.message || err) });
  }
}
