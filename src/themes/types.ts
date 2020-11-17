import {CSSProperties} from 'react'
import {Notification, Position} from '../reducers/notifications/types'

export type NotificationButtonState = {isHovered: boolean; isActive: boolean}

export type Theme = {
    container: (position: Position, singleContainer: boolean) => CSSProperties
    notificationDismissIcon: (notification: Notification) => CSSProperties
    notification: (notification: Notification) => CSSProperties
    notificationIcon: (notification: Notification) => CSSProperties
    notificationImageContainer: (notification: Notification) => CSSProperties
    notificationImage: (notification: Notification) => CSSProperties
    notificationMeta: (notification: Notification) => CSSProperties
    notificationTitle: (notification: Notification) => CSSProperties
    notificationMessage: (notification: Notification) => CSSProperties
    notificationButtons: (notification: Notification) => CSSProperties
    notificationButton: (notification: Notification, position: number, state: NotificationButtonState) => CSSProperties
    notificationButtonText: (
        notification: Notification,
        position: number,
        state: NotificationButtonState
    ) => CSSProperties
}
