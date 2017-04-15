import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import {createStore, compose, combineReducers} from 'redux';
import App from './components/Demo';
import {reducer as notificationsReducer} from '../../src';
import 'babel-polyfill';
import './styles/style.scss';

// store
const createStoreWithMiddleware = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f // add support for Redux dev tools
)(createStore);
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
