import {
  HMIS_SSO_URL,
  HMIS_UI_URL,
  hmisProxiedSsoUrl,
  hmisSsoPageUrl,
} from "./hmisConfig";

/** Opens HMIS via proxied SSO (Vercel/local) or portal bridge on GitHub Pages. */
export function launchHmis() {
  const proxied = hmisProxiedSsoUrl();
  if (proxied) {
    window.open(proxied, "_blank", "noopener,noreferrer");
    return;
  }

  const port = typeof window !== "undefined" ? window.location.port : "";
  const localDev = port === "5173" || port === "4173";
  if (localDev) {
    const url = new URL("/hims-ui/malaysia-hmis-sso.html", window.location.origin).href;
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }

  window.open(hmisSsoPageUrl(), "_blank", "noopener,noreferrer");
}

export function launchHmisLoginPage() {
  window.open(HMIS_UI_URL, "_blank", "noopener,noreferrer");
}

export { HMIS_SSO_URL };
