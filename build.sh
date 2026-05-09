#!/bin/bash
set -e
cd client;
echo "Installing client dependencies...";
npm install;
echo "Building client...";
npm run build;

cd ../

echo "Deleting old build...";
rm -rf server/public;
mv client/dist server/public;
echo "Build complete!";

echo "Installing server dependencies...";
cd server;
npm install;
echo "Done"
