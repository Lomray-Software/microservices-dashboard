#!/usr/bin/env bash

NODE_ENV=${NODE_ENV:=production}
BUILD_TYPE=${BUILD_TYPE:=}

# if SPA, add index.html
if [ "$BUILD_TYPE" == "spa" ]; then
  cp ./src/index.html ./public/index.html
fi

rm -rf ./build ./cache
razzle build --noninteractive --node-env=$NODE_ENV --type=$BUILD_TYPE

# add localization
if [[ -d "./src/assets/locales" ]]; then
  cp -R ./src/assets/locales ./build/public
  rm ./build/public/locales/namespaces.ts
fi

# if SPA, cleanup
if [ "$BUILD_TYPE" == "spa" ]; then
  rm ./public/index.html
fi
