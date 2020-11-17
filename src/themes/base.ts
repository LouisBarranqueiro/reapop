import {CSSProperties} from 'react'
import {POSITIONS} from '../constants'
import {Position} from '../reducers/notifications/types'

const containerPerPositionStyles: Record<Position, CSSProperties> = {
    [POSITIONS.topCenter]: {
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
    },
    [POSITIONS.topRight]: {
        top: '20px',
        right: '20px',
    },
    [POSITIONS.topLeft]: {
        top: '20px',
        left: '20px',
    },
    [POSITIONS.bottomCenter]: {
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
    },
    [POSITIONS.bottomRight]: {
        bottom: '20px',
        right: '20px',
    },
    [POSITIONS.bottomLeft]: {
        bottom: '20px',
        left: '20px',
    },
}

export const baseTheme = {
    container: (position: Position): CSSProperties => ({
        position: 'fixed',
        zIndex: 999999,
        ...containerPerPositionStyles[position],
    }),
}

export default baseTheme
