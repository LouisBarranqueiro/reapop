import React from 'react'
import {render} from '@testing-library/react'

import {Notification} from '../..'
import {POSITIONS, STATUSES} from '../../constants'
import atalhoTheme from '../../themes/atalho'

import NotificationIcon from '../NotificationIcon'

describe('<NotificationIcon/>', () => {
    const notification: Notification = {
        id: '1',
        status: STATUSES.info,
        position: POSITIONS.topLeft,
        buttons: [],
    }

    it('should render icon with given theme', () => {
        const {container} = render(<NotificationIcon notification={notification} theme={atalhoTheme} />)
        expect(container.innerHTML).toMatchSnapshot()
    })

    it.each(Object.values(STATUSES))('should render %s icon', (status) => {
        const {container} = render(<NotificationIcon notification={{...notification, status}} />)
        expect(container.innerHTML).toMatchSnapshot()
    })
})
