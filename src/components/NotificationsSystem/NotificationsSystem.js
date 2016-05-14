import React, {Component} from 'react';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import {connect} from 'react-redux';
import {css} from './';
import Notification from '../Notification/Notification';
import notificationCSS from '../Notification/Notification.scss';
import {
  DEFAULT_STATUS,
  INFO_STATUS,
  SUCCESS_STATUS,
  WARNING_STATUS,
  ERROR_STATUS
} from '../../constants';

// default values for a notification
export const defaultValues = {
  status: null,
  dismissible: true,
  dismissAfter: 5000,
  allowHTML: false
};
// default className for notifications container
export const className = {
  main: css['notifications-container'],
  position: function(position) {
    return css[`notifications-container--${position}`];
  }
};
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
    position: 'tr',
    defaultValues,
    className,
    transition
  };
  
  // Properties types
  static propTypes = {
    position: React.PropTypes.string.isRequired,
    notifications: React.PropTypes.array.isRequired,
    defaultValues: React.PropTypes.shape({
      status: React.PropTypes.oneOf([DEFAULT_STATUS, INFO_STATUS, SUCCESS_STATUS, WARNING_STATUS,
        ERROR_STATUS]),
      dismissible: React.PropTypes.bool.isRequired,
      dismissAfter: React.PropTypes.number.isRequired,
      allowHTML: React.PropTypes.bool.isRequired
    }),
    notificationClassName: React.PropTypes.object,
    className: React.PropTypes.shape({
      main: React.PropTypes.string.isRequired,
      position: React.PropTypes.func.isRequired
    }),
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
    const {notifications, notificationClassName,
      defaultValues: {status, dismissible, dismissAfter, allowHTML}
    } = this.props;

    return notifications.map((notification) => {
      const hasDismissibleProp = typeof notification.dismissible === 'boolean';
      const hasDismissAfterProp = notification.dismissAfter >= 0;
      const hasAllowHTMLProp = typeof notification.allowHTML === 'boolean';
      return (
        <Notification key={notification.id} id={notification.id} title={notification.title}
          message={notification.message} status={notification.status || status}
          dismissible={hasDismissibleProp ? notification.dismissible : dismissible}
          dismissAfter={hasDismissAfterProp ? notification.dismissAfter : dismissAfter}
          allowHTML={hasAllowHTMLProp ? notification.allowHTML : allowHTML}
          onAdd={notification.onAdd} onRemove={notification.onRemove}
          actions={notification.actions} className={notificationClassName}/>
      );
    });
  }
  
  /**
   * Render
   * @returns {XML}
   */
  render() {
    const {className, position, transition: {name, enterTimeout, leaveTimeout}} = this.props;

    return (
      <div className={`${className.main} ${className.position(position)}`}>
        <TransitionGroup transitionName={name} transitionEnterTimeout={enterTimeout}
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
