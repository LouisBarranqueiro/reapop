import React, {ReactNode} from 'react'
import pretty from 'pretty'
import {render} from '@testing-library/react'

import {Notification, POSITIONS, STATUSES, Theme} from '../..'
import {ComponentContextType, ComponentsContext} from '../../contexts/componentsContext'
import {ThemeContext} from '../../contexts/themeContext'
import atalhoTheme from '../../themes/atalho'

import NotificationsContainer from '../NotificationsContainer'

describe('<NotificationsContainer/>', () => {
    const notifications: Notification[] = [
        {
            id: '1',
            position: POSITIONS.topLeft,
            message: 'Notification 1',
            status: STATUSES.none,
            buttons: [],
        },
        {
            id: '2',
            position: POSITIONS.topLeft,
            message: 'Notification 2',
            status: STATUSES.none,
            buttons: [],
        },
    ]

    const renderWithContexts = (children: ReactNode, theme?: Theme, components: ComponentContextType = {}) =>
        render(
            <ComponentsContext.Provider value={components}>
                <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
            </ComponentsContext.Provider>
        )

    beforeEach(() => {
        jest.spyOn(atalhoTheme, 'container').mockReturnValue({color: 'red'})
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
    ])('should render notifications %s', (_, theme) => {
        const dismissNotification = jest.fn()
        const {container} = renderWithContexts(
            <NotificationsContainer
                notifications={notifications}
                position={notifications[0].position}
                dismissNotification={dismissNotification}
                singleContainer={false}
            />,
            theme
        )

        expect(container.innerHTML).toMatchSnapshot()
    })

    it.each(Object.values(POSITIONS))('should display notifications for %s position', (position) => {
        const {container} = renderWithContexts(
            <NotificationsContainer
                notifications={notifications}
                position={position}
                dismissNotification={jest.fn()}
                singleContainer
            />
        )
        expect(pretty(container.innerHTML)).toMatchSnapshot()
    })

    it('should display notifications with custom components', () => {
        const CustomTransition = (props: any) => <div id="custom-transition">{props.children}</div>
        const CustomNotification = (props: any) => <div id="custom-notification">{props.notification.message}</div>

        const {container} = renderWithContexts(
            <NotificationsContainer
                notifications={notifications}
                position={notifications[0].position}
                dismissNotification={jest.fn()}
                singleContainer
            />,
            undefined,
            {Transition: CustomTransition, Notification: CustomNotification}
        )
        expect(pretty(container.innerHTML)).toMatchSnapshot()
    })
})
