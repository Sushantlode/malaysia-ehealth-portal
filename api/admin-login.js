/** Vercel serverless: Setu Admin login for Malaysia Command Centre SSO. */
const ADMIN_LOGIN = "https://api.setuai.com/auth/api/auth/login";
const CREDS = {
  email: "malaysia.home@setuai.com",
  password: "Malaysia@2026",
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
    res.status(405).json({ success: false, message: "Method not allowed" });
    return;
  }

  try {
    const upstream = await fetch(ADMIN_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(CREDS),
    });
    const body = await upstream.json().catch(() => ({}));
    res.status(upstream.ok ? 200 : upstream.status).json(body);
  } catch (err) {
    res.status(502).json({
      success: false,
      message: String(err?.message || err),
    });
  }
}
