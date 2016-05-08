import React, {Component} from 'react';
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
    meta: css['notification-meta'],
    title: css['notification-title'],
    message: css['notification-message'],
    icon: `fa ${css['notification-icon']}`,
    status: (status) => {
      return css[`notification--${status}`];
    },
    dismissible: css['notification--dismissible'],
    // `fa` corresponds to font-awesome's class name
    actions: (count) => {
      if (count === 1) {
        return css['notification--actions-1'];
      }
      else if (count === 2) {
        return css['notification--actions-2'];
      }
      return css['notification-actions'];
    },
    action: css['notification-action']
  };
  // Expected Notification component
  // used to compare HTML
  class ExpectedNotification extends Component {
    static defaultProps = {
      className: className,
      onAdd: () => {
      },
      onRemove: () => {
      },
      actions: []
    };

    /**
     * Constructor
     * Bind methods
     * @param {Object} props
     * @returns {void}
     */
    constructor(props) {
      super(props);
      this._remove = this._remove.bind(this);
      this._updateHeight = this._updateHeight.bind(this);
      // initial state
      this.state = {
        animateClass: '',
        height: ''
      };
    }

    /**
     * We get the new height of the notification
     * to apply it on action buttons container
     * @private
     * @returns {void}
     */
    _updateHeight() {
      const {id} = this.props;
      // We use `ref` to get height of notification.
      // We simulate a height of 100% or 50% for buttons depending on number of actions
      // check css file to understand
      this.setState({
        height: this.refs[id].clientHeight
      });
    }

    /**
     * Run `onAdd` callback function when component is mounted
     * @returns {void}
     */
    componentDidMount() {
      const {onAdd} = this.props;
      const {id, actions} = this.props;
      // if notification got action buttons, we update the component
      if (actions.length && this.refs[id]) {
        this._updateHeight();
        window.addEventListener('resize', this._updateHeight);
      }
      onAdd();
    }

    /**
     * Remove the notification
     * @private
     * @returns {void}
     */
    _remove() {
      const {removeNotification, id} = this.props;
      removeNotification(id);
    }

    /**
     * Render action button(s)
     * @returns {*}
     */
    _renderActions() {
      const {actions, className} = this.props;
      return actions.map((action) => {
        return (
          <button key={action.name} className={className.action}
                  onClick={action.onClick}>
            {(action.primary
              ? <b>{action.name}</b>
              : action.name)}
          </button>
        );
      });
    }

    /**
     * Render
     * @returns {XML}
     */
    render() {
      const {id, title, message, status, dismissAfter,
        dismissible, className, actions
      } = this.props;
      const {height} = this.state;
      const isDismissible = (dismissible && actions.length === 0);
      // if there is no actions, it remove automatically
      // the notification after `dismissAfter` duration
      if (actions.length === 0 && dismissAfter > 0) {
        setTimeout(() => this._remove(), dismissAfter);
      }
      return (
        <div ref={id} className={
           `${className.main} ${className.status(status)}
            ${(isDismissible ? className.dismissible : '')}
            ${className.actions(actions.length)}
            ${css['notification-enter']}`}
             onClick={isDismissible ? this._remove : ''}>
          <i className={className.icon}></i>
          <div className={className.meta}>
            {(title
              ? <h4 className={className.title}>{title}</h4>
              : '')}
            {(message
              ? <p className={className.message}>{message}</p>
              : '')}
          </div>
          {(actions.length
            ? <div className={className.actions()} style={{height}} onClick={this._remove}>
            {this._renderActions()}
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
    delete notification.onAdd;
    delete notification.onRemove;
    const wrapper = mount(
      <Notification key={notification.id} {...notification}
                    removeNotification={removeNotification}/>
    );
    expect(wrapper.props().className.main).toEqual(className.main);
    expect(wrapper.props().className.meta).toEqual(className.meta);
    expect(wrapper.props().className.title).toEqual(className.title);
    expect(wrapper.props().className.message).toEqual(className.message);
    expect(wrapper.props().className.icon).toEqual(className.icon);
    expect(wrapper.props().className.status()).toEqual(className.status());
    expect(wrapper.props().className.dismissible).toEqual(className.dismissible);
    expect(wrapper.props().className.actions()).toEqual(className.actions());
    expect(wrapper.props().className.actions(1)).toEqual(className.actions(1));
    expect(wrapper.props().className.actions(2)).toEqual(className.actions(2));
    expect(wrapper.props().className.action).toEqual(className.action);
    expect(wrapper.props().removeNotification).toEqual(removeNotification);
    expect(wrapper.props().onAdd()).toEqual((() => {
    })());
    expect(wrapper.props().onRemove()).toEqual((() => {
    })());
  });

  it('should render JSX and HTML correctly (with title)', () => {
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

  it('should render JSX and HTML correctly (without title)', () => {
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

  it('should render JSX and HTML correctly (with message)', () => {
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

  it('should render JSX and HTML correctly (without message)', () => {
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

  it('should render JSX and HTML correctly (without actions)', () => {
    notification.actions = [];
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

  it('should render JSX and HTML correctly (with 1 action)', () => {
    notification.actions = notification.actions.slice(0, 1);
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

  it('should render JSX and HTML correctly (with 2 actions)', () => {
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
      expect(error.stack).toMatch(/onAdd\ncomponentDidMount/);
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
      expect(error.stack).toMatch(/onRemove\ncomponentWillUnmount/);
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
    notification.actions = [];
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
    wrapper.find(`.${css['notification-action']}`).first().simulate('click');
    const expectedAction = {
      type: types.REMOVE_NOTIFICATION,
      payload: notification.id
    };
    expect(store.getActions()).toEqual([expectedAction]);
  });

  it('should create an action to remove the notification after ' +
    '`dismissAfter` duration', (done) => {
    notification.dismissAfter = 10;
    // remove actions otherwise `remove()` is not called after `dismissAfter` duration
    notification.actions = [];
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
    'when it is clicked (actions.length > 0)', (done) => {
    // we set `dismissible` to `true` to be sure that
    // `actions.length` must equals `0` to allow removing
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
    // we remove an action and test it again
    notification.actions = notification.actions.slice(0, 1);
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
});
