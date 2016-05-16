import React, {Component} from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import _ from 'lodash';
import ConnectedNotificationsSystem, {NotificationsSystem} from '../../src/components/NotificationsSystem';
import Notification, {
  defaultValues,
  className as notificationClassName
} from '../../src/components/Notification';
import NotificationsContainer, {
  className as containerClassName, transition
} from '../../src/components/NotificationsContainer';
import css from '../../src/styles/styles.scss';
import {genNotifications, mockStore} from '../fixtures';
import {STATUS, POSITIONS} from '../../src/constants';

describe('<NotificationsSystem/>', () => {
  // default config
  const config = {
    smallScreenMin: 768
  };
  // default className for notifications container
  const className = 'reapop-notifications-system';
  // full custom properties object for a Notifications component
  const customProps = {
    notifications: [],
    config: {
      smallScreenMin: 480
    },
    defaultValues: {
      status: STATUS.info,
      position: POSITIONS.topRight,
      dismissible: false,
      dismissAfter: 3333,
      allowHTML: true
    },
    className: 'custom-notifications-system',
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
    containerClassName: {
      main: css['custom-notification'],
      position: (position) => {
        return `custom-notification-container--${position}`;
      }
    },
    notificationClassName: {
      main: 'custom-notification',
      meta: 'custom-notification-meta',
      title: 'custom-notification-title',
      message: 'custom-notification-message',
      icon: 'fa custom-notification-icon',
      status: (status) => {
        return `custom-notification--${status}`;
      },
      dismissible: 'custom-notification--dismissible',
      buttons: (count) => {
        if (count === 0) {
          return '';
        }
        else if (count === 1) {
          return 'custom-notification--buttons-1';
        }
        else if (count === 2) {
          return 'custom-notification--buttons-2';
        }
        return 'custom-notification-buttons';
      },
      button: 'custom-notification-button',
      buttonText: 'custom-notification-button-text'
    }
  };

  class ExpectedNotificationsSystem extends Component {
    // Default properties
    static defaultProps = {
      notifications: [],
      config,
      defaultValues,
      className,
      containerClassName,
      notificationClassName,
      transition
    };

    // Properties types
    static propTypes = {
      notifications: React.PropTypes.array.isRequired,
      config: React.PropTypes.object.isRequired,
      defaultValues: React.PropTypes.shape({
        status: React.PropTypes.oneOf(_.values(STATUS)),
        dismissible: React.PropTypes.bool.isRequired,
        position: React.PropTypes.string.isRequired,
        dismissAfter: React.PropTypes.number.isRequired,
        allowHTML: React.PropTypes.bool.isRequired
      }),
      className: React.PropTypes.string,
      notificationClassName: React.PropTypes.object,
      containerClassName: React.PropTypes.shape({
        main: React.PropTypes.string.isRequired,
        position: React.PropTypes.func.isRequired
      }),
      transition: React.PropTypes.shape({
        name: React.PropTypes.object.isRequired,
        enterTimeout: React.PropTypes.number.isRequired,
        leaveTimeout: React.PropTypes.number.isRequired
      })
    };

    constructor(props) {
      super(props);
      this._renderNotificationsContainers = this._renderNotificationsContainers.bind(this);
    }

    /**
     * Render notifications containers
     * @returns {XML}
     * @private
     */
    _renderNotificationsContainers() {
      const {notifications, defaultValues: {position}, config: {smallScreenMin}} = this.props;
      // render all notifications in the same container at the top for small screens
      if (window.innerWidth < smallScreenMin) {
        return (
          <NotificationsContainer key='top' position='top' transition={transition}
            className={containerClassName} defaultValues={defaultValues}
            notificationClassName={notificationClassName} notifications={notifications}/>
        );
      }
      let positions = _.values(POSITIONS);
      // extract the default position of all positions
      positions.splice(positions.indexOf(position), 1);
      let notifs = notifications.filter((notif) => {
        return (!notif.position || notif.position === position);
      });
      // init array with all notifications with default position
      let JSX = [
        <NotificationsContainer key={position} position={position} transition={transition}
          className={containerClassName} defaultValues={defaultValues}
          notificationClassName={notificationClassName} notifications={notifs}/>
      ];
      // fill array with others containers
      JSX = JSX.concat(positions.map((position) => {
        let notifs = notifications.filter((notif) => {
          return position === notif.position;
        });
        return (
          <NotificationsContainer key={position} position={position} transition={transition}
            className={containerClassName} defaultValues={defaultValues}
            notificationClassName={notificationClassName} notifications={notifs}/>
        );
      }));
      return JSX;
    }

    /**
     * Render
     * @returns {XML}
     */
    render() {
      const {className} = this.props;

      return (
        <div className={className}>
          {this._renderNotificationsContainers()}
        </div>
      );
    }
  }

  it('should mount with default props', () => {
    const props = mount(<NotificationsSystem/>).props();
    expect(props.notifications).toEqual([]);
    expect(props.className).toEqual(className);
    expect(props.config).toEqual(config);
    expect(props.defaultValues).toEqual(defaultValues);
    expect(props.containerClassName).toEqual(containerClassName);
    expect(props.transition).toEqual(transition);
    expect(props.notificationClassName).toEqual(notificationClassName);
  });

  it('should mount with custom props', () => {
    const props = mount(<NotificationsSystem {...customProps}/>).props();
    expect(props.notifications).toEqual(customProps.notifications);
    expect(props.className).toEqual(customProps.className);
    expect(props.config).toEqual(customProps.config);
    expect(props.defaultValues).toEqual(customProps.defaultValues);
    expect(props.containerClassName).toEqual(customProps.containerClassName);
    expect(props.transition).toEqual(customProps.transition);
    expect(props.notificationClassName).toEqual(customProps.notificationClassName);
  });

  it('should render 1 empty notifications container (mobile)', () => {
    const wrapper = mount(<NotificationsSystem/>);
    const expectedWrapper = mount(<ExpectedNotificationsSystem/>);
    expect(wrapper.find(NotificationsContainer).length).toEqual(1);
    expect(wrapper.find(Notification).length).toEqual(0);
    expect(wrapper.html()).toEqual(expectedWrapper.html());
  });

  it('should render 4 empty notifications containers (desktop)', () => {
    // define the small screen breakpoint under default window width of PhantomJS (400px)
    // to simulate a desktop screen and test a portion of code
    const config = {
      smallScreenMin: 380
    };
    const wrapper = mount(<NotificationsSystem config={config}/>);
    const expectedWrapper = mount(<ExpectedNotificationsSystem config={config}/>);
    expect(wrapper.find(NotificationsContainer).length).toEqual(4);
    expect(wrapper.find(Notification).length).toEqual(0);
    expect(wrapper.html()).toEqual(expectedWrapper.html());
  });

  it('should render notifications in 1 notifications containers (mobile)', () => {
    const notifications = genNotifications(3);
    const store = mockStore({notifications});
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedNotificationsSystem notifications={notifications}/>
      </Provider>
    );
    const expectedWrapper = mount(
      <Provider store={store}>
        <ExpectedNotificationsSystem notifications={notifications}/>
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
    const config = {
      smallScreenMin: 380
    };
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedNotificationsSystem config={config} notifications={notifications}/>
      </Provider>
    );
    const expectedWrapper = mount(
      <Provider store={store}>
        <ExpectedNotificationsSystem config={config} notifications={notifications}/>
      </Provider>
    );
    expect(wrapper.find(NotificationsContainer).length).toEqual(4);
    expect(wrapper.find(Notification).length).toEqual(3);
    expect(wrapper.html()).toEqual(expectedWrapper.html());
  });
});
