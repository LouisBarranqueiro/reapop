import React from 'react'
import {act, render, fireEvent} from '@testing-library/react'

import atalhoTheme from '../../themes/atalho'
import {Notification, POSITIONS, STATUSES} from '../..'
import {NotificationButton} from '../NotificationButton'

describe('<NotificationButton/>', () => {
    const notification: Notification = {
        id: '1',
        position: POSITIONS.topLeft,
        status: STATUSES.none,
        buttons: [],
    }
    beforeEach(() => {
        jest.spyOn(atalhoTheme, 'notificationButton').mockReturnValue({color: 'red'})
        jest.spyOn(atalhoTheme, 'notificationButtonText').mockReturnValue({color: 'red'})
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    afterAll(() => {
        jest.resetAllMocks()
    })

    it.each([
        ['without theme', undefined],
        ['with theme', atalhoTheme],
    ])('should render button %s', (_, theme) => {
        const {container} = render(
            <NotificationButton button={{name: 'yes'}} position={2} notification={notification} theme={theme} />
        )
        expect((atalhoTheme.notificationButton as jest.Mock).mock.calls).toMatchSnapshot('notificationButton.calls')
        expect((atalhoTheme.notificationButtonText as jest.Mock).mock.calls).toMatchSnapshot(
            'notificationButtonText.calls'
        )
        expect(container.innerHTML).toMatchSnapshot()
    })

    it.each([
        ['secondary', false],
        ['primary', true],
    ])('should render a %s button ', (_, primary) => {
        const {container} = render(
            <NotificationButton button={{name: 'yes', primary}} position={1} notification={notification} />
        )
        expect(container.innerHTML).toMatchSnapshot()
    })

    it('should update button when hovering it and clicking it', () => {
        const {container, getByTestId} = render(
            <NotificationButton button={{name: 'yes'}} position={1} notification={notification} theme={atalhoTheme} />
        )
        const button = getByTestId('button')
        ;['mouseEnter', 'mouseDown', 'mouseUp', 'mouseLeave'].map((eventType) => {
            jest.clearAllMocks()
            act(() => {
                fireEvent[eventType as 'mouseEnter' | 'mouseDown' | 'mouseUp' | 'mouseLeave'](button)
            })
            expect((atalhoTheme.notificationButton as jest.Mock).mock.calls).toMatchSnapshot('notificationButton.calls')
            expect((atalhoTheme.notificationButtonText as jest.Mock).mock.calls).toMatchSnapshot(
                'notificationButtonText.calls'
            )
            expect(container.innerHTML).toMatchSnapshot(eventType)
        })

        jest.resetAllMocks()
    })
})
