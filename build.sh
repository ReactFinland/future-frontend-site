#!/usr/bin/env bash

export FONTCONFIG_PATH=${PWD}/assets/fonts
curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.30.0
/opt/buildhome/.deno/bin/deno task build || exit 1;
npm run generate:og || exit 1;
npm run optimize:site || exit 1;
