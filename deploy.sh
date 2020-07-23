#!/usr/bin/env sh

set -e

npm run build

rm -rf js
rm -rf css
rm -rf fonts

mv ./dist/* ./

git add .
git commit -m "deploy"
git push origin gh-pages
