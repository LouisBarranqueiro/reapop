import React from 'react';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import {
  defaultValues,
  className,
  transition,
  Notifications
} from '../../src/components/Notifications/Notifications';
import {className as notificationClassName} from '../../src/components/Notification/Notification';
import STATUS from '../../src/constants';
import {shallowRender, render} from '../helpers';

describe('Notifications', () => {
  it('should render component with correct JSX structure', () => {
    const component = shallowRender(Notifications);
    let expectedElement = (
      <div className={className}>
        <TransitionGroup
          transitionName={transition.name}
          transitionEnterTimeout={transition.enterTimeout}
          transitionLeaveTimeout={transition.leaveTimeout}/>
      </div>
    );
    expect(component).toEqualJSX(expectedElement);
  });

  it('should render component with its default props', () => {
    const component = render(Notifications);
    expect(component).toExist();
    expect(component.props.defaultValues).toEqual(defaultValues);
    expect(component.props.className).toEqual(className);
    expect(component.props.transition).toEqual(transition);
    expect(component.props.notificationClassName).toEqual(notificationClassName);
  });

  it('should render component with custom props', () => {
    const customProps = {
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
      notificationClassName: 'custom-notification-classname'
    };
    const component = render(Notifications, customProps);
    expect(component.props.defaultValues).toEqual(customProps.defaultValues);
    expect(component.props.className).toEqual(customProps.className);
    expect(component.props.transition).toEqual(customProps.transition);
    expect(component.props.notificationClassName).toEqual(customProps.notificationClassName);
  });
});
