import {atalhoTheme} from '../atalho'
import wyboTheme from '../wybo'
import bootstrapTheme from '../bootstrap'
import {POSITIONS, STATUSES, Notification} from '../..'

describe.each([
    ['atalho', atalhoTheme],
    ['bootstrap', bootstrapTheme],
    ['wybo', wyboTheme],
])('theme (%s)', (_, theme) => {
    const baseNotification: Notification = {
        id: '1',
        status: STATUSES.none,
        position: POSITIONS.topLeft,
        buttons: [],
    }

    it.each([Object.values(POSITIONS)])('should return style of container (%s)', (position) => {
        expect(theme.container(position, false)).toMatchSnapshot()
    })

    it.each([
        [{dismissible: false, showDismissButton: false}],
        [{dismissible: true, showDismissButton: false}],
        [{dismissible: false, showDismissButton: true}],
        [{dismissible: true, showDismissButton: true}],
    ])('should return style of notification (%s)', (props) => {
        const notification: Notification = {
            ...baseNotification,
            ...props,
        }
        expect(theme.notification(notification)).toMatchSnapshot()
    })

    it.each(Object.values(STATUSES))('should return style of notification icon (status: %s)', (status) => {
        expect(theme.notificationIcon({...baseNotification, status})).toMatchSnapshot()
    })

    it.each([
        ['without image', undefined],
        ['with image', 'image.png'],
    ])('should return style of notification icon %s', (_, image) => {
        expect(theme.notificationIcon({...baseNotification, image})).toMatchSnapshot()
    })

    it('should return style of notification image', () => {
        expect(theme.notificationImageContainer(baseNotification)).toMatchSnapshot()
        expect(theme.notificationImage(baseNotification)).toMatchSnapshot()
    })

    it('should return style of notification dismiss icon', () => {
        expect(theme.notificationDismissIcon(baseNotification)).toMatchSnapshot()
    })

    it('should return style of notification meta container', () => {
        expect(theme.notificationMeta(baseNotification)).toMatchSnapshot()
    })

    it.each([
        ['without message', undefined],
        ['with message', 'hello world!'],
    ])('should return style of notification title %s', (_, message) => {
        expect(theme.notificationTitle({...baseNotification, message})).toMatchSnapshot()
    })

    it('should return style of notification message', () => {
        expect(theme.notificationMessage(baseNotification)).toMatchSnapshot()
    })

    it('should return style of notification buttons', () => {
        expect(theme.notificationButtons(baseNotification)).toMatchSnapshot()
    })

    describe.each([
        [{...baseNotification, buttons: []}, 1],
        [{...baseNotification, buttons: [{name: 'yes'}]}, 1],
        [{...baseNotification, buttons: [{name: 'yes'}, {name: 'no'}]}, 1],
    ])('notification (%s)', (notification) => {
        describe.each([0, 1])('position (%s)', (position) => {
            describe.each([
                {isHovered: false, isActive: false},
                {isHovered: true, isActive: false},
                {isHovered: false, isActive: true},
                {isHovered: true, isActive: true},
            ])('state', (state) => {
                it('should return style of notification button', () => {
                    expect(theme.notificationButton(notification, position, state)).toMatchSnapshot()
                    expect(theme.notificationButtonText(baseNotification, position, state)).toMatchSnapshot()
                })
            })
        })
    })
})
