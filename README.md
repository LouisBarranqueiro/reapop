# Reapop
[![npm version](https://img.shields.io/npm/v/reapop.svg?style=flat-square)](https://www.npmjs.com/package/reapop) [![npm dependencies](https://img.shields.io/david/LouisBarranqueiro/reapop.svg?style=flat-square)](https://david-dm.org/LouisBarranqueiro/reapop) [![npm dev dependencies](https://img.shields.io/david/dev/LouisBarranqueiro/reapop.svg?style=flat-square)](https://david-dm.org/LouisBarranqueiro/reapop?type=dev) [![npm download/month](https://img.shields.io/npm/dm/reapop.svg?style=flat-square)](https://www.npmjs.com/package/reapop) [![travis build status](https://img.shields.io/travis/LouisBarranqueiro/reapop/master.svg?style=flat-square)](https://travis-ci.org/LouisBarranqueiro/reapop) [![coveralls status](https://img.shields.io/coveralls/LouisBarranqueiro/reapop.svg?style=flat-square)](https://coveralls.io/github/LouisBarranqueiro/reapop) [![gitter chat](https://img.shields.io/gitter/room/LouisBarranqueiro/reapop.svg?style=flat-square)](https://gitter.im/LouisBarranqueiro/reapop)

A React and Redux notifications system

## Summary

* [Compatibility](#compatibility)
* [Demo](#demo)
* [Installation](#installation)
* [Integration](#integration)
* [Usage](#usage)
* [API documentation](#api-documentation)
* [Contributing guide](#contributing-guide)
* [License](#license)

## Compatibility

### Supported libraries

Tested and works with :

- [react](https://github.com/facebook/react) : **^0.14.0**,  **^15.0.0** and **^16.0.0**
- [react-redux](https://github.com/reactjs/react-redux) : **^2.0.0**, **^3.0.0**, **^4.0.0** and **^5.0.6**
- [redux](https://github.com/reactjs/redux) : **^2.0.0**, **^3.0.0** and **^4.0.0**

### Supported browsers

Tested and works with :

![Supported browsers](https://reapop.s3.eu-central-1.amazonaws.com/v0.2.0-supported-browsers.jpg)

## Demo

Check out the [demo](https://louisbarranqueiro.github.io/reapop/)

## Installation

```
npm install reapop --save
```

## Integration

Follow this 4 steps to integrate Reapop to your application.

### Integrate `NotificationsSystem` React component

Render this component at the root of your web application to avoid position conflicts.

``` js
import React, {Component} from 'react';
import NotificationsSystem from 'reapop';

class ATopLevelComponent extends Component {
  render() {
    return (
      <div>
        <NotificationsSystem/>
      </div>
    );
  }
}
```

### Install and set a theme

**Reapop works with theme. There is no default theme to avoid useless dependencies if you don't use it. So you have to choose one in the [list](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#themes-list), and follow guidelines of theme to install it**.

After this, pass the theme in `NotificationsSystem` component props

``` js
import React, {Component} from 'react';
import NotificationsSystem from 'reapop';
// 1. import theme
import theme from 'reapop-theme-wybo';
//
class ATopLevelComponent extends Component {
  render() {
   // 2. set `theme` prop
    return (
      <div>
        <NotificationsSystem theme={theme}/>
      </div>
    );
  }
}
```

### Apply `thunk` middleware and add notifications reducer to Redux store

1. Since Reapop use thunk async actions creator, you must apply `thunk` middleware from [redux-thunk](https://github.com/gaearon/redux-thunk) to your Redux store. Install it with `npm install --save redux-thunk`.
2. Add notifications reducer as `notifications` to your root reducer.


``` js
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {reducer as notificationsReducer} from 'reapop';

// store
const createStoreWithMiddleware = compose(
  applyMiddleware(thunk)
)(createStore);
const store = createStoreWithMiddleware(combineReducers({
  // reducer must be mounted as `notifications` !
  notifications: notificationsReducer()
  // your reducers here
}), {});
```

### Install and import `babel-polyfill` package

This package use some ES6 features, to make it compatible in all browsers, you must :

1. Install `babel-polyfill` package with `npm install --save-dev`
2. Import `babel-polyfill` package at the root of your app with `import 'babel-polyfill';`


## Usage

### In a React component

If you are not familiar with react-redux library or the way to connect a React component with a Redux store, I recommend you to read [Redux documentation - Usage with React](http://redux.js.org/docs/advanced/UsageWithReact.html) to understand this example.

``` js
import React, {Component} from 'react';
import {connect} from 'react-redux';
// 1. we import `notify` (thunk action creator)
import {notify} from 'reapop';

class AmazingComponent extends Component {
  constructor(props) {
    super(props);
    // 4. don't forget to bind method
    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    const {notify} = this.props;
    // 3. we use `notify` to create a notification
    notify({
      title: 'Welcome',
      message: 'you clicked on the button',
      status: 'success',
      dismissible: true,
      dismissAfter: 3000
    });
  }

  render() {
    return (
      <div>
        // 5. we notify user when he click on the button
        <button onClick={this._onClick}>Add a notification</button>
      </div>
    );
  }
}
// 2. we map dispatch to props `notify` async action creator
//    here we use a shortcut instead of passing a `mapDispathToProps` function
export default connect(null, {notify})(AmazingComponent);
```

### In a Redux async action creator

If you are not familiar with async actions creator, I recommend you to read [Redux documentation - Async actions](http://redux.js.org/docs/advanced/AsyncActions.html) to understand this example.

``` js
// 1. we import `notify` (thunk action creator)
import {notify} from 'reapop';

// we add a notification to inform user about
// state of his request (success or failure)
const sendResetPasswordLink = (props) => (dispatch) => {
    axios.post('https://api.example.com/users/ask-reset-password', props)
      .then((res) => {
        // 2. we use `dispatch` to notify user.
        // Status code will be converted in an understandable status for the React component
        dispatch(notify({message: res.data.detail, status: res.statusCode}));
      })
      .catch((res) => {
       // 3. same thing here
        dispatch(notify({message: res.data.detail, status: res.statusCode}));
      });
    };
};
```

## API Documentation

Read [API documentation](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md) to discover all possibilities.

## Contributing guide

Read [Contributing guide](https://github.com/LouisBarranqueiro/reapop/blob/master/.github/CONTRIBUTING.md)

## License

Reapop is under [MIT License](https://github.com/LouisBarranqueiro/reapop/blob/master/LICENSE)
