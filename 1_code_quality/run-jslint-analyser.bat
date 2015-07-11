@echo off
cd tools/jslint

call npm install -g jslint

call jslint ../../src/js/app.js

cd ../..
PAUSE