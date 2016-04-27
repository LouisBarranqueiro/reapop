# react-redux-notification
[![npm version](https://img.shields.io/npm/v/react-redux-notification.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-notification) [![npm dependencies](https://img.shields.io/david/LouisBarranqueiro/react-redux-notification.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-notification) [![travis build status](https://img.shields.io/travis/LouisBarranqueiro/react-redux-notification/master.svg?style=flat-square)](https://travis-ci.org/LouisBarranqueiro/react-redux-notification) [![npm download/month](https://img.shields.io/npm/dm/react-redux-notification.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-notification)
  

A customizable React and Redux notifications system

## API documentation

### Customize Notifications component

| Properties         | Type   | Description |
| ------------------ | :----: | ----------- |
| notificationConfig | Object | Default value for a notification. check [notificationConfig attributes](#notificationConfig) |

#### Details of properties

##### notificationConfig

This object allow you to configure default behavior for your notifications

| Attribute    | Default | Description |
| ------------ | :-----: | ----------- |
| type         | null    | Type of message : info, success, warning, error |
| dismissAfter | 5000    | Time before the notification disappear (ms). 0: infinite |
| dismissible  | true    | Define if a notification is dismissible by clicking on |

#### Add a notification

Adding notification are able through the `pushNotification` (redux action) function. It returns the notification just added.

##### Syntax

``` js
addNotification(notification);
```

##### Parameters
 
| Parameter    | Type    | Default | Description |
| ------------ | :-----: | :-----: | ----------- |
| message      | String  | null    | Message of the notification |
| type         | String  | null    | Type of the notification : info, success, warning, error |
| dismissible  | Boolean | true    | If the notification is dismissible by clicking on it or not |
| dismissAfter | Number  | 5000    | Time before the notification disappear (ms). 0: infinite |

##### Example

``` js
addNotification({
  message: 'Hey buddy, I\'m a notification and you can't dismiss me!',
  type: 'info',
  dismissAfter: 10000,
  dismissible: false
});
```

#### Remove a notification

Removing a notification id done with `removeNotification` (redux action) function.

##### Syntax

``` js
removeNotification(id);
```

##### Parameters

| Parameter   | Type   | Description |
| ----------- | :----: | ----------- |
| id          | Number | id of the notification |

