import { HMIS_UI_URL } from "./hmisConfig";

export function launchHmis() {
  window.open(HMIS_UI_URL, "_blank", "noopener,noreferrer");
}

export function launchHmisLoginPage() {
  launchHmis();
}
