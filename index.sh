#!/bin/bash

# get latest CLI docs
cd pages/using/ && { curl -O -L https://github.com/resin-io/resin-cli/raw/master/doc/cli.markdown ; mv cli.markdown cli.md ; cd -; }

# get lastest SDK docs 
cd pages/using/ && { curl -O -L https://github.com/resin-io/resin-sdk/raw/master/DOCUMENTATION.md ; mv DOCUMENTATION.md sdk.md ; cd -; }
# build search index
node index-builder.js