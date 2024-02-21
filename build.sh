#!/usr/bin/env bash
# Stop deploying on error
# https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#The-Set-Builtin
set -e

export FONTCONFIG_PATH=${PWD}/assets/fonts
curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.40.5
/opt/buildhome/.deno/bin/deno task build
/opt/buildhome/.deno/bin/deno task optimize:build
