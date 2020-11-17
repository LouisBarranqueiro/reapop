import {NewNotification, Notification, Position} from './reducers/notifications/types'

export type NotificationConfig = {
    defaultProps: Partial<Notification>
    customizeNotification: ((notification: NewNotification) => void) | null
    generateId: ((notification: NewNotification) => string) | null
}

export const CONFIG: NotificationConfig = {
    defaultProps: {},
    customizeNotification: null,
    generateId: null,
}

export const STATUSES: {
    none: 'none'
    info: 'info'
    success: 'success'
    loading: 'loading'
    warning: 'warning'
    error: 'error'
} = Object.freeze({
    none: 'none',
    info: 'info',
    success: 'success',
    loading: 'loading',
    warning: 'warning',
    error: 'error',
})

export const POSITIONS: {
    topCenter: 'top-center'
    topLeft: 'top-left'
    topRight: 'top-right'
    bottomCenter: 'bottom-center'
    bottomLeft: 'bottom-left'
    bottomRight: 'bottom-right'
} = Object.freeze({
    topCenter: 'top-center',
    topLeft: 'top-left',
    topRight: 'top-right',
    bottomCenter: 'bottom-center',
    bottomLeft: 'bottom-left',
    bottomRight: 'bottom-right',
})

const classnamePrefix = 'reapop__'

export const classnames = {
    container: (position: Position, singleContainer: boolean) => {
        const classes = [`${classnamePrefix}container`, `${classnamePrefix}container--${position}`]
        if (singleContainer) {
            classes.push(`${classnamePrefix}container--single`)
        }
        return classes
    },
    notification: (notification: Notification) => [
        `${classnamePrefix}notification`,
        `${classnamePrefix}notification--${notification.status}`,
        `${classnamePrefix}notification--buttons-${notification.buttons.length}`,
        notification.dismissible ? `${classnamePrefix}notification--dismissible` : '',
    ],
    notificationIcon: `${classnamePrefix}notification-icon`,
    notificationImageContainer: `${classnamePrefix}notification-image-container`,
    notificationImage: `${classnamePrefix}notification-image`,
    notificationDismissIcon: `${classnamePrefix}notification-dismiss-icon`,
    notificationMeta: `${classnamePrefix}notification-meta`,
    notificationTitle: `${classnamePrefix}notification-title`,
    notificationMessage: `${classnamePrefix}notification-message`,
    notificationButtons: `${classnamePrefix}notification-buttons`,
    notificationButton: `${classnamePrefix}notification-button`,
    notificationButtonText: `${classnamePrefix}notification-button-text`,
}
