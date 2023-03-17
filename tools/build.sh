#!/usr/bin/env bash

# exit on error, unassigned vars, or pipe fails
set -euo pipefail

# get the absolute path to the script in case it is called from elsewhere
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Generate Getting Started assets
node ./tools/generate-docs-contracts.js

# Generate Masterclasses Dynamically
cd "$SCRIPT_DIR/.."
./tools/build-masterclass.sh

# run cd in a subshell so we don't end up in another directory on failure
(
    cd "$SCRIPT_DIR/.."
    node --unhandled-rejections=strict ./node_modules/.bin/doxx "$(pwd)/config/doxx"
)
