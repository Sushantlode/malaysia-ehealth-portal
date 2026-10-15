#!/usr/bin/env node
/**
 * Verifies HMIS API login and UI reachability (no SSH required).
 */
const API = "http://15.252.193.15:8080/TATA_postgres/loginaction/authuserlogin/";
const UI = "http://15.252.193.15:8080/hims-ui/";
const CREDS = {
  userName: "Gayatri",
  password: "Gay@12",
  orgId: 1,
  unitId: 1,
};

async function main() {
  let ok = true;

  const uiRes = await fetch(UI, { method: "GET" });
  console.log(`HMIS UI (${UI}): HTTP ${uiRes.status} ${uiRes.ok ? "OK" : "FAIL"}`);
  ok &&= uiRes.ok;

  const loginRes = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-tenantId": "1" },
    body: JSON.stringify(CREDS),
  });
  const loginBody = await loginRes.json().catch(() => ({}));
  const loggedIn = loginBody.login_status === true && Boolean(loginBody.access_token);
  console.log(
    `HMIS API login (Gayatri): HTTP ${loginRes.status} login_status=${loginBody.login_status} token=${loggedIn ? "yes" : "no"}`
  );
  ok &&= loggedIn;

  const tomcatSso = await fetch("http://15.252.193.15:8080/hims-ui/hmis-sso.html", { method: "GET" });
  console.log(
    `Tomcat hmis-sso.html: HTTP ${tomcatSso.status} ${tomcatSso.status === 200 ? "OK (full auto-login ready)" : "missing — use portal hmis-sso.html on localhost"}`
  );

  console.log(ok ? "\nResult: WORKING — HMIS login API and UI are reachable." : "\nResult: FAILED — check network or credentials.");
  process.exit(ok ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
