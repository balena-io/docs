#!/usr/bin/env bash

# http://cspell.org/docs/dictionaries-custom/
# USAGE
# ./test-spelling.sh file1.md
# Use this to fix spelling errors
# cspell lint --no-summary --no-progress --gitignore --exclude "**/*.svg"   "**/*"
# Use this to send excluded words to the dictionary
# cspell lint --words-only --no-summary --no-progress --gitignore --unique --exclude "**/*.svg" "**/*" >> ./.cspell/balena-words.txt
# 

consolidatedOutput=""
exitCode=0

if [[ -f "$1" ]]; then
    file="$1"
    output=$(cspell --no-progress --words-only --no-summary --gitignore "${file}")
    if [ -n "${output}" ]; then
        consolidatedOutput="${consolidatedOutput}$(printf "\n%s:\n%s" "${file}" "${output}")"
        exitCode=1
    fi
    shift
else
    echo "USAGE: ./test-spelling.sh file1.md"
fi

echo "${consolidatedOutput}"
exit "${exitCode}"
