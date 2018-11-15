#!/bin/bash

# get latest CLI docs
cd pages/reference/ && { curl -O -L https://github.com/balena-io/balena-cli/raw/master/doc/cli.markdown ; mv cli.markdown cli.md ; cd -; }

# get lastest node SDK docs
cd pages/reference/sdk/ && {
  curl -O -L https://github.com/balena-io/balena-sdk/raw/master/DOCUMENTATION.md;
  echo "# Balena Node.js SDK" > node-sdk.md
  tail -n +2 DOCUMENTATION.md >> node-sdk.md;
  cd -;
}

# get lastest SDK docs
cd pages/reference/sdk/ && {
  curl -O -L https://github.com/balena-io/balena-sdk-python/raw/master/DOCUMENTATION.md;
  mv DOCUMENTATION.md python-sdk.md;
  cd -;
}

# get latest supervisor API docs
cd pages/reference/supervisor/ && { curl -O -L https://github.com/balena-io/balena-supervisor/raw/master/docs/API.md; mv API.md supervisor-api.md ; cd -; }

# get latest supervisor update-lock docs
cd pages/learn/deploy/release-strategy/ && { curl -O -L https://github.com/balena-io/balena-supervisor/raw/master/docs/update-locking.md; cd -; }
