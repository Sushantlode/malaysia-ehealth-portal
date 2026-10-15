/** Tata MD HMIS (Cellbeans). */
export const HMIS_ORIGIN = "http://15.252.193.15:8080";
export const HMIS_UI_URL = `${HMIS_ORIGIN}/hims-ui/#/login`;
/** HMIS route after portal auto sign-in (local/Vercel proxy or Tomcat SSO). */
export const HMIS_POST_LOGIN_PATH = "/hims-ui/#/configuration/homesortcut";
/** Direct Tomcat SSO (404 until Cellbeans deploys public/malaysia-hmis-sso.html). */
export const HMIS_SSO_URL = `${HMIS_ORIGIN}/hims-ui/malaysia-hmis-sso.html`;

/** Optional: Vercel (or local dev) origin that proxies /hims-ui and /TATA_postgres. */
export const HMIS_PROXY_BASE = (import.meta.env.VITE_HMIS_PROXY_BASE || "").replace(/\/$/, "");

export function hmisProxyOrigin() {
  if (HMIS_PROXY_BASE) return HMIS_PROXY_BASE;
  if (typeof window !== "undefined" && window.location.hostname.includes("vercel.app")) {
    return window.location.origin;
  }
  return "";
}

/** SSO page on same origin as proxied HMIS (works without Tomcat file deploy). */
export function hmisProxiedSsoUrl() {
  const proxy = hmisProxyOrigin();
  if (!proxy) return "";
  return `${proxy}/hims-ui/malaysia-hmis-sso.html`;
}

export function hmisSsoPageUrl() {
  const base = import.meta.env.BASE_URL || "/";
  return new URL(`${base}hmis-sso.html`, window.location.href).href;
}
