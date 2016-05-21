# API documentation

* [Action creators](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#action-creators)
    * [Add a notification](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#add-a-notification)
    * [Update a notification](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#update-a-notification)
    * [Remove a notification](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#remove-a-notification)
* [Customize default values for notifications](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#customize-default-values-for-notifications)
* [Theme](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#theme)
    * [Set a theme](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#set-a-theme)
    * [Create a theme](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#create-a-theme)
        * [Theme structure](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#theme-structure)
        * [Theme properties](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#theme-properties)

## Action creators

### Add a notification

Adding notification is done with the `addNotification` (thunk action creator) function. It returns the notification object just added.

#### Syntax

``` js
addNotification(notification);
```

#### Parameters

| Parameter    | Type     | Description |
| ------------ | -------- | ----------- |
| notification | Object   | A [notification](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#notification-object-properties) object |

#### Notification object properties
 
| Property     | Type             | Default | Description |
| ------------ | ---------------- | ------- | ----------- |
| title        | String           |         | Title of the notification |
| message      | String           |         | Message of the notification |
| image        | String           |         | URL of an image. When an image is defined, status of the notification is set to `default`. |
| status       | String or Number | default | Status of the notification : default, info, success, warning, error. You can also pass an HTTP status code like 200, or 403, it will be converted as an understandable status for the `Notification` component. Of course, you can also use custom status depending on the theme that you use. |
| position     | String           | tr      | Position of the notification on the screen |
| dismissible  | Boolean          | true    | Define if a notification is dismissible by clicking on it |
| dismissAfter | Number           | 5000    | Time before the notification disappear (ms). Paused when mouse is hovering the notification. 0: infinite. |
| buttons      | Array            |         | Array of [button](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#button-object-properties) objects. A notification can have 2 buttons maximum. |
| onAdd        | Function         |         | Function executed at component lifecycle : `componentDidMount` |
| onRemove     | Function         |         | Function executed at component lifecycle : `componentWillUnmount` |
| allowHTML    | Boolean          | false   | Allow HTML in message |

##### Button object properties
 
| Property     | Type     | Default | Description |
| ------------ | :------: | :-----: | ----------- |
| name         | String   |         | Title of the button |
| primary      | Boolean  | false   | true: Title in bold, false : title in normal |
| onClick      | Function |         | Function executed when user click on it |

#### Example

``` js
const notif = addNotification({
  title: 'Welcome on demo!',
  message: 'Hey buddy, here you can see what you can do with it.',
  position: 'br',
  status: 'info',
  dismissAfter: 10000,
  dismissible: false,
  onAdd: function() {
    console.log('hey buddy');
  },
  onRemove: function() {
      console.log('cya buddy');
  },
  buttons:[{
    name: 'OK',
    primary:true,
    onClick: () => {
      console.log('i\'m OK too');
    }
  }] 
});
console.log(JSON.stringify(notif));
/*
{
  "id":1463345312016,
  "title":"Welcome on demo!",
  "message":"Hey buddy, here you can see what you can do with it.",
  "position":"br",
  "status":"info",
  "dismissAfter":10000,
  "dismissible":false,
  "buttons":[{
    "name":"OK",
    "primary":true
  }]
}
*/

```

### Update a notification

Updating a notification is done with the `updateNotification` (action creator) function.

#### Syntax

``` js
updateNotification(notification);
```

#### Parameters

| Parameter    | Type     | Description |
| ------------ | -------- | ----------- |
| notification | Object   | A [notification](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#notification-object-properties-1) object |

#### Notification object properties
 
| Property     | Type             | Default | Description |
| ------------ | ---------------- | ------- | ----------- |
| title        | String           |         | Title of the notification |
| message      | String           |         | Message of the notification |
| image        | String           |         | URL of an image. When an image is defined, status of the notification is set to `default`. |
| status       | String or Number | default | Status of the notification : default, info, success, warning, error. You can also pass an HTTP status code like 200, or 403, it will be converted as an understandable status for the `Notification` component. Of course, you can also use custom status depending on the theme that you use. |
| position     | String           | tr      | Position of the notification on the screen |
| dismissible  | Boolean          | true    | Define if a notification is dismissible by clicking on it |
| dismissAfter | Number           | 5000    | Time before the notification disappear (ms). Paused when mouse is hovering the notification. 0: infinite. |
| buttons      | Array            |         | Array of [button](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#button-object-properties-1) object. A notification can have 2 buttons maximum. |
| onAdd        | Function         |         | Function executed at component lifecycle : `componentDidMount` |
| onRemove     | Function         |         | Function executed at component lifecycle : `componentWillUnmount` |
| allowHTML    | Boolean          | false   | Allow HTML in message |

##### Button object properties
 
| Property     | Type     | Default | Description |
| ------------ | -------- | ------- | ----------- |
| name         | String   |         | Title of the button |
| primary      | Boolean  | false   | true: Title in bold, false : title in normal |
| onClick      | Function |         | Function executed when user click on it |


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
  updateNotification(notif);
}, 10000);
```


### Remove a notification

Removing a notification is done with `removeNotification` (action creator) function.

#### Syntax

``` js
removeNotification(id);
```

#### Parameters

| Parameter   | Type   | Description |
| ----------- | ------ | ----------- |
| id          | Number | id of the notification |

## Theme

### Set a theme

Reapop works with theme. There is no default theme to avoid useless dependencies if you don't use it. So you have to choose one in the list, and follow guidelines of theme to install it.

- [**WYBO**](https://github.com/LouisBarranqueiro/reapop-theme-wybo) : Official theme, flat style.

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

### Customize or create a theme

##### If you wanna create a new theme :

I recommend you to use the official theme for Reapop [reapop-theme-wybo](https://github.com/LouisBarranqueiro/reapop-theme-wybo/blob/master/index.js) as a base. It is easily understandable and customizable.

##### If you wanna customize a theme :

1. Fork the theme
2. Edit the theme
3. Publish your theme and use it as a npm dependencies or integrate it directly in your project

#### Theme structure

```
reapop-theme
├── src
│   └── styles
│       ├── _mixins.scss
│       ├── _variables.scss
│       └── styles.scss
└── index.js
```
##### styles folder

It contains all style files :

 - `_mixins.scss` : contains all mixins used by the theme
 - `_variables.scss` : contains all variables used by the theme
 - `styles.scss` : it import previous files and contains style for all components

##### index.js file

It is the core of the theme. This file contains all CSS class names which will be used by Reapop. It's the link between your style and Reapop.

Important rules when you customize or create your own theme :
- DON'T edit property name of any object because each property name is used by React components of Reapop. If you change one of these, it will not work.
- If you use [local scope](https://github.com/webpack/css-loader#local-scope) in your style, don't forget to import style to use local indent name of your class. **We greatly recommend you to use local scope.** Example in [reapop-theme-wybo - index.js](https://github.com/LouisBarranqueiro/reapop-theme-wybo/blob/master/index.js#L4)
- If you theme as dependencies, import these dependencies in this file. Example in [reapop-theme-wybo - index.js](https://github.com/LouisBarranqueiro/reapop-theme-wybo/blob/master/index.js#L3) to import Font Awesome CSS.

**index.js of reapop-theme-wybo** :

``` js
'use strict';

require('!style-loader!css-loader!font-awesome/css/font-awesome.min.css');
var css = require('./src/styles/styles.scss');

// media breakpoint - small screen min width
var smallScreenMin = 768;

// default className for NotificationsSystem component
var notificationsSystemClassName = css['notifications-system'];

// default className for NotificationsContainer component
var notificationsContainerClassName = {
  main: css['notifications-container'],
  position: function position(_position) {
    return css['notifications-container--' + _position];
  }
};

// default transition for Notification component
var notificationsContainerTransition = {
  appearTimeout: 400,
  enterTimeout: 400,
  leaveTimeout: 400,
  name: {
    appear: css['notification-appear'],
    appearActive: css['notification-appear-active'],
    enter: css['notification-enter'],
    enterActive: css['notification-enter-active'],
    leave: css['notification-leave'],
    leaveActive: css['notification-leave-active']
  }
};

// default className for Notification component
var notificationClassName = {
  main: css['notification'],
  meta: css['notification-meta'],
  title: css['notification-title'],
  message: css['notification-message'],
  icon: 'fa ' + css['notification-icon'],
  imageContainer: css['notification-image-container'],
  image: css['notification-image'],
  status: function status(_status) {
    return css['notification--' + _status];
  },
  dismissible: css['notification--dismissible'],
  // `fa` corresponds to font-awesome's class name
  buttons: function buttons(count) {
    if (count === 0) {
      return '';
    } else if (count === 1) {
      return css['notification--buttons-1'];
    } else if (count === 2) {
      return css['notification--buttons-2'];
    }
    return css['notification-buttons'];
  },
  button: css['notification-button'],
  buttonText: css['notification-button-text']
};

module.exports = {
  smallScreenMin: smallScreenMin,
  notificationsSystem: {
    className: notificationsSystemClassName
  },
  notificationsContainer: {
    className: notificationsContainerClassName,
    transition: notificationsContainerTransition
  },
  notification: {
    className: notificationClassName
  }
};
```

#### Theme Properties

##### `smallScreenMin` property

Minimal width for small screen (min-width). This value is used to determine when all notifications are rendered at the top of the screen what ever the position property of a notification object |

##### `notificationsSystemClassName` properties

It allow you to configure style of `NotificationsSystem` component.

Check [NotificationsSystem.js](https://github.com/LouisBarranqueiro/reapop/tree/master/src/components/NotificationsContainer.js) file to see the JSX structure of `NotificationsSystem` component.

##### `notificationsContainerClassName` properties

This object allow you to configure class names of `NotificationsContainer` component.

| Property    | Type     | Description |
| ----------- | -------- | ----------- |
| main        | String   | Applied on root of `NotificationsContainer` component. |
| position    | Function | Applied on root of `NotificationsContainer` component. Use to stylize component depending on its position. |

Check [NotificationsContainer.js](https://github.com/LouisBarranqueiro/reapop/tree/master/src/components/NotificationsContainer.js) file to see the JSX structure of `NotificationsContainer` component.

##### `notificationsContainerTransition` properties

This object allow you to configure CSS animation of `Notification` component. 
We use React High-level API : [ReactCSSTransitionGroup](https://facebook.github.io/react/docs/animation.html#high-level-api-reactcsstransitiongroup) to animate notifications.

| Property     | Type    | Description |
| ------------ | ------- | ----------- |
| enterTimeout | Number  | Duration of enter animation (ms) |
| leaveTimeout | Number  | Duration of leave animation (ms) |
| name         | Object  | Classes to trigger a CSS animation or transition. Read [ReactCSSTransitionGroup](https://facebook.github.io/react/docs/animation.html#high-level-api-reactcsstransitiongroup) for more information. |

##### `notificationClassName` properties

This object allow you to configure style of `Notification` component.

| Property       | Type     | Description |
| -------------- | -------- | ----------- |
| main           | String   | Applied on root notification container. |
| meta           | String   | Applied on notification meta container. |
| title          | String   | Applied on notification title container. |
| message        | String   | Applied on notification message container. |
| icon           | String   | Applied on notification icon container. |
| imageContainer | String   | Applied on notification image container. |
| image          | String   | Applied on notification image. image is set as a background |
| status         | Function | Applied on root notification container. Use to stylize the notification depending on its status. |
| dismissible    | String   | Applied on notification dismissible container. |
| buttons        | Function | Applied on root notification container to stylize the notification depending on number of buttons it has; and on notification buttons container. |
| button         | String   | Applied on notification button container. |
| buttonText     | String   | Applied on container of text of notification button. |

Check [Notification.js](https://github.com/LouisBarranqueiro/reapop/tree/master/src/components/Notification.js) file to see the JSX structure of `Notification` component.

## Customize default values for notifications

You can customizable default values for notifications, by passing an object to `defaultValues` props of `NotificationsSystem` component.

| Property     | Type    | Default | Description |
| ------------ | ------- | ------- | ----------- |
| status       | String  | null    | Status of the notification : default, info, success, warning, error. These values are available in `STATUS` variable. See [code](https://github.com/LouisBarranqueiro/reapop/blob/master/src/constants/index.js) |
| position     | String  | tr      | Position of the  notification : tl, tr, br, bl.  These values are available in `POSITIONS` variable. See [code](https://github.com/LouisBarranqueiro/reapop/blob/master/src/constants/index.js|)
| dismissible  | Boolean | true    | Define if the notification is dismissible by clicking on it |
| dismissAfter | Number  | 5000    | Time before the notification disappear (ms). 0: infinite |
| allowHTML    | Boolean | False   | Allow you to insert HTML in the notification. Read [this](https://facebook.github.io/react/tips/dangerously-set-inner-html.html) before setting this value to true. |

#### Example

``` js 
import React, {Component} from 'react';
// STATUS contains all available status
// POSITIONS contains all available positions
import NotificationsSystem, {STATUS, POSITIONS} from 'reapop';

class AComponent extends Component {
  render() {
    const defaultValues = {
      status: STATUS.default,
      position: POSITIONS.topRight,
      dismissible: true,
      dismissAfter: 5000,
      allowHTML: false
    };
    return (
      <NotificationsSystem defaultValues={defaultValues} />
    );
  }
}
```