#!/bin/bash


git stash


git pull

cd web
npm install

npm run build


rm -rf node_modules

cd ..
