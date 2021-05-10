import React, {RefObject} from 'react'
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
            const nodeRef = {
                current: {
                    animate: jest.fn(),
                },
            }
            const {container, rerender} = render(
                <SlideTransition
                    mountOnEnter
                    appear
                    in
                    notification={baseNotification}
                    nodeRef={nodeRef as unknown as RefObject<HTMLElement>}
                >
                    <div>notification</div>
                </SlideTransition>
            )
            expect(container.innerHTML).toMatchSnapshot()
            expect(nodeRef.current.animate.mock.calls).toMatchSnapshot()
            jest.resetAllMocks()

            // Assert exit animation
            rerender(
                <SlideTransition
                    mountOnEnter
                    appear
                    in={false}
                    notification={baseNotification}
                    nodeRef={nodeRef as unknown as RefObject<HTMLElement>}
                    duration={1}
                >
                    <div>notification</div>
                </SlideTransition>
            )
            expect(container.innerHTML).toMatchSnapshot()
            expect(nodeRef.current.animate.mock.calls).toMatchSnapshot()
        })
    })
})
