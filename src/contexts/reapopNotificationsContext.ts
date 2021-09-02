import {createContext} from 'react'
import {Notification, Status} from '../reducers/notifications/types'

declare function upsertNotification(notification: Partial<Notification>): Notification
declare function upsertNotification(message: string, options?: Partial<Notification>): Notification
declare function upsertNotification(message: string, status: Status, options?: Partial<Notification>): Notification
declare function upsertNotification(
    ...args: [Partial<Notification> | string, (Partial<Notification> | Status)?, Partial<Notification>?]
): Notification

export type NotificationsContext = {
    notifications: Notification[]
    notify: typeof upsertNotification
    dismissNotification: (id: string) => void
    dismissNotifications: () => void
}

export const ReapopNotificationsContext = createContext<NotificationsContext>(undefined!)
