@echo off
cd tools/closure-compiler

if not exist "../../build" mkdir "../../build"
if not exist "../../build/closures-result" mkdir "../../build/closures-result"

call java -jar compiler.jar --js ../../src/js/app.js --js_output_file ../../build/closures-result/compiled.js

echo " > Google closures finished work OK."

cd ../..
PAUSE