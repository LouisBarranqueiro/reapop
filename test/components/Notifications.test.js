import React from 'react';
import {shallow, mount} from 'enzyme';
import {Provider} from 'react-redux';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import ConnectNotifications, {Notifications} from '../../src/components/Notifications/Notifications';
import ConnectNotification, {
  transition,
  className as notificationClassName
} from '../../src/components/Notification/Notification';
import css from '../../src/components/Notifications/Notifications.scss';
import notificationCSS from '../../src/components/Notification/Notification.scss';
import {genNotification, genNotifications, mockStore} from '../fixtures';
import STATUS from '../../src/constants';

describe('Notifications', () => {
  // default value for notifications
  const defaultValues = {
    status: null,
    dismissible: true,
    dismissAfter: 5000
  };
  // default className for notifications container
  const className = css['notifications-container'];
  // default props for Notifications component
  const defaultProps = {
    notifications: []
  };
  // default transition for Notification component
  const transition = {
    enterTimeout: 400,
    leaveTimeout: 400,
    name: {
      enter: notificationCSS['notification-enter'],
      enterActive: notificationCSS['notification-enter-active'],
      leave: notificationCSS['notification-leave'],
      leaveActive: notificationCSS['notification-leave-active']
    }
  };
  // full custom properties object for a Notifications component
  const customProps = {
    notifications: [],
    defaultValues: {
      status: STATUS.info,
      dismissAfter: 3333,
      dismissible: false
    },
    className: 'custom-notification',
    transition: {
      enterTimeout: 333,
      leaveTimeout: 333,
      name: {
        enter: 'custom-notification-enter',
        enterActive: 'custom-notification-enterActive',
        leave: 'custom-notification-leave',
        leaveActive: 'custom-notification-leaveActive'
      }
    },
    notificationClassName: {
      main: 'custom-notification',
      status: function(status) {
        return 'custom-notification-' + status;
      },
      title: 'custom-notification-title',
      icon: 'custom-notification-icon'
    }
  };

  /**
   * Return expected Notifications JSX
   * @param {Object} props
   * @param {Array} notifications an Array of notification object
   * @returns {XML}
   */
  function renderExpectedNotifications(props = {
    className,
    transition,
    notificationClassName
  }, notifications = []) {
    /**
     * Render notifications
     * @returns {XML}
     */
    function renderNotifications() {
      const {status, dismissible, dismissAfter} = defaultValues;
      const {notificationClassName} = props;
      return notifications.map((notification) => {
        return (
          <ConnectNotification key={notification.id} id={notification.id} title={notification.title}
                               message={notification.message}
                               status={notification.status || status}
                               dismissible={notification.dismissible != null
                                ? notification.dismissible
                                : dismissible}
                               dismissAfter={notification.dismissAfter != null
                                ? notification.dismissAfter
                                : dismissAfter}
                               onAdd={notification.onAdd}
                               onRemove={notification.onRemove}
                               actions={notification.actions}
                               className={notificationClassName}
                               transition={transition}/>
        );
      });
    }
    const {name, enterTimeout, leaveTimeout} = props.transition;
    return (
      <div className={props.className}>
        <TransitionGroup
          transitionName={name}
          transitionEnterTimeout={enterTimeout}
          transitionLeaveTimeout={leaveTimeout}>
          {renderNotifications()}
        </TransitionGroup>
      </div>
    );
  }

  it('should mount with default props', () => {
    const wrapper = mount(<Notifications {...defaultProps}/>);
    expect(wrapper.props().defaultValues).toEqual(defaultValues);
    expect(wrapper.props().className).toEqual(className);
    expect(wrapper.props().transition).toEqual(transition);
  });

  it('should mount component with custom props', () => {
    const wrapper = mount(<Notifications {...customProps}/>);
    expect(wrapper.props().defaultValues).toEqual(customProps.defaultValues);
    expect(wrapper.props().className).toEqual(customProps.className);
    expect(wrapper.props().transition).toEqual(customProps.transition);
    expect(wrapper.props().notificationClassName).toEqual(customProps.notificationClassName);
  });

  it('should render no notifications', () => {
    const wrapper = shallow(<Notifications {...defaultProps}/>);
    const expectedElement = shallow(renderExpectedNotifications());
    expect(wrapper.html()).toEqual(expectedElement.html());
    // `equals()` doesn't work in this case, I don't know why so
    // we use `debug()` to check that `TransitionGroup` tag are present
    // because after being rendered, it becomes a `span` tag
    expect(wrapper.debug()).toEqual(expectedElement.debug());
  });

  it('should render notifications with default values for notifications', () => {
    const notification = genNotification();
    delete notification.status;
    delete notification.dismissAfter;
    delete notification.dismissible;
    const store = mockStore({notifications: [notification]});
    const wrapper = mount(
      <Provider store={store}>
        <ConnectNotifications {...defaultProps}/>
      </Provider>
    );
    const props = wrapper.find(ConnectNotification).props();
    const expectedElement = mount(
      <Provider store={store}>
        {renderExpectedNotifications(undefined, [notification])}
      </Provider>
    );
    expect(props.status).toEqual(defaultValues.status);
    expect(props.dismissible).toEqual(defaultValues.dismissible);
    expect(props.dismissAfter).toEqual(defaultValues.dismissAfter);
    expect(wrapper.html()).toEqual(expectedElement.html());
  });

  it('should render notifications', () => {
    const notifications = genNotifications(3);
    const store = mockStore({notifications});
    const wrapper = mount(
      <Provider store={store}>
        <ConnectNotifications {...defaultProps}/>
      </Provider>
    );
    const expectedElement = mount(
      <Provider store={store}>
        {renderExpectedNotifications(undefined, notifications)}
      </Provider>
    );
    expect(wrapper.html()).toEqual(expectedElement.html());
  });
});
