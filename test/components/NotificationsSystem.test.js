import React from 'react';
import {mount, shallow} from 'enzyme';
import ConnectedNotificationsSystem, {
  NotificationsSystem
} from '../../src/components/NotificationsSystem';
import {
  genRandomNotifications,
  mockStore,
  checkPropTypes,
  genNotifications
} from '../utils/fixtures';
import theme from 'reapop-theme-wybo';
import {Provider} from 'react-redux';

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

  describe('componentDidMount()', () => {
    it('should mount with default props and state', () => {
      const wrapper = mount(<NotificationsSystem theme={theme}/>);
      expect(wrapper.props()).toEqual({notifications: [], theme});
      expect(wrapper.state()).toEqual({windowWidth: window.innerWidth});
    });

    it('should add listener on window resize event', () => {
      const prevAddListenerFn = window.addEventListener;
      const addEventListenerSpy = jest.fn();
      Object.defineProperty(window, 'addEventListener', {value: addEventListenerSpy});
      const wrapper = shallow(<NotificationsSystem theme={theme}/>);
      expect(addEventListenerSpy).toHaveBeenCalledWith('resize', wrapper.instance()._updateWindowWidth);

      Object.defineProperty(window, 'addEventListener', {value: prevAddListenerFn});
    });
  });

  describe('componentWillUnmount()', () => {
    it('should remove listener on window resize event', () => {
      const prevRemoveListenerFn = window.removeEventListener;
      const removeEventListenerSpy = jest.fn();
      Object.defineProperty(window, 'removeEventListener', {value: removeEventListenerSpy});
      const wrapper = shallow(<NotificationsSystem theme={theme}/>);
      wrapper.instance().componentWillUnmount();
      expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', wrapper.instance()._updateWindowWidth);

      Object.defineProperty(window, 'removeEventListener', {value: prevRemoveListenerFn});
    });
  });

  describe('_updateWindowWidth()', () => {
    it('should update the state', () => {
      const prevWindowWidth = window.innerWidth;
      const newWidth = 100;
      const wrapper = shallow(<NotificationsSystem theme={theme}/>);
      expect(wrapper.state()).toEqual({windowWidth: window.innerWidth});
      Object.defineProperty(window, 'innerWidth', {value: newWidth});
      wrapper.instance()._updateWindowWidth();
      expect(wrapper.state()).toEqual({windowWidth: newWidth});

      Object.defineProperty(window, 'innerWidth', {value: prevWindowWidth});
    });
  });

  describe('render()', () => {
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

    it('should only render "alert" notifications', () => {
      const notifications = genNotifications(3);
      notifications[0].style = 'alert';
      const wrapper = shallow(
        <NotificationsSystem
          notifications={notifications}
          theme={theme}
          filter={notif => notif.style === 'alert'}
        />
      );
      expect(wrapper.debug({verbose: true})).toMatchSnapshot();
    });
  });
});

describe('<NotificationSystemContainer/>', () => {
  it('should read notifications from the store', () => {
    const notifications = genRandomNotifications(3);
    const store = mockStore({notifications});
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedNotificationsSystem theme={theme}/>
      </Provider>
    );
    const component = wrapper.children().children();
    expect(component.props().theme).toEqual(theme);
    expect(component.props().notifications).toEqual(notifications);
  });
});
