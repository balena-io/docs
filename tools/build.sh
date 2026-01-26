#!/usr/bin/env bash

# exit on error, unassigned vars, or pipe fails
set -euo pipefail

# get the absolute path to the script in case it is called from elsewhere
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/.."

# Generate Getting Started assets
node ./tools/generate-docs-contracts.js &

# Note: Versioned docs (CLI, SDK, Python SDK) are now managed by sync-external.js
# and committed to git. Run `npm run sync-external` to update them locally.
# Renovate handles version updates via pull requests.

# Generate base images docs
./tools/build-base-images.sh & 

wait

# Convert .jpg, .jpeg, .png images to .webp format
./tools/convert-images-to-webp.sh

# run cd in a subshell so we don't end up in another directory on failure
(
    cd "$SCRIPT_DIR/.."
    node --unhandled-rejections=strict ./node_modules/.bin/doxx "$(pwd)/config/doxx"
)
