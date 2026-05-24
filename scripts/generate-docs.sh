#!/usr/bin/env bash
set -euo pipefail
mkdir -p docs
printf "# Project Overview\n" > docs/project-overview.md
printf "Generated: %s\n" "$(date -u +"%Y-%m-%dT%H:%M:%SZ")" >> docs/project-overview.md
