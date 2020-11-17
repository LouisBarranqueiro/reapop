import React from 'react'
import {act, render} from '@testing-library/react'

import atalhoTheme from '../../themes/atalho'
import {Notification, POSITIONS, STATUSES} from '../..'
import NotificationDismissIcon from '../NotificationDismissIcon'

describe('<NotificationDismissIcon/>', () => {
    const notification: Notification = {
        id: '1',
        position: POSITIONS.topLeft,
        status: STATUSES.none,
        buttons: [],
    }

    it.each([
        ['without theme', undefined],
        ['with theme', atalhoTheme],
    ])('should return dismiss icon %s', (_, theme) => {
        const {container} = render(
            <NotificationDismissIcon notification={notification} dismissNotification={jest.fn()} theme={theme} />
        )
        expect(container.innerHTML).toMatchSnapshot()
    })

    it('should call `dismissNotification` function when clicking on the icon', () => {
        const dismissNotifSpy = jest.fn()
        const {getByTestId} = render(
            <NotificationDismissIcon notification={notification} dismissNotification={dismissNotifSpy} />
        )
        const event = new MouseEvent('click', {bubbles: true})
        act(() => {
            getByTestId('dismiss-icon').dispatchEvent(event)
        })
        expect(dismissNotifSpy).toHaveBeenCalledTimes(1)
    })
})
