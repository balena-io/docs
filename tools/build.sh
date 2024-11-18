#!/usr/bin/env bash

# exit on error, unassigned vars, or pipe fails
set -euo pipefail

# get the absolute path to the script in case it is called from elsewhere
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/.."

# Generate Getting Started assets
node ./tools/generate-docs-contracts.js

# Generate versioned balena-cli docs
node ./tools/versioning.js https://github.com/balena-io/balena-cli/blob/master/docs/balena-cli.md

# Generate versioned balena-sdk docs
node ./tools/versioning.js https://github.com/balena-io/balena-sdk/blob/master/DOCUMENTATION.md

# Generate versioned balena-python-sdk docs
node ./tools/versioning.js https://github.com/balena-io/balena-sdk-python/blob/master/DOCUMENTATION.md

# Generate Masterclasses Dynamically
./tools/build-masterclass.sh

# Generate base images docs
./tools/build-base-images.sh

# Convert .jpg, .jpeg, .png images to .webp format
./tools/convert-images-to-webp.sh

# run cd in a subshell so we don't end up in another directory on failure
(
    cd "$SCRIPT_DIR/.."
    node --unhandled-rejections=strict ./node_modules/.bin/doxx "$(pwd)/config/doxx"
)
