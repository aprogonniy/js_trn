@echo off
cd tools/grunt

call npm install

call grunt jshint

cd ../..
PAUSE