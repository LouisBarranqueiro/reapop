import { jsdom } from 'jsdom';
// setup a DOM to render React component in test suite
global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
