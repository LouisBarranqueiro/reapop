# API documentation

* [Customize style and behavior](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#customize-style-and-behavior)
* [Add a notification](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#add-a-notification)
* [Update a notification](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#update-a-notification)
* [Remove a notification](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#remove-a-notification)

## Customize style and behavior

Here is the list of the things which are customizable by setting properties of the `NotificationsSystem` component :

| Property              | Type   | Description |
| --------------------- | :----: | ----------- |
| className             | String | Class names of `NotificationsSystem` component. Check [className](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#classname-property) property |
| config                | Object | Config of `NotificationsSystem` component. Check [config](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#config-property) property |
| containerClassName    | Object | Class names of `NotificationsContainer` component. Check [containerClassName](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#containerclassName-property) property |
| defaultValues         | Object | Default value for a notification. Check [defaultValues](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#defaultvalues-property) property |
| notificationClassName | Object | Class names of `Notification` component. Check [notificationClassName](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#notificationclassname-property) property |
| transition            | Object | Transition for `Notification` component. Check [transition](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#transition-property) property |

### `className` properties

It allow you to configure class names of `NotificationsSystem` component.
By editing this property, you can change style of notifications containers. 
Of course, you will have to write your own CSS. 

#### JSX structure of `NotificationsSystem` React component

``` html
<div className={className}>
    <!-- childrens (NotificationsContainer) -->
</div>
``` 
#### Example

``` js 
import React, {Component} from 'react';
import NotificationsSystem from 'react';

class AComponent extends Component {
  render() {
    const defaultValues = {
      status: STATUS.default,
      position: POSITIONS.topRight,
      dismissible: true,
      dismissAfter: 5000,
      allowHTML: false
    };
    return (<NotificationsSystem className="my-custom-classname" />);
  }
}
```

### `config` property

This object allow you to configure behavior of `NotificationsSystem` component

| Property       | Type    | Default | Description |
| -------------- | ------- | ------- | ----------- |
| smallScreenMin | Number  | 768     | Minimal width for small screen (min-width). This value is used to determine when all notifications are rendered at the top of the screen what ever the position property of a notification object |

#### Example

``` js 
import React, {Component} from 'react';
import NotificationsSystem from 'react';

class AComponent extends Component {
  render() {
    const config = {
      smallScreenMin: 768
    };
    return (
      <NotificationsSystem config={config} />
    );
  }
}
```

### `containerClassName` properties

This object allow you to configure class names of `NotificationsContainer` component.
By editing this property, you can change style of notifications containers. 
Of course, you will have to write your own CSS. 

| Property    | Type     | Description |
| ----------- | -------- | ----------- |
| main        | String   | Applied on root of `NotificationContainer` component. |
| position    | Function | Applied on root of `NotificationContainer` component. Use to stylize component depending on its position. |

#### JSX structure of `NotificationsContainer` component

``` html
<div className={`${className.main} ${className.position(position)}`}>
  <!-- childrens (Notification) -->
</div>
```

#### Example

``` js
import React, {Component} from 'react';
import NotificationsSystem from 'react';

class AComponent extends Component {
  render() {
    // here is a complete example
    const containerClassName = {
      main: css['notifications-container'],
      position: function(position) {
        return css[`notifications-container--${position}`];
      }
    };
    return (<Notifications containerClassName={containerClassName}/>);
  }
}
```

### `defaultValues` property

This object allow you to configure default behavior for your notifications.

| Property     | Type    | Default | Description |
| ------------ | ------- | ------- | ----------- |
| status       | String  | null    | Status of the notification : info, success, warning, error |
| position     | String  | tr      | Position of the  notification : tl, tr, br, bl |
| dismissible  | Boolean | true    | Define if the notification is dismissible by clicking on it |
| dismissAfter | Number  | 5000    | Time before the notification disappear (ms). 0: infinite |
| allowHTML    | Boolean | False   | Allow you to insert HTML in the notification. Read [this](https://facebook.github.io/react/tips/dangerously-set-inner-html.html) before setting this value to true. |

#### Example

``` js 
import React, {Component} from 'react';
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
      <NotificationsSystem config={config} />
    );
  }
}
```

### `transition` properties

This object allow you to configure CSS animation of `Notification` component. 
We use React High-level API : [ReactCSSTransitionGroup](https://facebook.github.io/react/docs/animation.html#high-level-api-reactcsstransitiongroup) to animate notifications.
By editing this property, you can change the default transition. 
Of course, you have to write your own animation in CSS. 
I recommend you to use the [initial code](https://github.com/LouisBarranqueiro/reapop/blob/master/src/components/NotificationsContainer/styles.scss) as a base.

| Property     | Type    | Default | Description |
| ------------ | ------- | ------- | ----------- |
| enterTimeout | Number  | 400     | Duration of enter animation (ms) |
| leaveTimeout | Number  | 400     | Duration of leave animation (ms) |
| name         | Object  | Object  | Classes to trigger a CSS animation or transition |

#### Example

``` js
import React, {Component} from 'react';
import NotificationsSystem from 'react';

class AComponent extends Component {
  render() {
    const transition = {
      enterTimeout: 400,
      leaveTimeout: 400,
      name: {
        enter: 'enter',
        enterActive: 'enterActive',
        leave: 'leave',
        leaveActive: 'leaveActive'
      }
    };
    return (<Notifications transition={transition}/>);
  }
}
```

### `notificationClassName` properties

This object allow you to configure class names of `Notification` component.

| Property    | Type     | Description |
| ----------- | -------- | ----------- |
| main        | String   | Applied on root notification container. |
| meta        | String   | Applied on notification meta container. |
| title       | String   | Applied on notification title container. |
| message     | String   | Applied on notification message container. |
| icon        | String   | Applied on notification icon container. |
| status      | Function | Applied on root notification container. Use to stylize the notification depending on its status. |
| dismissible | String   | Applied on notification dismissible container. |
| buttons     | Function | Applied on root notification container to stylize the notification depending on number of buttons it has; and on notification buttons container. |
| button      | String   | Applied on notification button container. |
| buttonText  | String   | Applied on container of text of notification button. |

#### JSX structure of `Notification` component

``` html
<div class={`${className.main} ${className.status(status)} 
  ${className.buttons(buttons.length) ${(isDismissible ? className.dismissible : '')}`}>
  <i class="${className.icon}"></i>
  <div class="{className.meta}">
    <h4 class="{className.title}">Est at quibusdam nisi ex.</h4>
    <p class="{className.message}">Veritatis eum impedit molestiae aut.</p>
  </div>
  <div class={className.buttons()}>
    <button className={className.button}>
      <span className={className.buttonText}>
        <b>Yes</b>
      </span>
    </button>
    <button className={className.button}>
      <span className={className.buttonText}>
        <b>No</b>
      </span>
    </button>
  </div>
</div>
```

#### Example

``` js
import React, {Component} from 'react';
import NotificationsSystem from 'react';

class AComponent extends Component {
  render() {
    // here is a complete example
    const className = {
      main: css['notification'],
      metameta: css['notification-meta'],
      title: css['notification-title'],
      message: css['notification-message'],
      icon: `fa ${css['notification-icon']}`,
      status: (status) => {
        return css[`notification--${status}`];
      },
      dismissible: css['notification--dismissible'],
      // `fa` corresponds to font-awesome's class name
      buttons: (count) => {
        if (count === 0) {
          return '';
        }
        else if (count === 1) {
          return css['notification--buttons-1'];
        }
        else if (count === 2) {
          return css['notification--buttons-2'];
        }
        return css['notification-buttons'];
      },
      button: css['notification-button'],
      buttonText: css['notification-button-text']
    };
    return (<Notifications notificationClassName={notificationClassName}/>);
  }
}
```

## Add a notification

Adding notification is done with the `addNotification` (async action creator) function. It returns the notification object just added.

### Syntax

``` js
addNotification(notification);
```

### Parameters

| Parameter    | Type     | Description |
| ------------ | -------- | ----------- |
| notification | Object   | A [notification](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#notification-object-properties) object |

### Notification object properties
 
| Property     | Type             | Default | Description |
| ------------ | ---------------- | ------- | ----------- |
| title        | String           |         | Title of the notification |
| message      | String           |         | Message of the notification |
| status       | String or Number | default | Status of the notification : default, info, success, warning, error. You can also pass an HTTP status code like 200, or 403, it will be converted as an understandable status for the `Notification` component |
| position     | String           | tr      | Position of the notification on the screen |
| dismissible  | Boolean          | true    | Define if a notification is dismissible by clicking on it |
| dismissAfter | Number           | 5000    | Time before the notification disappear (ms). Paused when mouse is hovering the notification. 0: infinite. |
| buttons      | Array            |         | Array of [button](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#button-object-properties) objects. A notification can have 2 buttons maximum. |
| onAdd        | Function         |         | Function executed at component lifecycle : `componentDidMount` |
| onRemove     | Function         |         | Function executed at component lifecycle : `componentWillUnmount` |
| allowHTML    | Boolean          | false   | Allow HTML in message |

#### Button object properties
 
| Property     | Type     | Default | Description |
| ------------ | :------: | :-----: | ----------- |
| name         | String   |         | Title of the button |
| primary      | Boolean  | false   | true: Title in bold, false : title in normal |
| onClick      | Function |         | Function executed when user click on it |

### Example

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

## Update a notification

Updating a notification is done with the `updateNotification` (action) function.

### Syntax

``` js
updateNotification(notification);
```

### Parameters

| Parameter    | Type     | Description |
| ------------ | -------- | ----------- |
| notification | Object   | A [notification](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#notification-object-properties-1) object |

### Notification object properties
 
| Property     | Type             | Default | Description |
| ------------ | ---------------- | ------- | ----------- |
| title        | String           |         | Title of the notification |
| message      | String           |         | Message of the notification |
| status       | String or Number | default | Status of the notification : default, info, success, warning, error. You can also pass an HTTP status code like 200, or 403, it will be converted as an understandable status for the `Notification` component |
| position     | String           | tr      | Position of the notification on the screen |
| dismissible  | Boolean          | true    | Define if a notification is dismissible by clicking on it |
| dismissAfter | Number           | 5000    | Time before the notification disappear (ms). Paused when mouse is hovering the notification. 0: infinite. |
| buttons      | Array            |         | Array of [button](https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md#button-object-properties-1) object. A notification can have 2 buttons maximum. |
| onAdd        | Function         |         | Function executed at component lifecycle : `componentDidMount` |
| onRemove     | Function         |         | Function executed at component lifecycle : `componentWillUnmount` |
| allowHTML    | Boolean          | false   | Allow HTML in message |

#### Button object properties
 
| Property     | Type     | Default | Description |
| ------------ | -------- | ------- | ----------- |
| name         | String   |         | Title of the button |
| primary      | Boolean  | false   | true: Title in bold, false : title in normal |
| onClick      | Function |         | Function executed when user click on it |


### Example

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


## Remove a notification

Removing a notification is done with `removeNotification` (action) function.

### Syntax

``` js
removeNotification(id);
```

### Parameters

| Parameter   | Type   | Description |
| ----------- | ------ | ----------- |
| id          | Number | id of the notification |

