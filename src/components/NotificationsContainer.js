import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Notification from './Notification';

export class NotificationsContainer extends Component {
  static propTypes = {
    notifications: PropTypes.array.isRequired,
    position: PropTypes.string.isRequired,
    theme: PropTypes.shape({
      notificationsContainer: PropTypes.shape({
        className: PropTypes.shape({
          main: PropTypes.string.isRequired,
          position: PropTypes.func.isRequired
        }).isRequired,
        transition: PropTypes.shape({
          name: PropTypes.object.isRequired,
          enterTimeout: PropTypes.number.isRequired,
          leaveTimeout: PropTypes.number.isRequired
        }).isRequired
      }).isRequired,
      notification: PropTypes.shape({
        className: PropTypes.object.isRequired
      }).isRequired
    }).isRequired
  };

  static defaultProps = {
    notifications: []
  };

  /**
   * Render notifications
   * @private
   * @returns {XML}
   */
  _renderNotifications = () => {
    const {
      position,
      theme: {
        notification: {className}
      }
    } = this.props;
    let {notifications} = this.props;

    // when notifications are displayed at the bottom,
    // we display notifications from bottom to top
    if (position.startsWith('b')) {
      notifications = notifications.reverse();
    }

    return notifications.map((notification) => (
      <Notification
        key={notification.id}
        notification={notification}
        className={className}
      />
    ));
  };

  /**
   * Render
   * @returns {XML}
   */
  render() {
    const {
      className,
      transition: {
        name,
        enterTimeout,
        leaveTimeout
      }
    } = this.props.theme.notificationsContainer;
    const {position} = this.props;

    return (
      <div className={`${className.main} ${className.position(position)}`}>
        <TransitionGroup
          transitionName={name}
          transitionEnterTimeout={enterTimeout}
          transitionLeaveTimeout={leaveTimeout}
        >
          {this._renderNotifications()}
        </TransitionGroup>
      </div>
    );
  }
}

export default NotificationsContainer;
