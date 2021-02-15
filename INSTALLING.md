# Installation
Electron-builder relies on [npm](https://nodejs.org/en/) which is installed as a part of Node.js and [yarn](https://classic.yarnpkg.com/en/) to build.

## Building
Navigate to the src/ folder and run `yarn`, which will install the prerequisite packages needed to build. The dependencies will take a few minutes to install.

Once the dependencies are done installing, run `npm run make`. `electron-forge`, the underlying program used for building, will autodetect the OS you are using and build accordingly. The build files will appear in out/.