#!/usr/bin/env bash
# This script pulls in external documentation that should be edited in the corresponding upstream repo

# exit on error, unassigned vars, or pipe fails
set -euo pipefail

#!/usr/bin/env bash
dirname=$(dirname $0)
cd $dirname/..

mkdir -p shared/masterclass/debugging/

# Use node-jq if jq is not pre-installed in the environment nor set in path
which jq && JQ="$(which jq)" || JQ="../../node_modules/node-jq/bin/jq"

# get latest CLI docs
curl --fail --show-error -o pages/reference/balena-cli.md -L https://github.com/balena-io/balena-cli/raw/master/docs/balena-cli.md &

# Engine
# get latest balena-engine debugging docs
# mkdir pages/reference/engine/
# curl --fail --show-error -o pages/reference/engine/debugging-balenaengine.md -L https://github.com/balena-os/balena-supervisor/raw/master/balena-docs/debugging-engine.md &

# diagnostics
curl --fail --show-error -o pages/reference/supervisor-state.md -L https://github.com/balena-io-modules/device-diagnostics/raw/master/supervisor-state.md &
curl --fail --show-error -o pages/reference/device-diagnostics.md -L https://github.com/balena-io-modules/device-diagnostics/raw/master/device-diagnostics.md &
curl --fail --show-error -o pages/reference/diagnostics.md -L https://github.com/balena-io-modules/device-diagnostics/raw/master/diagnostics.md &

# Supervisor
# get latest supervisor update-lock docs
curl --fail --show-error -o pages/learn/deploy/release-strategy/update-locking.md -L https://github.com/balena-io/balena-supervisor/raw/master/docs/update-locking.md &

# get latest supervisor API docs
curl --fail --show-error -o pages/reference/supervisor/supervisor-api.md -L https://github.com/balena-os/balena-supervisor/raw/master/docs/API.md &

# get latest supervisor debugging docs
curl --fail --show-error -o shared/masterclass/debugging/supervisor.md -L https://github.com/balena-os/balena-supervisor/raw/master/docs/debugging-supervisor.md &

# balenaOS
# get meta-balena README and extract partials
cd shared/meta-balena/ && {
  curl --fail --show-error -o meta-balena.md -L https://raw.githubusercontent.com/balena-os/meta-balena/master/README.md
  # Extract modem text
  ../../tools/extract-markdown.sh "Modems" <meta-balena.md >supported-modems.md
  # Extract Wifi adapters
  ../../tools/extract-markdown.sh "WiFi Adapters" <meta-balena.md >supported-wifi-adapters.md
  # Extract Recommended WiFi USB dongle
  ../../tools/extract-markdown.sh "Recommended WiFi USB dongle" <meta-balena.md >supported-wifi-usb-dongle.md
  # Extract config.json
  ../../tools/extract-markdown.sh "config.json" <meta-balena.md >config-json.md
  rm meta-balena.md
  cd -
} &

# get meta-balena rollbacks docs
curl --fail --show-error -o pages/reference/OS/updates/rollbacks.md -L https://raw.githubusercontent.com/balena-os/meta-balena/master/docs/rollbacks.md &

# get latest custom board support docs
curl --fail --show-error -o pages/reference/OS/customer-board-support.md -L https://github.com/balena-os/meta-balena/raw/master/contributing-device-support.md &

# get latest balenaOS debugging docs
curl --fail --show-error -o pages/reference/OS/debugging-balenaos.md -L https://github.com/balena-os/meta-balena/raw/master/docs/debugging-balenaos.md && {
  cd pages/reference/OS

  ../../../tools/extract-markdown.sh "Journal Logs" <debugging-balenaos.md >journal-logs.md 
  mv journal-logs.md ../../../shared/masterclass/debugging/
  ../../../tools/extract-markdown.sh "Using the Kernel Logs" <debugging-balenaos.md >kernel-logs.md 
  mv kernel-logs.md ../../../shared/masterclass/debugging/
  rm debugging-balenaos.md
} &

# Masterclasses
curl --fail --show-error -o pages/learn/more/masterclasses/cli-masterclass.md -L https://raw.githubusercontent.com/balena-io/balena-cli-masterclass/master/README.md &
curl --fail --show-error -o pages/learn/more/masterclasses/advanced-cli.md -L https://raw.githubusercontent.com/balena-io/balena-cli-advanced-masterclass/master/README.md &
curl --fail --show-error -o pages/learn/more/masterclasses/host-os-masterclass.md -L https://raw.githubusercontent.com/balena-io/balenaos-masterclass/master/README.md &
curl --fail --show-error -o pages/learn/more/masterclasses/services-masterclass.md -L https://raw.githubusercontent.com/balena-io/services-masterclass/master/README.md &
curl --fail --show-error -o pages/learn/more/masterclasses/fleet-management.md -L https://raw.githubusercontent.com/balena-io-projects/balena-fleet-management-masterclass/master/README.md &
curl --fail --show-error -o pages/learn/more/masterclasses/device-debugging.md -L https://raw.githubusercontent.com/balena-io/debugging-masterclass/master/README.md &
curl --fail --show-error -o pages/learn/more/masterclasses/docker-masterclass.md -L https://raw.githubusercontent.com/balena-io/docker-masterclass/master/README.md &

# pull in balenaLabs GitHub projects
cd shared/projects/ && {
  echo "Name|Description
---|---" | tee balena-labs-projects.md balena-example-projects.md >/dev/null
  curl --fail --show-error https://api.github.com/orgs/balena-labs-projects/repos?per_page=30 | $JQ -r 'sort_by(-.stargazers_count) |  (.[] | [.name,.html_url,.description] | "[\(.[0])](\(.[1]))|\(.[2] // "")") ' >>balena-labs-projects.md
  curl --fail --show-error https://api.github.com/orgs/balena-io-examples/repos?per_page=100 | $JQ -r 'sort_by(-.stargazers_count) |  (.[] | [.name,.html_url,.description] | "[\(.[0])](\(.[1]))|\(.[2] // "")") ' >>balena-example-projects.md
  cd -
} &

# get latest node SDK docs
cd pages/reference/sdk/ && {
  curl --fail --show-error -O -L https://github.com/balena-io/balena-sdk/raw/master/DOCUMENTATION.md
  echo "# Balena Node.js SDK" >node-sdk.md
  tail -n +2 DOCUMENTATION.md >>node-sdk.md
  rm DOCUMENTATION.md
  cd -
} &

# get SDK README
cd shared/sdk/ && {
  curl --fail --show-error -O -L https://raw.githubusercontent.com/balena-io/balena-sdk/master/README.md
  # Extract deprecation text
  ../../tools/extract-markdown.sh "Deprecation policy" <README.md >deprecation-policy.md
  rm README.md
  cd -
} &

# get latest python SDK docs
curl --fail --show-error -o pages/reference/sdk/python-sdk.md -L https://github.com/balena-io/balena-sdk-python/raw/master/DOCUMENTATION.md &

wait
