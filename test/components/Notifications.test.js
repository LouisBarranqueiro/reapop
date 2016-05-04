import React from 'react';
import {shallow, mount} from 'enzyme';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import {Notifications} from '../../src/components/Notifications/Notifications';
import css from '../../src/components/Notifications/Notifications.scss';
import notificationCss from '../../src/components/Notification/Notification.scss';
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
      main: 'custom-notification-leaveActive',
      type: function(type) {
        return 'custom-notification-' + type;
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
  function expectedNotificationsJSX(props = {className, transition}) {
    return (
      <div className={props.className}>
        <TransitionGroup
          transitionName={props.transition.name}
          transitionEnterTimeout={props.transition.enterTimeout}
          transitionLeaveTimeout={props.transition.leaveTimeout}/>
      </div>
    );
  }
  /* eslint-enable */

  it('should render JSX and HTML correctly with default props', () => {
    const wrapper = shallow(<Notifications {...defaultProps}/>);
    const expectedElement = shallow(expectedNotificationsJSX());
    expect(wrapper.html()).toEqual(expectedElement.html());
    expect(wrapper.debug()).toEqual(expectedElement.debug());
  });
  
  it('should mount with default props', () => {
    const component = mount(<Notifications {...defaultProps}/>);
    expect(component).toExist();
    expect(component.props().defaultValues).toEqual(defaultValues);
    expect(component.props().className).toEqual(className);
    expect(component.props().transition).toEqual(transition);
  });
  
  it('should render JSX & HTML with custom props', () => {
    const wrapper = shallow(<Notifications {...customProps}/>);
    const expectedElement = shallow(expectedNotificationsJSX(customProps));
    expect(wrapper.html()).toEqual(expectedElement.html());
    expect(wrapper.debug()).toEqual(expectedElement.debug());
  });

  it('should mount component with custom props', () => {
    const wrapper = mount(<Notifications {...customProps}/>);
    expect(wrapper.props().defaultValues).toEqual(customProps.defaultValues);
    expect(wrapper.props().className).toEqual(customProps.className);
    expect(wrapper.props().transition).toEqual(customProps.transition);
    expect(wrapper.props().notificationClassName).toEqual(customProps.notificationClassName);
  });
});
