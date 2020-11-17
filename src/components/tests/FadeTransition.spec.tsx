import React from 'react'
import {render} from '@testing-library/react'

import {POSITIONS, STATUSES} from '../../constants'

import FadeTransition from '../FadeTransition'

describe('<FadeTransition/>', () => {
    it('should display notification', () => {
        const baseNotification = {
            id: '1',
            position: POSITIONS.topLeft,
            status: STATUSES.none,
            buttons: [],
        }
        const {container} = render(
            <FadeTransition notification={baseNotification}>
                <div>notification</div>
            </FadeTransition>
        )
        expect(container.innerHTML).toMatchSnapshot()
    })
})
