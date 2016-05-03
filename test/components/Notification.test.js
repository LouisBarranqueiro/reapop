import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {genNotification, mockStore} from '../fixtures';
import {types, removeNotification} from '../../src/store/notifications';
import css from '../../src/components/Notification/Notification.scss';
import ConnectNotification, {Notification} from '../../src/components/Notification/Notification';

describe('Notification', () => {
  let notification = null;
  let store = null;

  // default className for Notification component
  const className = {
    main: css['notification'],
    status: function(status) {
      return css[`notification-${status}`];
    },
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

  beforeEach('generate a new notification and init store', () => {
    notification = genNotification();
    store = mockStore({notifications: []});
  });

  it('should mount with default props', () => {
    delete notification.onAdd;
    delete notification.onRemove;
    const wrapper = mount(
      <Notification key={notification.id} {...notification}
                    removeNotification={removeNotification}/>
    );
    expect(wrapper.props().className.main).toEqual(className.main);
    expect(wrapper.props().className.icon).toEqual(className.icon);
    expect(wrapper.props().className.title).toEqual(className.title);
    expect(wrapper.props().className.message).toEqual(className.message);
    expect(wrapper.props().className.status()).toEqual(className.status());
    expect(wrapper.props().removeNotification).toEqual(removeNotification);
    expect(wrapper.props().onAdd()).toEqual((() => {
    })());
    expect(wrapper.props().onRemove()).toEqual((() => {
    })());
  });

  it('should render JSX and HTML correctly (with title)', () => {
    notification.dismissible = false;
    const wrapper = mount(
      <Provider store={store}>
        <ConnectNotification key={notification.id} {...notification}/>
      </Provider>
    );
    const expectedComponent = mount(renderExpectedNotification(notification));
    expect(wrapper.html()).toEqual(expectedComponent.html());
  });

  it('should render JSX and HTML correctly (without title)', () => {
    notification.dismissible = false;
    notification.title = null;
    const wrapper = mount(
      <Provider store={store}>
        <ConnectNotification key={notification.id} {...notification}/>
      </Provider>
    );

    const expectedComponent = mount(renderExpectedNotification(notification));
    expect(wrapper.html()).toEqual(expectedComponent.html());
  });

  it('should run onAdd() callback at componentDidMount() lifecycle', () => {
    const errorMessage = 'onAdd() callback';
    // we throw an error to capture where
    // the code has been executed before error was thrown
    notification.onAdd = () => {
      throw new Error(errorMessage);
    };
    try {
      mount(
        <Provider store={store}>
          <ConnectNotification key={notification.id} {...notification}/>
        </Provider>
      );
    }
    catch (error) {
      expect(error.stack).toMatch(/onAdd\ncomponentDidMount/);
      expect(error.message).toEqual(errorMessage);
    }
  });

  it('should run onRemove() callback at componentWillUnmount() lifecycle', () => {
    const errorMessage = 'onRemove() callback';
    // we throw an error to capture where
    // the code has been executed before error was thrown
    notification.onRemove = () => {
      throw new Error(errorMessage);
    };
    const wrapper = mount(
      <Provider store={store}>
        <ConnectNotification key={notification.id} {...notification}/>
      </Provider>
    );
    try {
      wrapper.unmount();
    }
    catch (error) {
      expect(error.stack).toMatch(/onRemove\ncomponentWillUnmount/);
      expect(error.message).toEqual(errorMessage);
    }
  });

  it('should create an action to remove the notification when it is clicked', () => {
    notification.dismissible = true;
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
});
