import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {mount, shallow} from 'enzyme';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import {mockStore, genNotification, genNotifications} from '../fixtures';
import NotificationContainer from '../../src/components/NotificationsContainer';
import css from '../../src/components/NotificationsContainer/styles.scss';
import Notification, {
  defaultValues,
  className as notificationClassName,
  transition
} from '../../src/components/Notification';
import {POSITIONS} from '../../src/constants';

describe('<NotificationsContainer/>', () => {
  let notifications = [];
  let store = null;

  // Expected className for notifications container
  const className = {
    main: css['notifications-container'],
    position: function(position) {
      return css[`notifications-container--${position}`];
    }
  };
  // default transition for notifications
  const transition = {
    enterTimeout: 400,
    leaveTimeout: 400,
    name: {
      enter: css['notification-enter'],
      enterActive: css['notification-enter-active'],
      leave: css['notification-leave'],
      leaveActive: css['notification-leave-active']
    }
  };
  // Expected Notification Container
  class ExpectedNotificationContainer extends Component {
    static defaultProps = {
      className
    };

    constructor(props) {
      super(props);
      this._renderNotifications = this._renderNotifications.bind(this);
    }

    _renderNotifications() {
      // get all notifications and default values for notifications
      const {
        position, notificationClassName,
        defaultValues: {status, dismissible, dismissAfter, allowHTML}
      } = this.props;
      let {notifications} = this.props;

      // when notifications are displayed at the bottom,
      // we display notifications from bottom to top
      if ([POSITIONS.bottomLeft, POSITIONS.bottomRight].indexOf(position) >= 0) {
        notifications = notifications.reverse();
      }

      return notifications.map((notification) => {
        const hasDismissibleProp = typeof notification.dismissible === 'boolean';
        const hasDismissAfterProp = notification.dismissAfter >= 0;
        const hasAllowHTMLProp = typeof notification.allowHTML === 'boolean';
        return (
          <Notification key={notification.id} id={notification.id} title={notification.title}
            message={notification.message} status={notification.status || status}
            dismissible={hasDismissibleProp ? notification.dismissible : dismissible}
            dismissAfter={hasDismissAfterProp ? notification.dismissAfter : dismissAfter}
            allowHTML={hasAllowHTMLProp ? notification.allowHTML : allowHTML}
            onAdd={notification.onAdd} onRemove={notification.onRemove}
            buttons={notification.buttons} className={notificationClassName}/>
        );
      });
    }

    render() {
      const {className, position, transition: {name, enterTimeout, leaveTimeout}} = this.props;

      return (
        <div className={`${className.main} ${className.position(position)}`}>
          <TransitionGroup transitionName={name} transitionEnterTimeout={enterTimeout}
            transitionLeaveTimeout={leaveTimeout}>
            {this._renderNotifications()}
          </TransitionGroup>
        </div>
      );
    }
  }

  beforeEach('generate a new notification and init store', () => {
    notifications = genNotifications(3);
    store = mockStore({notifications: []});
  });

  it('should mount with default props', () => {
    const wrapper = mount(
      <NotificationContainer position={POSITIONS.topLeft} notifications={[]} transition={transition}
        notificationClassName={notificationClassName} defaultValues={defaultValues}/>
    );
    const props = wrapper.props();
    expect(props.className.main).toEqual(className.main);
    expect(
      props.className.position(POSITIONS.topLeft)
    ).toEqual(className.position(POSITIONS.topLeft));
    expect(props.defaultValues).toEqual(defaultValues);
    expect(props.transition).toEqual(transition);
    expect(props.notificationClassName).toEqual(notificationClassName);
  });
  
  it('should render no notifications', () => {
    const wrapper = shallow(
      <NotificationContainer position={POSITIONS.topLeft} notifications={[]} transition={transition}
        notificationClassName={notificationClassName} defaultValues={defaultValues}/>
    );
    const expectedWrapper = shallow(
      <ExpectedNotificationContainer position={POSITIONS.topLeft} notifications={[]}
        transition={transition} notificationClassName={notificationClassName}
        defaultValues={defaultValues}/>
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
        <NotificationContainer position={POSITIONS.topLeft} notifications={notifications}
          transition={transition}
          notificationClassName={notificationClassName} defaultValues={defaultValues}/>
      </Provider>
    );
    const expectedWrapper = mount(
      <Provider store={store}>
        <ExpectedNotificationContainer store={store} position={POSITIONS.topLeft}
          notifications={notifications}
          transition={transition} notificationClassName={notificationClassName}
          defaultValues={defaultValues}/>
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
        <NotificationContainer position={POSITIONS.bottomLeft} notifications={[notification]}
          transition={transition}
          notificationClassName={notificationClassName} defaultValues={defaultValues}/>
      </Provider>
    );
    const expectedWrapper = mount(
      <Provider store={store}>
        <ExpectedNotificationContainer position={POSITIONS.bottomLeft} notifications={[notification]}
          transition={transition}
          notificationClassName={notificationClassName} defaultValues={defaultValues}/>
      </Provider>
    );
    const props = wrapper.find(Notification).props();
    expect(props.status).toEqual(defaultValues.status);
    expect(props.dismissible).toEqual(defaultValues.dismissible);
    expect(props.dismissAfter).toEqual(defaultValues.dismissAfter);
    expect(props.allowHTML).toEqual(defaultValues.allowHTML);
    expect(wrapper.html()).toEqual(expectedWrapper.html());
  });

  it('should reverse and render notifications (bottom notifications)', () => {
    // clone array of notifications
    const notifications1 = [...notifications];
    const notifications2 = [...notifications];
    const expectedNotifications = [...notifications].reverse();
    const wrapper = mount(
      <Provider store={store}>
        <NotificationContainer position={POSITIONS.bottomLeft} notifications={notifications1}
          transition={transition}
          notificationClassName={notificationClassName} defaultValues={defaultValues}/>
      </Provider>
    );
    const expectedWrapper = mount(
      <Provider store={store}>
        <ExpectedNotificationContainer position={POSITIONS.bottomLeft}
          notifications={notifications2}
          transition={transition} notificationClassName={notificationClassName}
          defaultValues={defaultValues}/>
      </Provider>
    );
    const props = wrapper.find(NotificationContainer).props();
    expect(props.notifications).toEqual(expectedNotifications);
    expect(wrapper.html()).toEqual(expectedWrapper.html());
  });
});
