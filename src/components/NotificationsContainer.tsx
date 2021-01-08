import React from 'react'
import {Notification as NotificationType, Position} from '../reducers/notifications/types'
import {classnames, POSITIONS} from '../constants'
import {useTheme} from '../hooks/useTheme'
import NotificationContainer from './NotificationContainer'
import {DismissNotification} from './NotificationsSystem'
import {TransitionGroup} from 'react-transition-group'

type Props = {
    notifications: NotificationType[]
    position: Position
    dismissNotification: DismissNotification
    singleContainer: boolean
}

const NotificationsContainer = (props: Props) => {
    const {position, dismissNotification, singleContainer} = props
    const theme = useTheme()
    const styles = theme ? theme.container(position, singleContainer) : {}
    const classname = classnames.container(position, singleContainer)
    let {notifications} = props

    // when notifications are displayed at the bottom,
    // we display notifications from bottom to top
    if (([POSITIONS.bottomRight, POSITIONS.bottomCenter, POSITIONS.bottomLeft] as string[]).includes(position)) {
        notifications = notifications.slice().reverse()
    }

    return (
        <div style={styles} className={classname.join(' ')}>
            <TransitionGroup component={null}>
                {notifications.map((notification) => (
                    <NotificationContainer
                        key={notification.id}
                        notification={notification}
                        dismissNotification={dismissNotification}
                    />
                ))}
            </TransitionGroup>
        </div>
    )
}

export default NotificationsContainer
