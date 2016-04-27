import React, {Component} from 'react';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import {connect} from 'react-redux';
import css from './Notifications.scss';
import Notification, {className as notificationClassName} from '../Notification/Notification';
import notificationCss from '../Notification/Notification.scss';

// default values for a notification
const defaultValues = {
  type: null,
  dismissible: true,
  dismissAfter: 5000
};
// default className for notifications container
const className = css['notifications-container'];
// default transition for notifications
const transition = {
  enterTimeout: 400,
  leaveTimeout: 400,
  // we must define transition class for each state because webpack rename css class
  name: {
    enter: notificationCss['notification-enter'],
    enterActive: notificationCss['notification-enter-active'],
    leave: notificationCss['notification-leave'],
    leaveActive: notificationCss['notification-leave-active']
  }
};

class Notifications extends Component {
  // Default properties
  static defaultProps = {
    defaultValues,
    transition,
    className,
    notificationClassName
  };

  // Properties types
  static propTypes = {
    notifications: React.PropTypes.array.isRequired,
    defaultValues: React.PropTypes.shape({
      type: React.PropTypes.oneOf(['info', 'success', 'warning', 'error']),
      dismissible: React.PropTypes.bool.isRequired,
      dismissAfter: React.PropTypes.number.isRequired
    }),
    // should be `React.PropTypes.object.isRequired` but it raise an error with it
    notificationClassName: React.PropTypes.object.isRequired,
    className: React.PropTypes.string.isRequired,
    transition: React.PropTypes.shape({
      name: React.PropTypes.object.isRequired,
      enterTimeout: React.PropTypes.number.isRequired,
      leaveTimeout: React.PropTypes.number.isRequired
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
    const {notifications, defaultValues: {type, dismissible, dismissAfter}, notificationClassName} = this.props;
    return notifications.map((notification) => {
      return (
        <Notification key={notification.id} id={notification.id} message={notification.message}
                      type={notification.type || type}
                      dismissible={notification.dismissible === dismissible}
                      dismissAfter={notification.dismissAfter != null
                      ? notification.dismissAfter
                      : dismissAfter}
                      className={notificationClassName}/>
      );
    });
  }

  /**
   * Render
   * @returns {XML}
   */
  render() {
    const {
      className, transition: {
      name,
      enterTimeout,
      leaveTimeout
    }
    } = this.props;
    return (
      <div className={className}>
        <TransitionGroup
          transitionName={name}
          transitionEnterTimeout={enterTimeout}
          transitionLeaveTimeout={leaveTimeout}>
          {this._renderNotifications()}
        </TransitionGroup>
      </div>
    );
  }
}

/**
 * Map state to props
 * @param {Object} state
 * @returns {{notifications: {Array}}}
 */
function mapStateToProps(state) {
  return {
    notifications: state.notifications
  };
}

export default connect(mapStateToProps)(Notifications);
