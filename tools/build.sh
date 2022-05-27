#!/bin/bash

set -eo pipefail

dirname=$(dirname $0)
cd "$dirname/.."
./node_modules/.bin/doxx "$(pwd)/config/doxx" 
echo "I am not running anything after this"
