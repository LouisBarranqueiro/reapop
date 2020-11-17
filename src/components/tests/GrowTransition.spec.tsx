import React from 'react'
import {render} from '@testing-library/react'

import {POSITIONS, STATUSES} from '../../constants'

import GrowTranstion from '../GrowTransition'

describe('<GrowTranstion/>', () => {
    it('should display notification', () => {
        const baseNotification = {
            id: '1',
            position: POSITIONS.topLeft,
            status: STATUSES.none,
            buttons: [],
        }
        const {container} = render(
            <GrowTranstion notification={baseNotification}>
                <div>notification</div>
            </GrowTranstion>
        )
        expect(container.innerHTML).toMatchSnapshot()
    })
})
