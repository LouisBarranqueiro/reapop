# Reapop
[![npm version](https://img.shields.io/npm/v/reapop.svg?style=flat-square)](https://www.npmjs.com/package/reapop) [![npm download/month](https://img.shields.io/npm/dm/reapop.svg?style=flat-square)](https://www.npmjs.com/package/reapop) [![coveralls status](https://img.shields.io/codecov/c/gh/LouisBarranqueiro/reapop?style=flat-square&token=U4UGNWVI0Q)](https://codecov.io/gh/LouisBarranqueiro/reapop)

A simple and customizable React notifications system

## Summary

* [Demo](#demo)
* [Installation](#installation)
* [Usage](#usage)
    * [With React & Redux](#with-react-and-redux)
    * [With React alone](#with-react-alone-react--1680)
* [Documentation](#documentation)
* [License](#license)

## Demo

Check out the [demo](https://louisbarranqueiro.github.io/reapop/).

## Installation

```
npm install reapop --save
```

## Usage

### With React and Redux

1. Add the notifications reducer to your Redux store.

``` js
import {combineReducers, createStore} from 'redux'
import {reducer as notificationsReducer} from 'reapop'

const rootReducer = combineReducers({
    notifications: notificationsReducer(),
    // ... your other reducers
})
const store = createStore(rootReducer)
```

2. Add the `NotificationsSystem` component to your app. Place this component at the root of your application to avoid position conflicts.

``` jsx
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import NotificationsSystem, {atalhoTheme, dismissNotification} from 'reapop'

const ATopLevelComponent = () => {
    const dispatch = useDispatch();
    // 1. Retrieve the notifications to display.
    const notifications = useSelector((state) => state.notifications)
    
    return (
        <div>
            <NotificationsSystem
                // 2. Pass the notifications you want Reapop to display.
                notifications={notifications}
                // 3. Pass the function used to dismiss a notification.
                dismissNotification={(id) => dispatch(dismissNotification(id))}
                // 4. Pass a builtIn theme or a custom theme.
                theme={atalhoTheme}
            />
        </div>
    )
}
```

3. Set default notifications attributes

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

4. Upsert or dismiss notification from any React components.

``` jsx
import React from 'react'
import {useDispatch} from 'react-redux'
// 1. Retrieve the action to create/update a notification, or any other actions.
import {notify} from 'reapop'

const AComponent = () => {
    // 2. Retrieve the function to dispatch an action.
    const dispatch = useDispatch() 
    useEffect(() => {
        // 3. Create a notification.
        dispatch(notify('Welcome to the documentation', 'info'))
    }, [])

    return (
        ...
    )
}
```

5. Upsert or dismiss notification from Redux actions.

``` js
// 1. Retrieve the action to create/update a notification.
import {notify} from 'reapop'

const sendResetPasswordLink = () => (dispatch) => {
    axios.post('https://api.example.com/users/ask-reset-password')
        // 2. Create a notification.
        .then((resp) => dispatch(notify(resp.data.detail, 'success'))
        .catch((resp) => dispatch(notify(resp.data.detail, 'error'))
    }
}
```

### With React alone

1 - Add the `NotificationsProvider` at the root of your application. 
It is important that this component wraps all the components 
where you want to access the notifications and the actions to manipule notifications.

``` jsx
import React from 'react'
import {NotificationsProvider} from 'reapop'

const ARootComponent = () => {
    return (
        <NotificationsProvider>
            // ... components
        </NotificationsProvider>
    )
}
```


2. Add the `NotificationsSystem` component to your app. Place this component at the root of your application to avoid position conflicts.

``` jsx
import React from 'react'
import NotificationsSystem, {atalhoTheme, useNotifications} from 'reapop'

const ATopLevelComponent = () => {
    // 1. Retrieve the notifications to display, and the function used to dismiss a notification.
    const {notifications, dismissNotification} = useNotifications()
    return (
        <div>
            <NotificationsSystem
                // 2. Pass the notifications you want Reapop to display.
                notifications={notifications}
                // 3. Pass the function used to dismiss a notification.
                dismissNotification={(id) => dismissNotification(id)}
                // 4. Pass a builtIn theme or a custom theme.
                theme={atalhoTheme}
            />
        </div>
    )
}
```

3. Set default notifications attributes

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

4. Upsert or dismiss notification from any React components.

``` jsx
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

## Documentation

Read the [documentation](https://github.com/LouisBarranqueiro/reapop/blob/master/DOCUMENTATION.md) to learn more and see what you can with it.

## License

Reapop is under [MIT License](https://github.com/LouisBarranqueiro/reapop/blob/master/LICENSE)
