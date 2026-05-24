#!/usr/bin/env bash
set -euo pipefail

OUT_DIR="docs"
OUT_FILE="$OUT_DIR/project-overview.md"
mkdir -p "$OUT_DIR"

{
  echo "# Project Overview"
  echo
  echo "Generated: $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
  echo
  echo "## Scripts"
  node <<'NODE'
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
for (const [name, cmd] of Object.entries(pkg.scripts || {})) {
  console.log(`- \`${name}\`: \`${cmd}\``);
}
NODE
  echo
  echo "## Dependencies"
  node <<'NODE'
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
for (const name of Object.keys(pkg.dependencies || {}).sort()) {
  console.log(`- ${name}`);
}
NODE
} > "$OUT_FILE"

echo "Wrote $OUT_FILE"
