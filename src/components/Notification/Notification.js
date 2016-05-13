import React, {Component} from 'react';
import {connect} from 'react-redux';
import css from './Notification.scss';
import {Timer} from '../../helpers';
import {removeNotification} from '../../store/notifications';
import {
  DEFAULT_STATUS,
  INFO_STATUS,
  SUCCESS_STATUS,
  WARNING_STATUS,
  ERROR_STATUS
} from '../../constants';

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
    if (count === 0) {
      return;
    }
    else if (count === 1) {
      return css['notification--actions-1'];
    }
    else if (count === 2) {
      return css['notification--actions-2'];
    }
    return css['notification-actions'];
  },
  action: css['notification-action'],
  actionText: css['notification-action-text']
};

/**
 * Create a timer
 * @param {Number} dismissAfter
 * @param {Array} actions
 * @param {Function} callback
 * @returns {Function|null} a Timer
 */
function createTimer(dismissAfter, actions, callback) {
  if (dismissAfter > 0 && (!actions || (actions && actions.length === 0))) {
    return new Timer(callback, dismissAfter);
  }
  return null;
}

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
    status: React.PropTypes.oneOf([DEFAULT_STATUS, INFO_STATUS, SUCCESS_STATUS, WARNING_STATUS,
      ERROR_STATUS]),
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
    allowHTML: React.PropTypes.bool,
    className: React.PropTypes.object.isRequired
  };
  
  /**
   * Constructor
   * Bind methods
   * @param {Object} props
   * @returns {void}
   */
  constructor(props) {
    const {dismissAfter, actions} = props;
    super(props);
    this._remove = this._remove.bind(this);
    this._pauseTimer = this._pauseTimer.bind(this);
    this._resumeTimer = this._resumeTimer.bind(this);
    this.state = {
      timer: createTimer(dismissAfter, actions, this._remove)
    };
  }
  
  /**
   * Run `onAdd` callback function when component is mounted
   * @returns {void}
   */
  componentDidMount() {
    const {onAdd} = this.props;
    onAdd();
  }
  
  /**
   * Run `onRemove` callback function when component will unmount
   * @returns {void}
   */
  componentWillUnmount() {
    const {onRemove} = this.props;
    onRemove();
  }

  /**
   * Update timer
   * @param {Object} nextProps
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    const {dismissAfter, actions} = nextProps;
    this.setState({
      timer: createTimer(dismissAfter, actions, this._remove)
    });
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
   * Pauses the timer
   * @returns {void}
   * @private
   */
  _pauseTimer() {
    const {timer} = this.state;
    timer.pause();
  }

  /**
   * Resumes the timer
   * @returns {void}
   * @private
   */
  _resumeTimer() {
    const {timer} = this.state;
    timer.resume();
  }

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
   * Render action button(s)
   * @returns {*}
   */
  _renderActions() {
    const {actions, className} = this.props;
    return actions.map((action) => {
      return (
        <button key={action.name} className={className.action} onClick={action.onClick}>
          <span className={className.actionText}>
            {(action.primary
              ? <b>{action.name}</b>
              : action.name)}
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
    const {title, message, status, dismissible, className, actions, allowHTML} = this.props;
    const {timer} = this.state;
    const isDismissible = (dismissible && actions.length === 0);
    if (timer) {
      this._resumeTimer();
    }
    return (
      <div className={
           `${className.main} ${className.status(status)}
            ${(isDismissible ? className.dismissible : '')}
            ${className.actions(actions.length)}`}
        onClick={isDismissible ? this._remove : ''} onMouseEnter={timer ? this._pauseTimer : ''}
        onMouseLeave={timer ? this._resumeTimer : ''}>
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
        {(actions.length
          ? <div className={className.actions()} onClick={this._remove}>
          {this._renderActions()}
          </div>
          : '')}
      </div>
    );
  }
}

export default connect(null, {removeNotification})(Notification);
