/** Tata MD HMIS (Cellbeans EHS). */
export const HMIS_ORIGIN = "http://15.252.193.15:8080";
export const HMIS_UI_URL = `${HMIS_ORIGIN}/EHS/#/login`;
/** HMIS route after portal auto sign-in (local/Vercel proxy or Tomcat SSO). */
export const HMIS_POST_LOGIN_PATH = "/EHS/#/configuration/homesortcut";
/** Direct Tomcat UI (session still starts from the portal SSO page). */
export const HMIS_SSO_URL = `${HMIS_ORIGIN}/EHS/#/login`;

/** Optional: Vercel (or local dev) origin that proxies /EHS and /ehs_beta. */
export const HMIS_PROXY_BASE = (import.meta.env.VITE_HMIS_PROXY_BASE || "").replace(/\/$/, "");

export function hmisProxyOrigin() {
  if (HMIS_PROXY_BASE) return HMIS_PROXY_BASE;
  if (typeof window !== "undefined" && window.location.origin && window.location.protocol !== "file:") {
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
