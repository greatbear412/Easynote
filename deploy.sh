#!/usr/bin/env sh

set -e

npm run build

mv ./dist/index.html ./index.html

git add .
git commit -m "deploy"
git push origin gh-pages
