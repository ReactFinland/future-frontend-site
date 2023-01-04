#!/usr/bin/env bash

export FONTCONFIG_PATH=${PWD}/assets/fonts
curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.28.1
/opt/buildhome/.deno/bin/deno task build
npm run generate:og
