import React from 'react'
import {TransitionGroup} from 'react-transition-group'
import {Notification as NotificationType, Position} from '../reducers/notifications/types'
import {classnames, POSITIONS} from '../constants'
import {useComponentsContext} from '../hooks/useComponentsContext'
import {useTheme} from '../hooks/useTheme'
import SlideTransition from './SlideTransition'
import NotificationContainer from './NotificationContainer'
import NotificationComponent from './Notification'
import {DismissNotification} from './NotificationsSystem'

type Props = {
    notifications: NotificationType[]
    position: Position
    dismissNotification: DismissNotification
    singleContainer: boolean
}

const NotificationsContainer = (props: Props) => {
    const {position, dismissNotification, singleContainer} = props
    const components = useComponentsContext()
    const theme = useTheme()
    const styles = theme ? theme.container(position, singleContainer) : {}
    const classname = classnames.container(position, singleContainer)
    const Transition = components.Transition || SlideTransition
    const Notification = components.Notification || NotificationComponent
    let {notifications} = props

    // when notifications are displayed at the bottom,
    // we display notifications from bottom to top
    if (([POSITIONS.bottomRight, POSITIONS.bottomCenter, POSITIONS.bottomLeft] as string[]).includes(position)) {
        notifications = notifications.slice().reverse()
    }

    return (
        <div style={styles} className={classname.join(' ')}>
            <TransitionGroup>
                {notifications.map((notification) => (
                    <Transition key={notification.id} notification={notification}>
                        <NotificationContainer
                            key={notification.id}
                            notification={notification}
                            dismissNotification={dismissNotification}
                        >
                            <Notification
                                notification={notification}
                                dismissNotification={dismissNotification}
                                theme={theme}
                                components={components}
                            />
                        </NotificationContainer>
                    </Transition>
                ))}
            </TransitionGroup>
        </div>
    )
}

export default NotificationsContainer
