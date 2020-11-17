import React, {useEffect, useReducer} from 'react'
import {render} from '@testing-library/react'

import {NotificationsProvider, useNotifications} from '../..'
import mockReducer from '../../reducers/notifications/reducer'

const mockDispatch = jest.fn()

jest.mock('../../reducers/notifications/reducer', () => jest.fn())
jest.mock('react', () => {
    const react = jest.requireActual('react')
    return {
        ...react,
        useReducer: jest.fn((_, initialState) => {
            return [initialState, mockDispatch]
        }),
    }
})

describe('<NotificationsProvider/>', () => {
    it('should provide reducer state and actions', (done) => {
        const TestComponent = () => {
            const {notifications, notify, dismissNotification, dismissNotifications} = useNotifications()

            useEffect(() => {
                expect(useReducer).toHaveBeenNthCalledWith(1, mockReducer(), [])
                expect(notifications).toEqual([])

                const notification = notify({id: '1'})
                expect(notification).toMatchSnapshot()
                expect(mockDispatch.mock.calls).toMatchSnapshot()

                jest.clearAllMocks()
                dismissNotification('1')
                expect(mockDispatch.mock.calls).toMatchSnapshot()

                jest.clearAllMocks()
                dismissNotifications()
                expect(mockDispatch.mock.calls).toMatchSnapshot()

                done()
            }, [])

            return null
        }

        render(
            <NotificationsProvider>
                <TestComponent />
            </NotificationsProvider>
        )
    })
})
