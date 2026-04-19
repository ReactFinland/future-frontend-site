#!/usr/bin/env bash
# Stop deploying on error
# https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#The-Set-Builtin
set -e

export FONTCONFIG_PATH=${PWD}/assets/fonts
npm ci
npm run build
npm run optimize:build
