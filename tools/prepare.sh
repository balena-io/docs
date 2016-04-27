#!/bin/bash
dirname=$(dirname $0)
cd $dirname/..

./tools/fetch-external.sh
./node_modules/.bin/coffee ./lib/build.coffee
