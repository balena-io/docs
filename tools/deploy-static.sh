#!/usr/bin/env bash

# Script to prepare Docs for Cloudflare Pages deployment

set -euo pipefail

# resolve absolute path and account for spaces, etc
dirname="$(cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P)"
cd "${dirname}"/.. || exit 1

# Build folder is uploaded to Cloudflare
cp -r static/* build/

# normalize all Cloudflare Style Redirects to include both trailing slash and no trailing slash variants
generated="$(sed -r 's/^(\/[^ ]+\/[^\/ ]+) /\1\/ /g' config/redirects.txt | sed -rn 'p; s/^(\/[^ ]+)\/ /\1 /p' | sort)"
current="$(sort config/redirects.txt)"

if [ "${current}" != "${generated}" ]
then
    echo "Error: one or more entries config/redirects.txt is missing the trailing-slash or non-trailing slash variant, both must exist"
    diff  <(echo "${current}" ) <(echo "${generated}")
    exit 1
    # these commands may help if you are stuck here...

    # normalize all Cloudflare Style Redirects to end with /
    # sed -r 's/^(\/[^ ]+\/[^\/ ]+) /\1\/ /g' -i build/_redirects

    # duplicate every Cloudflare Style Redirect ending with / to also end without /
    # sed -rn 'p; s/^(\/[^ ]+)\/ /\1 /p' -i build/_redirects
fi

# copy the Cloudflare Style Redirects
sed -rn '/^(\/[^ ]+\/[^\/ ]+)/p' config/redirects.txt > build/_redirects

# Copy the 404 page to root of the build folder for CF pages to find it
cp build/404/index.html build/404.html
