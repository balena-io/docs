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

echo "Generating masterclass partials"
masterclass_path=$SCRIPT_DIR/../shared/masterclass
mkdir $masterclass_path

# Debugging Masterclass
mkdir $masterclass_path/debugging/ &

cd pages/learn/manage && $SCRIPT_DIR/extract-markdown.sh "Accessing your device" <support-access.md >access-device.md && mv access-device.md $masterclass_path/debugging/ &

cd pages/learn/manage && $SCRIPT_DIR/extract-markdown.sh "Granting Support Access to a Support Agent" <support-access.md >support-access-device.md && mv support-access-device.md $masterclass_path/debugging/ &

cd pages/reference/ && $SCRIPT_DIR/extract-markdown.sh "Getting Started" <diagnostics.md >initial-diagnosis.md && mv initial-diagnosis.md $masterclass_path/debugging/ &

cd pages/reference/ && $SCRIPT_DIR/extract-markdown.sh "Device Diagnostics" <device-diagnostics.md >device-diagnostics-partial.md && mv device-diagnostics-partial.md $masterclass_path/debugging/ &

cd pages/reference/ && $SCRIPT_DIR/extract-markdown.sh "Supervisor State" <supervisor-state.md >supervisor-diagnostics.md && mv supervisor-diagnostics.md $masterclass_path/debugging/ &

cd pages/faq/troubleshooting/ && $SCRIPT_DIR/extract-markdown.sh "Accessing a Device using a Gateway Device" <debugging-device-gateway.md >device-gateway-partial.md && mv device-gateway-partial.md $masterclass_path/debugging/ &

cd pages/learn/manage && $SCRIPT_DIR/extract-markdown.sh "Device Logs" <device-logs.md >device-logs-partial.md && mv device-logs-partial.md $masterclass_path/debugging/ &

cd pages/learn/more/masterclasses/ && $SCRIPT_DIR/extract-markdown.sh "Network debugging" <network-masterclass.md >network.md && mv network.md $masterclass_path/debugging/ &

cd pages/reference/OS && $SCRIPT_DIR/extract-markdown.sh "Configuring balenaOS" <configuration.md >configuration-partial.md && mv configuration-partial.md $masterclass_path/debugging/ &

cd pages/reference/supervisor && $SCRIPT_DIR/extract-markdown.sh "Working with the Supervisor" <debugging-supervisor.md >supervisor.md && mv supervisor.md $masterclass_path/debugging/ &

cd pages/faq/troubleshooting && $SCRIPT_DIR/extract-markdown.sh "Working with balenaEngine" <debugging-engine.md >engine.md && mv engine.md $masterclass_path/debugging/ &

cd pages/learn/manage && $SCRIPT_DIR/extract-markdown.sh "Device Connectivty states" <device-statuses.md >device-connectivity.md && mv device-connectivity.md $masterclass_path/debugging/ &

cd pages/reference/OS && $SCRIPT_DIR/extract-markdown.sh "Journal Logs" <debugging-balenaos.md >journal-logs.md && mv journal-logs.md $masterclass_path/debugging/ &

cd pages/reference/OS && $SCRIPT_DIR/extract-markdown.sh "Using the Kernel Logs" <debugging-balenaos.md >kernel-logs.md && mv kernel-logs.md $masterclass_path/debugging/ &

cd pages/faq/troubleshooting && $SCRIPT_DIR/extract-markdown.sh "Storage Media Debugging" <debugging-storage-media.md >storage-media.md && mv storage-media.md $masterclass_path/debugging/ &

wait