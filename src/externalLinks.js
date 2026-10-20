import {
  SETU_DEMO_USER,
  SETU_LOGIN_URL,
  SETU_ORIGIN,
  SETU_PREVENTIVE_HEALTH_URL,
  isSetuLinkedHex,
  setuAppUrlForHex,
} from "./setuConfig";

export const PORTAL_LOGIN_URL = "https://hix-snowy.vercel.app/login";
export const ADMIN_LOGIN_URL = "https://admin-s.setuai.com/#/admin-login";
/** Same-origin SSO bridge: logs in, then opens proxied admin Command Centre. */
export const ADMIN_SSO_URL = "/admin-sso.html";

export { isSetuLinkedHex, SETU_LOGIN_URL, SETU_ORIGIN, SETU_PREVENTIVE_HEALTH_URL };

function copyDemoOtp() {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(SETU_DEMO_USER.otp).catch(() => {});
  }
}

export function launchSetuForHex(hexId) {
  copyDemoOtp();
  window.open(setuAppUrlForHex(hexId), "_blank", "noopener,noreferrer");
}

export function launchSetuPreventiveHealth() {
  launchSetuForHex("checkups");
}

export function launchPortalLogin() {
  window.location.assign(PORTAL_LOGIN_URL);
}

export function launchAdminLogin() {
  window.location.assign(ADMIN_SSO_URL);
}

export function launchSetuLogin() {
  copyDemoOtp();
  window.open(SETU_LOGIN_URL, "_blank", "noopener,noreferrer");
}

export function launchSetuLoginPageManual() {
  launchSetuLogin();
}

export const SETU_OPEN_TOAST =
  "Opening on SETU — if asked to sign in: mobile 9999999999, OTP 000000 (copied).";
