import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import ConnectedNotificationsSystem, {
  NotificationsSystem
} from '../../src/components/NotificationsSystem';
import Notification from '../../src/components/Notification';
import NotificationsContainer from '../../src/components/NotificationsContainer';
import {genNotification, genNotifications, mockStore, checkPropTypes} from '../utils/fixtures';
import {ExpectedNotificationsSystem} from '../utils/expectedComponents';
import theme from 'reapop-theme-wybo';

describe('<NotificationsSystem/>', () => {
  const otherProps = {
    theme
  };

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
    const props = mount(<NotificationsSystem {...otherProps}/>).props();
    expect(props.notifications).toEqual([]);
  });

  it('should render 1 empty notifications container (mobile)', () => {
    const wrapper = mount(<NotificationsSystem {...otherProps}/>);
    const expectedWrapper = mount(<ExpectedNotificationsSystem {...otherProps}/>);
    expect(wrapper.find(NotificationsContainer).length).toEqual(1);
    expect(wrapper.find(Notification).length).toEqual(0);
    expect(wrapper.html()).toEqual(expectedWrapper.html());
  });

  it('should render 8 empty notifications containers (desktop)', () => {
    // define the small screen breakpoint under default window width of PhantomJS (400px)
    // to simulate a desktop screen and test a portion of code
    const customTheme = Object.assign({}, theme, {smallScreenMin: 380});
    const wrapper = mount(<NotificationsSystem theme={customTheme}/>);
    const expectedWrapper = mount(<ExpectedNotificationsSystem theme={customTheme}/>);
    expect(wrapper.find(NotificationsContainer).length).toEqual(8);
    expect(wrapper.find(Notification).length).toEqual(0);
    expect(wrapper.html()).toEqual(expectedWrapper.html());
  });

  it('should render notifications in 1 notifications containers (mobile)', () => {
    const notifications = genNotifications(3);
    const store = mockStore({notifications});
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedNotificationsSystem notifications={notifications} {...otherProps}/>
      </Provider>
    );
    const expectedWrapper = mount(
      <Provider store={store}>
        <ExpectedNotificationsSystem notifications={notifications} {...otherProps}/>
      </Provider>
    );
    expect(wrapper.find(NotificationsContainer).length).toEqual(1);
    expect(wrapper.find(Notification).length).toEqual(3);
    expect(wrapper.html()).toEqual(expectedWrapper.html());
  });

  it('should render notifications in 8 notifications containers (desktop)', () => {
    const notifications = genNotifications(3);
    const store = mockStore({notifications});
    // define the small screen breakpoint under default window width of PhantomJS (400px)
    // to simulate a desktop screen and test a portion of code
    const customTheme = Object.assign({}, theme, {smallScreenMin: 380});
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedNotificationsSystem notifications={notifications} theme={customTheme}/>
      </Provider>
    );
    const expectedWrapper = mount(
      <Provider store={store}>
        <ExpectedNotificationsSystem notifications={notifications} theme={customTheme}/>
      </Provider>
    );
    expect(wrapper.find(NotificationsContainer).length).toEqual(8);
    expect(wrapper.find(Notification).length).toEqual(3);
    expect(wrapper.html()).toEqual(expectedWrapper.html());
  });

  it('should use filter and render 1 notification', () => {
    const notifications = genNotifications(3);
    notifications.push(genNotification({style: 'alert'}));
    const store = mockStore({notifications});
    const customTheme = Object.assign({}, theme, {smallScreenMin: 380});
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedNotificationsSystem
          theme={customTheme}
          filter={notif => notif.style === 'alert'}
        />
      </Provider>
    );
    expect(wrapper.find(Notification).length).toEqual(1);
  });
});
