import {STATUSES} from '../constants'
import {Notification} from '../reducers/notifications/types'
import {Theme} from './types'
import baseTheme from './base'

const colorPerStatus = {
    [STATUSES.none]: '#ffffff',
    [STATUSES.info]: '#349ef3',
    [STATUSES.loading]: '#349ef3',
    [STATUSES.success]: '#4dc657',
    [STATUSES.warning]: '#f5aa0a',
    [STATUSES.error]: '#f5311d',
}
const lineHeight = 1.428571429

export const wyboTheme: Theme = {
    ...baseTheme,
    notification: (notification: Notification) => ({
        display: 'flex',
        width: '370px',
        height: '100%',
        position: 'relative',
        borderRadius: '8px',
        border: 'none',
        boxShadow: '0 1px 3px -1px rgba(0, 0, 0, 0.3)',
        zIndex: 999,
        backgroundColor: '#ffffff',
        color: '#524c4c',
        borderLeft: '2px solid',
        marginBottom: '20px',
        borderLeftColor: colorPerStatus[notification.status],
        cursor: notification.dismissible && !notification.showDismissButton ? 'pointer' : '',
    }),
    notificationIcon: (notification: Notification) => ({
        display: notification.image ? 'none' : 'flex',
        width: '20px',
        height: '20px',
        boxSizing: 'border-box',
        margin: '10px 0 10px 15px',
        alignSelf: 'flex-start',
        flexShrink: 0,
        color: colorPerStatus[notification.status],
    }),
    notificationDismissIcon: () => ({
        width: '12px',
        height: '12px',
        margin: '14px 10px',
        cursor: 'pointer',
        color: '#524c4c',
        flexShrink: 0,
    }),
    notificationMeta: () => ({
        verticalAlign: 'top',
        boxSizing: 'border-box',
        width: '100%',
        padding: '10px 20px',
    }),
    notificationTitle: (notification) => ({
        margin: notification.message ? '0 0 10px' : 0,
        fontSize: '14px',
        fontWeight: 700,
        lineHeight,
    }),
    notificationMessage: () => ({
        margin: 0,
        fontSize: '14px',
        lineHeight,
    }),
    notificationImageContainer: () => ({
        boxSizing: 'border-box',
        padding: '10px 0 10px 15px',
    }),
    notificationImage: () => ({
        display: 'inline-flex',
        borderRadius: '40px',
        width: '40px',
        height: '40px',
        backgroundSize: 'cover',
    }),
    notificationButtons: () => ({}),
    notificationButton: (
        notification: Notification,
        position: number,
        state: {isHovered: boolean; isActive: boolean}
    ) => ({
        display: 'block',
        width: '100%',
        height: `${100 / notification.buttons.length}%`,
        minHeight: '40px',
        boxSizing: 'border-box',
        padding: 0,
        background: 'none',
        border: 'none',
        borderRadius: 0,
        borderLeft: '1px solid rgba(0, 0, 0, 0.09)',
        outline: 'none',
        textAlign: 'center',
        color: state.isHovered ? '#349ef3' : state.isActive ? '#228ee5' : '#524c4c',
        cursor: 'pointer',
        borderTop: position === 1 ? '1px solid rgba(0, 0, 0, 0.09)' : 'none',
    }),
    notificationButtonText: () => ({
        display: 'block',
        height: '25px',
        padding: '0 15px',
        minWidth: '90px',
        maxWidth: '150px',
        width: 'auto',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        margin: '0 auto',
        textOverflow: 'ellipsis',
        textAlign: 'center',
        fontSize: '14px',
        lineHeight: '25px',
    }),
}

export default wyboTheme
