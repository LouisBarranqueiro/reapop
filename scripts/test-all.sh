npm i react@0.14 react-dom@0.14 react-addons-test-utils@0.14 redux@2 react-redux@2 &&
npm t &&
npm uninstall redux react-redux &&

npm i redux@3 react-redux@3.1 &&
npm t &&
npm uninstall react react-dom react-addons-test-utils redux react-redux &&

npm i react@15 react-dom@15 react-addons-test-utils@15 redux@4 react-redux@4 &&
npm t &&
npm uninstall react react-dom react-addons-test-utils redux react-redux &&

npm i react@16.5.2 react-dom@16 redux@4 react-redux@5.0.6 &&
npm t &&
npm uninstall react react-dom react-addons-test-utils redux react-redux
