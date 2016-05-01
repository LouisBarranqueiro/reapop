import expect from 'expect';
import expectJSX from 'expect-jsx';
// This will emulate a full ES2015 (ES6) environment
import 'babel-polyfill';
// expose `expect` for all tests
expect.extend(expectJSX);
global.expect = expect;

var context = require.context('./', true, /index\.js/);
context.keys().forEach(context);
