# Reapop
[![npm version](https://img.shields.io/npm/v/reapop.svg?style=flat-square)](https://www.npmjs.com/package/reapop) [![npm dependencies](https://img.shields.io/david/LouisBarranqueiro/reapop.svg?style=flat-square)](https://www.npmjs.com/package/reapop) [![npm dependencies](https://img.shields.io/david/dev/LouisBarranqueiro/reapop.svg?style=flat-square)](https://www.npmjs.com/package/reapop) [![travis build status](https://img.shields.io/travis/LouisBarranqueiro/reapop/master.svg?style=flat-square)](https://travis-ci.org/LouisBarranqueiro/reapop) [![coveralls status](https://img.shields.io/coveralls/LouisBarranqueiro/reapop.svg?style=flat-square)](https://coveralls.io/github/LouisBarranqueiro/reapop) [![npm download/month](https://img.shields.io/npm/dm/reapop.svg?style=flat-square)](https://www.npmjs.com/package/reapop) [![gitter chat](https://img.shields.io/gitter/room/LouisBarranqueiro/reapop.svg?style=flat-square)](https://gitter.im/LouisBarranqueiro/reapop)
  
A React and Redux notifications system

## Summary

* [Compatibility](https://github.com/LouisBarranqueiro/reapop#compatiblity)
* [Demo](https://github.com/LouisBarranqueiro/reapop#demo)
* [Installation](https://github.com/LouisBarranqueiro/reapop#installation)
* [Integration](https://github.com/LouisBarranqueiro/reapop#integration)
* [Usage](https://github.com/LouisBarranqueiro/reapop#usage)
* [API documentation](https://github.com/LouisBarranqueiro/reapop#api-documentation)
* [Contributing guide](https://github.com/LouisBarranqueiro/reapop#contributing-guide)
* [License](https://github.com/LouisBarranqueiro/reapop#license)

## Compatibility

### Libraries supported

Tested and works with :

- [react](https://github.com/facebook/react) : **^0.14.0** and **^15.0.0**
- [react-redux](https://github.com/reactjs/react-redux) : **^2.0.0** and **^3.0.0** and **^4.0.0**
- [redux](https://github.com/reactjs/redux) : **^2.0.0** and **^3.0.0**

### Browsers supported

Tested and works with :

- Chrome : **50**
- Firefox : **46**
- Safari : **9**

## Demo

Check out the [demo](http://louisbarranqueiro.github.io/reapop/)

## Installation

```
npm install --save reapop
```

## Integration

Follow this 3 steps to integrate Reapop to your application.

### Update Webpack configuration

1 . Since Reapop use ES6, it must be compiled with Babel. So you have to edit your webpack config to include Reapop source.  

2. You also have to define a loader for scss files. If it's not already the case, you need to install :

 - **style-loader** with `npm install style-loader --save-dev`
 - **css-loader** with `npm install css-loader --save-dev`
 - **sass-loader** with `npm install sass-loader --save-dev`
 
Look at this example, you can use it in for your project. Check out configuration of [Demo](https://github.com/LouisBarranqueiro/reapop.blob/master/demo/build/webpack.config.js) to see a complete example.


``` js
// CSS loader with some configuration
// read https://github.com/webpack/css-loader to understand each query parameters
var CSSLoader = [
  'css?sourceMap&-minimize',
  'modules',
  'importLoaders=1',
  'localIndentName=[name]__[local]__[hash:base64:5]'
].join('&');

module.exports = {
  // ...
  module: {
    loaders:[{
      test: /\.js$/,
      loaders: ['babel'],
      // exclude all folders inside `node_modules` folder unless `reapop`
      exclude: /node_modules\/(?!reapop)/
    },
    // Reapop have scss files so you have to define loaders to handle them
    {
      test: /\.scss$/,
      loaders: ['style', CSSLoader, 'sass']
    },
    // ... your other loaders
    ]
  }
  // ...
};
```

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
    notifications: notificationsReducer
    // your reducers here
  }), {});
```

## Import Font Awesome Icons

Reapop use Font Awesome icons. But since this component is built to be customizable we decided to not include Font Awesome as a dependencies to let you the choice to use it or not.

If you want to use it, check the following guides.

### With Webpack

1. Install Font Awesome with `npm install font-awesome --save` 
2. Install Font Awesome Webpack with `npm install font-awesome-webpack --save`
2. Install less because Font Awesome Webpack need it with `npm install less --save-dev`
3. Import it in your root component with `import 'font-awesome-webpack';` . Here is an [example](https://github.com/LouisBarranqueiro/reapop/blob/master/demo/src/index.js#L8)
4. Update your webpack config with 2 new loaders :

``` js
module export = {
  module: {
    loaders: [{ 
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
      loader: "url-loader?limit=10000&minetype=application/font-woff" 
    },
    { 
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
      loaer: "file-loader" 
    }]
  }
};
```

### With BootstrapCDN

Add this line in `<head>` of your main `index.html` file :
``` html 
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-T8Gy5hrqNKT+hzMclPo118YTQO6cYprQmhrYwIiQ/3axmI1hQomh7Ud2hPOy8SP1" crossorigin="anonymous">
```

You can also use bower, or include it manually in your project.

## Usage

### In a React component

If you are not familiar with react-redux library or the way to connect a React component with a Redux store, I recommend you to read [Redux documentation - Usage with React](http://redux.js.org/docs/advanced/UsageWithReact.html) to understand this example.

``` js
import React, {Component} from 'react';
import {connect} from 'react-redux';
// 1. we import `addNotification` (thunk action creator) as `notify`
import {addNotification as notify} from 'reapop';

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
// 1. we import `addNotification` (thunk action creator) as `notify`
import {addNotification as notify} from 'reapop';

// we add a notification to inform user about
// state of his request (success or failure) 
const sendResetPasswordLink = (props) => (dispatch) => {
    axios.post('https://api.example.com/users/ask-reset-password', props)
      .then((res) => {
        // 2. we use `dispatch` to notify user.
        // Status code will be converted in an understandable status for the React component
        dispatch(notify({message:res.data.detail, status:res.statusCode}));
      })
      .catch((res) => {
       // 3. same thing here
        dispatch(notify({message:res.data.detail, status:res.statusCode}));
      });
    };
};
```

## Documentation

Read [API documentation](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md) to discover all possibilities.

## Contributing guide

Read [Contributing guide](https://github.com/LouisBarranqueiro/reapop/blob/master/.github/.CONTRIBUTING.md)

## License 

Reapop is under [MIT License](https://github.com/LouisBarranqueiro/reapop/blob/master/LICENSE)