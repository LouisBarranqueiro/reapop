import {generateId, prepareNotification, resetNotificationsConfig, setUpNotifications} from '../notifications'
import {CONFIG} from '../../constants'

describe('setUpNotifications()', () => {
    afterAll(() => {
        resetNotificationsConfig()
    })

    it('should update the config', () => {
        const defaultProps = {
            dismissible: true,
        }
        const customizeNotification = jest.fn()
        const generateId = jest.fn()
        setUpNotifications({
            defaultProps,
            customizeNotification,
            generateId,
        })
        expect(CONFIG.defaultProps).toEqual(defaultProps)
        expect(CONFIG.customizeNotification).toEqual(customizeNotification)
        expect(CONFIG.generateId).toEqual(generateId)
    })
})

describe('generateId()', () => {
    it('should generate random IDs', () => {
        const id = generateId()
        expect(typeof id).toEqual('string')
        expect(id.length).toEqual(5)
        expect(generateId()).not.toEqual(generateId())
    })
})

describe('prepareNotification()', () => {
    beforeEach(() => {
        resetNotificationsConfig()
    })

    it('should clone given notification', () => {
        const initialNotif = {}
        const notification = prepareNotification(initialNotif)
        expect(initialNotif !== notification).toBe(true)
    })

    it('should set ID if not specified', () => {
        const notification = prepareNotification({})
        expect(notification.id.length).toEqual(5)
    })

    it('should not override ID if already set', () => {
        const id = 'hello'
        const notification = prepareNotification({id})
        expect(notification.id).toEqual(id)
    })
    it('should configured generate ID function if ID is not set', () => {
        const generateId = jest.fn().mockReturnValue('foo')
        setUpNotifications({generateId})
        const notification = prepareNotification({message: 'hello'})
        expect(notification.id).toEqual('foo')
        expect(generateId.mock).toMatchSnapshot()
    })

    it('should set default attributes if not set', () => {
        setUpNotifications({generateId: () => '1'})
        const notification = prepareNotification({})
        expect(notification).toMatchSnapshot()
    })

    it('should only set default and configured attributes if not set', () => {
        setUpNotifications({
            defaultProps: {dismissible: false, allowHTML: true},
            generateId: () => '1',
        })
        const notification = prepareNotification({
            status: 'success',
            dismissible: true,
        })
        expect(notification).toMatchSnapshot()
    })

    it('should customize notification with configured function', () => {
        const customizeNotification = jest.fn((notif) => (notif.foo = 'bar'))
        setUpNotifications({customizeNotification, generateId: () => '1'})
        const notification = prepareNotification({message: 'hello'})
        expect(notification).toMatchSnapshot()
        expect(customizeNotification.mock).toMatchSnapshot()
    })
})
