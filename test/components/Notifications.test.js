import React from 'react';
import {shallow, mount} from 'enzyme';
import {Provider} from 'react-redux';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import ConnectNotifications, {Notifications} from '../../src/components/Notifications/Notifications';
import ConnectNotification, {className as notificationClassName} from '../../src/components/Notification/Notification';
import css from '../../src/components/Notifications/Notifications.scss';
import notificationCss from '../../src/components/Notification/Notification.scss';
import {genNotifications, mockStore} from '../fixtures';
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
  // default transition for notifications
  const transition = {
    enterTimeout: 400,
    leaveTimeout: 400,
    name: {
      enter: notificationCss['notification-enter'],
      enterActive: notificationCss['notification-enter-active'],
      leave: notificationCss['notification-leave'],
      leaveActive: notificationCss['notification-leave-active']
    }
  };

  // default props for Notifications component
  const defaultProps = {
    notifications: []
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
   * @returns {XML}
   */
  /* eslint-disable "react/prop-types" */
  function renderExpectedNotifications(props = {className, transition, notificationClassName}, notifications = []) {
    /**
     * Render notifications
     * @returns {Array} notifications (JSX)
     */
    function renderNotifications() {
      const {status, dismissible, dismissAfter} = defaultValues;
      const {notificationClassName} = props;
      return notifications.map((notification) => {
        return (
          <ConnectNotification key={notification.id} id={notification.id} title={notification.title}
                               message={notification.message}
                               status={notification.status || status}
                               dismissible={notification.dismissible === dismissible}
                               dismissAfter={notification.dismissAfter != null
                      ? notification.dismissAfter
                      : dismissAfter}
                               onAdd={notification.onAdd}
                               onRemove={notification.onRemove}
                               className={notificationClassName}/>
        );
      });
    }

    return (
      <div className={props.className}>
        <TransitionGroup
          transitionName={props.transition.name}
          transitionEnterTimeout={props.transition.enterTimeout}
          transitionLeaveTimeout={props.transition.leaveTimeout}>
          {renderNotifications()}
        </TransitionGroup>
      </div>
    );
  }
  /* eslint-enable */

  it('should mount with default props', () => {
    const component = mount(<Notifications {...defaultProps}/>);
    expect(component).toExist();
    expect(component.props().defaultValues).toEqual(defaultValues);
    expect(component.props().className).toEqual(className);
    expect(component.props().transition).toEqual(transition);
  });

  it('should mount component with custom props', () => {
    const wrapper = mount(<Notifications {...customProps}/>);
    expect(wrapper.props().defaultValues).toEqual(customProps.defaultValues);
    expect(wrapper.props().className).toEqual(customProps.className);
    expect(wrapper.props().transition).toEqual(customProps.transition);
    expect(wrapper.props().notificationClassName).toEqual(customProps.notificationClassName);
  });

  it('should render no notifications (default props)', () => {
    const wrapper = shallow(<Notifications {...defaultProps}/>);
    const expectedElement = shallow(renderExpectedNotifications());
    expect(wrapper.html()).toEqual(expectedElement.html());
    // we use `debug()` to check that `TransitionGroup` tag are present
    // because after being rendered, it becomes a `span` tag
    expect(wrapper.debug()).toEqual(expectedElement.debug());
  });

  it('should render notifications (default props)', () => {
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

  it('should render no notifications (custom props)', () => {
    const wrapper = shallow(<Notifications {...customProps}/>);
    const expectedElement = shallow(renderExpectedNotifications(customProps));
    expect(wrapper.html()).toEqual(expectedElement.html());
    // we use `debug()` to check that `TransitionGroup` tag are present
    // because after being rendered, it becomes a `span` tag
    expect(wrapper.debug()).toEqual(expectedElement.debug());
  });

  it('should render notifications (custom props)', () => {
    const notifications = genNotifications(3);
    const store = mockStore({notifications});
    const wrapper = mount(
      <Provider store={store}>
        <ConnectNotifications {...customProps}/>
      </Provider>
    );
    const expectedElement = mount(
      <Provider store={store}>
        {renderExpectedNotifications(customProps, notifications)}
      </Provider>
    );
    expect(wrapper.html()).toEqual(expectedElement.html());
  });
});
