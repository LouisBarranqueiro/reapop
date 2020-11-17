import React from 'react'
import pretty from 'pretty'
import {act, render, fireEvent} from '@testing-library/react'
import {Notification as NotificationType, POSITIONS, STATUSES} from '../..'
import atalhoTheme from '../../themes/atalho'
import Notification from '../Notification'

describe('<Notification/>', () => {
    const baseNotification: NotificationType = {
        id: '1',
        title: 'Hello world!',
        message: 'say hello to the world',
        position: POSITIONS.topLeft,
        status: STATUSES.none,
        showDismissButton: true,
        buttons: [{name: 'yes'}, {name: 'no'}],
    }

    beforeEach(() => {
        jest.spyOn(atalhoTheme, 'notification').mockReturnValue({color: 'red'})
        jest.spyOn(atalhoTheme, 'notificationMeta').mockReturnValue({color: 'blue'})
        jest.spyOn(atalhoTheme, 'notificationTitle').mockReturnValue({color: 'green'})
        jest.spyOn(atalhoTheme, 'notificationMessage').mockReturnValue({color: 'white'})
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
    ])('should render a notification %s', (_, theme) => {
        const {container} = render(
            <Notification
                notification={baseNotification}
                dismissNotification={jest.fn()}
                theme={theme}
                components={{}}
            />
        )
        expect(pretty(container.innerHTML)).toMatchSnapshot()
        expect((atalhoTheme.notification as jest.Mock).mock.calls).toMatchSnapshot()
        expect((atalhoTheme.notificationMeta as jest.Mock).mock.calls).toMatchSnapshot()
        expect((atalhoTheme.notificationTitle as jest.Mock).mock.calls).toMatchSnapshot()
        expect((atalhoTheme.notificationMessage as jest.Mock).mock.calls).toMatchSnapshot()
    })

    it.each([
        ['HTML not allowed', false],
        ['HTML allowed', true],
    ])('should render a notification (%s)', (_, allowHTML) => {
        const notification = {
            ...baseNotification,
            title: '<span>title</span>',
            message: '<span>message</span>',
            allowHTML,
        }
        const {container} = render(
            <Notification notification={notification} dismissNotification={jest.fn()} components={{}} />
        )
        expect(pretty(container.innerHTML)).toMatchSnapshot()
    })

    it.each([
        ['without image', undefined],
        ['with image', 'image.png'],
    ])('should render a notification %s', (_, image) => {
        const notification = {
            ...baseNotification,
            image,
        }
        const {container} = render(
            <Notification notification={notification} dismissNotification={jest.fn()} components={{}} />
        )
        expect(pretty(container.innerHTML)).toMatchSnapshot()
    })

    it.each([
        ['not dismisible', {dismissible: false}],
        ['dismissible with no dismiss button', {dismissible: true, showDismissButton: false}],
        ['dismissible with dismiss button', {dismissible: true, showDismissButton: true}],
    ])('should render a notification (%s)', (_, options) => {
        const notification = {
            ...baseNotification,
            ...options,
        }
        const {container} = render(
            <Notification notification={notification} dismissNotification={jest.fn()} components={{}} />
        )
        expect(pretty(container.innerHTML)).toMatchSnapshot()
    })

    it.each([
        ['not call', 'notification is not dismissible', {dismissible: false, showDismissButton: false}],
        ['not call', 'dismiss button is displayed', {dismissible: true, showDismissButton: true}],
        ['call', 'notification is dismissible', {dismissible: true, showDismissButton: false}],
    ])('should %s dismiss notification function on click because %s', (_, __, options) => {
        const dismissNotificationSpy = jest.fn()
        const {getByTestId} = render(
            <Notification
                notification={{...baseNotification, ...options}}
                dismissNotification={dismissNotificationSpy}
                components={{}}
            />
        )
        const notificationElem = getByTestId('notification')
        act(() => {
            fireEvent.click(notificationElem)
        })

        if (options.dismissible && !options.showDismissButton) {
            expect(dismissNotificationSpy).toHaveBeenCalledTimes(1)
        } else {
            expect(dismissNotificationSpy).not.toHaveBeenCalled()
        }
    })

    it.each([
        ['not display', 'notification is not dismissible', {dismissible: false, showDismissButton: false}],
        ['not display', 'dismiss button is not enabled', {dismissible: true, showDismissButton: false}],
        [
            'display',
            'notification is dismissible and dismiss button enabled',
            {dismissible: true, showDismissButton: true},
        ],
    ])('should %s dismiss icon because %s', (_, reason, options) => {
        const dimissNotificationSpy = jest.fn()
        const {container, getByTestId} = render(
            <Notification
                notification={{...baseNotification, ...options}}
                dismissNotification={dimissNotificationSpy}
                components={{}}
            />
        )

        expect(pretty(container.innerHTML)).toMatchSnapshot(reason)

        if (options.dismissible && options.showDismissButton) {
            act(() => {
                fireEvent.click(getByTestId('dismiss-icon'))
            })
            expect(dimissNotificationSpy).toHaveBeenCalledTimes(1)
        }
    })

    it.each([
        ['0', []],
        ['1', [{name: 'yes'}]],
        ['2', [{name: 'yes'}, {name: 'no'}]],
    ])('should render a notification with %s button(s)', (_, buttons) => {
        const {container} = render(
            <Notification
                notification={{...baseNotification, buttons}}
                dismissNotification={jest.fn()}
                components={{}}
            />
        )
        expect(pretty(container.innerHTML)).toMatchSnapshot()
    })

    it('should use the custom `NotificationIcon` component', () => {
        const CustomIcon = jest.fn().mockReturnValue(<span>custom-icon</span>)
        const {container} = render(
            <Notification
                notification={baseNotification}
                dismissNotification={jest.fn()}
                theme={atalhoTheme}
                components={{NotificationIcon: CustomIcon}}
            />
        )
        expect(container.innerHTML).toMatchSnapshot()
        expect(CustomIcon).toHaveBeenNthCalledWith(1, {notification: baseNotification, theme: atalhoTheme}, {})
    })
})
