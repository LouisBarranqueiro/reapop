import React from 'react'

import {Notification} from '../reducers/notifications/types'
import {classnames, STATUSES} from '../constants'
import {Theme} from '..'

type Props = {
    notification: Notification
    theme?: Theme
}

const NotificationIcon = (props: Props) => {
    const {theme} = props
    const {status} = props.notification
    const styles = theme ? theme.notificationIcon(props.notification) : {}
    const iconProps = {
        style: styles,
        className: classnames.notificationIcon,
    }

    switch (status) {
        case STATUSES.none:
            return null
        case STATUSES.info:
            return (
                <svg viewBox="0 0 16 16" fill="currentColor" {...iconProps}>
                    <path
                        fillRule="evenodd"
                        d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                    />
                </svg>
            )
        case STATUSES.loading:
            return (
                <svg viewBox="5 5 40 40" fill="currentColor" {...iconProps}>
                    <path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                        <animateTransform
                            attributeType="xml"
                            attributeName="transform"
                            type="rotate"
                            from="0 25 25"
                            to="360 25 25"
                            dur="0.5s"
                            repeatCount="indefinite"
                        />
                    </path>
                </svg>
            )
        case STATUSES.success:
            return (
                <svg viewBox="0 0 16 16" fill="currentColor" {...iconProps}>
                    <path
                        fillRule="evenodd"
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                    />
                </svg>
            )
        case STATUSES.warning:
            return (
                <svg viewBox="0 0 16 16" fill="currentColor" {...iconProps}>
                    <path
                        fillRule="evenodd"
                        d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 5zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                    />
                </svg>
            )
        case STATUSES.error:
            return (
                <svg viewBox="0 0 16 16" fill="currentColor" {...iconProps}>
                    <path
                        fillRule="evenodd"
                        d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
                    />
                </svg>
            )
    }
}

export default NotificationIcon
