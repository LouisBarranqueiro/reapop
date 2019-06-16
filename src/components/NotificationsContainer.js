import React, {Component} from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import Notification from './Notification'

import type {Node} from 'react'
import type {Theme} from '../types'

type Props = {
  notifications: Array<Object>,
  position: string,
  theme: Theme
}

export class NotificationsContainer extends Component<Props> {
  static defaultProps = {
    notifications: []
  }

  _renderNotifications = () => {
    const {position} = this.props
    const {className} = this.props.theme.notification
    const {name, enterTimeout, leaveTimeout} = this.props.theme.notificationsContainer.transition
    let {notifications} = this.props

    // when notifications are displayed at the bottom,
    // we display notifications from bottom to top
    if (position.startsWith('b')) {
      notifications = notifications.reverse()
    }

    return notifications.map<Node>((notification: Object): Node => (
      <CSSTransition
        key={notification.id}
        classNames={{
          enter: name.enter,
          exit: name.leave
        }}
        timeout={{
          enter: enterTimeout,
          exit: leaveTimeout
        }}
      >
        <Notification
          key={notification.id}
          notification={notification}
          className={className}
        />
      </CSSTransition>
    ))
  };

  render() {
    const {className} = this.props.theme.notificationsContainer
    const {position} = this.props

    return (
      <div className={`${className.main} ${className.position(position)}`}>
        <TransitionGroup>
          {this._renderNotifications()}
        </TransitionGroup>
      </div>
    )
  }
}

export default NotificationsContainer
