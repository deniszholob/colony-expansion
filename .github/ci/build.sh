#!/bin/bash
# Website build script
# @author Denis Zholob (deniszholob.com)
#
# ====================================== #

echo ' -- Build Script Started ...'

echo ' -- Running npm build script'
npm run build:prod

# https://angular.io/guide/deployment#deploy-to-github-pages
echo ' -- Copy index.html to 404.html'
cp public/index.html public/404.html

echo ' -- Build contents'
ls -al "public"

echo ' -- Build script finished ...'
