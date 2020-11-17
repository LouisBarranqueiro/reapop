import {STATUSES} from '../constants'
import {Notification} from '..'
import {Theme} from './types'
import baseTheme from './base'

const colorPerStatus = {
    [STATUSES.none]: '#ffffff',
    [STATUSES.info]: '#4192ff',
    [STATUSES.loading]: '#4192ff',
    [STATUSES.success]: '#32d38b',
    [STATUSES.warning]: '#f5aa0a',
    [STATUSES.error]: '#E94C58',
}
const lineHeight = 1.428571429

export const atalhoTheme: Theme = {
    ...baseTheme,
    notification: (notification: Notification) => ({
        display: 'flex',
        width: '350px',
        height: '100%',
        position: 'relative',
        borderRadius: '5px',
        border: '1px solid rgba(0,0,0,.1)',
        boxShadow: '0 3px 8px 2px rgba(0, 0, 0, 0.3)',
        backgroundColor: '#2f2f36',
        color: '#ffffff',
        marginBottom: '20px',
        cursor: notification.dismissible && !notification.showDismissButton ? 'pointer' : '',
        zIndex: 999,
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
        color: '#b9c2cb',
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
        color: '#ffffff',
        fontWeight: 700,
        lineHeight,
    }),
    notificationMessage: () => ({
        margin: 0,
        fontSize: '14px',
        color: '#b9c2cb',
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
        background: '#2f2f36',
        border: 'none',
        borderRadius: 0,
        borderLeft: '1px solid #464c5f',
        outline: 'none',
        textAlign: 'center',
        color: state.isHovered || state.isActive ? '#349ef3' : '#ffffff',
        cursor: 'pointer',
        borderTop: position === 1 ? '1px solid #464c5f' : 'none',
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

export default atalhoTheme
