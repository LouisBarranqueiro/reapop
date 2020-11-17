import React from 'react'

import {Notification as NotificationType} from '../reducers/notifications/types'
import {classnames} from '../constants'
import {ComponentContextType} from '../contexts/componentsContext'
import {Theme} from '..'

import {DismissNotification} from './NotificationsSystem'
import NotificationIcon from './NotificationIcon'
import NotificationDismissIcon from './NotificationDismissIcon'
import NotificationButton from './NotificationButton'
import NotificationImage from './NotificationImage'

type Props = {
    notification: NotificationType
    dismissNotification: DismissNotification
    components: ComponentContextType
    theme?: Theme
}

const Notification = (props: Props) => {
    const {notification, dismissNotification: dismiss, theme, components} = props
    const {id, title, message, dismissible, showDismissButton, buttons, allowHTML, image} = notification
    const wrapperClassname = classnames.notification(notification)
    const wrapperStyles = theme ? theme.notification(notification) : {}
    const metaStyles = theme ? theme.notificationMeta(notification) : {}
    const titleStyles = theme ? theme.notificationTitle(notification) : {}
    const messageStyles = theme ? theme.notificationMessage(notification) : {}
    const Icon = components.NotificationIcon || NotificationIcon
    const dismissNotification = () => dismiss(id)

    return (
        <div
            data-testid="notification"
            role="alert"
            style={wrapperStyles}
            className={wrapperClassname.join(' ')}
            onClick={dismissible && !showDismissButton ? dismissNotification : undefined}
        >
            <Icon theme={theme} notification={notification} />
            {image && <NotificationImage notification={notification} />}
            <div style={metaStyles} className={classnames.notificationMeta}>
                {title &&
                    (allowHTML ? (
                        <h4
                            style={titleStyles}
                            className={classnames.notificationTitle}
                            dangerouslySetInnerHTML={{__html: title}}
                        />
                    ) : (
                        <h4 style={titleStyles} className={classnames.notificationTitle}>
                            {title}
                        </h4>
                    ))}
                {message &&
                    (allowHTML ? (
                        <p
                            style={messageStyles}
                            className={classnames.notificationMessage}
                            dangerouslySetInnerHTML={{__html: message}}
                        />
                    ) : (
                        <p style={messageStyles} className={classnames.notificationMessage}>
                            {message}
                        </p>
                    ))}
            </div>
            {dismissible && showDismissButton && (
                <NotificationDismissIcon
                    notification={notification}
                    theme={theme}
                    dismissNotification={dismissNotification}
                />
            )}
            {buttons.length ? (
                <div onClick={dismissNotification} className={classnames.notificationButtons}>
                    {buttons.map((button, index) => (
                        <NotificationButton
                            key={button.name}
                            position={index}
                            button={button}
                            notification={notification}
                            theme={theme}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    )
}

export default Notification
