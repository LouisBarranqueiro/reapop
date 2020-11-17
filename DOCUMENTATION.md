# Documentation

## Summary

* [API reference](#api-reference)
    * [Entities](#entities)
    * [Components](#components)
    * [Actions](#actions)
    * [Hooks](#hooks)
    * [Helpers](#helpers)
    * [Themes](#themes)
* [Guides](#guides)
    * [Set default notifications attributes](#set-default-notifications-attributes)
    * [Customize the transition of notifications](#customize-the-transition-of-notifications)
    * [Create a custom theme with inline CSS)](#create-a-custom-theme-with-inline-css)
    * [Create a custom theme with a CSS file](#create-a-custom-theme-with-a-css-file)
    * [Mock notification IDs for testing](#mock-notification-ids-for-testing)

## API reference

### Entities

#### Notification

| Property           | Type                  | Default   | Description |
| ------------------ | --------------------- | --------- | ----------- |
| id                 | string                |           | ID of the notification. If not provided during creation, it will be automatically generated.
| title              | string or undefined   |           | Title of the notification |
| message            | string or undefined   |           | Message of the notification |
| status             | string                | `none`    | Status of the notification : `none`, `info`, `loading`, `success`, `warning`, `error`. These values are exposed via `STATUSES` variable.
| position           | string                |           | Position of the notification : `top-left`, `top-center`, `top-right`, `bottom-right`, `bottom-center`, `bottom-left`.  These values are exposed via `POSITIONS` variable.
| image              | string or undefined   |           | URL of an image to display
| dismissible        | boolean or undefined  |           | Whether the notification is dismissible by clicking on it |
| dismissAfter       | number or undefined   |           | Time before the notification disappear (in ms). Paused when mouse is hovering the notification. 0: infinite. |
| showDismissButton  | boolean or undefined  |           | Display a dimiss button if the notification is dismissible |
| buttons            | NotificationButton[]  | `[]`      | Array of [NotificationButton](#NotificationButton) entities. A notification can have maximum 2 buttons. |
| onAdd              | Function or undefined |           | Function executed when the notification is displayed |
| onDismiss          | Function or undefined |           | Function executed right before the notification is dismissed |
| allowHTML          | boolean or undefined  |           | Allow HTML in the title and the message of the notification |


#### NotificationButton

| Property     | Type                 | Description |
| ------------ | ------------------   | ----------- |
| name         | string               | Name of the button |
| primary      | boolean | undefined  | `true`: the name of the button will be in bold.
| onClick      | Function | undefined | Function executed when the user clicks on it |


### Actions

#### notify

Create or update a notification.

##### Syntax

``` ts
notify(notification: Partial<Notification>)
notify(message: string, options?: Partial<Notification>)
notify(message: string, status: Status, options?: Partial<Notification>)
```

##### Example

``` js
// With React & redux
const {payload: notification} = dispatch(
    notify('Uploading your file...', 'loading', {
      dismissible: false,
    })
)

// simulate file upload
setTimeout(() => {
    notification.status = 'success'
    notification.message = 'Your file has been uploaded'
    notification.dismissible = true
    notification.dismissAfter = 5000
    dispatch(notify(notification))
}, 10000)

// With React alone
const {notify} = useNotifications()
const {payload: notification} = notify('Uploading your file...', 'loading', {
  dismissible: false,
})

// simulate file upload
setTimeout(() => {
    notification.status = 'success'
    notification.message = 'Your file has been uploaded'
    notification.dismissible = true
    notification.dismissAfter = 5000
    notify(notification)
}, 10000)
```

#### dismissNotification

Dismiss a notification.

##### Syntax

``` js
dismissNotification(id: string)
```


#### dismissNotifications

Dismiss all notifications.

##### Syntax

``` js
dismissNotifications()
```


### Hooks

**IMPORTANT**: Hooks are just meant to be used when you are not using another state manager for your application. You also need react >= 16.8.0.
 
#### useNotifications

##### Syntax

``` js
const {notifications, notify, dismissNotification, dismissNotifications} = useNotifications()
```

##### Example

``` js
import React from 'react'
import {useNotifications} from 'reapop'

const AComponent = () => {
    // 1. Retrieve the action to create/update a notification.
    const {notify} = useNotifications()
    
    useEffect(() => {
        // 2. Create a notification.
        notify('Welcome to the documentation', 'info')
    }, [])

    return (
        ...
    )
}
```

### Components

#### NotificationSystem

Components responsible for displaying notifications.

| Property              | Type           | Default | Description |
| --------------------- | -------------- | ------- | ----------- |
| notifications         | Notification[] |         | Notifications to be displayed |
| dismissNotification   | Function       |         | Function responsible for dismissing a notification.
| smallScreenBreakpoint | Function       | `768`   | Maximum window width under which all notifications will be positioned at top center of the screen no matter the `position` property of the notifications.
| components            | Object         | `{}`    | Custom components used to replace builtIn components. Customizable components: `Transition`, `NotificationIcon` and `Notification`
| theme                 | Theme          |         | Theme used to display notifications. Available themes: `atalhoTheme`, `wyboTheme`, `bootstrapTheme`. You can also create your custom theme, or customize notifications with CSS files.


### Helpers

#### setUpNotifications

Helper function used to:
- define default properties for notifications
- define a custom function used to modify notifications
- define the function used to generate notification IDs

##### Syntax

``` ts
type NotificationConfig = {
    defaultProps: Partial<Notification>
    customizeNotification: ((notification: NewNotification) => void) | null
    generateId: ((notification: NewNotification) => string) | null
}

setUpNotifications(NotificationConfig)
```

##### Example

``` js
setUpNotifications({
    defaultProps: {
        position: 'top-right',
        dismissible: true
    },
    generateId: () => new Date().getTime().toString() 
})
```

#### resetNotificationsConfig

Reset notifications config to its default values.

##### Example

``` js
resetNotificationsConfig()
```

### Themes

There are 3 themes (as inline CSS) included in Reapop: atalho, wybo, and bootstrap.

``` jsx
import {atalhoTheme, wyboTheme, bootstrapTheme} from 'reapop'

const ATopLevelComponent = () => {
    return (
        <div>
            <NotificationsSystem
                theme={atalhoTheme}
                {...otherProps}
            />
        </div>
    )
}
```

## Guides

### Set default notifications attributes

``` js
import {setUpNotifications} from 'reapop'

// run this function when your application starts before creating any notifications
setUpNotifications({
    defaultProps: {
        position: 'top-right',
        dismissible: true
    } 
})
```

### Create a custom theme with inline CSS

The best is to start from an existing theme, so you can copy one, remove all CSS properties and define yours.
You can also import and re-use the properties of the `baseTheme` to get started. 
This base theme just defines the CSS of the notification containers (their positions on the screen).

``` ts
import {baseTheme, Theme} from 'reapop'

const customTheme: Theme = {
    ...baseTheme,
    notification: (notification: Notification) => ({
        // define custom CSS properties of the notification container.
    }),
    notificationDismissIcon: (notification: Notification) {
        // define custom CSS properties of the dismiss icon element.
    }),
    // etc...
}
```

### Create a custom theme with a CSS file

You can create your own theme in a separate CSS file, and import it in your application. 
Here is a template containing all the classnames:
``` css
.reapop__container {}
.reapop__container--single {}
.reapop__container--top-left {}
.reapop__container--top-center {}
.reapop__container--top-right {}
.reapop__container--bottom-right {}
.reapop__container--bottom-center {}
.reapop__container--bottom-left {}

.reapop__notification
.reapop__notification--none
.reapop__notification--info
.reapop__notification--loading
.reapop__notification--success
.reapop__notification--warning
.reapop__notification--error
.reapop__notification--buttons-0
.reapop__notification--buttons-1
.reapop__notification--buttons-2
.reapop__notification--dismissible

.reapop__notification-icon {}
.reapop__notification-image-container {}
.reapop__notification-image {}
.reapop__notification-dismiss-icon {}
.reapop__notification-meta {}
.reapop__notification-title {}
.reapop__notification-message {}
.reapop__notification-buttons {}
.reapop__notification-button {}
.reapop__notification-button-text {}
``` 

### Customize the transition of notifications

There are 3 builtin transitions: fade, grow, slide. The default transition is `slide`.

### Example
``` jsx
// 1. Import the transition you want to use.
import NotificationsSystem, {GrowTransition} from 'reapop'
 
const ATopLevelComponent = () => {
    return (
        <div>
            <NotificationsSystem
                // 2. Replace the default `Transition` component.
                components={{Transition: GrowTransition}}
                {...otherProps}
            />
        </div>
    )
}
```

### Mock notification IDs for testing

When testing your components or actions, you may want to snapshot your store, or some action payloads. 
In these scenarios, you might want to mock the function responsible for generating notification IDs to return a static ID.

#### Example

``` js
import {setUpNotifications} from 'reapop'

// Run this function in the setup file of your tests. 
// It won't overide the rest of the config (`defaultProps`, `customizeNotification`).
setUpNotifications({
    generateId: () => 'mocked-id' 
})
```
