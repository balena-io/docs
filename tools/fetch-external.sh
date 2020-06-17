#!/bin/bash
# This script pulls in external documentation that should be edited in the corresponding upstream repo

# get latest CLI docs
cd pages/reference/ && {
  curl -O -L https://github.com/balena-io/balena-cli/raw/master/doc/cli.markdown
  mv cli.markdown balena-cli.md
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

# get SDK README
cd shared/sdk/ && {
  curl -O -L https://raw.githubusercontent.com/balena-io/balena-sdk/master/README.md
  # Extract deprecation text
  ../../tools/extract-markdown.sh "Deprecation policy" < README.md > deprecation-policy.md
  cd -
}  

# get latest supervisor API docs
cd pages/reference/supervisor/ && {
  curl -O -L https://github.com/balena-io/balena-supervisor/raw/master/docs/API.md
  mv API.md supervisor-api.md
  cd -
}

# get latest supervisor upgrade docs
cd pages/reference/supervisor/ && {
  curl -O -L https://github.com/balena-io/balena-supervisor/raw/master/docs/upgrades.md
  mv upgrades.md supervisor-upgrades.md
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
  curl -O -L https://raw.githubusercontent.com/balena-io-playground/balena-azure-iot-hub/master/README.md
  mv README.md azure-iot-hub.md
  cd -
}

# Masterclasses
cd pages/learn/more/masterclasses/ && {
  curl -O -L https://raw.githubusercontent.com/balena-io/balena-cli-masterclass/master/README.md
  mv README.md cli-masterclass.md
  curl -O -L https://raw.githubusercontent.com/balena-io/balena-cli-advanced-masterclass/master/README.md
  mv README.md advanced-cli.md
  curl -O -L https://raw.githubusercontent.com/balena-io/balenaos-masterclass/master/README.md
  mv README.md host-os-masterclass.md
  curl -O -L https://raw.githubusercontent.com/balena-io/services-masterclass/master/README.md
  mv README.md services-masterclass.md
  curl -O -L https://raw.githubusercontent.com/balena-io-projects/balena-fleet-management-masterclass/master/README.md
  mv README.md fleet-management.md
  curl -O -L https://raw.githubusercontent.com/balena-io/debugging-masterclass/master/README.md
  mv README.md device-debugging.md
  curl -O -L https://raw.githubusercontent.com/balena-io/docker-masterclass/master/README.md
  mv README.md docker-masterclass.md
  cd -
}
