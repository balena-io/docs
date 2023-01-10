#!/usr/bin/env bash
# Script to prepare Docs for Cloudflare Pages deployment 

set -euo pipefail

dirname=$(dirname $0)
cd "${dirname}"/.. || exit 1

# Build folder is uploaded to Cloudflare
cp -r static/* build/

# Extract only the Cloudflare Redirects from redirect.txt
DIVISION_LINE=`awk '/####*/ {print NR}' config/redirects.txt | sed -n 3p`
head -n $DIVISION_LINE config/redirects.txt > build/_redirects

# normalize all Cloudflare Style Redirects to end with /
sed -r 's/^(\/[^ ]+\/[^\/ ]+) /\1\/ /g' -i build/_redirects

# duplicate every Cloudflare Style Redirect ending with / to also end without /
sed -rn 'p; s/^(\/[^ ]+)\/ /\1 /p' -i build/_redirects

# Copy the 404 page to root of the build folder for CF pages to find it
cp build/404/index.html build/404.html
