import React, {Component} from 'react';
import {connect} from 'react-redux';
import {mapObjectValues} from '../helpers';
import NotificationsContainer from './NotificationsContainer';
import {POSITIONS} from '../constants';

export class NotificationsSystem extends Component {
  static propTypes = {
    notifications: React.PropTypes.array.isRequired,
    theme: React.PropTypes.shape({
      smallScreenMin: React.PropTypes.number.isRequired,
      notificationsSystem: React.PropTypes.shape({
        className: React.PropTypes.string
      })
    }).isRequired
  };

  static defaultProps = {
    notifications: []
  };

  state = {
    windowWidth: window.innerWidth
  };

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
   * Update window width
   * @returns {void}
   * @private
   */
  _updateWindowWidth = () => {
    this.setState({windowWidth: window.innerWidth});
  };

  /**
   * Render notifications containers
   * @returns {XML}
   * @private
   */
  _renderNotificationsContainers = () => {
    const {notifications, theme} = this.props;
    const {windowWidth} = this.state;
    const positions = mapObjectValues(POSITIONS);
    const containers = [];

    // render all notifications in the same container at the top for small screens
    if (windowWidth < theme.smallScreenMin) {
      return (
        <NotificationsContainer
          key='t'
          position='t'
          theme={theme}
          notifications={notifications}
        />
      );
    }

    containers.push(positions.map((position) => {
      const notifs = notifications.filter((notif) => {
        return position === notif.position;
      });
      return (
        <NotificationsContainer
          key={position}
          position={position}
          theme={theme}
          notifications={notifs}
        />
      );
    }));
    return containers;
  };
  
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
