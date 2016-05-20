import React from 'react';
import {Provider} from 'react-redux';
import {mount, shallow} from 'enzyme';
import {ExpectedNotificationsContainer} from '../utils/expectedComponents';
import {mockStore, genNotification, genNotifications, checkPropTypes} from '../utils/fixtures';
import NotificationsContainer from '../../src/components/NotificationsContainer';
import {defaultValues} from '../../src/components/NotificationsSystem';
import Notification from '../../src/components/Notification';
import {POSITIONS} from '../../src/constants';
import theme from 'reapop-theme-wybo';

describe('<NotificationsContainer/>', () => {
  let notifications = [];
  let store = null;
  const otherProps = {
    theme,
    defaultValues
  };

  beforeEach('generate a new notification and init store', () => {
    notifications = genNotifications(3);
    store = mockStore({notifications: []});
  });

  it('should not throw error during propTypes validation', () => {
    checkPropTypes({
      notifications: [],
      position: POSITIONS.topLeft,
      defaultValues,
      theme
    }, NotificationsContainer.propTypes, true);
  });

  it('should mount with default props', () => {
    const wrapper = mount(
      <NotificationsContainer position={POSITIONS.topLeft} {...otherProps}/>
    );
    const props = wrapper.props();
    expect(props.notifications).toEqual([]);
  });

  it('should render no notifications', () => {
    const wrapper = shallow(
      <NotificationsContainer position={POSITIONS.topLeft} notifications={[]} {...otherProps}/>
    );
    const expectedWrapper = shallow(
      <ExpectedNotificationsContainer position={POSITIONS.topLeft} notifications={[]}
        {...otherProps}/>
    );
    expect(wrapper.html()).toEqual(expectedWrapper.html());
    // `equals()` doesn't work in this case, I don't know why so
    // we use `debug()` to check that `TransitionGroup` tag are present
    // because after being rendered, it becomes a `span` tag
    expect(wrapper.debug()).toEqual(expectedWrapper.debug());
  });

  it('should render notifications', () => {
    const wrapper = mount(
      <Provider store={store}>
        <NotificationsContainer position={POSITIONS.topLeft} notifications={notifications}
          {...otherProps}/>
      </Provider>
    );
    const expectedWrapper = mount(
      <Provider store={store}>
        <ExpectedNotificationsContainer position={POSITIONS.topLeft} notifications={notifications}
          {...otherProps}/>
      </Provider>
    );
    expect(wrapper.html()).toEqual(expectedWrapper.html());
  });

  it('should render notification with default values for notifications', () => {
    const notification = genNotification();
    delete notification.status;
    delete notification.dismissAfter;
    delete notification.dismissible;
    delete notification.allowHTML;
    const wrapper = mount(
      <Provider store={store}>
        <NotificationsContainer position={POSITIONS.bottomLeft} notifications={[notification]}
          {...otherProps}/>
      </Provider>
    );
    const expectedWrapper = mount(
      <Provider store={store}>
        <ExpectedNotificationsContainer position={POSITIONS.bottomLeft}
          notifications={[notification]}
          {...otherProps}/>
      </Provider>
    );
    const props = wrapper.find(Notification).props();
    expect(props.notification.status).toEqual(defaultValues.status);
    expect(props.notification.dismissible).toEqual(defaultValues.dismissible);
    expect(props.notification.dismissAfter).toEqual(defaultValues.dismissAfter);
    expect(props.notification.allowHTML).toEqual(defaultValues.allowHTML);
    expect(wrapper.html()).toEqual(expectedWrapper.html());
  });

  it('should reverse and render notifications (bottom notifications)', () => {
    // clone array of notifications
    const notifications1 = [...notifications];
    const notifications2 = [...notifications];
    const expectedNotifications = [...notifications].reverse();
    const wrapper = mount(
      <Provider store={store}>
        <NotificationsContainer position={POSITIONS.bottomLeft} notifications={notifications1}
          {...otherProps}/>
      </Provider>
    );
    const expectedWrapper = mount(
      <Provider store={store}>
        <ExpectedNotificationsContainer position={POSITIONS.bottomLeft}
          notifications={notifications2}
          {...otherProps}/>
      </Provider>
    );
    const props = wrapper.find(NotificationsContainer).props();
    expect(props.notifications).toEqual(expectedNotifications);
    expect(wrapper.html()).toEqual(expectedWrapper.html());
  });
});
