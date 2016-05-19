import React, {Component} from 'react';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import {POSITIONS} from '../../src/constants';
import Notification from '../../src/components/Notification';

export class ExpectedNotification extends Component {
  /**
   * Return HTML message
   * @returns {Object}
   * @private
   */
  _messageToHTML() {
    const {message} = this.props.notification;
    return {
      __html: message
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
      className,
      notification: {title, message, status, dismissible, buttons, allowHTML}
    } = this.props;
    const isDismissible = (dismissible && buttons.length === 0);
    return (
      <div className={
           `${className.main} ${className.status(status)}
            ${(isDismissible ? className.dismissible : '')}
            ${className.buttons(buttons.length)}`}>
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

export class ExpectedNotificationsContainer extends Component {

  /**
   * Constructor
   * Bind methods
   * @param {Object} props
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this._renderNotifications = this._renderNotifications.bind(this);
  }

  /**
   * Render notifications
   * @private
   * @returns {XML}
   */
  _renderNotifications() {
    // get all notifications and default values for notifications
    const {
      position, theme: {notification: {className}},
      defaultValues: {status, dismissible, dismissAfter, allowHTML}
    } = this.props;
    let {notifications} = this.props;

    // when notifications are displayed at the bottom,
    // we display notifications from bottom to top
    if ([POSITIONS.bottomLeft, POSITIONS.bottomRight].indexOf(position) >= 0) {
      notifications = notifications.reverse();
    }

    return notifications.map((notification) => {
      // Define default values for notification if it's needed
      if (!notification.status) {
        notification.status = status;
      }
      if (typeof notification.dismissible !== 'boolean') {
        notification.dismissible = dismissible;
      }
      if (typeof notification.dismissAfter !== 'number') {
        notification.dismissAfter = dismissAfter;
      }
      if (typeof notification.allowHTML !== 'boolean') {
        notification.allowHTML = allowHTML;
      }
      return (
        <Notification key={notification.id} notification={notification} className={className}/>
      );
    });
  }

  /**
   * Render
   * @returns {XML}
   */
  render() {
    const {
      className, transition: {name, appearTimeout, enterTimeout, leaveTimeout}
    } = this.props.theme.notificationsContainer;
    const {position} = this.props;
    return (
      <div className={`${className.main} ${className.position(position)}`}>
        <TransitionGroup transitionName={name} transitionAppear={true}
          transitionAppearTimeout={appearTimeout} transitionEnterTimeout={enterTimeout}
          transitionLeaveTimeout={leaveTimeout}>
          {this._renderNotifications()}
        </TransitionGroup>
      </div>
    );
  }
}
