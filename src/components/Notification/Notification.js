import React, {Component} from 'react';
import {connect} from 'react-redux';
import css from './Notification.scss';
import {removeNotification} from '../../store/notifications';

// default className for Notification component
export const className = {
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

export class Notification extends Component {
  // Default properties
  static defaultProps = {
    className: className,
    onAdd: () => {
    },
    onRemove: () => {
    },
    actions: []
  };

  // Properties types
  static propTypes = {
    id: React.PropTypes.number.isRequired,
    title: React.PropTypes.string,
    message: React.PropTypes.string,
    status: React.PropTypes.oneOfType([
      React.PropTypes.string.isRequired,
      React.PropTypes.number.isRequired
    ]),
    dismissAfter: React.PropTypes.number.isRequired,
    dismissible: React.PropTypes.bool.isRequired,
    removeNotification: React.PropTypes.func.isRequired,
    onAdd: React.PropTypes.func,
    onRemove: React.PropTypes.func,
    actions: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func
      })
    ),
    className: React.PropTypes.object.isRequired
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
   * Run `onRemove` callback function when component will unmount
   * @returns {void}
   */
  componentWillUnmount() {
    const {onRemove, actions} = this.props;
    if (actions.length) {
      window.removeEventListener('resize', this._updateHeight);
    }
    onRemove();
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

export default connect(null, {removeNotification})(Notification);
