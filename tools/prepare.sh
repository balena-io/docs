#!/bin/bash
dirname=$(dirname $0)
cd $dirname/..

./tools/fetch-external.sh
npm run build

# Copy in static assets as no longer using an express server
cp -a ./static/img/. ./public/docs/img/
cp -a ./static/_redirects ./public/
cp -a ./static/favicon.png ./public/

python3 --version 
