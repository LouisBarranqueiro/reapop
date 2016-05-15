import React, {Component} from 'react';
import {connect} from 'react-redux';
import {defaultValues, className as notificationClassName} from '../Notification';
import NotificationsContainer, {className as containerClassName, transition} from '../NotificationsContainer';
import {POSITIONS} from '../../constants';

// default config
export const config = {
  smallScreenMin: 768
};

const className = 'notifications-system';

export class NotificationsSystem extends Component {
  // Default properties
  static defaultProps = {
    notifications: [],
    className,
    config,
    defaultValues,
    containerClassName,
    notificationClassName,
    transition
  };
  
  // Properties types
  static propTypes = {
    notifications: React.PropTypes.array.isRequired,
    className: React.PropTypes.string,
    config: React.PropTypes.object.isRequired,
    defaultValues: React.PropTypes.object.isRequired,
    notificationClassName: React.PropTypes.object.isRequired,
    containerClassName: React.PropTypes.object.isRequired,
    transition: React.PropTypes.object.isRequired
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
    let positions = _.values(POSITIONS);
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

export default connect(mapStateToProps)(NotificationsSystem);
