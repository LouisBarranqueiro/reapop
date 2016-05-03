import React from 'react';
import {mount, shallow} from 'enzyme';
import {Provider} from 'react-redux';
import STATUS from '../../src/constants';
import {genNotification, mockStore} from '../fixtures';
import {types} from '../../src/store/notifications';
import css from '../../src/components/Notification/Notification.scss';
import ConnectNotification, {Notification} from '../../src/components/Notification/Notification';

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

  // default className for Notification component
  const className = {
    main: css['notification'],
    status: function(status) {
      return css[`notification-${status}`];
    },
    // `fa` corresponds to font-awesome's class name
    icon: `fa ${css['notification-icon']}`,
    title: css['notification-title'],
    message: ''
  };

  /**
   * Return expected JSX of Notification component
   * @param {Object} props
   * @returns {XML}
   */
  /* eslint-disable "react/prop-types" */
  function renderExpectedNotification(notification) {
    const {title, message, status, dismissible} = notification;
    let titleDiv = null;
    if (title) {
      titleDiv = <h4 className={className.title}>{title}</h4>;
    }
    return (
      <div className={`${className.main} ${className.status(status)}`}
           onClick={dismissible ? this._remove : ''}>
        <i className={className.icon}></i>
        {titleDiv}
        <p className={className.message}>
          {message}
        </p>
      </div>
    );
  }

  /* eslint-enable "react/prop-types" */

  it('should mount with passed props', () => {
    const wrapper = mount(<Notification key={notification.id}
      {...notification} {...defaultProps}/>);
    expect(wrapper.props().className.main).toEqual(className.main);
    expect(wrapper.props().className.icon).toEqual(className.icon);
    expect(wrapper.props().className.title).toEqual(className.title);
    expect(wrapper.props().className.message).toEqual(className.message);
    expect(wrapper.props().className.status()).toEqual(className.status());
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

  it('should render JSX and HTML correctly (with title)', () => {
    const wrapper = shallow(<Notification key={notification.id} {...notification}
      {...defaultProps}/>);
    const expectedComponent = shallow(renderExpectedNotification(notification));
    expect(wrapper.html()).toEqual(expectedComponent.html());
    expect(wrapper.debug()).toEqual(expectedComponent.debug());
  });

  it('should render JSX and HTML correctly (without title)', () => {
    const _notification = Object.assign({}, notification);
    // remove title
    delete _notification.title;
    const wrapper = shallow(<Notification key={_notification.id} {..._notification}
      {...defaultProps}/>);
    const expectedComponent = shallow(renderExpectedNotification(_notification));
    expect(wrapper.html()).toEqual(expectedComponent.html());
    expect(wrapper.debug()).toEqual(expectedComponent.debug());
  });

  it('should create an action to remove the notification when it is clicked', () => {
    const notification = genNotification({dismissible: true});
    const store = mockStore({notification: [notification]});
    const wrapper = mount(
      <Provider store={store}>
        <ConnectNotification key={notification.id} {...notification}/>
      </Provider>
    );
    wrapper.find(ConnectNotification).simulate('click');
    const expectedAction = {
      type: types.REMOVE_NOTIFICATION,
      payload: notification.id
    };
    expect(store.getActions()).toEqual([expectedAction]);
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
      mount(<Notification key={_notification.id} {..._notification} {...defaultProps}/>);
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
    const wrapper = mount(<Notification key={_notification.id} {..._notification}
      {...defaultProps}/>);
    try {
      wrapper.unmount();
    }
    catch (error) {
      expect(error.stack).toMatch(/onRemove\ncomponentWillUnmount/);
      expect(error.message).toEqual(errorMessage);
    }
  });
});
