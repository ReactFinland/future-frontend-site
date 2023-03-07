#!/usr/bin/env bash
# Stop deploying on error
# https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#The-Set-Builtin
set -e

export FONTCONFIG_PATH=${PWD}/assets/fonts
curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.31.1
/opt/buildhome/.deno/bin/deno task build
npm run generate:og

# Enable when this is stable again
npm run optimize:site
