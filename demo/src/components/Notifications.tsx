import {ThemeNames, THEMES, TransitionNames, TRANSITIONS} from '../constants'
import NotificationsSystem, {dismissNotification, Notification} from '../../../src'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

type RootState = {
    notifications: Notification[]
}

type Props = {
    themeName: ThemeNames
    transitionName: TransitionNames
}

export const Notifications = ({themeName, transitionName}: Props) => {
    const dispatch = useDispatch()
    const notifications = useSelector((state: RootState) => state.notifications)

    return (
        <NotificationsSystem
            components={{
                Transition: TRANSITIONS[transitionName],
            }}
            notifications={notifications}
            dismissNotification={(id) => dispatch(dismissNotification(id))}
            theme={THEMES[themeName]}
        />
    )
}

export default Notifications
