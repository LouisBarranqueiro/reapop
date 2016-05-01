import expect from 'expect';
import expectJSX from 'expect-jsx';
// This will emulate a full ES2015 (ES6) environment
import 'babel-polyfill';
// expose `expect` for all tests
expect.extend(expectJSX);
global.expect = expect;

// require all `test/**/index.js`
const testsContext = require.context('./', true, /index\.js/);
testsContext.keys().forEach(testsContext);
// require all `src/**/*.js`
const componentsContext = require.context('../src', true, /\.js$/);
componentsContext.keys().forEach(componentsContext);
