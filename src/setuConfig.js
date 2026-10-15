/** SETU demo sign-in (mobile OTP). */
export const SETU_ORIGIN = "https://setuai.com";
export const SETU_LOGIN_URL = `${SETU_ORIGIN}/login`;
export const SETU_APP_HOME = `${SETU_ORIGIN}/app`;
export const SETU_PREVENTIVE_HEALTH_URL = `${SETU_ORIGIN}/app/preventive-health`;
export const SETU_SSO_PAGE_ON_SETU = `${SETU_ORIGIN}/setu-sso.html`;

export const SETU_DEMO_USER = {
  mobile: "9999999999",
  otp: "000000",
};

/** Portal hex id → SETU app path (under setuai.com). */
export const SETU_HEX_APP_PATHS = {
  "medical-stores": "/app/generic-medicine",
  checkups: "/app/preventive-health",
  specialists: "/app/telemedicine",
  phr: "/app/abha",
  clinics: "/app/telemedicine",
  tracking: "/app/preventive-health",
  schemes: "/app/govt-schemes",
  pathology: "/app/book-tests",
};

export function isSetuLinkedHex(hexId) {
  return Object.prototype.hasOwnProperty.call(SETU_HEX_APP_PATHS, hexId);
}

export function setuAppUrlForHex(hexId) {
  const path = SETU_HEX_APP_PATHS[hexId];
  if (!path) return SETU_APP_HOME;
  return `${SETU_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}
