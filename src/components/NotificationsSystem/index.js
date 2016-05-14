import React, {Component} from 'react';
import {connect} from 'react-redux';
import {className as notificationClassName} from '../Notification';
import NotificationsContainer, {
  className as containerClassName,
  transition
} from '../NotificationsContainer';
import {STATUS, POSITIONS} from '../../constants';

// default values for a notification
export const defaultValues = {
  status: null,
  position: 'tr',
  dismissible: true,
  dismissAfter: 5000,
  allowHTML: false
};
// default config
export const config = {
  smallScreenMin: 768
};

const className = 'notifications-system';

export class Notifications extends Component {
  // Default properties
  static defaultProps = {
    config,
    defaultValues,
    className,
    containerClassName,
    notificationClassName,
    transition
  };
  
  // Properties types
  static propTypes = {
    notifications: React.PropTypes.array.isRequired,
    config: React.PropTypes.object.isRequired,
    defaultValues: React.PropTypes.shape({
      status: React.PropTypes.oneOf(STATUS),
      dismissible: React.PropTypes.bool.isRequired,
      position: React.PropTypes.string.isRequired,
      dismissAfter: React.PropTypes.number.isRequired,
      allowHTML: React.PropTypes.bool.isRequired
    }),
    className: React.PropTypes.string,
    notificationClassName: React.PropTypes.object,
    containerClassName: React.PropTypes.shape({
      main: React.PropTypes.string.isRequired,
      position: React.PropTypes.func.isRequired
    }),
    transition: React.PropTypes.shape({
      name: React.PropTypes.object.isRequired,
      enterTimeout: React.PropTypes.number.isRequired,
      leaveTimeout: React.PropTypes.number.isRequired
    })
  };
  
  constructor(props) {
    super(props);
    this._renderNotificationsContainers = this._renderNotificationsContainers.bind(this);
  }
  
  /**
   * Render notifications containers
   * @returns {XML}
   * @private
   */
  _renderNotificationsContainers() {
    const {notifications, defaultValues: {position}, config: {smallScreenMin}} = this.props;
    // render all notifications in the same container at the top for small screens
    if (window.innerWidth < smallScreenMin) {
      return (
        <NotificationsContainer key='top' position='top' transition={transition}
          className={containerClassName} defaultValues={defaultValues}
          notificationClassName={notificationClassName} notifications={notifications}/>
      );
    }
    let positions = [...POSITIONS];
    // extract the default position of all positions
    positions.splice(positions.indexOf(position), 1);
    let notifs = notifications.filter((notif) => {
      return (!notif.position || notif.position === position);
    });
    // init array with all notifications with default position
    let JSX = [
      <NotificationsContainer key={position} position={position} transition={transition}
        className={containerClassName} defaultValues={defaultValues}
        notificationClassName={notificationClassName} notifications={notifs}/>
    ];
    // fill array with others containers
    JSX = JSX.concat(positions.map((position) => {
      let notifs = notifications.filter((notif) => {
        return position === notif.position;
      });
      return (
        <NotificationsContainer key={position} position={position} transition={transition}
          className={containerClassName} defaultValues={defaultValues}
          notificationClassName={notificationClassName} notifications={notifs}/>
      );
    }));
    return JSX;
  }
  
  /**
   * Render
   * @returns {XML}
   */
  render() {
    const {className} = this.props;
    
    return (
      <div className={className}>
        {this._renderNotificationsContainers()}
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
