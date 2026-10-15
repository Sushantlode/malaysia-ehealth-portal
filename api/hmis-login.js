/** Vercel serverless: HMIS login proxy (avoids browser CORS from GitHub Pages). */
const HMIS_LOGIN =
  "http://15.252.193.15:8080/TATA_postgres/loginaction/authuserlogin/";
const CREDS = {
  userName: "Gayatri",
  password: "Gay@12",
  orgId: 1,
  unitId: 1,
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "GET" && req.method !== "POST") {
    res.status(405).json({ msg: "Method not allowed" });
    return;
  }

  try {
    const upstream = await fetch(HMIS_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-tenantId": "1" },
      body: JSON.stringify(CREDS),
    });
    const body = await upstream.json().catch(() => ({}));
    res.status(upstream.ok ? 200 : upstream.status).json(body);
  } catch (err) {
    res.status(502).json({ login_status: false, msg: String(err?.message || err) });
  }
}
