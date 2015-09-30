#!/bin/bash

# get latest CLI docs
cd pages/using/ && { curl -O -L https://github.com/resin-io/resin-cli/raw/master/doc/cli.markdown ; mv cli.markdown cli.md ; cd -; }

# get latest CLI troubleshooting
cd pages/troubleshooting/ && { curl -L -o cli-troubleshooting.md https://github.com/resin-io/resin-cli/raw/master/TROUBLESHOOTING.md ; cd -; }

# get lastest SDK docs
cd pages/using/ && { curl -O -L https://github.com/resin-io/resin-sdk/raw/master/DOCUMENTATION.md; tail -n +2 DOCUMENTATION.md > sdk.md ; rm DOCUMENTATION.md ; cd -; }

# build search index
node index-builder.js
