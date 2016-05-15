import React, {Component} from 'react';
import {connect} from 'react-redux';
import css from './styles.scss';
import _ from 'lodash';
import {Timer} from '../../helpers';
import {removeNotification} from '../../store/notifications';
import {STATUS, POSITIONS} from '../../constants';

// default value for notifications
export const defaultValues = {
  status: STATUS.default,
  position: POSITIONS.topRight,
  dismissible: true,
  dismissAfter: 5000,
  allowHTML: false
};

// default className for a notification
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

/**
 * Create a timer
 * @param {Number} dismissAfter
 * @param {Array} buttons
 * @param {Function} callback
 * @returns {Function|null} a Timer
 */
function createTimer(dismissAfter, buttons, callback) {
  if (dismissAfter > 0 && (!buttons || (buttons && buttons.length === 0))) {
    return new Timer(callback, dismissAfter);
  }
  return null;
}

export class Notification extends Component {
  // Default properties
  static defaultProps = {
    className: className,
    status: defaultValues.status,
    position: defaultValues.position,
    dismissible: defaultValues.dismissible,
    dismissAfter: defaultValues.dismissAfter,
    allowHTML: defaultValues.allowHTML,
    onAdd: () => {},
    onRemove: () => {},
    buttons: []
  };
  
  // Properties types
  static propTypes = {
    className: React.PropTypes.object.isRequired,
    id: React.PropTypes.number.isRequired,
    title: React.PropTypes.string,
    message: React.PropTypes.string,
    status: React.PropTypes.oneOf(_.values(STATUS)),
    dismissAfter: React.PropTypes.number.isRequired,
    dismissible: React.PropTypes.bool.isRequired,
    removeNotification: React.PropTypes.func.isRequired,
    onAdd: React.PropTypes.func,
    onRemove: React.PropTypes.func,
    buttons: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func
      })
    ),
    allowHTML: React.PropTypes.bool
  };
  
  /**
   * Constructor
   * Bind methods
   * @param {Object} props
   * @returns {void}
   */
  constructor(props) {
    const {dismissAfter, buttons} = props;
    super(props);
    this._remove = this._remove.bind(this);
    this._pauseTimer = this._pauseTimer.bind(this);
    this._resumeTimer = this._resumeTimer.bind(this);
    this.state = {
      timer: createTimer(dismissAfter, buttons, this._remove)
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
    const {dismissAfter, buttons} = nextProps;
    this.setState({
      timer: createTimer(dismissAfter, buttons, this._remove)
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
   * Render button(s)
   * @returns {*}
   */
  _renderButtons() {
    const {buttons, className} = this.props;
    return buttons.map((button) => {
      return (
        <button key={button.name} className={className.button} onClick={button.onClick}>
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
    const {title, message, status, dismissible, className, buttons, allowHTML} = this.props;
    const {timer} = this.state;
    const isDismissible = (dismissible && buttons.length === 0);
    if (timer) {
      this._resumeTimer();
    }
    return (
      <div className={
           `${className.main} ${className.status(status)}
            ${(isDismissible ? className.dismissible : '')}
            ${className.buttons(buttons.length)}`}
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
        {(buttons.length
          ? <div className={className.buttons()} onClick={this._remove}>
          {this._renderButtons()}
          </div>
          : '')}
      </div>
    );
  }
}

export default connect(null, {removeNotification})(Notification);
