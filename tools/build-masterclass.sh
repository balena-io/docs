#!/usr/bin/env bash
# This script pulls in existing documentation to generate masterclasses

# exit on error, unassigned vars, or pipe fails
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/.."

# Creating masterclass partials and wiping old ones
if [ -d "$SCRIPT_DIR/../shared/masterclass/" ]; then
    rm -rf $SCRIPT_DIR/../shared/masterclass/
fi
mkdir $SCRIPT_DIR/../shared/masterclass/

masterclass_path=$SCRIPT_DIR/../shared/masterclass

# Debugging Masterclass
mkdir $masterclass_path/debugging/ &
cd pages/learn/manage && $SCRIPT_DIR/extract-markdown.sh "Accessing your device" <support-access.md >access-device.md && mv access-device.md $masterclass_path/debugging/ &



wait