#!/usr/bin/env bash
# Copy setu-sso.html to SETU web root so Malaysia portal auto-login works on https://setuai.com
# Example: SETU_SSO_DEST='user@host:/var/www/setuai/public/setu-sso.html' ./scripts/install-setu-sso.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="${SETU_SSO_DEST:-}"
if [[ -z "$DEST" ]]; then
  echo "Set SETU_SSO_DEST to scp target, e.g. user@host:/path/to/setuai/setu-sso.html"
  exit 1
fi
scp "$ROOT/public/setu-sso.html" "$DEST"
echo "Installed. Test: https://setuai.com/setu-sso.html?next=/app/preventive-health"
