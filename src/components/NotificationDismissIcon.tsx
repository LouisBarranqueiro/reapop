import React, {SyntheticEvent} from 'react'
import {Notification} from '../reducers/notifications/types'
import {Theme} from '../themes/types'
import {classnames} from '../constants'

type Props = {
    notification: Notification
    theme?: Theme
    dismissNotification: (event: SyntheticEvent) => void
}

const NotificationDismissIcon = (props: Props) => {
    const {theme, notification, dismissNotification} = props
    const styles = theme ? theme.notificationDismissIcon(notification) : {}
    return (
        <svg
            className={classnames.notificationDismissIcon}
            style={styles}
            onClick={dismissNotification}
            viewBox="4 4 8 8"
            fill="currentColor"
            data-testid="dismiss-icon"
        >
            <path
                fillRule="evenodd"
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            />
        </svg>
    )
}

export default NotificationDismissIcon
