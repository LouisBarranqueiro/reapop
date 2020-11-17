import notificationsReducer from '../reducer'
import {dismissNotification, dismissNotifications, notify} from '../actions'
import {POSITIONS, STATUSES} from '../../../constants'
import {Notification} from '../types'

describe('notificationsReducer', () => {
    let notification: Notification
    let reducer: ReturnType<typeof notificationsReducer>
    beforeEach(() => {
        reducer = notificationsReducer()
        notification = {
            id: '1',
            dismissible: false,
            position: POSITIONS.bottomCenter,
            status: STATUSES.none,
            buttons: [],
        }
    })

    describe('init redux action', () => {
        it.each([
            ['default state', undefined],
            ['filled state', [notification]],
        ])('should return notifications (%s)', (_, state) => {
            expect(reducer(state, {type: 'redux-init'})).toEqual(state || [])
        })
    })

    describe('UpsertNotification', () => {
        it('should add notification', () => {
            expect(reducer(undefined, notify({id: '1'}))).toMatchSnapshot()
        })

        it('should update notification', () => {
            const notification2: Notification = {
                id: '2',
                dismissible: false,
                position: POSITIONS.topLeft,
                status: STATUSES.error,
                buttons: [],
            }
            const initialState = [notification, notification2]

            notification.dismissible = true
            notification.allowHTML = true

            const action = notify({id: '1', dismissible: true})
            expect(reducer(initialState, action)).toMatchSnapshot()
        })
    })

    describe('DismissNotification', () => {
        it('should dismiss notification (empty initial state)', () => {
            expect(reducer([], dismissNotification(notification.id))).toMatchSnapshot()
        })

        it('should dismiss notification (filled initial state)', () => {
            expect(reducer([notification], dismissNotification(notification.id))).toMatchSnapshot()
        })
    })

    describe('DismissNotifications', () => {
        it.each([
            ['without notifications', undefined],
            ['with notifications', [notification]],
        ])('should dismiss notifications (%s)', (_, initialState) => {
            expect(reducer(initialState, dismissNotifications())).toEqual([])
        })
    })
})
