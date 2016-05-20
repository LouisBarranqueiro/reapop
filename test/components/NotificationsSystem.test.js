import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import ConnectedNotificationsSystem, {
  NotificationsSystem,
  defaultValues
} from '../../src/components/NotificationsSystem';
import Notification from '../../src/components/Notification';
import NotificationsContainer from '../../src/components/NotificationsContainer';
import {genNotifications, mockStore, checkPropTypes} from '../utils/fixtures';
import {ExpectedNotificationsSystem} from '../utils/expectedComponents';
import {STATUS, POSITIONS} from '../../src/constants';
import theme from 'reapop-theme-wybo';

describe('<NotificationsSystem/>', () => {
  const otherProps = {
    theme
  };

  it('should not throw error during propTypes validation', () => {
    checkPropTypes({
      notifications: [],
      theme,
      defaultValues
    }, NotificationsSystem.propTypes, true);
  });

  it('should mount with default props', () => {
    const props = mount(<NotificationsSystem {...otherProps}/>).props();
    expect(props.notifications).toEqual([]);
    expect(props.defaultValues).toEqual(defaultValues);
  });

  it('should mount with custom props', () => {
    const customDefaultValue = {
      status: STATUS.success,
      position: POSITIONS.bottomRight,
      dismissible: false,
      dismissAfter: 99999,
      allowHTML: true
    };
    const props = mount(<NotificationsSystem
      defaultValues={customDefaultValue} {...otherProps}/>).props();
    expect(props.defaultValues).toEqual(customDefaultValue);
    expect(props.defaultValues).toNotEqual(defaultValues);
  });

  it('should render 1 empty notifications container (mobile)', () => {
    const wrapper = mount(<NotificationsSystem {...otherProps}/>);
    const expectedWrapper = mount(<ExpectedNotificationsSystem {...otherProps}/>);
    expect(wrapper.find(NotificationsContainer).length).toEqual(1);
    expect(wrapper.find(Notification).length).toEqual(0);
    expect(wrapper.html()).toEqual(expectedWrapper.html());
  });

  it('should render 4 empty notifications containers (desktop)', () => {
    // define the small screen breakpoint under default window width of PhantomJS (400px)
    // to simulate a desktop screen and test a portion of code
    const customTheme = Object.assign({}, theme, {smallScreenMin: 380});
    const wrapper = mount(<NotificationsSystem theme={customTheme}/>);
    const expectedWrapper = mount(<ExpectedNotificationsSystem theme={customTheme}/>);
    expect(wrapper.find(NotificationsContainer).length).toEqual(4);
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

  it('should render notifications in 4 notifications containers (desktop)', () => {
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
    expect(wrapper.find(NotificationsContainer).length).toEqual(4);
    expect(wrapper.find(Notification).length).toEqual(3);
    expect(wrapper.html()).toEqual(expectedWrapper.html());
  });
});
