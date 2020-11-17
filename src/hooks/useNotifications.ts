import {useContext} from 'react'
import {ReapopNotificationsContext} from '../contexts/reapopNotificationsContext'

export const useNotifications = () => {
    return useContext(ReapopNotificationsContext)
}
