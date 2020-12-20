import React, {useEffect, useState} from 'react'
import {POSITIONS} from '../constants'
import {Notification} from '../reducers/notifications/types'
import {Theme} from '../themes/types'
import {ComponentContextType, ComponentsContext} from '../contexts/componentsContext'
import {ThemeContext} from '../contexts/themeContext'
import NotificationsContainer from './NotificationsContainer'

export type DismissNotification = (id: string) => void

export type Props = {
    notifications: Notification[]
    dismissNotification: DismissNotification
    smallScreenBreakpoint?: number
    components?: ComponentContextType
    theme?: Theme
}

const NotificationsSystem = (props: Props) => {
    const smallScreenBreakpoint = props.smallScreenBreakpoint || 768
    const theme = props.theme
    const components = props.components || {}
    const {notifications, dismissNotification} = props
    const [windowWidth, setWindowWidth] = useState(typeof window === 'undefined' ? 0 : window.innerWidth)
    const singleContainer = windowWidth < smallScreenBreakpoint
    // render all notifications in the same container at the top for small screens
    const positions = singleContainer ? [POSITIONS.topCenter] : Object.values(POSITIONS)

    useEffect(() => {
        setWindowWidth(window.innerWidth)
        const updateWindowWidth = () => setWindowWidth(window.innerWidth)
        // Update window width when the window is resized
        window.addEventListener('resize', updateWindowWidth)
        return () => {
            window.removeEventListener('resize', updateWindowWidth)
        }
    }, [])

    return (
        <ComponentsContext.Provider value={components}>
            <ThemeContext.Provider value={theme}>
                <div>
                    {positions.map((position) => (
                        <NotificationsContainer
                            key={position}
                            position={position}
                            notifications={notifications.filter(
                                (notif) => singleContainer || position === notif.position
                            )}
                            dismissNotification={dismissNotification}
                            singleContainer={singleContainer}
                        />
                    ))}
                </div>
            </ThemeContext.Provider>
        </ComponentsContext.Provider>
    )
}

export default NotificationsSystem
