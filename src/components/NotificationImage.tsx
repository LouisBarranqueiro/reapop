import React from 'react'
import {Notification} from '..'
import {classnames} from '../constants'
import {useTheme} from '../hooks/useTheme'

type Props = {
    notification: Notification
}

const NotificationImage = (props: Props) => {
    const {notification} = props
    const theme = useTheme()
    const containerStyles = theme ? theme.notificationImageContainer(notification) : {}
    const imageStyles = theme ? theme.notificationImage(notification) : {}

    return (
        <div className={classnames.notificationImageContainer} style={containerStyles}>
            <span
                className={classnames.notificationImage}
                style={{
                    ...imageStyles,
                    ...{backgroundImage: `url(${notification.image as string})`},
                }}
            />
        </div>
    )
}

export default NotificationImage
