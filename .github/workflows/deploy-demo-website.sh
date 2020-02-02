#!/bin/bash

npm run compile

revision=$(git rev-parse --short HEAD)

cd demo/dist

git init
git config user.name "GitHub Actions"
git config user.email actions@github.com

git remote add upstream "https://$GITHUB_TOKEN@github.com/$GITHUB_REPOSITORY.git"
git fetch upstream
git reset upstream/gh-pages

touch .

git add -A .
git commit -m "feat: rebuild pages at ${revision}"
git push -q upstream HEAD:gh-pages
