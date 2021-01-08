import React, {useState} from 'react'
import {Notification, NotificationButton as ButtonType} from '../reducers/notifications/types'
import {Theme} from '../themes/types'
import {classnames} from '../constants'
import {noop} from '../utils'

type Props = {
    button: ButtonType
    position: number
    notification: Notification
    theme?: Theme
}

export const NotificationButton = (props: Props) => {
    const {notification, theme, position, button} = props
    const [isHovered, setIsHovered] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const state = {isHovered, isActive}
    const buttonStyles = theme ? theme.notificationButton(notification, position, state) : {}
    const buttonTextStyles = theme ? theme.notificationButtonText(notification, position, state) : {}

    return (
        <button
            data-testid="button"
            style={buttonStyles}
            className={classnames.notificationButton}
            onMouseLeave={() => setIsHovered(false)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            onClick={typeof button.onClick === 'function' ? () => button.onClick!() : noop}
        >
            <span className={classnames.notificationButtonText} style={buttonTextStyles}>
                {button.primary ? <b>{button.name}</b> : button.name}
            </span>
        </button>
    )
}

export default NotificationButton
