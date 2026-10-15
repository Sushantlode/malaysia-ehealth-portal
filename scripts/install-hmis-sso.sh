#!/usr/bin/env bash
# Optional: copy hmis-sso.html into Tomcat (only if you need API-based SSO later).
# Example:
#   HMIS_SSO_DEST='user@15.252.193.15:/path/to/tomcat/webapps/hims-ui/hmis-sso.html' ./scripts/install-hmis-sso.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST_DIR="${HMIS_TOMCAT_HIMS_UI:-}"
if [[ -z "$DEST_DIR" ]]; then
  echo "Set HMIS_TOMCAT_HIMS_UI to scp directory, e.g. user@host:/opt/tomcat/webapps/hims-ui"
  exit 1
fi
scp "$ROOT/public/malaysia-hmis-sso.html" "$DEST_DIR/"
echo "Installed. Test: http://15.252.193.15:8080/hims-ui/malaysia-hmis-sso.html"
