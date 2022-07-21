#!/usr/bin/env bash

HEADER=$1

match=0

while IFS= read -r line; do
    local_match=$(grep -c "#* ${HEADER}$" <<< "${line}")
    if (( DEBUG > 0 )); then echo "start_line=${line}"; fi
    if (( local_match > 0 )); then
        if (( DEBUG > 0 )); then echo "line=${line}"; fi
        if (( DEBUG > 1 )); then echo "local_match=${local_match}"; fi
        match=1
        level=$(awk '/^#* / { print gsub(/#/, "") }' <<< "${line}")
        if (( DEBUG > 1 )); then echo "level=${level}"; fi
    elif (( local_match + match > 0 )); then
        if (( DEBUG > 0 )); then echo "line=${line}"; fi
        new_level=$(awk '/^#* / { print gsub(/#/, "") }' <<< "${line}")
        if (( DEBUG > 1 )); then echo "new_level=${new_level}"; fi
        if (( new_level > 0 && new_level <= level )); then
            break # also could exit if you want non-greedy matching, leave as break for greedy matching
        else
            echo "${line}"
        fi
    fi
done
