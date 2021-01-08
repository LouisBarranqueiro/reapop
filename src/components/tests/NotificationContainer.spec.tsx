import React from 'react'
import pretty from 'pretty'
import {render, fireEvent, act} from '@testing-library/react'

import {Notification, POSITIONS, STATUSES} from '../..'
import NotificationContainer from '../NotificationContainer'

describe('<NotificationContainer/>', () => {
    const baseNotification: Notification = {
        id: '1',
        message: 'hello world!',
        position: POSITIONS.topLeft,
        status: STATUSES.none,
        buttons: [],
        dismissible: true,
    }

    beforeAll(() => {
        // jsdom does not provide `HTMLElement.animate` function so we have to mock it.
        HTMLElement.prototype.animate = jest.fn()
    })

    beforeEach(() => {
        jest.clearAllMocks()
    })

    afterAll(() => {
        jest.resetAllMocks()
    })

    it('should call `onAdd` function when notification is displayed', () => {
        const notification = {
            ...baseNotification,
            onAdd: jest.fn(),
        }
        render(<NotificationContainer notification={notification} dismissNotification={jest.fn()} />)
        expect(notification.onAdd).toHaveBeenNthCalledWith(1)
    })

    it('should call `onDismiss` function when notification is dimissed', () => {
        const notification = {
            ...baseNotification,
            onDismiss: jest.fn(),
        }
        const {unmount} = render(<NotificationContainer notification={notification} dismissNotification={jest.fn()} />)
        unmount()
        expect(notification.onDismiss).toHaveBeenNthCalledWith(1)
    })

    it('should pause/resume timer when mouse is entering/leaving the notification', (done) => {
        const notification = {
            ...baseNotification,
            dismissAfter: 4,
        }
        const dismissNotificationSpy = jest.fn()
        const {getByTestId} = render(
            <NotificationContainer notification={notification} dismissNotification={dismissNotificationSpy} />
        )
        const element = getByTestId('timed-notification')

        act(() => {
            fireEvent.mouseEnter(element)
        })

        setTimeout(() => {
            // 1. Notification was still not removed because mouse is hovering it.
            expect(dismissNotificationSpy).not.toHaveBeenCalled()

            // 2. Mouse leaves the notification so the function used to dismiss it should be called soon.
            fireEvent.mouseLeave(element)

            setTimeout(() => {
                // 3. Verify the function used to dismiss the notification has been called.
                expect(dismissNotificationSpy).toHaveBeenNthCalledWith(1, notification.id)
                done()
            }, notification.dismissAfter)
        }, notification.dismissAfter)
    })

    it('should pause timer when notification `dismissAfter` timeout is removed', (done) => {
        const dismissAfter = 4
        const notification = {
            ...baseNotification,
            dismissAfter,
        }
        const dismissNotificationSpy = jest.fn()
        const {rerender} = render(
            <NotificationContainer notification={notification} dismissNotification={dismissNotificationSpy} />
        )

        // remove the `dismissAfter` timeout
        rerender(
            <NotificationContainer
                notification={{...notification, dismissAfter: undefined}}
                dismissNotification={dismissNotificationSpy}
            />
        )

        setTimeout(() => {
            expect(dismissNotificationSpy).not.toHaveBeenCalled()
            done()
        }, dismissAfter)
    })

    it('should resume timer when notification `dismissAfter` timeout is added', (done) => {
        const dismissAfter = 4
        const dismissNotificationSpy = jest.fn()
        const {rerender} = render(
            <NotificationContainer notification={baseNotification} dismissNotification={dismissNotificationSpy} />
        )

        setTimeout(() => {
            expect(dismissNotificationSpy).not.toHaveBeenCalled()
        }, dismissAfter)

        // add the `dismissAfter` timeout
        rerender(
            <NotificationContainer
                notification={{...baseNotification, dismissAfter}}
                dismissNotification={dismissNotificationSpy}
            />
        )

        setTimeout(() => {
            expect(dismissNotificationSpy).toHaveBeenNthCalledWith(1, baseNotification.id)
            done()
        }, dismissAfter + 1)
    })

    it('should dismiss notification by clicking on it', () => {
        const dismissNotificationSpy = jest.fn()
        const {getByTestId} = render(
            <NotificationContainer notification={baseNotification} dismissNotification={dismissNotificationSpy} />
        )
        const notificationElem = getByTestId('notification')
        act(() => {
            fireEvent.click(notificationElem)
        })
        expect(dismissNotificationSpy).toHaveBeenNthCalledWith(1, baseNotification.id)
    })

    it('should render a container with a notification', () => {
        const {container} = render(
            <NotificationContainer notification={baseNotification} dismissNotification={jest.fn()} />
        )
        expect(pretty(container.innerHTML)).toMatchSnapshot()
    })
})
