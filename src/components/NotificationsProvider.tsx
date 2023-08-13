import React from 'react'
import {ReactNode, useReducer, useCallback} from 'react'
import notificationsReducer from '../reducers/notifications/reducer'
import {dismissNotification, dismissNotifications, notify} from '../reducers/notifications/actions'
import {ReapopNotificationsContext} from '../contexts/reapopNotificationsContext'
import {Notification} from '../reducers/notifications/types'

type Props = {
    children: ReactNode
}

export const NotificationsProvider = (props: Props) => {
    const [notifications, dispatch] = useReducer(notificationsReducer(), [])
    const context = {
        notifications,
        notify: useCallback(
            // cannot resolve parameters of overloaded `notify` function
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (...args: [any, any?, any?]): Notification => {
                const action = notify(...args)
                dispatch(action)
                return action.payload
            },
            [dispatch]
        ),
        dismissNotification: useCallback((id: string) => dispatch(dismissNotification(id)), [dispatch]),
        dismissNotifications: useCallback(() => dispatch(dismissNotifications()), [dispatch]),
    }

    return <ReapopNotificationsContext.Provider value={context}>{props.children}</ReapopNotificationsContext.Provider>
}
