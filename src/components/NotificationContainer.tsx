import React, {ReactNode, useEffect, useState} from 'react'
import {Timer} from '../utils'
import {Notification as NotificationType} from '../reducers/notifications/types'
import {DismissNotification} from './NotificationsSystem'

type Props = {
    notification: NotificationType
    dismissNotification: DismissNotification
    children?: ReactNode
}

const NotificationContainer = (props: Props) => {
    const {notification, dismissNotification} = props
    const {dismissAfter, onAdd, onDismiss} = notification
    const [timer, setTimer] = useState<Timer | null>(null)

    useEffect(() => {
        if (onAdd) {
            onAdd()
        }
        return () => {
            if (onDismiss) {
                onDismiss()
            }
        }
    }, [])

    useEffect(() => {
        if (!timer && dismissAfter && dismissAfter > 0) {
            const timer = new Timer(dismissAfter, () => dismissNotification(notification.id))
            timer.resume()
            setTimer(timer)
        } else if (timer && !dismissAfter) {
            timer.pause()
            setTimer(null)
        }
    }, [dismissAfter])

    return (
        <div
            data-testid="timed-notification"
            onMouseEnter={timer ? () => timer.pause() : undefined}
            onMouseLeave={timer ? () => timer.resume() : undefined}
        >
            {props.children}
        </div>
    )
}

export default NotificationContainer
