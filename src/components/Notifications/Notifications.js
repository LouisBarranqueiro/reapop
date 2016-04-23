import React, {Component} from 'react';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import {connect} from 'react-redux';
import css from './Notifications.scss';
import Notification from '../Notification/Notification';
import notificationCss from '../Notification/Notification.scss';

class Notifications extends Component {
  static propTypes = {
    notifications: React.PropTypes.array
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
    const {notifications} = this.props;
    return notifications.map((notification) => {
      return (
        <Notification key={notification.id} id={notification.id} message={notification.message}
                      type={notification.type} dismissible={notification.dismissible === true}/>
      );
    });
  }

  /**
   * Render
   * @returns {XML}
   */
  render() {
    // we must define transition class for each state because webpack rename css class
    const transitionName = {
      enter: notificationCss['notification-enter'],
      enterActive: notificationCss['notification-enter-active'],
      leave: notificationCss['notification-leave'],
      leaveActive: notificationCss['notification-leave-active']
    };
    return (
      <div className={css['notifications-container']}>
        <TransitionGroup
          transitionName={transitionName}
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}>
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
