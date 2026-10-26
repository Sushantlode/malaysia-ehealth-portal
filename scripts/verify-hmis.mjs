#!/usr/bin/env node
/**
 * Verifies HMIS API login and UI reachability (no SSH required).
 */
const API_BASE = "http://15.252.193.15:8080/ehs_beta";
const UI = "http://15.252.193.15:8080/EHS/";
const CREDS = {
  userName: "superadmin",
  password: "123",
  orgId: 1,
  unitId: 1,
};

async function main() {
  let ok = true;

  const uiRes = await fetch(UI, { method: "GET" });
  console.log(`HMIS UI (${UI}): HTTP ${uiRes.status} ${uiRes.ok ? "OK" : "FAIL"}`);
  ok &&= uiRes.ok;

  const preRes = await fetch(
    `${API_BASE}/loginaction/session-token?username=${encodeURIComponent(CREDS.userName)}`,
    { headers: { Accept: "application/json", "X-tenantId": "1" } }
  );
  const preBody = await preRes.json().catch(() => ({}));
  if (!preRes.ok || !preBody.access_token) {
    console.log(`HMIS pre-login token: HTTP ${preRes.status} FAIL`);
    ok = false;
  } else {
    const loginRes = await fetch(`${API_BASE}/loginaction/authuserlogin/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-tenantId": "1",
        Authorization: `Bearer ${preBody.access_token}`,
      },
      body: JSON.stringify(CREDS),
    });
    const loginBody = await loginRes.json().catch(() => ({}));
    const loggedIn = loginBody.login_status === true && Boolean(loginBody.access_token);
    console.log(
      `HMIS API login (superadmin): HTTP ${loginRes.status} login_status=${loginBody.login_status} token=${loggedIn ? "yes" : "no"}`
    );
    ok &&= loggedIn;
  }

  console.log(ok ? "\nResult: WORKING — HMIS login API and UI are reachable." : "\nResult: FAILED — check network or credentials.");
  process.exit(ok ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
