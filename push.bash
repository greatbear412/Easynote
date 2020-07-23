#!/bin/bash

rm -rf js
rm -rf css
rm -rf fonts

mv ./dist/* ./

git add .
git commit -m "test"
git push origin gh-pages
