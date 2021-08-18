import {NotificationAction} from './constants'
import {DismissNotificationAction, NotificationActions, UpsertNotificationAction} from './actions'
import {Notification} from './types'
import {clone} from '../../utils'

type InitReduxAction = {
    type: string
}

const INITIAL_STATE: Notification[] = []

const notificationsReducer = () => {
    return (state = INITIAL_STATE, action: NotificationActions | InitReduxAction): Notification[] => {
        switch (action.type) {
            case NotificationAction.UpsertNotification: {
                const payload = clone((action as UpsertNotificationAction).payload)
                if (~state.findIndex((notif) => notif.id === payload.id)) {
                    return state.map((notif) => (notif.id === payload.id ? payload : notif))
                }
                return [...state, payload]
            }
            case NotificationAction.DismissNotification: {
                const payload = (action as DismissNotificationAction).payload
                return state.filter((notif) => notif.id !== payload)
            }
            case NotificationAction.DismissNotifications:
                return []
            default:
                return state
        }
    }
}

export default notificationsReducer
