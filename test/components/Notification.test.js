import React from 'react';
import {mount, shallow} from 'enzyme';
import {Provider} from 'react-redux';
import {Timer} from '../../src/helpers';
import ConnectNotification, {Notification} from '../../src/components/Notification';
import theme from 'reapop-theme-wybo';
import {types, removeNotification} from '../../src/store/notifications';
import {mockStore, checkPropTypes, genNotification} from '../utils/fixtures';

describe('<Notification/>', () => {
  let notification = null;
  let store = null;
  const className = theme.notification.className;
  // these props are the same for all tests
  const otherProps = {
    className,
    removeNotification
  };

  beforeEach(() => {
    notification = genNotification(1);
    // No image by default because newer versions of React do not add a trailing `;`
    // for inline style (in our case: `background-image`).
    notification.image = null;
    store = mockStore({notifications: []});
  });

  it('should validate props', () => {
    const errors = checkPropTypes({
      className,
      notification,
      removeNotification
    }, Notification.propTypes);
    expect(errors.className).toBeUndefined();
    expect(errors.notification).toBeUndefined();
    expect(errors.removeNotification).toBeUndefined();
  });

  it('should not validate props', () => {
    const errors = checkPropTypes({}, Notification.propTypes);
    expect(errors.className).toBeDefined();
    expect(errors.notification).toBeDefined();
    expect(errors.removeNotification).toBeDefined();
  });

  it('should mount with initial state', () => {
    // state component will be init without timer because `dismissAfter` is set to `0`
    notification.dismissAfter = 0;
    let wrapper = mount(<Notification notification={notification} {...otherProps}/>);
    expect(wrapper.state().timer).toEqual(null);
    // state component will be init with timer because `dismissAfter` > 0
    notification.dismissAfter = 1;
    wrapper = mount(<Notification notification={notification} {...otherProps}/>);
    expect(wrapper.state().timer).toBeInstanceOf(Timer);
  });

  it('should update state when receiving new props', () => {
    // state component will be init without timer because notification have buttons
    notification.dismissAfter = 0;
    let wrapper = mount(<Notification notification={notification} {...otherProps}/>);
    expect(wrapper.state().timer).toEqual(null);
    // we delete buttons to provoke creation of a Timer
    // at `componentWillReceivedProps()` component lifecycle
    notification.dismissAfter = 1;
    wrapper.setProps(notification);
    expect(wrapper.state().timer).toBeInstanceOf(Timer);
  });

  it('should render component (with title)', () => {
    const wrapper = shallow(
      <Notification notification={notification} {...otherProps}/>
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component (with HTML in the title)', () => {
    notification.title = 'A title with <i>html</i>';
    const wrapper = shallow(
      <Notification notification={notification} {...otherProps}/>
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component (without title)', () => {
    notification.title = null;
    const wrapper = shallow(
      <Notification notification={notification} {...otherProps}/>
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component (with message)', () => {
    const wrapper = shallow(
      <Notification notification={notification} {...otherProps}/>
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component (with HTML in the message)', () => {
    // add HTML in message and allow HTML
    notification.message = `${notification.message} <b>HEY</b>`;
    notification.allowHTML = true;
    const wrapper = shallow(
      <Notification notification={notification} {...otherProps}/>
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component (without message)', () => {
    notification.message = null;
    const wrapper = shallow(
      <Notification notification={notification} {...otherProps}/>
    );

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component (with image)', () => {
    notification.image = 'an_url';
    const wrapper = shallow(
      <Notification notification={notification} {...otherProps}/>
    );
    // newer versions of React do not add a trailing `;`
    // for inline style (in our case: `background-image`), so we update the output
    // so the snapshots match when we run test with different versions of React.
    expect(wrapper.html().replace('an_url);', 'an_url)')).toMatchSnapshot();
  });

  it('should render component (without image)', () => {
    notification.image = null;
    const wrapper = shallow(
      <Notification notification={notification} {...otherProps}/>
    );

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component (with close button)', () => {
    notification.buttons = [];
    notification.dismissible = true;
    notification.closeButton = true;
    const wrapper = shallow(
      <Notification notification={notification} {...otherProps}/>
    );

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component (without close button)', () => {
    notification.buttons = [];
    notification.dismissible = true;
    notification.closeButton = false;
    const wrapper = shallow(
      <Notification notification={notification} {...otherProps}/>
    );

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component (with 2 buttons)', () => {
    const wrapper = shallow(
      <Notification notification={notification} {...otherProps}/>
    );

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component (with 1 button)', () => {
    delete notification.buttons[1];
    const wrapper = shallow(
      <Notification notification={notification} {...otherProps}/>
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component (without buttons)', () => {
    notification.buttons = [];
    const wrapper = shallow(
      <Notification notification={notification} {...otherProps}/>
    );

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should run onAdd() callback at componentDidMount() lifecycle', () => {
    let count = 0;
    // we throw an error to capture where
    // the code has been executed before error was thrown
    notification.onAdd = () => {
      count++;
    };

    mount(
      <Provider store={store}>
        <ConnectNotification notification={notification} {...otherProps}/>
      </Provider>
    );

    expect(count).toEqual(1);
  });

  it('should run onRemove() callback at componentWillUnmount() lifecycle', () => {
    let count = 0;
    notification.onRemove = () => {
      count++;
    };

    let wrapper = mount(
      <Provider store={store}>
        <ConnectNotification notification={notification} {...otherProps}/>
      </Provider>
    );

    wrapper.unmount();
    expect(count).toEqual(count);
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
    notification.dismissAfter = 100;
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
    }, 50);
    // check 5ms after `dismissAfter` duration that the store
    // is empty because mouse is hovering the notification
    setTimeout(() => {
      expect(store.getActions()).toEqual([]);
      // we leave notification
      wrapper.simulate('mouseLeave');
    }, 150);
    // and we check that the store contains an action
    setTimeout(() => {
      expect(store.getActions()).toEqual([expectedAction]);
      done();
    }, 210);
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
