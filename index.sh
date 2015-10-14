#!/bin/bash

# get latest CLI docs
cd pages/tools/ && { curl -O -L https://github.com/resin-io/resin-cli/raw/master/doc/cli.markdown ; mv cli.markdown cli.md ; cd -; }

# get latest node CLI troubleshooting
cd pages/troubleshooting/ && { curl -L -o cli-troubleshooting.md https://github.com/resin-io/resin-cli/raw/master/TROUBLESHOOTING.md ; cd -; }

# get lastest node SDK docs
cd pages/tools/ && { curl -O -L https://github.com/resin-io/resin-sdk/raw/master/DOCUMENTATION.md; tail -n +2 DOCUMENTATION.md > sdk.md ; cd -; }

# get lastest SDK docs
cd pages/tools/ && { curl -O -L https://github.com/resin-io/resin-sdk-python/raw/master/DOCUMENTATION.md; mv DOCUMENTATION.md python-sdk.md ; rm DOCUMENTATION.md ; cd -; }

# build search index
node index-builder.js
