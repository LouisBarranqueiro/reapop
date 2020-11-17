import React from 'react'
import {ReactNode, useReducer} from 'react'
import notificationsReducer from '../reducers/notifications/reducer'
import {NewNotification} from '../reducers/notifications/types'
import {dismissNotification, dismissNotifications, notify} from '../reducers/notifications/actions'
import {ReapopNotificationsContext} from '../contexts/reapopNotificationsContext'

type Props = {
    children: ReactNode
}

export const NotificationsProvider = (props: Props) => {
    const [notifications, dispatch] = useReducer(notificationsReducer(), [])
    const context = {
        notifications,
        notify: (notification: NewNotification) => {
            const action = notify(notification)
            dispatch(action)
            return action.payload
        },
        dismissNotification: (id: string) => dispatch(dismissNotification(id)),
        dismissNotifications: () => dispatch(dismissNotifications()),
    }

    return <ReapopNotificationsContext.Provider value={context}>{props.children}</ReapopNotificationsContext.Provider>
}
