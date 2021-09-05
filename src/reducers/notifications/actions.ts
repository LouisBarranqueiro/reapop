import {NotificationAction} from './constants'
import {NewNotification, Notification, Status} from './types'
import {isObject} from '../../utils'
import {prepareNotification} from '../../services/notifications'

export type UpsertNotificationAction = {
    type: NotificationAction.UpsertNotification
    payload: Notification
}

export type DismissNotificationAction = {
    type: NotificationAction.DismissNotification
    payload: string
}

export type DismissNotificationsAction = {
    type: NotificationAction.DismissNotifications
}

function upsertNotification(notification: Partial<Notification>): UpsertNotificationAction
function upsertNotification(message: string, options?: Partial<Notification>): UpsertNotificationAction
function upsertNotification(message: string, status: Status, options?: Partial<Notification>): UpsertNotificationAction
function upsertNotification(
    ...args: [Partial<Notification> | string, (Partial<Notification> | Status)?, Partial<Notification>?]
): UpsertNotificationAction {
    const lastArg = args[args.length - 1]
    let notification: NewNotification = {}

    if (typeof args[0] === 'string') {
        notification.message = args[0] as string
    }
    if (typeof args[1] === 'string') {
        notification.status = args[1] as Status
    }
    if (isObject(lastArg)) {
        notification = {...notification, ...(lastArg as NewNotification)}
    }

    return {
        type: NotificationAction.UpsertNotification,
        payload: prepareNotification(notification as NewNotification | Notification),
    }
}

export const dismissNotification = (notificationId: string): DismissNotificationAction => ({
    type: NotificationAction.DismissNotification,
    payload: notificationId,
})

export const dismissNotifications = (): DismissNotificationsAction => ({
    type: NotificationAction.DismissNotifications,
})

export const notify = upsertNotification

export type NotificationActions = UpsertNotificationAction | DismissNotificationAction | DismissNotificationsAction
