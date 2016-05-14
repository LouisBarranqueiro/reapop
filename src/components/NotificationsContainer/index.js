import React, {Component} from 'react';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import css from './styles.scss';
import Notification, {className as notificationClassName, transition} from '../Notification';
import {STATUS, BOTTOM_LEFT_POSITION, BOTTOM_RIGHT_POSITION} from '../../constants';

// default className for notifications container
export const className = {
  main: css['notifications-container'],
  position: function(position) {
    return css[`notifications-container--${position}`];
  }
};

export class Notifications extends Component {
  // Default properties
  static defaultProps = {
    notifications: []
  };
  
  // Properties types
  static propTypes = {
    notifications: React.PropTypes.array.isRequired,
    position: React.PropTypes.string.isRequired,
    defaultValues: React.PropTypes.shape({
      status: React.PropTypes.oneOf(STATUS),
      position: React.PropTypes.string.isRequired,
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
    const {
      position, notificationClassName,
      defaultValues: {status, dismissible, dismissAfter, allowHTML}
    } = this.props;
    let {notifications} = this.props;

    // when notifications are displayed at the bottom,
    // we display notifications from bottom to top
    if ([BOTTOM_LEFT_POSITION, BOTTOM_RIGHT_POSITION].indexOf(position) >= 0) {
      notifications = notifications.reverse();
    }

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

export default Notifications;
