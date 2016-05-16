import React, {Component} from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {genNotification, mockStore} from '../fixtures';
import {Timer} from '../../src/helpers';
import {types, removeNotification} from '../../src/store/notifications';
import css from '../../src/styles/styles.scss';
import ConnectNotification, {Notification} from '../../src/components/Notification';
import {STATUS, POSITIONS} from '../../src/constants';

describe('<Notification/>', () => {
  let notification = null;
  let store = null;

  // default value for notifications
  const defaultValues = {
    status: STATUS.default,
    position: POSITIONS.topRight,
    dismissible: true,
    dismissAfter: 5000,
    allowHTML: false
  };
  // default className for Notification component
  const className = {
    main: css['notification'],
    meta: css['notification-meta'],
    title: css['notification-title'],
    message: css['notification-message'],
    icon: `fa ${css['notification-icon']}`,
    status: (status) => {
      return css[`notification--${status}`];
    },
    dismissible: css['notification--dismissible'],
    // `fa` corresponds to font-awesome's class name
    buttons: (count) => {
      if (count === 0) {
        return '';
      }
      else if (count === 1) {
        return css['notification--buttons-1'];
      }
      else if (count === 2) {
        return css['notification--buttons-2'];
      }
      return css['notification-buttons'];
    },
    button: css['notification-button'],
    buttonText: css['notification-button-text']
  };
  // Expected Notification component
  // used to compare HTML
  class ExpectedNotification extends Component {
    // Default properties
    static defaultProps = {
      className: className,
      status: defaultValues.status,
      position: defaultValues.position,
      dismissible: defaultValues.dismissible,
      dismissAfter: defaultValues.dismissAfter,
      onAdd: () => {
      },
      onRemove: () => {
      },
      buttons: [],
      allowHTML: defaultValues.allowHTML
    };
    
    /**
     * Return HTML message
     * @returns {Object}
     * @private
     */
    _messageToHTML() {
      const {message} = this.props;
      return {
        __html: message
      };
    }
    
    /**
     * Render button(s)
     * @returns {*}
     */
    _renderButtons() {
      const {buttons, className} = this.props;
      return buttons.map((button) => {
        return (
          <button key={button.name} className={className.button}
            onClick={button.onClick}>
            <span className={className.buttonText}>
              {(button.primary
                ? <b>{button.name}</b>
                : button.name)}
            </span>
          </button>
        );
      });
    }
    
    /**
     * Render
     * @returns {XML}
     */
    render() {
      const {
        title, message, status, dismissAfter,
        dismissible, className, buttons, allowHTML
      } = this.props;
      const isDismissible = (dismissible && buttons.length === 0);
      // if there is no buttons, it remove automatically
      // the notification after `dismissAfter` duration
      if (buttons.length === 0 && dismissAfter > 0) {
        setTimeout(() => this._remove(), dismissAfter);
      }

      return (
        <div className={
           `${className.main} ${className.status(status)}
            ${(isDismissible ? className.dismissible : '')}
            ${className.buttons(buttons.length)}`}
          onClick={isDismissible ? this._remove : ''}>
          <i className={className.icon}></i>
          <div className={className.meta}>
            {(title
              ? <h4 className={className.title}>{title}</h4>
              : '')}
            {(message
              ? (allowHTML
              ? <p className={className.message} dangerouslySetInnerHTML={this._messageToHTML()}/>
              : <p className={className.message}>{message}</p>)
              : '')}
          </div>
          {(buttons.length
            ? <div className={className.buttons()} onClick={this._remove}>
            {this._renderButtons()}
            </div>
            : '')}
        </div>
      );
    }
  }
  
  beforeEach('generate a new notification and init store', () => {
    notification = genNotification();
    store = mockStore({notifications: []});
  });
  
  it('should mount with default props', () => {
    delete notification.status;
    delete notification.position;
    delete notification.dismissible;
    delete notification.dismissAfter;
    delete notification.allowHTML;
    delete notification.onAdd;
    delete notification.onRemove;
    delete notification.buttons;
    const props = mount(
      <Notification key={notification.id} {...notification}
        removeNotification={removeNotification}/>
    ).props();
    expect(props.status).toEqual(defaultValues.status);
    expect(props.position).toEqual(defaultValues.position);
    expect(props.dismissible).toEqual(defaultValues.dismissible);
    expect(props.dismissAfter).toEqual(defaultValues.dismissAfter);
    expect(props.allowHTML).toEqual(defaultValues.allowHTML);
    expect(props.onAdd()).toEqual((() => {})());
    expect(props.onRemove()).toEqual((() => {})());
    expect(props.buttons).toEqual([]);
    expect(props.className.main).toEqual(className.main);
    expect(props.className.meta).toEqual(className.meta);
    expect(props.className.title).toEqual(className.title);
    expect(props.className.message).toEqual(className.message);
    expect(props.className.icon).toEqual(className.icon);
    expect(props.className.status()).toEqual(className.status());
    expect(props.className.dismissible).toEqual(className.dismissible);
    expect(props.className.buttons()).toEqual(className.buttons());
    expect(props.className.buttons(0)).toEqual(className.buttons(0));
    expect(props.className.buttons(1)).toEqual(className.buttons(1));
    expect(props.className.buttons(2)).toEqual(className.buttons(2));
    expect(props.className.button).toEqual(className.button);
    expect(props.className.buttonText).toEqual(className.buttonText);
    expect(props.removeNotification).toEqual(removeNotification);
  });

  it('should mount with initial state', () => {
    // without a timer
    let wrapper = mount(
      <Notification key={notification.id} {...notification}
        removeNotification={removeNotification}/>
    );
    expect(wrapper.state().timer).toEqual(null);
    // with a timer
    delete notification.buttons;
    wrapper = mount(
      <Notification key={notification.id} {...notification}
        removeNotification={removeNotification}/>
    );
    expect(wrapper.state().timer).toBeA(Timer);
  });

  it('should update state when receiving new props (', () => {
    // state component will be init without timer because it have buttons
    let wrapper = mount(
      <Notification key={notification.id} {...notification}
        removeNotification={removeNotification}/>
    );
    expect(wrapper.state().timer).toEqual(null);
    // we delete buttons to provoke creation of a Timer
    // at `componentWillReceivedProps()` component lifecycle
    notification.buttons = [];
    wrapper.setProps(notification);
    expect(wrapper.state().timer).toBeA(Timer);
  });

  it('should render component (with title)', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectNotification key={notification.id} {...notification}/>
      </Provider>
    );
    const expectedComponent = mount(
      <ExpectedNotification key={notification.id} {...notification}/>
    );
    expect(wrapper.html()).toEqual(expectedComponent.html());
  });
  
  it('should render component (without title)', () => {
    notification.title = null;
    const wrapper = mount(
      <Provider store={store}>
        <ConnectNotification key={notification.id} {...notification}/>
      </Provider>
    );
    
    const expectedComponent = mount(
      <ExpectedNotification key={notification.id} {...notification}/>
    );
    expect(wrapper.html()).toEqual(expectedComponent.html());
  });
  
  it('should render component (with message)', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectNotification key={notification.id} {...notification}/>
      </Provider>
    );
    const expectedComponent = mount(
      <ExpectedNotification key={notification.id} {...notification}/>
    );
    expect(wrapper.html()).toEqual(expectedComponent.html());
  });
  
  it('should render component (with HTML message)', () => {
    // add HTML in message and allow HTML
    notification.message = `${notification.message} <b>HEY</b>`;
    notification.allowHTML = true;
    const wrapper = mount(
      <Provider store={store}>
        <ConnectNotification key={notification.id} {...notification}/>
      </Provider>
    );
    const expectedComponent = mount(
      <ExpectedNotification key={notification.id} {...notification}/>
    );
    expect(wrapper.html()).toEqual(expectedComponent.html());
  });
  
  it('should render component (without message)', () => {
    notification.message = null;
    const wrapper = mount(
      <Provider store={store}>
        <ConnectNotification key={notification.id} {...notification}/>
      </Provider>
    );
    
    const expectedComponent = mount(
      <ExpectedNotification key={notification.id} {...notification}/>
    );
    expect(wrapper.html()).toEqual(expectedComponent.html());
  });
  
  it('should render component (with 2 buttons)', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectNotification key={notification.id} {...notification}/>
      </Provider>
    );
    
    const expectedComponent = mount(
      <ExpectedNotification key={notification.id} {...notification}/>
    );
    expect(wrapper.html()).toEqual(expectedComponent.html());
  });
  
  it('should render component (with 1 button)', () => {
    delete notification.buttons[1];
    const wrapper = mount(
      <Provider store={store}>
        <ConnectNotification key={notification.id} {...notification}/>
      </Provider>
    );
    
    const expectedComponent = mount(
      <ExpectedNotification key={notification.id} {...notification}/>
    );
    expect(wrapper.html()).toEqual(expectedComponent.html());
  });
  
  it('should render component (without buttons)', () => {
    notification.buttons = [];
    const wrapper = mount(
      <Provider store={store}>
        <ConnectNotification key={notification.id} {...notification}/>
      </Provider>
    );
    
    const expectedComponent = mount(
      <ExpectedNotification key={notification.id} {...notification}/>
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
          <ConnectNotification key={notification.id} {...notification}/>
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
        <ConnectNotification key={notification.id} {...notification}/>
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
        <ConnectNotification key={notification.id} {...notification}/>
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
        <ConnectNotification key={notification.id} {...notification}/>
      </Provider>
    );
    wrapper.unmount();
  });
  
  it('should create an action to remove the notification ' +
    'when it is clicked', () => {
    notification.dismissible = true;
    notification.buttons = [];
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
  
  it('should create an action to remove the notification ' +
    'when a action button is clicked (dismissible : false)', () => {
    // we set `dismissible` to `false` to be sure
    // that dismissible is ignored in this case
    notification.dismissible = false;
    const wrapper = mount(
      <Provider store={store}>
        <ConnectNotification key={notification.id} {...notification}/>
      </Provider>
    );
    wrapper.find(`.${css['notification-button']}`).first().simulate('click');
    const expectedAction = {
      type: types.REMOVE_NOTIFICATION,
      payload: notification.id
    };
    expect(store.getActions()).toEqual([expectedAction]);
  });
  
  it('should create an action to remove the notification after ' +
    '`dismissAfter` duration', (done) => {
    notification.dismissAfter = 10;
    // remove buttons otherwise `remove()` is not called after `dismissAfter` duration
    notification.buttons = [];
    mount(
      <Provider store={store}>
        <ConnectNotification key={notification.id} {...notification}/>
      </Provider>
    );
    const expectedAction = {
      type: types.REMOVE_NOTIFICATION,
      payload: notification.id
    };
    expect(store.getActions()).toEqual([]);
    setTimeout(() => {
      expect(store.getActions()).toEqual([expectedAction]);
      done();
    }, 15);
  });
  
  it('should not create an action to remove the notification ' +
    'when it is clicked (dismissible : false)', () => {
    notification.dismissible = false;
    const wrapper = mount(
      <Provider store={store}>
        <ConnectNotification key={notification.id} {...notification}/>
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
        <ConnectNotification key={notification.id} {...notification}/>
      </Provider>
    );
    wrapper.find(ConnectNotification).simulate('click');
    expect(store.getActions()).toEqual([]);
    // we remove an button and test it again
    notification.buttons = notification.buttons.slice(0, 1);
    wrapper = mount(
      <Provider store={store}>
        <ConnectNotification key={notification.id} {...notification}/>
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
        <ConnectNotification key={notification.id} {...notification}/>
      </Provider>
    );
    setTimeout(() => {
      expect(store.getActions()).toEqual([]);
      done();
    }, 10);
  });

  it('should not create an action to remove the notification ' +
    'while mouse is hovering it', (done) => {
    notification.dismissAfter = 10;
    delete notification.buttons;
    const wrapper = mount(
      <Provider store={store}>
        <ConnectNotification key={notification.id} {...notification}/>
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
    // check 5s after `dismissAfter` duration that the store
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
});
