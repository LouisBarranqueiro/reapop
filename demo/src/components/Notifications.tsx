import {ThemeNames, THEMES, TransitionNames, TRANSITIONS} from '../constants'
import NotificationsSystem, {dismissNotification, Notification} from '../../../src'
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

type RootState = {
    notifications: Notification[]
}

export const Notifications = () => {
    const dispatch = useDispatch()
    const [themeName, setThemeName] = useState<ThemeNames>('Atalho')
    const [transitionName, setTransitionName] = useState<TransitionNames>('Slide')
    const notifications = useSelector((state: RootState) => state.notifications)
    const theme = THEMES[themeName]

    return (
        <NotificationsSystem
            components={{
                Transition: TRANSITIONS[transitionName],
            }}
            notifications={notifications}
            dismissNotification={(id) => dispatch(dismissNotification(id))}
            theme={theme}
        />
    )
}

export default Notifications
