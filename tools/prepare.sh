#!/usr/bin/env bash
dirname=$(dirname $0)
cd $dirname/..

# Pulls in external documentation 
./tools/fetch-external.sh
