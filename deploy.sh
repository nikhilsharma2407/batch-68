#!/usr/bin/bash

set -e

echo "Installing client deps..."
cd client
npm install

echo "Building client..."
npm run build

cd ..

echo "Replacing server/public..."

rm -rf server/public
mv client/dist server/public

echo "Installing server deps..."
cd server
npm install

echo "Done."