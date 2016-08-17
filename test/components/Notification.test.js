import React from 'react';
import {mount, shallow} from 'enzyme';
import {Provider} from 'react-redux';
import {Timer} from '../../src/helpers';
import ConnectNotification, {Notification} from '../../src/components/Notification';
import theme from 'reapop-theme-wybo';
import {types, removeNotification} from '../../src/store/notifications';
import {genNotification, mockStore, checkPropTypes} from '../utils/fixtures';
import {ExpectedNotification} from '../utils/expectedComponents';

describe('<Notification/>', () => {
  let notification = null;
  let store = null;
  const className = theme.notification.className;
  // these props are the same for all tests
  const otherProps = {
    className,
    removeNotification
  };
  
  beforeEach('generate a new notification and init store', () => {
    notification = genNotification();
    store = mockStore({notifications: []});
  });
  
  it('should validate props', () => {
    const errors = checkPropTypes({
      className,
      notification,
      removeNotification
    }, Notification.propTypes);

    expect(errors.className).toNotExist();
    expect(errors.notification).toNotExist();
    expect(errors.removeNotification).toNotExist();
  });
  
  it('should mount with initial state', () => {
    // state component will be init without timer because notification have buttons
    let wrapper = mount(<Notification notification={notification} {...otherProps}/>);
    expect(wrapper.state().timer).toEqual(null);
    // state component will be init with timer because notification doesn't have buttons
    notification.buttons = [];
    wrapper = mount(<Notification notification={notification} {...otherProps}/>);
    expect(wrapper.state().timer).toBeA(Timer);
  });
  
  it('should update state when receiving new props', () => {
    // state component will be init without timer because notification have buttons
    let wrapper = mount(<Notification notification={notification} {...otherProps}/>);
    expect(wrapper.state().timer).toEqual(null);
    // we delete buttons to provoke creation of a Timer
    // at `componentWillReceivedProps()` component lifecycle
    notification.buttons = [];
    wrapper.setProps(notification);
    expect(wrapper.state().timer).toBeA(Timer);
  });
  
  it('should render component (with title)', () => {
    const wrapper = shallow(
      <Notification notification={notification} {...otherProps}/>
    );
    const expectedComponent = shallow(
      <ExpectedNotification notification={notification} {...otherProps}/>
    );
    expect(wrapper.html()).toEqual(expectedComponent.html());
  });
  
  it('should render component (with HTML in the title)', () => {
    notification.title = 'A title with <i>html</i>';
    const wrapper = shallow(
      <Notification notification={notification} {...otherProps}/>
    );
    const expectedComponent = shallow(
      <ExpectedNotification notification={notification} {...otherProps}/>
    );
    expect(wrapper.html()).toEqual(expectedComponent.html());
  });
  
  it('should render component (without title)', () => {
    notification.title = null;
    const wrapper = shallow(
      <Notification notification={notification} {...otherProps}/>
    );
    const expectedComponent = shallow(
      <ExpectedNotification notification={notification} {...otherProps}/>
    );
    expect(wrapper.html()).toEqual(expectedComponent.html());
  });
  
  it('should render component (with message)', () => {
    const wrapper = shallow(
      <Notification notification={notification} {...otherProps}/>
    );
    const expectedComponent = shallow(
      <ExpectedNotification notification={notification} {...otherProps}/>
    );
    expect(wrapper.html()).toEqual(expectedComponent.html());
  });
  
  it('should render component (with HTML in the message)', () => {
    // add HTML in message and allow HTML
    notification.message = `${notification.message} <b>HEY</b>`;
    notification.allowHTML = true;
    const wrapper = shallow(
      <Notification notification={notification} {...otherProps}/>
    );
    const expectedComponent = shallow(
      <ExpectedNotification notification={notification} {...otherProps}/>
    );
    expect(wrapper.html()).toEqual(expectedComponent.html());
  });
  
  it('should render component (without message)', () => {
    notification.message = null;
    const wrapper = shallow(
      <Notification notification={notification} {...otherProps}/>
    );
    
    const expectedComponent = shallow(
      <ExpectedNotification notification={notification} {...otherProps}/>
    );
    expect(wrapper.html()).toEqual(expectedComponent.html());
  });
  
  it('should render component (with image)', () => {
    notification.image = 'an_url';
    const wrapper = shallow(
      <Notification notification={notification} {...otherProps}/>
    );
    
    const expectedComponent = shallow(
      <ExpectedNotification notification={notification} {...otherProps}/>
    );
    expect(wrapper.html()).toEqual(expectedComponent.html());
  });
  
  it('should render component (without image)', () => {
    notification.image = '';
    const wrapper = shallow(
      <Notification notification={notification} {...otherProps}/>
    );
    
    const expectedComponent = shallow(
      <ExpectedNotification notification={notification} {...otherProps}/>
    );
    expect(wrapper.html()).toEqual(expectedComponent.html());
  });

  it('should render component (with close button)', () => {
    notification.buttons = [];
    notification.dismissible = true;
    notification.closeButton = true;
    const wrapper = shallow(
      <Notification notification={notification} {...otherProps}/>
    );

    const expectedComponent = shallow(
      <ExpectedNotification notification={notification} {...otherProps}/>
    );
    expect(wrapper.html()).toEqual(expectedComponent.html());
  });

  it('should render component (without close button)', () => {
    notification.buttons = [];
    notification.dismissible = true;
    notification.closeButton = false;
    const wrapper = shallow(
      <Notification notification={notification} {...otherProps}/>
    );

    const expectedComponent = shallow(
      <ExpectedNotification notification={notification} {...otherProps}/>
    );
    expect(wrapper.html()).toEqual(expectedComponent.html());
  });
  
  it('should render component (with 2 buttons)', () => {
    const wrapper = shallow(
      <Notification notification={notification} {...otherProps}/>
    );
    
    const expectedComponent = shallow(
      <ExpectedNotification notification={notification} {...otherProps}/>
    );
    expect(wrapper.html()).toEqual(expectedComponent.html());
  });
  
  it('should render component (with 1 button)', () => {
    delete notification.buttons[1];
    const wrapper = shallow(
      <Notification notification={notification} {...otherProps}/>
    );
    const expectedComponent = shallow(
      <ExpectedNotification notification={notification} {...otherProps}/>
    );
    expect(wrapper.html()).toEqual(expectedComponent.html());
  });
  
  it('should render component (without buttons)', () => {
    notification.buttons = [];
    const wrapper = shallow(
      <Notification notification={notification} {...otherProps}/>
    );
    
    const expectedComponent = shallow(
      <ExpectedNotification notification={notification} {...otherProps}/>
    );
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
          <ConnectNotification notification={notification} {...otherProps}/>
        </Provider>
      );
    }
    catch (error) {
      expect(error.stack).toMatch(/onAdd[\s\S]*?componentDidMount/);
      expect(error.message).toEqual(errorMessage);
    }
    // and we update function to check that
    // component mount without any error
    notification.onAdd = () => {
      return 0;
    };
    mount(
      <Provider store={store}>
        <ConnectNotification notification={notification} {...otherProps}/>
      </Provider>
    );
  });
  
  it('should run onRemove() callback at componentWillUnmount() lifecycle', () => {
    const errorMessage = 'onRemove() callback';
    // we throw an error to capture where
    // the code has been executed before error was thrown
    notification.onRemove = () => {
      throw new Error(errorMessage);
    };
    let wrapper = mount(
      <Provider store={store}>
        <ConnectNotification notification={notification} {...otherProps}/>
      </Provider>
    );
    try {
      wrapper.unmount();
    }
    catch (error) {
      expect(error.stack).toMatch(/onRemove[\s\S]*?componentWillUnmount/);
      expect(error.message).toEqual(errorMessage);
    }
    // and we update function without `throw` call to check that
    // component unmount without any error
    notification.onRemove = () => {
      return 0;
    };
    wrapper = mount(
      <Provider store={store}>
        <ConnectNotification notification={notification} {...otherProps}/>
      </Provider>
    );
    wrapper.unmount();
  });
  
  it('should not throw an error at componentDidMount() lifecycle ' +
    '(onAdd() callback undefined)', () => {
    delete notification.onAdd;
    mount(
      <Provider store={store}>
        <ConnectNotification notification={notification} {...otherProps}/>
      </Provider>
    );
  });
  
  it('should not throw an error at componentWillUnmount() lifecycle ' +
    '(onRemove() callback undefined)', () => {
    delete notification.onRemove;
    const wrapper = mount(
      <Provider store={store}>
        <ConnectNotification notification={notification} {...otherProps}/>
      </Provider>
    );
    wrapper.unmount();
  });
  
  it('should create an action to remove the notification ' +
    'when it is clicked', () => {
    notification.dismissible = true;
    notification.buttons = [];
    notification.closeButton = false;

    const wrapper = mount(
      <Provider store={store}>
        <ConnectNotification notification={notification} {...otherProps}/>
      </Provider>
    );
    const expectedAction = {
      type: types.REMOVE_NOTIFICATION,
      payload: notification.id
    };

    wrapper.find(ConnectNotification).simulate('click');
    expect(store.getActions()).toEqual([expectedAction]);
  });

  it('should create an action to remove the notification ' +
    'when close button is clicked', () => {
    notification.dismissible = true;
    notification.buttons = [];
    notification.closeButton = true;
    const wrapper = mount(
      <Provider store={store}>
        <ConnectNotification notification={notification} {...otherProps}/>
      </Provider>
    );
    const expectedAction = {
      type: types.REMOVE_NOTIFICATION,
      payload: notification.id
    };
    wrapper.find(`.${className.closeButtonContainer} > span`).simulate('click');
    expect(store.getActions()).toEqual([expectedAction]);
  });
  
  it('should create an action to remove the notification ' +
    'when a action button is clicked (dismissible : false)', () => {
    // we set `dismissible` to `false` to be sure
    // that dismissible is ignored in this case
    notification.dismissible = false;
    const wrapper = mount(
      <Provider store={store}>
        <ConnectNotification notification={notification} {...otherProps}/>
      </Provider>
    );
    const expectedAction = {
      type: types.REMOVE_NOTIFICATION,
      payload: notification.id
    };

    wrapper.find(`.${className.button}`).first().simulate('click');
    expect(store.getActions()).toEqual([expectedAction]);
  });
  
  it('should create an action to remove the notification after ' +
    '`dismissAfter` duration', (done) => {
    const expectedAction = {
      type: types.REMOVE_NOTIFICATION,
      payload: notification.id
    };
    notification.dismissAfter = 10;
    // remove buttons otherwise `remove()` is not called after `dismissAfter` duration
    notification.buttons = [];
    mount(
      <Provider store={store}>
        <ConnectNotification notification={notification} {...otherProps}/>
      </Provider>
    );
    expect(store.getActions()).toEqual([]);
    setTimeout(() => {
      expect(store.getActions()).toEqual([expectedAction]);
      done();
    }, 15);
  });

  it('should not create an action to remove the notification ' +
    'while mouse is hovering it', (done) => {
    notification.dismissAfter = 10;
    notification.buttons = [];
    const wrapper = mount(
      <Provider store={store}>
        <ConnectNotification notification={notification} {...otherProps}/>
      </Provider>
    ).find(ConnectNotification);
    const expectedAction = {
      type: types.REMOVE_NOTIFICATION,
      payload: notification.id
    };
    // hover notification after 5s
    setTimeout(() => {
      wrapper.simulate('mouseEnter');
    }, 5);
    // check 5ms after `dismissAfter` duration that the store
    // is empty because mouse is hovering the notification
    setTimeout(() => {
      expect(store.getActions()).toEqual([]);
      // we leave notification
      wrapper.simulate('mouseLeave');
    }, 15);
    // and we check that the store contains an action
    setTimeout(() => {
      expect(store.getActions()).toEqual([expectedAction]);
      done();
    }, 21);
  });
  
  it('should not create an action to remove the notification ' +
    'when it is clicked (dismissible : false)', () => {
    notification.dismissible = false;
    const wrapper = mount(
      <Provider store={store}>
        <ConnectNotification notification={notification} {...otherProps}/>
      </Provider>
    );
    wrapper.find(ConnectNotification).simulate('click');
    expect(store.getActions()).toEqual([]);
  });

  it('should not create an action to remove the notification ' +
    'when a notification with a close button is clicked', () => {
    notification.dismissible = true;
    notification.buttons = [];
    notification.closeButton = true;
    const wrapper = mount(
      <Provider store={store}>
        <ConnectNotification notification={notification} {...otherProps}/>
      </Provider>
    );
    wrapper.find(ConnectNotification).simulate('click');
    expect(store.getActions()).toEqual([]);
  });

  it('should not create an action to remove the notification ' +
    'when it is clicked (no buttons)', (done) => {
    // we set `dismissible` to `true` to be sure that
    // `buttons.length` must equals `0` to allow removing
    // same thing for `dismissAfter`
    notification.dismissible = true;
    notification.dismissAfter = 5;
    let wrapper = mount(
      <Provider store={store}>
        <ConnectNotification notification={notification} {...otherProps}/>
      </Provider>
    );
    wrapper.find(ConnectNotification).simulate('click');
    expect(store.getActions()).toEqual([]);
    // we remove an button and test it again
    notification.buttons = notification.buttons.slice(0, 1);
    wrapper = mount(
      <Provider store={store}>
        <ConnectNotification notification={notification} {...otherProps}/>
      </Provider>
    );
    wrapper.find(ConnectNotification).simulate('click');
    expect(store.getActions()).toEqual([]);
    // check after `dismissAfter` duration
    setTimeout(() => {
      expect(store.getActions()).toEqual([]);
      done();
    }, 10);
  });

  it('should not create an action to remove the notification after ' +
    '`dismissAfter` duration (dismissAfter = 0)', (done) => {
    notification.dismissAfter = 0;
    mount(
      <Provider store={store}>
        <ConnectNotification notification={notification} {...otherProps}/>
      </Provider>
    );
    setTimeout(() => {
      expect(store.getActions()).toEqual([]);
      done();
    }, 10);
  });
});
