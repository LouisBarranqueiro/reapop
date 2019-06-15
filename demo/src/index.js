import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import {createStore, compose, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import App from './components/Demo';
import {reducer as notificationsReducer} from '../../src';
import '@babel/polyfill';
import './styles/style.scss';

// store
const enhancers = [];
const devToolsExtension = window.devToolsExtension;

if (typeof devToolsExtension === 'function') {
  enhancers.push(devToolsExtension());
}
const createStoreWithMiddleware = compose(applyMiddleware(thunk), ...enhancers)(createStore);
const store = createStoreWithMiddleware(combineReducers({
  notifications: notificationsReducer()
}), {});

// render
render(
  <Provider store={store}>
    <App/>
  </Provider>
  ,
  document.getElementById('root')
);
