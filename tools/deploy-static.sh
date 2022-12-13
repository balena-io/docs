#!/usr/bin/env bash
dirname=$(dirname $0)
cd $dirname/..

cp -r static/* build/
cp config/redirects.txt build/_redirects
