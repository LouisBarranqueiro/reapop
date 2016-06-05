import React, {Component} from 'react';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import _ from 'lodash';
import Notification from './Notification';
import {POSITIONS} from '../constants';

export class NotificationsContainer extends Component {
  // default types
  static defaultProps = {
    notifications: []
  };

  // Properties types
  static propTypes = {
    notifications: React.PropTypes.array.isRequired,
    position: React.PropTypes.string.isRequired,
    defaultValues: React.PropTypes.shape({
      status: React.PropTypes.string.isRequired,
      position: React.PropTypes.oneOf(_.values(POSITIONS)),
      dismissible: React.PropTypes.bool.isRequired,
      dismissAfter: React.PropTypes.number.isRequired,
      closeButton: React.PropTypes.bool.isRequired,
      allowHTML: React.PropTypes.bool.isRequired
    }),
    theme: React.PropTypes.shape({
      notificationsContainer: React.PropTypes.shape({
        className: React.PropTypes.shape({
          main: React.PropTypes.string.isRequired,
          position: React.PropTypes.func.isRequired
        }),
        transition: React.PropTypes.shape({
          name: React.PropTypes.object.isRequired,
          enterTimeout: React.PropTypes.number.isRequired,
          leaveTimeout: React.PropTypes.number.isRequired
        })
      }),
      notification: React.PropTypes.shape({
        className: React.PropTypes.object.isRequired
      })
    })
  };
  
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
      defaultValues: {status, dismissible, dismissAfter, closeButton, allowHTML}
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
      if (typeof notification.closeButton !== 'boolean') {
        notification.closeButton = closeButton;
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

export default NotificationsContainer;
