import React, {Component} from 'react';
import TransitionGroup from 'react-addons-css-transition-group';
import Notification from './Notification';

export class NotificationsContainer extends Component {
  static propTypes = {
    notifications: React.PropTypes.array.isRequired,
    position: React.PropTypes.string.isRequired,
    theme: React.PropTypes.shape({
      notificationsContainer: React.PropTypes.shape({
        className: React.PropTypes.shape({
          main: React.PropTypes.string.isRequired,
          position: React.PropTypes.func.isRequired
        }).isRequired,
        transition: React.PropTypes.shape({
          name: React.PropTypes.object.isRequired,
          enterTimeout: React.PropTypes.number.isRequired,
          leaveTimeout: React.PropTypes.number.isRequired
        }).isRequired
      }).isRequired,
      notification: React.PropTypes.shape({
        className: React.PropTypes.object.isRequired
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
