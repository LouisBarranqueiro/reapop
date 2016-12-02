import React, {Component} from 'react';
import {connect} from 'react-redux';
import {mapObjectValues} from '../helpers';
import NotificationsContainer from './NotificationsContainer';
import {STATUS, POSITIONS} from '../constants';

// default value for notifications
export const defaultValues = {
  status: STATUS.default,
  position: POSITIONS.topRight,
  dismissible: true,
  dismissAfter: 5000,
  allowHTML: false,
  closeButton: false
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
    defaultValues: React.PropTypes.object.isRequired,
    theme: React.PropTypes.shape({
      smallScreenMin: React.PropTypes.number.isRequired,
      notificationsSystem: React.PropTypes.shape({
        className: React.PropTypes.string
      })
    }).isRequired
  };
  
  constructor(props) {
    super(props);
    this._updateWindowWidth = this._updateWindowWidth.bind(this);
    this._renderNotificationsContainers = this._renderNotificationsContainers.bind(this);
    this.state = {
      windowWidth: window.innerWidth
    };
  }

  /**
   * Update window width
   * @returns {void}
   * @private
   */
  _updateWindowWidth() {
    this.setState({windowWidth: window.innerWidth});
  }

  /**
   * Add resize listener to update window width when the window is resized
   * @returns {void}
   */
  componentDidMount() {
    window.addEventListener('resize', this._updateWindowWidth);
  }

  /**
   * Remove resize listener
   * @returns {void}
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this._updateWindowWidth);
  }

  /**
   * Render notifications containers
   * @returns {XML}
   * @private
   */
  _renderNotificationsContainers() {
    const {notifications, defaultValues, theme} = this.props;
    const {position} = defaultValues;
    const {windowWidth} = this.state;
    // render all notifications in the same container at the top for small screens
    if (windowWidth < theme.smallScreenMin) {
      return (
        <NotificationsContainer key='t' position='t' defaultValues={defaultValues}
          theme={theme} notifications={notifications}/>
      );
    }
    let positions = mapObjectValues(POSITIONS);
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
