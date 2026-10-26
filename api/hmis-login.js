/** Vercel serverless: HMIS login proxy (avoids browser CORS from GitHub Pages). */
const HMIS_API = "http://15.252.193.15:8080/ehs_beta";
const CREDS = {
  userName: "superadmin",
  password: "123",
  orgId: 1,
  unitId: 1,
  cashCounterId: null,
  lltUnitName: null,
  ipAddress: null,
};

export async function performHmisLogin() {
  const tenantId = String(CREDS.orgId);
  const pre = await fetch(
    `${HMIS_API}/loginaction/session-token?username=${encodeURIComponent(CREDS.userName)}`,
    { headers: { Accept: "application/json", "X-tenantId": tenantId } }
  );
  const preBody = await pre.json().catch(() => ({}));
  if (!pre.ok || !preBody.access_token) {
    return {
      status: pre.ok ? 502 : pre.status,
      body: {
        login_status: false,
        msg: preBody.msg || "HMIS pre-login token was not issued.",
      },
    };
  }

  const upstream = await fetch(`${HMIS_API}/loginaction/authuserlogin/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-tenantId": tenantId,
      Authorization: `Bearer ${preBody.access_token}`,
    },
    body: JSON.stringify(CREDS),
  });
  const body = await upstream.json().catch(() => ({}));
  return { status: upstream.ok ? 200 : upstream.status, body };
}

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
    const { status, body } = await performHmisLogin();
    res.status(status).json(body);
  } catch (err) {
    res.status(502).json({ login_status: false, msg: String(err?.message || err) });
  }
}
