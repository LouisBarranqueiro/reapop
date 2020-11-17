import NotificationsSystem from './components/NotificationsSystem'
import {NotificationsProvider} from './components/NotificationsProvider'
import {STATUSES, POSITIONS} from './constants'
import {notify, dismissNotifications, dismissNotification} from './reducers/notifications/actions'
import FadeTransition from './components/FadeTransition'
import SlideTransition from './components/SlideTransition'
import GrowTransition from './components/GrowTransition'
import reducer from './reducers/notifications/reducer'
import {useNotifications} from './hooks/useNotifications'
import baseTheme from './themes/base'
import atalhoTheme from './themes/atalho'
import wyboTheme from './themes/wybo'
import bootstrapTheme from './themes/bootstrap'

import {Theme} from './themes/types'
import {setUpNotifications} from './services/notifications'

export {
    // themes
    baseTheme,
    atalhoTheme,
    wyboTheme,
    bootstrapTheme,
    // utils
    setUpNotifications,
    useNotifications,
    // constants
    STATUSES,
    POSITIONS,
    //reducers
    reducer,
    // actions
    notify,
    dismissNotifications,
    dismissNotification,
    // components
    FadeTransition,
    SlideTransition,
    GrowTransition,
    NotificationsProvider,
}

// types
export * from './reducers/notifications/types'
export type {Theme}

export default NotificationsSystem
