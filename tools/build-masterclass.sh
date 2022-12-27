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

cd pages/learn/manage && $SCRIPT_DIR/extract-markdown.sh "Granting Support Access to a Support Agent" <support-access.md >support-access-device.md && mv support-access-device.md $masterclass_path/debugging/ &

cd pages/reference/ && $SCRIPT_DIR/extract-markdown.sh "Getting Started" <diagnostics.md >initial-diagnosis.md && mv initial-diagnosis.md $masterclass_path/debugging/ &

cd pages/reference/ && $SCRIPT_DIR/extract-markdown.sh "Device Diagnostics" <device-diagnostics.md >device-diagnostics.md && mv device-diagnostics.md $masterclass_path/debugging/ &

cd pages/reference/ && $SCRIPT_DIR/extract-markdown.sh "Supervisor State" <supervisor-state.md >supervisor-state.md && mv supervisor-state.md $masterclass_path/debugging/ &

cd pages/faq/troubleshooting/ && $SCRIPT_DIR/extract-markdown.sh "Accessing a Device using a Gateway Device" <device-gateway.md >device-gateway.md && mv device-gateway.md $masterclass_path/debugging/ &

cd pages/learn/manage && $SCRIPT_DIR/extract-markdown.sh "Device Logs" <device-logs.md >device-logs.md && mv device-logs.md $masterclass_path/debugging/ &

cd pages/learn/manage && $SCRIPT_DIR/extract-markdown.sh "Network Debugging" <debugging-network.md >debugging-network.md && mv debugging-network.md $masterclass_path/debugging/ &

cd pages/reference/OS && $SCRIPT_DIR/extract-markdown.sh "Configuring balenaOS" <configuration.md >configuration.md && mv configuration.md $masterclass_path/debugging/ &

# cd pages/reference/supervisor && $SCRIPT_DIR/extract-markdown.sh "Debugging Supervisor" <debugging-supervisor.md >debugging-supervisor.md && mv debugging-supervisor.md $masterclass_path/debugging/ &

# cd pages/reference/engine && $SCRIPT_DIR/extract-markdown.sh "Debugging BalenaEngine" <debugging-BalenaEngine.md >debugging-BalenaEngine.md && mv debugging-BalenaEngine.md $masterclass_path/debugging/ &

cd pages/learn/manage && $SCRIPT_DIR/extract-markdown.sh "Device Connectivty states" <device-statuses.md >device-connectivity.md && mv device-connectivity.md $masterclass_path/debugging/ &






wait