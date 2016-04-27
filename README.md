# react-redux-notification
[![npm version](https://img.shields.io/npm/v/react-redux-notification.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-notification) [![npm dependencies](https://img.shields.io/david/LouisBarranqueiro/react-redux-notification.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-notification) [![npm dependencies](https://img.shields.io/david/dev/LouisBarranqueiro/react-redux-notification.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-notification) [![travis build status](https://img.shields.io/travis/LouisBarranqueiro/react-redux-notification/master.svg?style=flat-square)](https://travis-ci.org/LouisBarranqueiro/react-redux-notification) [![npm download/month](https://img.shields.io/npm/dm/react-redux-notification.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-notification) [![gitter chat](https://img.shields.io/gitter/room/LouisBarranqueiro/react-redux-notification.svg?style=flat-square)](https://gitter.im/LouisBarranqueiro/react-redux-notification)
  

A customizable React and Redux notifications system

## Installation

```
npm install --save react-redux-notification
```

## API documentation

### Customize Notifications and Notification component

| Properties            | Type   | Description |
| --------------------- | :----: | ----------- |
| defaultValues         | Object | Default value for a notification. check [defaultValues attributes](https://github.com/LouisBarranqueiro/react-redux-notification#defaultValues) |
| transition            | Object | Default transition for a notification. check [transition attributes](https://github.com/LouisBarranqueiro/react-redux-notification#transition) |
| className             | String | Class names of notifications container. check [className attributes](https://github.com/LouisBarranqueiro/react-redux-notification#className) |
| notificationClassName | Object | Class names of a notification. check [notificationClassName attributes](https://github.com/LouisBarranqueiro/react-redux-notification#notificationClassName) |

#### Details of properties

##### `defaultValues`

This object allow you to configure default behavior for your notifications

| Attribute    | Type    | Default | Description |
| ------------ | :-----: | :-----: | ----------- |
| type         | String  | null    | Type of message : info, success, warning, error |
| dismissible  | Boolean | true    | Define if a notification is dismissible by clicking on it |
| dismissAfter | Number  | 5000    | Time before the notification disappear (ms). 0: infinite |

###### Example

```js 
const defaultValues = {
  type: 'info',
  dismissible: false,
  dismissAfter: 3000
};
```
##### `className`

It allow you to configure the class names of notifications container

##### `transition`

This object allow you to configure the animation for your notifications

| Attribute    | Type    | Default | Description |
| ------------ | :-----: | :-----: | ----------- |
| enterTimeout | Number  | 400     | Duration of enter animation (ms) |
| leaveTimeout | Number  | 400     | Duration of leave animation (ms) |
| name         | Object  | Object  | Classes to trigger a CSS animation or transition |

###### Example

``` js
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
```

##### `notificationClassName`

This object allow you to configure the class names for your notification

| Attribute | Type     | Default | Description |
| --------- | :------: | :-----: | ----------- |
| main      | String   | 400     | Class names of notification container. **E.g**: `notification` |
| type      | Function | 400     | Class names of notification container. Use to stylize the notification depending on its `type` value. **E.g**: `notification-type`. The function take one parameter (`type`), a String |
| icon      | String   | Object  | Class names of notification icon container. **E.g**: `notification-icon` |

###### Example

``` js
const notificationClassName = {
  main: 'notification',
  type: function(type) {
    return `notification-${type}`;
  },
  icon: 'fa notification-icon'
};
```

#### Add a notification

Adding notification is done with the `addNotification` function. It returns the notification object just added.

##### Syntax

``` js
addNotification(notification);
```

##### Parameters
 
| Parameter    | Type    | Default | Description |
| ------------ | :-----: | :-----: | ----------- |
| message      | String  |         | Message of the notification |
| type         | String  | null    | Type of message : info, success, warning, error |
| dismissible  | Boolean | true    | Define if a notification is dismissible by clicking on it |
| dismissAfter | Number  | 5000    | Time before the notification disappear (ms). 0: infinite |

##### Example

``` js
const notif = addNotification({
  message: 'A message',
  type: 'info',
  dismissAfter: 10000,
  dismissible: false
});
console.log(JSON.stringify(notif));
/*
{
  id: 1461763123454,
  message: "A message",
  type: "info",
  dismissible: true,
  dismissAfter: 5000
}
 */
```

#### Update a notification

Updating a notification is done with the `updateNotification` function.

##### Syntax

``` js
updateNotification(notification);
```

##### Parameters
 
| Parameter    | Type    | Default | Description |
| ------------ | :-----: | :-----: | ----------- |
| id           | Number  |         | Id of the notification |
| message      | String  |         | Message of the notification |
| type         | String  | null    | Type of message : info, success, warning, error |
| dismissible  | Boolean | true    | Define if a notification is dismissible by clicking on it |
| dismissAfter | Number  | 5000    | Time before the notification disappear (ms). 0: infinite |

##### Example

``` js
let notif = addNotification({
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
  updateNotification(notif);
}, 3000);
```


#### Remove a notification

Removing a notification is done with `removeNotification` (redux action) function.

##### Syntax

``` js
removeNotification(id);
```

##### Parameters

| Parameter   | Type   | Description |
| ----------- | :----: | ----------- |
| id          | Number | id of the notification |

