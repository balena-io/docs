#!/bin/bash
consolidatedOutput=""
exitCode=0
while read -r file
do
    output=$(english-translate --british --spelling < "${file}")
    if [ -n "${output}" ]; then
        consolidatedOutput="${consolidatedOutput}$(printf "\n%s:\n%s" "${file}" "${output}")"
        exitCode=1
    fi
done < "${1:-/dev/stdin}"
echo "${consolidatedOutput}"
exit "${exitCode}"
