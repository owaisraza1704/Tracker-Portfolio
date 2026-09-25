#!/bin/sh
set -eu
printf 'New editor password (12+ characters): '
stty -echo
trap 'stty echo' EXIT INT TERM
IFS= read -r editor_password
stty echo
trap - EXIT INT TERM
printf '\n'
printf '%s' "$editor_password" | node scripts/setup-editor.mjs
