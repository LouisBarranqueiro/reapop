# API documentation

* [Objects](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#objects)
    * [Notification](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#notification)
    * [Notification button](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#notification-button)
* [Action creators](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#action-creators)
    * [Update or add a notification](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#notify)
    * [Add a notification](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#add-a-notification)
    * [Update a notification](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#update-a-notification)
    * [Remove a notification](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#remove-a-notification)
    * [Remove all notifications](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#remove-all-notifications)
* [Customize default values for notifications](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#customize-default-values-for-notifications)
* [Notifications system component](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#notifications-system-component)
* [Theme](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#theme)
    * [Themes list](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#themes-list)
    * [Set a theme](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#set-a-theme)
    * [Customize or create a theme](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#customize-or-create-a-theme)
        * [Theme structure](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#theme-structure)
        * [Theme properties](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#theme-properties)
        * [Integrate and customize a theme in your project](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#integrate-and-customize-a-theme-in-your-project)

## Objects

#### Notification

| Property     | Type             | Default | Description |
| ------------ | ---------------- | ------- | ----------- |
| id           | String or Number |         | ID of the notification. If not provided during creation, will be generated automatically using the current timestamp. |
| title        | String           |         | Title of the notification |
| message      | String           |         | Message of the notification |
| image        | String           |         | URL of an image. When an image is defined, status of the notification is set to `default`. |
| status       | String or Number | default | Status of the notification : default, info, success, warning, error. You can also pass an HTTP status code like 200, or 403, it will be converted as an understandable status for the `Notification` component. Of course, you can also use custom status depending on the theme that you use. |
| position     | String           | tr      | Position of the notification : `t`, `tc`, `tl`, `tr`, `b`, `bc`, `br`, `bl`.  These values are available in `POSITIONS` variable. See [code](https://github.com/LouisBarranqueiro/reapop/blob/master/src/constants/index.js) |
| dismissible  | Boolean          | true    | Define if a notification is dismissible by clicking on it |
| dismissAfter | Number           | 5000    | Time before the notification disappear (ms). Paused when mouse is hovering the notification. 0: infinite. |
| closeButton  | Boolean          | false   | Display a close button if it is dismissible |
| buttons      | Array            |         | Array of [button](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#notification-button) objects. A notification can have 2 buttons maximum. |
| onAdd        | Function         |         | Function executed at component lifecycle : `componentDidMount` |
| onRemove     | Function         |         | Function executed at component lifecycle : `componentWillUnmount` |
| allowHTML    | Boolean          | false   | Allow HTML in title and message of the notification |

#### Notification button

| Property     | Type     | Default | Description |
| ------------ | :------: | :-----: | ----------- |
| name         | String   |         | Title of the button |
| primary      | Boolean  | false   | true: Title in bold, false : title in normal |
| onClick      | Function |         | Function executed when user click on it |

## Action creators

### Update or create a notification

Updates a notification if it does exist or creates it. It returns the notification just updated or created.
**You basically want to use this function all the time to update and create notifications.**

#### Syntax

``` js
notify(notification);
```

#### Parameters

| Parameter    | Type     | Description |
| ------------ | -------- | ----------- |
| notification | Object   | A [notification](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#notification) object |


#### Example

``` js
// add a notification
let notif = notify({
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
  // update the notification
  notify(notif);
}, 10000);
```

### Add a notification

Adds a notification and returns it.

#### Syntax

``` js
addNotification(notification);
```

#### Parameters

| Parameter    | Type     | Description |
| ------------ | -------- | ----------- |
| notification | Object   | A [notification](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#notification) object |

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

Updates a notification and returns it.

#### Syntax

``` js
updateNotification(notification);
```

#### Parameters

| Parameter    | Type     | Description |
| ------------ | -------- | ----------- |
| notification | Object   | A [notification](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#notification) object |


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


### removeNotification

Removes a notification.

#### Syntax

``` js
removeNotification(id);
```

#### Parameters

| Parameter   | Type   | Description |
| ----------- | ------ | ----------- |
| id          | String or Number | ID of the notification |

### Remove all notifications

Removes all notifications.

#### Syntax

``` js
removeNotifications();
```

## Customize default values for notifications

You can customizable default values for notifications, by passing an object to the notification reducer.
Here is the values of a [notification](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#notification) object:
- status
- position
- dismissible
- dismissAfter
- closeButton
- allowHTML

## Notifications system component

| Property | Type     | Default | Description |
| -------- | -------- | ------- | ----------- |
| theme    | Object   | null    | The theme to use to stylize notifications. |
| filter   | Function | null    | Filter notifications to display. Can be useful to display some notifications with another component, like modal notifications or banner notifications. |

### Example

``` html
<NotificationsSystem 
  theme={theme}
  filter={notif => notif.style !== 'banner'} 
/>
```


## Theme

### Themes list

| Name           | Style                      | Chrome | Safari | Firefox | IE  | Edge | Opera |
| -------------- | -------------------------- | ------ | ------ | ------- | --- | ---- | ----- |
| [WYBO][1]      | Official theme, flat style | Yes    | Yes    | Yes     | 11+ | Yes  | Yes   |
| [Bootstrap][2] | Bootstrap style            | Yes    | Yes    | Yes     | 11+ | Yes  | Yes   |

[1]: https://github.com/LouisBarranqueiro/reapop-theme-wybo
[2]: https://github.com/LouisBarranqueiro/reapop-theme-bootstrap

### Set a theme

Reapop works with theme. There is no default theme to avoid useless dependencies if you don't use it. So you have to choose one in the [list](#theme-list), and follow guidelines of the theme to install it.

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

##### If you want to create a new theme :

I recommend you to use the official theme for Reapop [reapop-theme-wybo](https://github.com/LouisBarranqueiro/reapop-theme-wybo/blob/master/index.js) as a base. It is easily understandable and customizable.

##### If you want to customize a theme :

1. Fork the theme
2. Edit the theme
3. Publish your theme and use it as a npm dependencies or integrate it directly in your project

**If you want to use it directly in your project, follow this [short guide](#integrate-and-customize-a-theme-in-your-project)

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

**Why no inline style?**

- Inline style is useful to fix some css rules quickly, but when there are a lot of css rules, it's preferable to use css files to separate style and view. It facilitates the understanding of React component logic.
- to customize quickly and easily notifications by editing some css :)
- and for some other points undermentioned

**Why use this file instead of declare all class names directly in the Reapop module and import only a CSS file?**

- to limit the coupling between the theme and Reapop module 
- to ease the update to a newer version of Reapop
- to be able to use local class name (webpack option) or customize class names

Important rules when you customize or create your own theme :
- DON'T edit property name of any object because each property name is used by React components of Reapop. If you change one of these, it will not work.
- If you use [local scope](https://github.com/webpack/css-loader#local-scope) in your style, don't forget to import style to use local indent name of your class. Example in [reapop-theme-wybo - index.js](https://github.com/LouisBarranqueiro/reapop-theme-wybo/blob/master/index.js#L4)

**index.js of reapop-theme-wybo** :

``` js
'use strict';

var css = require('./src/styles/styles.css');

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
  enterTimeout: 500,
  leaveTimeout: 900,
  name: {
    enter: css['notification-enter'],
    leave: css['notification-leave']
  }
};

// default className for Notification component
var notificationClassName = {
  wrapper: css['notification-wrapper'],
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
  closeButtonContainer: css['notification-close-button-container'],
  closeButton: css['notification-close-button'],
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

| Property             | Type     | Description |
| --------------       | -------- | ----------- |
| wrapper              | String   | Wrap notification container. It give more possibilities to animate notifications because the notification container have properties like `display:table;` that does not allow height resize as an example.  |
| main                 | String   | Applied on notification container. |
| meta                 | String   | Applied on notification meta container. |
| title                | String   | Applied on notification title container. |
| message              | String   | Applied on notification message container. |
| icon                 | String   | Applied on notification icon container. |
| imageContainer       | String   | Applied on notification image container. |
| image                | String   | Applied on notification image. image is set as a background |
| status               | Function | Applied on notification container. Use to stylize the notification depending on its status. |
| dismissible          | String   | Applied on notification dismissible container. |
| closeButtonContainer | Function | Applied on notification close button container |
| closeButton          | Function | Applied on notification close button |
| buttons              | Function | Applied on notification container to stylize the notification depending on number of buttons it has; and on notification buttons container. |
| button               | String   | Applied on notification button container. |
| buttonText           | String   | Applied on container of text of notification button. |

Check [Notification.js](https://github.com/LouisBarranqueiro/reapop/tree/master/src/components/Notification.js) file to see the JSX structure of `Notification` component.

#### Example

``` js 
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {reducer as notificationsReducer} from 'reapop';

// default value for notifications
const defaultNotification = {
  status: 'info',
  position: 'tr',
  dismissible: true,
  dismissAfter: 2000,
  allowHTML: true,
  closeButton: true
};

// store
const createStoreWithMiddleware = compose(
  applyMiddleware(thunk)
)(createStore);
const store = createStoreWithMiddleware(combineReducers({
  // reducer must be mounted as `notifications` !
  notifications: notificationsReducer(defaultNotification) // pass config here
  // your reducers here
}), {});
```

#### Integrate and customize a theme in your project

##### Recommended structure

``` 
your_project
├── src
│   └── components
│       └── MyNotificationsSystem
|           ├── index.js # contains your React Component
|           └── theme # contains the source file of a theme or your own theme
|                 ├── index.js
|                 └── styles
|                     ├── _mixins.scss
|                     ├── _variables.scss
|                     └── styles.scss
```

Follow these steps :

1. Create a `MyNotificationsSystem` folder to wrap your component and its theme
2. Add an `index.js` which contains your React Component. 
3. Put your own theme in `theme` folder as shown above
4. If you want to start from a theme. Copy its `index.js` file and `styles` folder in `theme` folder
5. Check that path used in `theme/index.js` are correct with the new structure.
6. Now you can edit style file and create you own theme. Read Documentation to understand how does it's organized.
7. Import and render this React component at the root of your App. 

##### Example of `MyNotificationsSystem` component:

``` js
import React, {Component} from 'react';
import NotificationsSystem from 'reapop';
import myTheme from './theme';

export default class MyNotificationsSystem extends Component {
  render() {
    return (
      <NotificationsSystem theme={myTheme}/>
    )
  }
}
```
