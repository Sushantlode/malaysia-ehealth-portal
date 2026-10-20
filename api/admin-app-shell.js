/** Serves Setu Admin index with asset + API paths rewritten for same-origin SSO. */
const ADMIN_ORIGIN = "https://admin-s.setuai.com";

function rewriteAdminHtml(html) {
  return html
    .replace(/(src|href)="\/assets\//g, '$1="/admin-app/assets/')
    .replace(/(src|href)="\.\/assets\//g, '$1="/admin-app/assets/')
    .replace(/https:\/\/api\.setuai\.com/g, "/setu-api");
}

export default async function handler(req, res) {
  try {
    const upstream = await fetch(`${ADMIN_ORIGIN}/`, {
      headers: { Accept: "text/html" },
    });
    let html = await upstream.text();
    html = rewriteAdminHtml(html);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.status(200).send(html);
  } catch (err) {
    res.status(502).json({ success: false, message: String(err?.message || err) });
  }
}
