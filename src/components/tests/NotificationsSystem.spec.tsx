import React from 'react'
import {act, render} from '@testing-library/react'
import pretty from 'pretty'

import {Notification} from '../..'
import {POSITIONS, STATUSES} from '../../constants'
import atalhoTheme from '../../themes/atalho'
import NotificationsSystem from '../NotificationsSystem'
import NotificationsContainer from '../NotificationsContainer'

jest.mock('../SlideTransition', () => jest.fn((props) => props.children))
jest.mock('../NotificationsContainer', () => {
    const component = jest.requireActual('../NotificationsContainer').default
    return jest.fn(component)
})

describe('<NotificationsSystem/>', () => {
    const notifications: Notification[] = Object.values(POSITIONS).map((position, index) => {
        return {
            id: index.toString(),
            position,
            message: 'hello world!',
            status: STATUSES.info,
            buttons: [],
        }
    })

    it('should display notifications in each container and then in the top container', () => {
        const windowInitialHeight = window.innerHeight
        const windowInitialWidth = window.innerWidth
        const {container} = render(
            <NotificationsSystem notifications={notifications} dismissNotification={jest.fn()} />
        )
        expect(pretty(container.innerHTML)).toMatchSnapshot()

        act(() => {
            window.resizeTo(100, 100)
        })

        expect(pretty(container.innerHTML)).toMatchSnapshot()
        expect((NotificationsContainer as jest.Mock).mock.calls).toMatchSnapshot()

        act(() => {
            // resize window back to its initial size
            window.resizeTo(windowInitialWidth, windowInitialHeight)
        })
    })

    it.each([
        ['without theme', undefined],
        ['with theme', atalhoTheme],
    ])('should display notifications %s', (_, theme) => {
        const {container} = render(
            <NotificationsSystem
                notifications={notifications.slice(0, 1)}
                dismissNotification={jest.fn()}
                theme={theme}
            />
        )
        expect(pretty(container.innerHTML)).toMatchSnapshot()
    })

    it.each([
        ['default components', {}],
        [
            'custom components (transition and icon)',
            {
                Transition: jest.fn((props) => props.children),
                NotificationIcon: function CustomIcon() {
                    return <div>custom-icon</div>
                },
            },
        ],
        [
            'custom components (transition and notification)',
            {
                Transition: jest.fn((props) => props.children),
                Notification: function CustomNotification() {
                    return <div>custom-notification</div>
                },
            },
        ],
    ])('should display notifications with %s', (_, components) => {
        const {container} = render(
            <NotificationsSystem
                notifications={notifications.slice(0, 1)}
                dismissNotification={jest.fn()}
                components={components}
            />
        )

        if (components.hasOwnProperty('Transition')) {
            expect((components as {Transition: jest.Mock}).Transition.mock.calls).toMatchSnapshot()
        }
        expect(pretty(container.innerHTML)).toMatchSnapshot()
    })
})
