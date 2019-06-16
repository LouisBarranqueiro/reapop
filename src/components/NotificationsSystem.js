import React, {Component} from 'react'
import {connect} from 'react-redux'
import {mapObjectValues} from '../helpers'
import NotificationsContainer from './NotificationsContainer'
import {POSITIONS} from '../constants'

import type {Node} from 'react'
import type {Theme} from '../types'

type Props = {
  notifications: Array<Object>,
  filter: ?(Object) => boolean,
  theme: Theme
}

type State = {
  windowWidth: number
}

export class NotificationsSystem extends Component<Props, State> {
  static defaultProps = {
    notifications: []
  }

  state = {
    windowWidth: window.innerWidth
  }

  componentDidMount() {
    window.addEventListener('resize', this._updateWindowWidth)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._updateWindowWidth)
  }

  _updateWindowWidth = () => {
    this.setState({windowWidth: window.innerWidth})
  }

  // Render notifications containers
  _renderNotificationsContainers = () => {
    const {theme, filter} = this.props
    const {windowWidth} = this.state
    const positions = mapObjectValues(POSITIONS)
    const containers = []
    let notifications = this.props.notifications

    if (typeof filter === 'function') {
      notifications = notifications.filter(filter)
    }

    // render all notifications in the same container at the top for small screens
    if (windowWidth < theme.smallScreenMin) {
      return (
        <NotificationsContainer
          key={theme.smallScreenPosition || POSITIONS.top}
          position={theme.smallScreenPosition || POSITIONS.top}
          theme={theme}
          notifications={notifications}
        />
      )
    }

    containers.push(positions.map<Node>((position: string): Node => {
      const notifs = notifications.filter((notif) => {
        return position === notif.position
      })

      return (
        <NotificationsContainer
          key={position}
          position={position}
          theme={theme}
          notifications={notifs}
        />
      )
    }))
    return containers
  }

  render() {
    const {className} = this.props.theme.notificationsSystem
    return (
      <div className={className}>
        {this._renderNotificationsContainers()}
      </div>
    )
  }
}

function mapStateToProps(state: Object): Object {
  return {
    notifications: state.notifications
  }
}

// $FlowFixMe
export default connect(mapStateToProps, {})(NotificationsSystem)
