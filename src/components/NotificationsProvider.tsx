import React from 'react'
import {ReactNode, useReducer, useCallback} from 'react'
import notificationsReducer from '../reducers/notifications/reducer'
import {dismissNotification, dismissNotifications, notify} from '../reducers/notifications/actions'
import {ReapopNotificationsContext} from '../contexts/reapopNotificationsContext'

type Props = {
    children: ReactNode
}

export const NotificationsProvider = (props: Props) => {
    const [notifications, dispatch] = useReducer(notificationsReducer(), [])
    const context = {
        notifications,
        notify: useCallback(
            (...args: [any, any?, any?]) => {
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
