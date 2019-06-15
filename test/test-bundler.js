// This will emulate a full ES2015 (ES6) environment
import '@babel/polyfill';
import expect from 'expect';
import {configure} from 'enzyme';

// expose `expect` for all tests
global.expect = expect;

const reactVersion = require('react').version;
// require all `test/**/index.js`
const testsContext = require.context('./', true, /index\.js/);
testsContext.keys().forEach(testsContext);
// require all `src/**/*.js`
const componentsContext = require.context('../src', true, /\.js$/);
componentsContext.keys().forEach(componentsContext);

let Adapter = null;

if (reactVersion.startsWith('16')) {
  Adapter = require('enzyme-adapter-react-16');
}
else if (reactVersion.startsWith('15')) {
  Adapter = require('enzyme-adapter-react-15.4');
}
else if (reactVersion.startsWith('0.14')) {
  Adapter = require('enzyme-adapter-react-14');
}

configure({adapter: new Adapter()});
