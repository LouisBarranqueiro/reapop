import React from 'react';
import {mount, shallow} from 'enzyme';
import {Provider} from 'react-redux';
import ConnectedNotificationsSystem, {
  NotificationsSystem
} from '../../src/components/NotificationsSystem';
import Notification from '../../src/components/Notification';
import {genRandomNotification, genRandomNotifications, mockStore, checkPropTypes} from '../utils/fixtures';
import theme from 'reapop-theme-wybo';

describe('<NotificationsSystem/>', () => {
  it('should validate props', () => {
    const errors = checkPropTypes({
      notifications: [],
      theme
    }, NotificationsSystem.propTypes);

    expect(errors.notifications).toBeUndefined();
    expect(errors.theme).toBeUndefined();
  });

  it('should not validate props', () => {
    const errors = checkPropTypes({}, NotificationsSystem.propTypes);
    expect(errors.notifications).toBeDefined();
    expect(errors.theme).toBeDefined();
  });

  it('should mount with default props', () => {
    const props = mount(<NotificationsSystem theme={theme}/>).props();
    expect(props.notifications).toEqual([]);
  });

  it('should render 1 notification containers (mobile)', () => {
    const wrapper = shallow(<NotificationsSystem theme={theme}/>);
    wrapper.setState({windowWidth: theme.smallScreenMin - 1});
    expect(wrapper.debug({verbose: true})).toMatchSnapshot();
  });

  it('should render 8 notification containers (desktop)', () => {
    const wrapper = shallow(<NotificationsSystem theme={theme}/>);
    wrapper.setState({windowWidth: theme.smallScreenMin});
    expect(wrapper.debug({verbose: true})).toMatchSnapshot();
  });

  it('should use filter and render 1 notification', () => {
    const notifications = genRandomNotifications(3);
    notifications.push(genRandomNotification({style: 'alert'}));
    const store = mockStore({notifications});
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedNotificationsSystem
          theme={theme}
          filter={notif => notif.style === 'alert'}
        />
      </Provider>
    );
    expect(wrapper.find(Notification).length).toEqual(1);
  });
});
