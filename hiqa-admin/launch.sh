#!/usr/bin/env bash

# Install Packages
echo "Installing Packages"
npm install

# Create Build
echo "Creating Build"
npm run build
echo "Build Compelted"
# Running service
# echo "Starting Server"
# node server.js