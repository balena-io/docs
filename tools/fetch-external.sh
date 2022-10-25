#!/usr/bin/env bash
# This script pulls in external documentation that should be edited in the corresponding upstream repo

# Use node-jq if jq is not pre-installed in the environment nor set in path
which jq && JQ="$(which jq)" || JQ="../../node_modules/node-jq/bin/jq"

# get latest CLI docs
curl -o pages/reference/balena-cli.md -L https://github.com/balena-io/balena-cli/raw/master/docs/balena-cli.md &

# get SDK README
cd shared/sdk/ && {
  curl -O -L https://raw.githubusercontent.com/balena-io/balena-sdk/master/README.md
  # Extract deprecation text
  ../../tools/extract-markdown.sh "Deprecation policy" <README.md >deprecation-policy.md
  rm README.md
  cd -
} &

# get latest supervisor API docs
curl -o pages/reference/supervisor/supervisor-api.md -L https://github.com/balena-io/balena-supervisor/raw/master/docs/API.md &

# get latest diagnostics docs
curl -o pages/reference/diagnostics.md -L https://github.com/balena-io/device-diagnostics/raw/master/diagnostics.md &

# get latest supervisor update-lock docs
curl -o pages/learn/deploy/release-strategy/update-locking.md -L https://github.com/balena-io/balena-supervisor/raw/master/docs/update-locking.md &

# get meta-balena README and extract partials
cd shared/meta-balena/ && {
  curl -o meta-balena.md -L https://raw.githubusercontent.com/balena-os/meta-balena/master/README.md
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
curl -o pages/reference/OS/updates/rollbacks.md -L https://raw.githubusercontent.com/balena-os/meta-balena/master/docs/rollbacks.md

# Masterclasses
curl -o pages/learn/more/masterclasses/cli-masterclass.md -L https://raw.githubusercontent.com/balena-io/balena-cli-masterclass/master/README.md &
curl -o pages/learn/more/masterclasses/advanced-cli.md -L https://raw.githubusercontent.com/balena-io/balena-cli-advanced-masterclass/master/README.md &
curl -o pages/learn/more/masterclasses/host-os-masterclass.md -L https://raw.githubusercontent.com/balena-io/balenaos-masterclass/master/README.md &
curl -o pages/learn/more/masterclasses/services-masterclass.md -L https://raw.githubusercontent.com/balena-io/services-masterclass/master/README.md &
curl -o pages/learn/more/masterclasses/fleet-management.md -L https://raw.githubusercontent.com/balena-io-projects/balena-fleet-management-masterclass/master/README.md &
curl -o pages/learn/more/masterclasses/device-debugging.md -L https://raw.githubusercontent.com/balena-io/debugging-masterclass/master/README.md &
curl -o pages/learn/more/masterclasses/docker-masterclass.md -L https://raw.githubusercontent.com/balena-io/docker-masterclass/master/README.md &

# pull in balenaLabs GitHub projects
cd shared/projects/ && {
  echo "Name|Description
---|---" | tee balena-labs-projects.md balena-example-projects.md balenablocks.md >/dev/null
  curl https://api.github.com/orgs/balenalabs/repos?per_page=30 | $JQ -r 'sort_by(-.stargazers_count) |  (.[] | [.name,.html_url,.description] | "[\(.[0])](\(.[1]))|\(.[2] // "")") ' >>balena-labs-projects.md
  curl https://api.github.com/orgs/balena-io-examples/repos?per_page=100 | $JQ -r 'sort_by(-.stargazers_count) |  (.[] | [.name,.html_url,.description] | "[\(.[0])](\(.[1]))|\(.[2] // "")") ' >>balena-example-projects.md
  curl https://api.github.com/orgs/balenablocks/repos?per_page=30 | $JQ -r 'sort_by(-.stargazers_count) |  (.[] | [.name,.html_url,.description] | "[\(.[0])](\(.[1]))|\(.[2] // "")") ' >>balenablocks.md
  cd -
} &

# get latest node SDK docs
cd pages/reference/sdk/ && {
  curl -O -L https://github.com/balena-io/balena-sdk/raw/master/DOCUMENTATION.md
  echo "# Balena Node.js SDK" >node-sdk.md
  tail -n +2 DOCUMENTATION.md >>node-sdk.md
  rm DOCUMENTATION.md
  cd -
} &

# get latest python SDK docs
curl -o pages/reference/sdk/python-sdk.md -L https://github.com/balena-io/balena-sdk-python/raw/master/DOCUMENTATION.md &

# get latest custom board support docs
curl -o pages/reference/OS/customer-board-support.md -L https://github.com/balena-os/meta-balena/raw/master/contributing-device-support.md &

wait
