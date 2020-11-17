import {createContext} from 'react'
import {NewNotification, Notification} from '../reducers/notifications/types'

type NotificationsContext = {
    notifications: Notification[]
    notify: (notification: NewNotification) => void
    dismissNotification: (id: string) => void
    dismissNotifications: () => void
}

export const ReapopNotificationsContext = createContext<NotificationsContext>(undefined!)
