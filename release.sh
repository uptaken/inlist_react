#!/bin/bash
# react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
npm run build
rm -rf android/app/src/main/res/drawable-*
rm -rf android/app/src/main/res/raw/*
cd android/
./gradlew assembleRelease
cd ..
