import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import NotificationsContainer from '../NotificationsContainer';
import {STATUS, POSITIONS} from '../../constants';

// default value for notifications
export const defaultValues = {
  status: STATUS.default,
  position: POSITIONS.topRight,
  dismissible: true,
  dismissAfter: 5000,
  allowHTML: false
};

export class NotificationsSystem extends Component {
  // default properties
  static defaultProps = {
    notifications: [],
    defaultValues
  };
  
  // properties types
  static propTypes = {
    notifications: React.PropTypes.array.isRequired,
    defaultValues: React.PropTypes.shape({
      status: React.PropTypes.string.isRequired,
      position: React.PropTypes.oneOf(_.values(POSITIONS)),
      dismissible: React.PropTypes.bool.isRequired,
      dismissAfter: React.PropTypes.number.isRequired,
      allowHTML: React.PropTypes.bool.isRequired
    }),
    theme: React.PropTypes.shape({
      smallScreenMin: React.PropTypes.number.isRequired,
      notificationsSystem: React.PropTypes.shape({
        className: React.PropTypes.string.isRequired
      }),
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
        className: React.PropTypes.shape({
          main: React.PropTypes.string.isRequired,
          meta: React.PropTypes.string.isRequired,
          title: React.PropTypes.string.isRequired,
          message: React.PropTypes.string.isRequired,
          icon: React.PropTypes.string.isRequired,
          status: React.PropTypes.func.isRequired,
          dismissible: React.PropTypes.string.isRequired,
          buttons: React.PropTypes.func.isRequired,
          button: React.PropTypes.string.isRequired,
          buttonText: React.PropTypes.string.isRequired
        })
      })
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
    const {notifications, defaultValues: {position}, theme} = this.props;
    // render all notifications in the same container at the top for small screens
    if (window.innerWidth < theme.smallScreenMin) {
      return (
        <NotificationsContainer key='top' position='top' defaultValues={defaultValues}
          theme={theme} notifications={notifications}/>
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
      <NotificationsContainer key={position} position={position} defaultValues={defaultValues}
        theme={theme} notifications={notifs}/>
    ];
    // fill array with others containers
    JSX = JSX.concat(positions.map((position) => {
      let notifs = notifications.filter((notif) => {
        return position === notif.position;
      });
      return (
        <NotificationsContainer key={position} position={position} defaultValues={defaultValues}
          theme={theme} notifications={notifs}/>
      );
    }));
    return JSX;
  }
  
  /**
   * Render
   * @returns {XML}
   */
  render() {
    const {className} = this.props.theme.notificationsSystem;
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
