import React from 'react';
import {Provider} from 'react-redux';
import {mount, shallow} from 'enzyme';
import {ExpectedNotificationsContainer} from '../utils/expectedComponents';
import {mockStore, genNotifications, checkPropTypes} from '../utils/fixtures';
import NotificationsContainer from '../../src/components/NotificationsContainer';
import {POSITIONS} from '../../src/constants';
import theme from 'reapop-theme-wybo';

describe('<NotificationsContainer/>', () => {
  let notifications = [];
  let store = null;
  const otherProps = {
    theme
  };

  beforeEach('generate a new notification and init store', () => {
    notifications = genNotifications(3);
    store = mockStore({notifications: []});
  });

  it('should validate props', () => {
    const errors = checkPropTypes({
      notifications: [],
      position: POSITIONS.topLeft,
      theme
    }, NotificationsContainer.propTypes);

    expect(errors.notifications).toBeUndefined();
    expect(errors.position).toBeUndefined();
    expect(errors.theme).toBeUndefined();
  });

  it('should not validate props', () => {
    const errors = checkPropTypes({}, NotificationsContainer.propTypes);
    expect(errors.notifications).toBeDefined();
    expect(errors.position).toBeDefined();
    expect(errors.theme).toBeDefined();
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
