import React from 'react'
import {render} from '@testing-library/react'

import {atalhoTheme, POSITIONS, STATUSES} from '../..'
import NotificationImage from '../NotificationImage'
import {ThemeContext} from '../../contexts/themeContext'

describe('<NotificationImage/>', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        jest.spyOn(atalhoTheme, 'notificationImageContainer').mockReturnValue({color: 'green'})
        jest.spyOn(atalhoTheme, 'notificationImage').mockReturnValue({color: 'white'})
    })

    afterAll(() => {
        jest.resetAllMocks()
    })

    it.each([
        ['without theme', undefined],
        ['with theme', atalhoTheme],
    ])('should display notification image %s', (_, theme) => {
        const notification = {
            id: '1',
            status: STATUSES.info,
            position: POSITIONS.topLeft,
            image: 'image.png',
            buttons: [],
        }
        const {container} = render(
            <ThemeContext.Provider value={theme}>
                <NotificationImage notification={notification} />
            </ThemeContext.Provider>
        )
        expect(container.innerHTML).toMatchSnapshot()
        expect((atalhoTheme.notificationImageContainer as jest.Mock).mock.calls).toMatchSnapshot()
        expect((atalhoTheme.notificationImage as jest.Mock).mock.calls).toMatchSnapshot()
    })
})
