import React from 'react';
import {mount, shallow} from 'enzyme';
import STATUS from '../../src/constants';
import {Notification, className} from '../../src/components/Notification/Notification';

describe('Notification', () => {
  // a default notification
  const notification = {
    id: 123123123,
    title: 'title',
    message: 'message',
    dismissible: false,
    dismissAfter: 3333,
    status: STATUS.info,
    onAdd: function() {
    },
    onRemove: function() {
    }
  };

  // default props for Notification component
  const defaultProps = {
    removeNotification: function() {
    }
  };

  /**
   * Return expected JSX of Notification component
   * @param {Object} props
   * @returns {XML}
   */
  /* eslint-disable "react/prop-types" */
  function expectedNotificationJSX(notification) {
    const {title, message, status, dismissible} = notification;
    let titleDiv = null;
    if (title) {
      titleDiv = <p className={className.title}>{title}</p>;
    }
    return (
      <div className={`${className.main} ${className.status(status)}`}
           onClick={dismissible ? this._remove : ''}>
        <i className={className.icon}></i>
        {titleDiv}
        {message}
      </div>
    );
  }
  /* eslint-enable "react/prop-types" */

  it('should render JSX and HTML correctly (with title)', () => {
    const wrapper = shallow(<Notification key={notification.id} className={className}
      {...notification} {...defaultProps}/>);
    const expectedComponent = shallow(expectedNotificationJSX(notification));
    expect(wrapper.html()).toEqual(expectedComponent.html());
    expect(wrapper.debug()).toEqual(expectedComponent.debug());
  });

  it('should render JSX and HTML correctly (without title)', () => {
    const _notification = Object.assign({}, notification);
    // remove title
    delete _notification.title;
    const wrapper = shallow(<Notification key={_notification.id} className={className}
      {..._notification} {...defaultProps}/>);
    const expectedComponent = shallow(expectedNotificationJSX(_notification));
    expect(wrapper.html()).toEqual(expectedComponent.html());
    expect(wrapper.debug()).toEqual(expectedComponent.debug());
  });

  it('should mount with passed props', () => {
    const wrapper = mount(<Notification key={notification.id} className={className}
      {...notification} {...defaultProps}/>);
    expect(wrapper.props().removeNotification).toEqual(defaultProps.removeNotification);
    expect(wrapper.props().id).toEqual(notification.id);
    expect(wrapper.props().title).toEqual(notification.title);
    expect(wrapper.props().message).toEqual(notification.message);
    expect(wrapper.props().status).toEqual(notification.status);
    expect(wrapper.props().dismissible).toEqual(notification.dismissible);
    expect(wrapper.props().dismissAfter).toEqual(notification.dismissAfter);
    expect(wrapper.props().onAdd()).toEqual(notification.onAdd());
    expect(wrapper.props().onRemove()).toEqual(notification.onRemove());
  });

  it('should run onAdd() callback at componentDidMount() lifecycle', () => {
    const errorMessage = 'onAdd() callback';
    const _notification = Object.assign({}, notification, {
      // here we throw an error to capture where
      // the code has been executed before error was thrown
      onAdd: function() {
        throw new Error(errorMessage);
      }
    });
    try {
      mount(<Notification key={_notification.id} className={className}
        {..._notification} {...defaultProps}/>);
    }
    catch (error) {
      expect(error.stack).toMatch(/onAdd\ncomponentDidMount/);
      expect(error.message).toEqual(errorMessage);
    }
  });

  it('should run onRemove() callback at componentWillUnmount() lifecycle', () => {
    const errorMessage = 'onRemove() callback';
    const _notification = Object.assign({}, notification, {
      // here we throw an error to capture where
      // the code has been executed before error was thrown
      onRemove: function() {
        throw new Error(errorMessage);
      }
    });
    const wrapper = mount(<Notification key={_notification.id} className={className}
      {..._notification} {...defaultProps}/>);
    try {
      wrapper.unmount();
    }
    catch (error) {
      expect(error.stack).toMatch(/onRemove\ncomponentWillUnmount/);
      expect(error.message).toEqual(errorMessage);
    }
  });
});
