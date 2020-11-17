import React from 'react'
import {render} from '@testing-library/react'

import {POSITIONS, STATUSES} from '../../constants'

import SlideTransition from '../SlideTransition'

describe('<SlideTransition/>', () => {
    describe.each(Object.values(POSITIONS))('position: %s', (position) => {
        it('should display notification', () => {
            const baseNotification = {
                id: '1',
                position,
                status: STATUSES.none,
                buttons: [],
            }
            const {container} = render(
                <SlideTransition notification={baseNotification}>
                    <div>notification</div>
                </SlideTransition>
            )
            expect(container.innerHTML).toMatchSnapshot()
        })
    })
})
