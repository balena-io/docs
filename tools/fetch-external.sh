#!/bin/bash
# This script pulls in external documentation that should be edited in the corresponding upstream repo

# get latest CLI docs
cd pages/reference/ && {
  curl -O -L https://github.com/balena-io/balena-cli/raw/master/doc/cli.markdown
  mv cli.markdown cli.md
  cd -
}

# get latest node SDK docs
cd pages/reference/sdk/ && {
  curl -O -L https://github.com/balena-io/balena-sdk/raw/master/DOCUMENTATION.md
  echo "# Balena Node.js SDK" >node-sdk.md
  tail -n +2 DOCUMENTATION.md >>node-sdk.md
  cd -
}

# get latest python SDK docs
cd pages/reference/sdk/ && {
  curl -O -L https://github.com/balena-io/balena-sdk-python/raw/master/DOCUMENTATION.md
  mv DOCUMENTATION.md python-sdk.md
  cd -
}

# get latest supervisor API docs
cd pages/reference/supervisor/ && {
  curl -O -L https://github.com/balena-io/balena-supervisor/raw/master/docs/API.md
  mv API.md supervisor-api.md
  cd -
}

# get latest diagnostics docs
cd pages/reference/ && {
  curl -O -L https://github.com/balena-io/device-diagnostics/raw/master/diagnostics.md
  cd -
}

# get latest supervisor update-lock docs
cd pages/learn/deploy/release-strategy/ && {
  curl -O -L https://github.com/balena-io/balena-supervisor/raw/master/docs/update-locking.md
  cd -
}

# get meta-balena README and extract partials
cd shared/meta-balena/ && {
  curl -O -L https://raw.githubusercontent.com/balena-os/meta-balena/master/README.md
  mv README.md meta-balena.md
  # Extract modem text
  ../../tools/extract-markdown.sh "Modems" < meta-balena.md > supported-modems.md
  # Extract Wifi adapters   
  ../../tools/extract-markdown.sh "WiFi Adapters" < meta-balena.md > supported-wifi-adapters.md
  # Extract config.json
  ../../tools/extract-markdown.sh "config.json" < meta-balena.md > config-json.md
  cd -
}

# get integrations
cd pages/learn/develop/integrations/ && {
  curl -O -L https://raw.githubusercontent.com/balenalabs/google-iot/master/README.md
  mv README.md google-iot.md
  cd -
}
