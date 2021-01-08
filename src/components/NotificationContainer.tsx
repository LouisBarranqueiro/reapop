import React, {useEffect, useRef, useState} from 'react'
import {Timer} from '../utils'
import {Notification as NotificationType} from '../reducers/notifications/types'
import {DismissNotification} from './NotificationsSystem'
import {useComponentsContext} from '../hooks/useComponentsContext'
import SlideTransition from './SlideTransition'
import {useTheme} from '../hooks/useTheme'
import NotificationComponent from './Notification'
import {TransitionProps} from 'react-transition-group/Transition'

type Props = {
    notification: NotificationType
    dismissNotification: DismissNotification
} & Omit<TransitionProps, 'addEndListener'>

const NotificationContainer = (props: Props) => {
    const {notification, dismissNotification, ...transitionProps} = props
    const {dismissAfter, onAdd, onDismiss} = notification
    const components = useComponentsContext()
    const theme = useTheme()
    const Transition = components.Transition || SlideTransition
    const Notification = components.Notification || NotificationComponent
    const [timer, setTimer] = useState<Timer | null>(null)
    const nodeRef = useRef(null)

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
        <Transition notification={notification} nodeRef={nodeRef} {...transitionProps}>
            <div
                ref={nodeRef}
                data-testid="timed-notification"
                onMouseEnter={timer ? () => timer.pause() : undefined}
                onMouseLeave={timer ? () => timer.resume() : undefined}
            >
                <Notification
                    notification={notification}
                    theme={theme}
                    dismissNotification={() => dismissNotification(notification.id)}
                    components={components}
                />
            </div>
        </Transition>
    )
}

export default NotificationContainer
