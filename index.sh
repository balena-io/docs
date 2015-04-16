#!/bin/bash

# get latest CLI docs
cd pages/using/ && { curl -O -L https://github.com/resin-io/resin-cli/raw/master/doc/cli.markdown ; cd -; }

# build search index
node index-builder.js