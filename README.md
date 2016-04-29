# react-redux-notification
[![npm version](https://img.shields.io/npm/v/react-redux-notification.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-notification) [![npm dependencies](https://img.shields.io/david/LouisBarranqueiro/react-redux-notification.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-notification) [![npm dependencies](https://img.shields.io/david/dev/LouisBarranqueiro/react-redux-notification.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-notification) [![travis build status](https://img.shields.io/travis/LouisBarranqueiro/react-redux-notification/master.svg?style=flat-square)](https://travis-ci.org/LouisBarranqueiro/react-redux-notification) [![npm download/month](https://img.shields.io/npm/dm/react-redux-notification.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-notification) [![gitter chat](https://img.shields.io/gitter/room/LouisBarranqueiro/react-redux-notification.svg?style=flat-square)](https://gitter.im/LouisBarranqueiro/react-redux-notification)
  
A customizable React and Redux notifications system

## Summary

* [Demo](https://github.com/LouisBarranqueiro/react-redux-notification#demo)
* [Installation](https://github.com/LouisBarranqueiro/react-redux-notification#installation)
* [Integration](https://github.com/LouisBarranqueiro/react-redux-notification#integration)
* [Usage](https://github.com/LouisBarranqueiro/react-redux-notification#integration)
    * [In a React component](https://github.com/LouisBarranqueiro/react-redux-notification#in-a-react-component)
    * [In a Redux module](https://github.com/LouisBarranqueiro/react-redux-notification#in-a-react-component)
* [API documentation](https://github.com/LouisBarranqueiro/react-redux-notification#api-documentation)
    * [Customize Notifications and Notification React component](https://github.com/LouisBarranqueiro/react-redux-notification#customize-notifications-and-notification-react-component)
    * [Add a notification](https://github.com/LouisBarranqueiro/react-redux-notification#add-a-notification)
    * [Update a notification](https://github.com/LouisBarranqueiro/react-redux-notification#update-a-notification)
    * [Remove a notification](https://github.com/LouisBarranqueiro/react-redux-notification#remove-a-notification)

## Demo

Check out the [demo](https://github.com/LouisBarranqueiro/react-redux-notification)

## Installation

```
npm install --save react-redux-notification
```

## Integration

Render this component at the root of your web application to avoid position conflicts.

``` js
import React, {Component} from 'react';
import {Notifications} from 'react-redux-notifications';

class ATopLevelComponent extends Component {
  render() { 
    return (
      <div>
        <Notifications/>
      </div>
    );
  }
}
```

Apply `thunk` middleware from [redux-thunk](https://github.com/gaearon/redux-thunk) to your Redux store.

```js
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

// store
const createStoreWithMiddleware = compose(
  applyMiddleware(thunk)
)(createStore);
const store = createStoreWithMiddleware(combineReducers({
    // your reducers here
  }), {});

```

## Usage

### In a React component

``` js
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addNotification as notify} from 'react-redux-notifications';

class AmazingComponent extends Component {
  constructor(props) {
    super(props);
    this._notify = this._notify.bind(this);
  }

  _notify() {
    const {notify} = this.props;
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
        <button onClick={this._notify}>Add a notification</button>
      </div>
    );
  }
}

export default connect(null, {notify})(AmazingComponent);
```

### In a Redux module

``` js
import {addNotification as notify} from 'react-redux-notification';

// we add a notification to inform user about
// state of his request (success or failure) 
const sendResetPasswordLink = (props) => {
  return (dispatch) => {
    api.post('users/ask-reset-password', props)
      .then((res) => {
        dispatch(notify({message:res.data.detail, status:'success'}));
      })
      .catch((res) => {
        dispatch(notify({message:res.data.detail, status:'error'}));
      });
    };
};
```

## API documentation

### Customize `Notifications` and `Notification` React component

`Notifications` and `Notification` React component are easily customizable trough the properties of `Notifications` Component.

| Property              | Type   | Description |
| --------------------- | :----: | ----------- |
| defaultValues         | Object | Default value for a notification. Check [defaultValues](https://github.com/LouisBarranqueiro/react-redux-notification#defaultvalues-properties) properties |
| className             | String | Class names of notifications container. Check [className](https://github.com/LouisBarranqueiro/react-redux-notification#classname-properties) properties |
| transition            | Object | Default transition for a notification. Check [transition](https://github.com/LouisBarranqueiro/react-redux-notification#transition-properties) properties |
| notificationClassName | Object | Class names of a notification. Check [notificationClassName](https://github.com/LouisBarranqueiro/react-redux-notification#notificationclassname-properties) properties |

#### `defaultValues` properties

This object allow you to configure default behavior for your notifications.

| Property     | Type    | Default | Description |
| ------------ | :-----: | :-----: | ----------- |
| status       | String  | null    | Status of notification : info, success, warning, error |
| dismissible  | Boolean | true    | Define if a notification is dismissible by clicking on it |
| dismissAfter | Number  | 5000    | Time before the notification disappear (ms). 0: infinite |

##### Example

```js 
render() {
  const defaultValues = {
    status: 'info',
    dismissible: false,
    dismissAfter: &k3000
  };
  return (
    <div>
      <Notifications defaultValues={defaultsValues}/>
    </div>
  );
}
```

#### `className` properties

It allow you to configure class names of `Notifications` React component.

##### JSX structure of `Notifications` React component

``` html
<div className={className}>
    <TransitionGroup
      transitionName={name}
      transitionEnterTimeout={enterTimeout}
      transitionLeaveTimeout={leaveTimeout}>
      {this._renderNotifications()}
    </TransitionGroup>
</div>
``` 
##### Example

``` js 
render() {
  return (
    <div>
      <Notifications className="my-notification-class another-class"/>
    </div>
  );
}
```

#### `transition` properties

This object allow you to configure CSS animation of `Notification` React component.

| Property     | Type    | Default | Description |
| ------------ | :-----: | :-----: | ----------- |
| enterTimeout | Number  | 400     | Duration of enter animation (ms) |
| leaveTimeout | Number  | 400     | Duration of leave animation (ms) |
| name         | Object  | Object  | Classes to trigger a CSS animation or transition |

##### Example

``` js
render() {
  const transition = {
    enterTimeout: 400,
    leaveTimeout: 400,
    name: {
      enter: 'enter',
      enterActive: 'enterActive',
      leave: 'leave',
      leaveActive: 'leaveActive',
      appear: 'appear',
      appearActive: 'appearActive'
    }
  };
  return (
    <div>
      <Notifications transition={transition}/>
    </div>
  );
}
```

#### `notificationClassName` properties

This object allow you to configure class names of `Notification` React component.

| Property  | Type     | Default | Description |
| --------- | :------: | :-----: | ----------- |
| main      | String   | 400     | Apply on notification container. **E.g**: `notification` |
| status    | Function | 400     | Apply on notification container. Use to stylize the notification depending on its `status` value. **E.g**: `notification-${status}`. The function take one parameter (`status`), a String |
| icon      | String   |         | Apply on notification icon container. **E.g**: `notification-icon` |
| title     | String   |         | Apply on notification title container. **E.g**: `notification-title` |

##### JSX structure of `Notification` React component

``` html
<div className={`${className.main} ${className.status(status)}`}
     onClick={dismissible ? this._remove : ''}>
  <i className={className.icon}></i>
  <p className={className.title}>{title}</p>
  {message}
</div>
```

##### Example

``` js
render() {
  const notificationClassName = {
    main: 'my-notification-class',
    status: function(status) {
      return `my-notification-${status}`;
    },
    icon: 'my-notification-icon',
    title: 'my-notification-title'
  };
  return (
    <div>
      <Notifications notificationClassName={notificationClassName}/>
    </div>
  );
}
```

### Add a notification

Adding notification is done with the `addNotification` function. It returns the notification object just added.

#### Syntax

``` js
addNotification(notification);
```

#### Parameters

| Parameter    | Type     | Description |
| ------------ | :------: | ----------- |
| notification | Object   | A [notification](https://github.com/LouisBarranqueiro/react-redux-notification#notification-properties) object |

#### Notification properties
 
| Property     | Type             | Default | Description |
| ------------ | :--------------: | :-----: | ----------- |
| title        | String           |         | Title of the notification |
| message      | String           |         | Message of the notification |
| status       | String or Number | null    | Status of notification : info, success, warning, error. You can also pass an HTTP status code like 200, or 403, it will be converted as an understandable status for the Notificaton component |
| dismissible  | Boolean          | true    | Define if a notification is dismissible by clicking on it |
| dismissAfter | Number           | 5000    | Time before the notification disappear (ms). 0: infinite |
| onAdd        | Function         |         | Function executed at component lifecycle : `componentDidMount` |
| onRemove     | Function         |         | Function executed at component lifecycle : `componentWillUnmount` |

#### Example

``` js
const notif = addNotification({
  title: 'Welcome',
  message: 'A message',
  status: 'info',
  dismissAfter: 10000,
  dismissible: false,
  onAdd: function() {
    console.log('hey buddy');
  }
});
console.log(JSON.stringify(notif));
/*
{
  id: 1461763123454,
  title: "Welcome",
  message: "A message",
  status: "info",
  dismissAfter: 10000
  dismissible: false,
  onAdd: function()
}
 */
```

### Update a notification

Updating a notification is done with the `updateNotification` function.

#### Syntax

``` js
updateNotification(notification);
```

#### Parameters

| Parameter    | Type     | Description |
| ------------ | :------: | ----------- |
| notification | Object   | A [notification](https://github.com/LouisBarranqueiro/react-redux-notification#notification-properties-1) object |

#### Notification properties
 
| Property     | Type             | Default | Description |
| ------------ | :--------------: | :-----: | ----------- |
| id           | Number           |         | Id of the notification |
| title        | String           |         | Title of the notification |
| message      | String           |         | Message of the notification |
| status       | String or Number | null    | Status of notification : info, success, warning, error. You can also pass an HTTP status code like 200, or 403, it will be converted as an understandable status for the Notificaton component |
| dismissible  | Boolean          | true    | Define if a notification is dismissible by clicking on it |
| dismissAfter | Number           | 5000    | Time before the notification disappear (ms). 0: infinite |
| onRemove     | Function         |         | Function executed at component lifecycle : `componentWillUnmount` |

#### Example

``` js
let notif = addNotification({
  title: 'Upload status',
  message: 'Your file is uploading...',
  status: 'info',
  dismissible: false,
  dismissAfter: 0
});
// simulate file upload
setTimeout(function() {
  notif.status = 'success';
  notif.message = 'Your file has been successfully uploaded';
  notif.dismissible = true;
  notif.dismissAfter = 5000;
  notif.onRemove = function() {console.log('I see you soon');};
  updateNotification(notif);
}, 3000);
```


### Remove a notification

Removing a notification is done with `removeNotification` (redux action) function.

#### Syntax

``` js
removeNotification(id);
```

#### Parameters

| Parameter   | Type   | Description |
| ----------- | :----: | ----------- |
| id          | Number | id of the notification |

# License 

react-redux-notification is under [MIT License](https://github.com/LouisBarranqueiro/react-redux-notification/blob/master/LICENSE)