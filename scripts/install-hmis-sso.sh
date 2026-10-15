#!/usr/bin/env bash
# Optional: copy hmis-sso.html into Tomcat (only if you need API-based SSO later).
# Example:
#   HMIS_SSO_DEST='user@15.252.193.15:/path/to/tomcat/webapps/hims-ui/hmis-sso.html' ./scripts/install-hmis-sso.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/public/hmis-sso.html"
DEST="${HMIS_SSO_DEST:-}"
if [[ -z "$DEST" ]]; then
  echo "Set HMIS_SSO_DEST to scp target, e.g. user@host:/opt/tomcat/webapps/hims-ui/hmis-sso.html"
  exit 1
fi
scp "$SRC" "$DEST"
echo "Installed. Test: http://15.252.193.15:8080/hims-ui/hmis-sso.html"
