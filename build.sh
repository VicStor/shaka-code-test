#!/bin/bash

cd ./client
npm install
npm run build
cd ..
cp -r ./client/build ./server/public
cd ./server
npm install
node server.js