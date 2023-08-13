import {POSITIONS, STATUSES} from '../../constants'

export interface NotificationButton {
    name: string
    primary?: boolean
    onClick?: (...args: unknown[]) => void
}

export type Status = (typeof STATUSES)[keyof typeof STATUSES]
export type Position = (typeof POSITIONS)[keyof typeof POSITIONS]

export interface Notification {
    id: string
    title?: string
    message?: string
    status: Status
    position: Position
    buttons: NotificationButton[]
    image?: string
    dismissAfter?: number
    dismissible?: boolean
    onAdd?: (...args: unknown[]) => void
    onDismiss?: (...args: unknown[]) => void
    showDismissButton?: boolean
    allowHTML?: boolean
    [index: string]: unknown
}

export type NewNotification = Partial<Notification>
