# react-redux-notification
[![npm version](https://img.shields.io/npm/v/react-redux-notification.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-notification) [![npm dependencies](https://img.shields.io/david/LouisBarranqueiro/react-redux-notification.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-notification) [![npm dependencies](https://img.shields.io/david/dev/LouisBarranqueiro/react-redux-notification.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-notification) [![travis build status](https://img.shields.io/travis/LouisBarranqueiro/react-redux-notification/master.svg?style=flat-square)](https://travis-ci.org/LouisBarranqueiro/react-redux-notification) [![npm download/month](https://img.shields.io/npm/dm/react-redux-notification.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-notification) [![gitter chat](https://img.shields.io/gitter/room/LouisBarranqueiro/react-redux-notification.svg?style=flat-square)](https://gitter.im/LouisBarranqueiro/react-redux-notification)
  
A customizable React and Redux notifications system

## Summary

* [Demo](http://louisbarranqueiro.github.io/react-redux-notification/#demo)
* [Installation](http://louisbarranqueiro.github.io/react-redux-notification/#installation)
* [Integration](http://louisbarranqueiro.github.io/react-redux-notification/#integration)
* [Usage](http://louisbarranqueiro.github.io/react-redux-notification/#integration)
    * [In a React component](https://github.com/LouisBarranqueiro/react-redux-notification#in-a-react-component)
    * [In a Redux module](https://github.com/LouisBarranqueiro/react-redux-notification#in-a-react-component)
* [API documentation](http://louisbarranqueiro.github.io/react-redux-notification/#api-documentation)
    * [Customize Notifications and Notification React component](https://github.com/LouisBarranqueiro/react-redux-notification#customize-notifications-and-notification-react-component)
    * [Add a notification](https://github.com/LouisBarranqueiro/react-redux-notification#add-a-notification)
    * [Update a notification](https://github.com/LouisBarranqueiro/react-redux-notification#update-a-notification)
    * [Remove a notification](https://github.com/LouisBarranqueiro/react-redux-notification#remove-a-notification)

## Demo

Check out the [demo](http://louisbarranqueiro.github.io/react-redux-notification/)

## Installation

```
npm install --save react-redux-notification
```

## Integration

* Render this component at the root of your web application to avoid position conflicts.

**Example:**

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

* Apply `thunk` middleware from [redux-thunk](https://github.com/gaearon/redux-thunk) to your redux store.

**Example:**

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
      type: 'success',
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
        dispatch(notify({message:res.data.detail, type:'success'}));
      })
      .catch((res) => {
        dispatch(notify({message:res.data.detail, type:'error'}));
      });
    };
};
```

## API documentation

### Customize `Notifications` and `Notification` React component

`Notifications` and `Notification` React component are easily customizable trough the properties of `Notifications` Component.

| Properties            | Type   | Description |
| --------------------- | :----: | ----------- |
| defaultValues         | Object | Default value for a notification. Check [defaultValues attributes](https://github.com/LouisBarranqueiro/react-redux-notification#property--defaultvalues) |
| className             | String | Class names of notifications container. Check [className attributes](https://github.com/LouisBarranqueiro/react-redux-notification#property--classname) |
| transition            | Object | Default transition for a notification. Check [transition attributes](https://github.com/LouisBarranqueiro/react-redux-notification#property--transition) |
| notificationClassName | Object | Class names of a notification. Check [notificationClassName attributes](https://github.com/LouisBarranqueiro/react-redux-notification#property--notificationclassname) |

#### Property : `defaultValues`

This object allow you to configure default behavior for your notifications.

| Attribute    | Type    | Default | Description |
| ------------ | :-----: | :-----: | ----------- |
| type         | String  | null    | Type of message : info, success, warning, error |
| dismissible  | Boolean | true    | Define if a notification is dismissible by clicking on it |
| dismissAfter | Number  | 5000    | Time before the notification disappear (ms). 0: infinite |

##### Example

```js 
render() {
  const defaultValues = {
    type: 'info',
    dismissible: false,
    dismissAfter: 3000
  };
  return (
    <div>
      <Notifications defaultValues={defaultsValues}/>
    </div>
  );
}
```

#### Property : `className`

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

#### Property : `transition`

This object allow you to configure CSS animation of `Notification` React component.

| Attribute    | Type    | Default | Description |
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

#### Property : `notificationClassName`

This object allow you to configure class names of `Notification` React component.

| Attribute | Type     | Default | Description |
| --------- | :------: | :-----: | ----------- |
| main      | String   | 400     | Apply on notification container. **E.g**: `notification` |
| type      | Function | 400     | Apply on notification container. Use to stylize the notification depending on its `type` value. **E.g**: `notification-${type}`. The function take one parameter (`type`), a String |
| icon      | String   |         | Apply on notification icon container. **E.g**: `notification-icon` |
| title     | String   |         | Apply on notification title container. **E.g**: `notification-title` |

##### JSX structure of `Notification` React component

``` html
<div className={`${className.main} ${className.type(type)}`}
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
    type: function(type) {
      return `my-notification-${type}`;
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

`notification` is an `Object`

``` js
addNotification(notification);
```

#### Parameters

| Parameter    | Type     | Description |
| ------------ | :------: | ----------- |
| notification | Object   | a notification object. Check its attributes just below |

#### Notification attributes
 
| Attribute    | Type     | Default | Description |
| ------------ | :------: | :-----: | ----------- |
| title        | String   |         | Title of the notification |
| message      | String   |         | Message of the notification |
| type         | String   | null    | Type of message : info, success, warning, error |
| dismissible  | Boolean  | true    | Define if a notification is dismissible by clicking on it |
| dismissAfter | Number   | 5000    | Time before the notification disappear (ms). 0: infinite |
| onAdd        | Function |         | Function executed at component lifecycle : `componentDidMount` |
| onRemove     | Function |         | Function executed at component lifecycle : `componentWillUnmount` |

#### Example

``` js
const notif = addNotification({
  title: 'Welcome',
  message: 'A message',
  type: 'info',
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
  type: "info",
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
| notification | Object   | a notification object. Check its attributes just below |

#### Notification attributes
 
| Attribute    | Type     | Default | Description |
| ------------ | :------: | :-----: | ----------- |
| id           | Number   |         | Id of the notification |
| title        | String   |         | Title of the notification |
| message      | String   |         | Message of the notification |
| type         | String   | null    | Type of message : info, success, warning, error |
| dismissible  | Boolean  | true    | Define if a notification is dismissible by clicking on it |
| dismissAfter | Number   | 5000    | Time before the notification disappear (ms). 0: infinite |
| onRemove     | Function |         | Function executed at component lifecycle : `componentWillUnmount` |

#### Example

``` js
let notif = addNotification({
  title: 'Upload status',
  message: 'Your file is uploading...',
  type: 'info',
  dismissible: false,
  dismissAfter: 0
});
// simulate file upload
setTimeout(function() {
  notif.type = 'success';
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