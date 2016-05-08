import React, {Component} from 'react';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import {connect} from 'react-redux';
import css from './Notifications.scss';
import Notification from '../Notification/Notification';
import notificationCSS from '../Notification/Notification.scss';
import {INFO_STATUS, SUCCESS_STATUS, WARNING_STATUS, ERROR_STATUS} from '../../constants';

// default values for a notification
export const defaultValues = {
  status: null,
  dismissible: true,
  dismissAfter: 5000
};
// default className for notifications container
export const className = css['notifications-container'];
// default transition for Notification component
export const transition = {
  enterTimeout: 400,
  leaveTimeout: 400,
  name: {
    enter: notificationCSS['notification-enter'],
    enterActive: notificationCSS['notification-enter-active'],
    leave: notificationCSS['notification-leave'],
    leaveActive: notificationCSS['notification-leave-active']
  }
};

export class Notifications extends Component {
  // Default properties
  static defaultProps = {
    defaultValues,
    className,
    transition
  };
  
  // Properties types
  static propTypes = {
    notifications: React.PropTypes.array.isRequired,
    defaultValues: React.PropTypes.shape({
      status: React.PropTypes.oneOf([INFO_STATUS, SUCCESS_STATUS, WARNING_STATUS, ERROR_STATUS]),
      dismissible: React.PropTypes.bool.isRequired,
      dismissAfter: React.PropTypes.number.isRequired
    }),
    notificationClassName: React.PropTypes.object,
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
    const {notifications, defaultValues: {status, dismissible, dismissAfter}, notificationClassName} = this.props;
    return notifications.map((notification) => {
      return (
        <Notification key={notification.id} id={notification.id} title={notification.title}
                      message={notification.message}
                      status={notification.status || status}
                      dismissible={notification.dismissible != null
                      ? notification.dismissible
                      : dismissible}
                      dismissAfter={notification.dismissAfter != null
                      ? notification.dismissAfter
                      : dismissAfter}
                      onAdd={notification.onAdd}
                      onRemove={notification.onRemove}
                      actions={notification.actions}
                      className={notificationClassName}/>
      );
    });
  }
  
  /**
   * Render
   * @returns {XML}
   */
  render() {
    const {className, transition: {name, enterTimeout, leaveTimeout}} = this.props;
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
