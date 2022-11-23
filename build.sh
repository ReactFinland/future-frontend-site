#!/usr/bin/env bash

curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.28.1
/opt/buildhome/.deno/bin/deno task build
