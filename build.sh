#!/usr/bin/env bash

NODE_ENV=${NODE_ENV:=production}
BUILD_TYPE=${BUILD_TYPE:=}

# if SPA, add index.html
if [ "$BUILD_TYPE" == "spa" ]; then
  cp ./src/index.html ./public/index.html
fi

razzle build --noninteractive --node-env=$NODE_ENV --type=$BUILD_TYPE

# add localization
cp -R ./src/assets/locales ./build/public
rm ./build/public/locales/namespaces.ts

# if SPA, cleanup
if [ "$BUILD_TYPE" == "spa" ]; then
  rm ./public/index.html
fi
