#!/bin/bash

cd ./users
npm run build
cd ..
cp -r ./users/build ./user-server/public
cd ./user-server
node server.js