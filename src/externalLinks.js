import { SETU_DEMO_USER, SETU_LOGIN_URL, SETU_ORIGIN, SETU_PREVENTIVE_HEALTH_URL } from "./setuConfig";

function copyDemoOtp() {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(SETU_DEMO_USER.otp).catch(() => {});
  }
}

/** Opens SETU preventive health (sign in on SETU if prompted). */
export function launchSetuPreventiveHealth() {
  copyDemoOtp();
  window.open(SETU_PREVENTIVE_HEALTH_URL, "_blank", "noopener,noreferrer");
}

/** Opens SETU login with demo OTP copied. */
export function launchSetuLogin() {
  copyDemoOtp();
  window.open(SETU_LOGIN_URL, "_blank", "noopener,noreferrer");
}

export function launchSetuLoginPageManual() {
  launchSetuLogin();
}

export { SETU_LOGIN_URL, SETU_ORIGIN, SETU_PREVENTIVE_HEALTH_URL };
