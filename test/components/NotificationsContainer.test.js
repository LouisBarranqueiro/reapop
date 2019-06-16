import React from 'react'
import {mount, shallow} from 'enzyme'
import {checkPropTypes, genNotifications} from '../utils/fixtures'
import NotificationsContainer from '../../src/components/NotificationsContainer'
import {POSITIONS} from '../../src/constants'
import theme from 'reapop-theme-wybo'

describe('<NotificationsContainer/>', () => {
  it('should validate props', () => {
    const errors = checkPropTypes({
      notifications: [],
      position: POSITIONS.topLeft,
      theme
    }, NotificationsContainer.propTypes)

    expect(errors.notifications).toBeUndefined()
    expect(errors.position).toBeUndefined()
    expect(errors.theme).toBeUndefined()
  })

  it('should not validate props', () => {
    const errors = checkPropTypes({}, NotificationsContainer.propTypes)
    expect(errors.notifications).toBeDefined()
    expect(errors.position).toBeDefined()
    expect(errors.theme).toBeDefined()
  })

  it('should mount with default props', () => {
    const wrapper = mount(
      <NotificationsContainer position={POSITIONS.topLeft} theme={theme}/>
    )

    const props = wrapper.props()
    expect(props.notifications).toEqual([])
  })

  it('should render no notifications', () => {
    const wrapper = shallow(
      <NotificationsContainer
        position={POSITIONS.topLeft}
        notifications={[]}
        theme={theme}
      />
    )
    expect(wrapper.debug({verbose: true})).toMatchSnapshot()
  })

  it('should render notifications', () => {
    const notifications = genNotifications(3)
    const wrapper = shallow(
      <NotificationsContainer
        position={POSITIONS.topLeft}
        notifications={notifications}
        theme={theme}
      />
    )
    expect(wrapper.debug({verbose: true})).toMatchSnapshot()
  })

  it('should reverse and render notifications (bottom notifications)', () => {
    const notifications = genNotifications(3)
    const wrapper = shallow(
      <NotificationsContainer
        position={POSITIONS.bottomLeft}
        notifications={notifications}
        theme={theme}
      />
    )
    expect(wrapper.debug({verbose: true})).toMatchSnapshot()
  })
})
