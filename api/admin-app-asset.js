/** Proxies Setu Admin assets and rewrites API host in JS for same-origin calls. */
const ADMIN_ORIGIN = "https://admin-s.setuai.com";

export default async function handler(req, res) {
  const rawPath = typeof req.query.path === "string" ? req.query.path : "";
  const path = rawPath.replace(/^\/+/, "");
  if (!path || path.includes("..")) {
    res.status(400).json({ success: false, message: "Invalid path" });
    return;
  }

  try {
    const upstream = await fetch(`${ADMIN_ORIGIN}/${path}`, {
      headers: {
        Accept: req.headers.accept || "*/*",
        "Accept-Encoding": "identity",
      },
    });
    const contentType = upstream.headers.get("content-type") || "application/octet-stream";
    const buffer = Buffer.from(await upstream.arrayBuffer());
    const textLike =
      contentType.includes("text/html") ||
      contentType.includes("javascript") ||
      contentType.includes("ecmascript") ||
      path.endsWith(".js") ||
      path.endsWith(".css") ||
      path.endsWith(".html");

    let body = buffer;
    if (textLike) {
      let text = buffer.toString("utf8");
      if (contentType.includes("text/html") || path.endsWith(".html")) {
        text = text
          .replace(/(src|href)="\/assets\//g, '$1="/admin-app/assets/')
          .replace(/(src|href)="\.\/assets\//g, '$1="/admin-app/assets/');
      }
      text = text.replace(/https:\/\/api\.setuai\.com/g, "/setu-api");
      body = Buffer.from(text, "utf8");
    }

    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", upstream.headers.get("cache-control") || "public, max-age=300");
    res.status(upstream.status).send(body);
  } catch (err) {
    res.status(502).json({ success: false, message: String(err?.message || err) });
  }
}
