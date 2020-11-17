import {dismissNotification, dismissNotifications, notify} from '../actions'
import {setUpNotifications} from '../../..'
import {resetNotificationsConfig} from '../../../services/notifications'

describe('notify()', () => {
    it.each([
        [[{message: 'nice message', allowHTML: true}]],
        [['nice message']],
        [['nice message', {allowHTML: true}]],
        [['nice message', 'error']],
        [['nice message', 'error', {allowHTML: true}]],
    ])('should return action to upsert notification (%s)', (args) => {
        setUpNotifications({
            generateId: () => '1',
        })
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(notify(...args)).toMatchSnapshot()
        resetNotificationsConfig()
    })
})

describe('dismissNotification()', () => {
    it('should return action to dismiss notification', () => {
        expect(dismissNotification('1')).toMatchSnapshot()
    })
})

describe('dismissNotifications()', () => {
    it('should return action to dismiss notifications', () => {
        expect(dismissNotifications()).toMatchSnapshot()
    })
})
