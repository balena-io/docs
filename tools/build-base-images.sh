#!/usr/bin/env bash
# This script generates base-images docs

# Exit on error, unassigned variables, or pipe failures
set -euo pipefail

# Get the absolute path of the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE}")" && pwd)"
cd "$SCRIPT_DIR/.."

# Contracts Repository URL
REPO_URL="https://github.com/balena-io/contracts.git"

# Partial path for the generated markdown file
PARTIAL_PATH="shared/general/base-images.md"

# Use node-jq if jq is not pre-installed in the environment nor set in path
which jq && JQ="$(which jq)" || JQ="../../node_modules/node-jq/bin/jq"

if [ -f "$PARTIAL_PATH" ]; then
    rm "$PARTIAL_PATH"
fi

echo "Generating base images docs"

# Perform a shallow clone of the repository
if [ ! -d "contracts" ] ; then
    git clone --quiet --depth 1 "$REPO_URL"
fi

# Function to generate markdown content
generate_markdown() {
    local contracts_dir="$1"
    local directories=("${@:2}")

    # Loop over the specified directories
    for dir in "${directories[@]}"; do
        # Set the path to the contract.json file
        json_file="contracts/contracts/$contracts_dir/$dir/contract.json"

        # Check if the contract.json file exists
        if [ -f "$json_file" ]; then
            # Extract the versionList and remove backticks
            version_list=$("$JQ" -r '.data.versionList' "$json_file" | sed "s/\`//g")

            # If version_list is empty
            if [ "$version_list" = "null" ]; then
                # Use the .slug value instead for arch contracts
                version_list=$("$JQ" -r '.slug' "$json_file")
                echo "  - $version_list" >> "$PARTIAL_PATH"
                continue
            fi

            # Capitalize the first letter of the directory name
            # Works in Bash 3 and later
            name=$(echo "${dir:0:1}" | tr '[:lower:]' '[:upper:]')${dir:1}

            # Write the markdown content to the file
            echo "  - $name: $version_list" >> "$PARTIAL_PATH"
        fi
    done
}

# Define directories for multiple architectures
arch_directories=("amd64" "aarch64" "armv7hf" "i386" "rpi")
arch_contracts_dir="arch.sw"
echo "- Multiple Architectures:" >> $PARTIAL_PATH
generate_markdown "$arch_contracts_dir" "${arch_directories[@]}"

# Define directories for multiple distributions
os_directories=("debian" "fedora" "ubuntu" "alpine") 
os_contracts_dir="sw.os"
echo "- Multiple Distributions" >> $PARTIAL_PATH
generate_markdown "$os_contracts_dir" "${os_directories[@]}"

# Define directories for multiple language stacks
language_directories=("node" "python" "openjdk" "golang" "dotnet")
language_contracts_dir="sw.stack" 
echo "- Multiple language stacks:" >> $PARTIAL_PATH
generate_markdown "$language_contracts_dir" "${language_directories[@]}"

# Clean up the contracts directory
# rm -rf contracts/