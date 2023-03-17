#!/usr/bin/env bash

# Script to prepare Docs for Cloudflare Pages deployment

set -euo pipefail

# resolve absolute path and account for spaces, etc
dirname="$(cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P)"
cd "${dirname}"/.. || exit 1

# Build folder is uploaded to Cloudflare
cp -r static/* build/

# copy the Cloudflare Style Redirects
sed -rn '/^(\/([^ ]+\/)?[^\/ ]*)/p' config/redirects.txt > build/_redirects

# normalize all Cloudflare Style Redirects to include both trailing slash and no trailing slash variants
generated="$(sed -rn 'p; s/^(\/([^ ]+\/)?[^\/ ]+) \//\1\/ \//p' build/_redirects |
    sed -rn 'p; s/^(\/([^ ]+\/)?[^\/ ]+)\/ \//\1 \//p' |
    awk '!/^(\/([^ ]+\/)?[^\/ ]+)/ || !seen[$0]++' | sort)"
current="$(sort build/_redirects)"

if [ "${current}" != "${generated}" ]
then
    echo "Error: one or more entries build/_redirects is missing the trailing-slash or non-trailing slash variant, both must exist"
    diff  <(echo "${current}" ) <(echo "${generated}")
    exit 1

    # if you are stuck here you can try to update the config/redirects.txt with sed and review the differences
    # sed -rn 'p; s/^(\/([^ ]+\/)?[^\/ ]+) \//\1\/ \//p' config/redirects.txt | \
    #     sed -rn 'p; s/^(\/([^ ]+\/)?[^\/ ]+)\/ \//\1 \//p' | \
    #     awk '!/^(\/([^ ]+\/)?[^\/ ]+)/ || !seen[$0]++' > config/redirects.txt.new
    # mv config/redirects.txt.new config/redirects.txt
fi

# Copy the 404 page to root of the build folder for CF pages to find it
cp build/404/index.html build/404.html
