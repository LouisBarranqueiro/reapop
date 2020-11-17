import {CONFIG, NotificationConfig, STATUSES} from '../constants'
import {NewNotification, Notification} from '../reducers/notifications/types'
import {clone} from '../utils'

export const setUpNotifications = (props: Partial<NotificationConfig>) => {
    for (const key in props) {
        const propName = key as keyof NotificationConfig
        CONFIG[propName] = props[propName] as any
    }
}

export const resetNotificationsConfig = () => {
    CONFIG.defaultProps = {}
    CONFIG.customizeNotification = null
    CONFIG.generateId = null
}

export const generateId = () => Math.random().toString(36).slice(2, 7)

export const prepareNotification = (notification: NewNotification): Notification => {
    const notif = clone(notification)
    const defaultProps: Partial<Notification> = {
        ...CONFIG.defaultProps,
        status: STATUSES.none,
        buttons: [],
    }

    if (notif.id === undefined) {
        notif.id = CONFIG.generateId ? CONFIG.generateId(notification) : generateId()
    }

    Object.entries(defaultProps).map(([prop, defaultValue]) => {
        if (notif[prop] === undefined) {
            notif[prop] = defaultValue
        }
    })

    if (typeof CONFIG.customizeNotification === 'function') {
        CONFIG.customizeNotification(notif)
    }
    return notif as Notification
}
