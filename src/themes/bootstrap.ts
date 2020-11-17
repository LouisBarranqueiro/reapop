import {STATUSES} from '../constants'
import {Notification} from '..'
import {Theme} from './types'
import baseTheme from './base'

const colorPerStatus = {
    [STATUSES.none]: '#ffffff',
    [STATUSES.info]: '#007bff',
    [STATUSES.loading]: '#007bff',
    [STATUSES.success]: '#28a745',
    [STATUSES.warning]: '#ffc107',
    [STATUSES.error]: '#dc3545',
}
const lineHeight = 1.428571429

export const bootstrapTheme: Theme = {
    ...baseTheme,
    notification: (notification: Notification) => ({
        display: 'flex',
        width: '350px',
        height: '100%',
        position: 'relative',
        borderRadius: '4px',
        border: '1px solid rgba(0,0,0,.1)',
        boxShadow: '0 0.25rem 0.75rem rgba(0,0,0,.1)',
        zIndex: 999,
        backgroundColor: '#ffffff',
        color: '#524c4c',
        marginBottom: '20px',
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
        color: '#6c757d',
        fontWeight: 700,
        lineHeight,
    }),
    notificationMessage: () => ({
        margin: 0,
        fontSize: '14px',
        color: '#212529',
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
        borderLeft: '1px solid rgba(0,0,0,.1)',
        outline: 'none',
        textAlign: 'center',
        color: state.isHovered || state.isActive ? '#007bff' : '#212529',
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

export default bootstrapTheme
