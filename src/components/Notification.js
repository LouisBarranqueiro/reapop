import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Timer} from '../helpers';
import {removeNotification} from '../store/notifications';
import {POSITIONS} from '../constants';

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
  // Properties types
  static propTypes = {
    className: React.PropTypes.shape({
      main: React.PropTypes.string.isRequired,
      meta: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      message: React.PropTypes.string.isRequired,
      imageContainer: React.PropTypes.string.isRequired,
      image: React.PropTypes.string.isRequired,
      icon: React.PropTypes.string.isRequired,
      status: React.PropTypes.func.isRequired,
      dismissible: React.PropTypes.string.isRequired,
      closeButtonContainer: React.PropTypes.string.isRequired,
      closeButton: React.PropTypes.string.isRequired,
      buttons: React.PropTypes.func.isRequired,
      button: React.PropTypes.string.isRequired,
      buttonText: React.PropTypes.string.isRequired
    }),
    notification: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      title: React.PropTypes.string,
      message: React.PropTypes.string,
      image: React.PropTypes.string,
      status: React.PropTypes.string.isRequired,
      position: React.PropTypes.oneOf(_.values(POSITIONS)),
      dismissAfter: React.PropTypes.number.isRequired,
      dismissible: React.PropTypes.bool.isRequired,
      onAdd: React.PropTypes.func,
      onRemove: React.PropTypes.func,
      closeButton: React.PropTypes.bool.isRequired,
      buttons: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          name: React.PropTypes.string.isRequired,
          onClick: React.PropTypes.func
        })
      ),
      allowHTML: React.PropTypes.bool
    }),
    removeNotification: React.PropTypes.func.isRequired
  };
  
  /**
   * Constructor
   * Bind methods
   * @param {Object} props
   * @returns {void}
   */
  constructor(props) {
    const {dismissAfter, buttons} = props.notification;
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
    const {onAdd} = this.props.notification;
    if (typeof onAdd === 'function') {
      onAdd();
    }
  }
  
  /**
   * Run `onRemove` callback function when component will unmount
   * @returns {void}
   */
  componentWillUnmount() {
    const {onRemove} = this.props.notification;
    if (typeof onRemove === 'function') {
      onRemove();
    }
  }
  
  /**
   * Update timer
   * @param {Object} nextProps
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    const {dismissAfter, buttons} = nextProps.notification;
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
    const {removeNotification, notification: {id}} = this.props;
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
   * Wrap content in an object ready for HTML
   * @param {String} content a text
   * @returns {Object}
   * @private
   */
  _setHTML(content) {
    return {
      __html: content
    };
  }
  
  /**
   * Render button(s)
   * @returns {*}
   */
  _renderButtons() {
    const {
      className,
      notification: {buttons}
    } = this.props;
    
    return buttons.map((button) => {
      return (
        <button key={button.name} className={className.button} onClick={button.onClick}>
          <span className={className.buttonText}>
            {button.primary ?
              <b>{button.name}</b> :
              button.name
            }
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
      className,
      notification: {title, message, status, dismissible, closeButton, buttons, image, allowHTML}
    } = this.props;
    const {timer} = this.state;
    const isDismissible = (dismissible && buttons.length === 0);
    
    if (timer) {
      this._resumeTimer();
    }
    
    return (
      <div className={
        `${className.main} ${className.status(status)}
        ${(isDismissible && !closeButton ? className.dismissible : '')}
        ${className.buttons(buttons.length)}`}
        onClick={isDismissible && !closeButton ? this._remove : ''} onMouseEnter={timer ? this._pauseTimer : ''}
        onMouseLeave={timer ? this._resumeTimer : ''}>
        {image ?
          <div className={className.imageContainer}>
            <span className={className.image} style={{backgroundImage: `url(${image})`}}></span>
          </div> :
          <span className={className.icon}></span>
        }
        <div className={className.meta}>
          {title ?
            allowHTML ?
              <h4 className={className.title} dangerouslySetInnerHTML={this._setHTML(title)}></h4> :
              <h4 className={className.title}>{title}</h4> :
            ''}
          {message ?
            allowHTML ?
              <p className={className.message} dangerouslySetInnerHTML={this._setHTML(message)}/> :
              <p className={className.message}>{message}</p> :
            ''}
        </div>
        {isDismissible && closeButton ?
          <div className={className.closeButtonContainer}>
            <span className={className.closeButton} onClick={this._remove}/>
          </div> :
          ''}
        {buttons.length ?
          <div className={className.buttons()} onClick={this._remove}>
            {this._renderButtons()}
          </div> :
          ''}
      </div>
    );
  }
}

export default connect(null, {removeNotification})(Notification);
