import React, {Component} from 'react';
import {mapObjectValues} from '../../src/helpers';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';
import {POSITIONS} from '../../src/constants';
import Notification from '../../src/components/Notification';
import NotificationsContainer from '../../src/components/NotificationsContainer';

// We use these "expected" component to test HTML structure of each components.
// It's easier and faster than testing manually each nodes.
// With this technique, we are 100% sure of the HTML structure of each component.

export class ExpectedNotification extends Component {
  _setHTML = (content) => {
    return {
      __html: content
    };
  };

  _renderButtons = () => {
    const {
      className,
      notification: {buttons}
    } = this.props;

    return buttons.map(({name, onClick, primary}) => (
      <button key={name} className={className.button} onClick={onClick}>
        <span className={className.buttonText}>
          {primary ? <b>{name}</b> : name}
        </span>
      </button>
    ));
  };

  render() {
    const {
      className,
      notification: {
        title,
        message,
        status,
        dismissible,
        closeButton,
        buttons,
        image,
        allowHTML
      }
    } = this.props;
    const notificationClass = [
      className.main,
      className.status(status),
      className.buttons(buttons.length),
      dismissible && !closeButton ? className.dismissible : null
    ].join(' ');

    return (
      <div
        className={className.wrapper}
        onClick={dismissible && !closeButton ? this._remove : ''}
      >
        <div className={notificationClass}>
          {image
            ? (
              <div className={className.imageContainer}>
                <span className={className.image} style={{backgroundImage: `url(${image})`}}/>
              </div>
            ) : (
              <span className={className.icon}/>
            )
          }
          <div className={className.meta}>
            {title
              ?
              allowHTML
                ? <h4 className={className.title} dangerouslySetInnerHTML={this._setHTML(title)}/>
                : <h4 className={className.title}>{title}</h4>
              :
              null
            }
            {message
              ?
              allowHTML
                ? <p className={className.message} dangerouslySetInnerHTML={this._setHTML(message)}/>
                : <p className={className.message}>{message}</p>
              :
              null
            }
          </div>
          {dismissible && closeButton
            ? (
              <div className={className.closeButtonContainer}>
                <span className={className.closeButton} onClick={this._remove}/>
              </div>
            )
            :
            null
          }
          {buttons.length
            ? (
              <div className={className.buttons()} onClick={this._remove}>
                {this._renderButtons()}
              </div>
            )
            :
            null
          }
        </div>
      </div>
    );
  }
}

export class ExpectedNotificationsContainer extends Component {
  _renderNotifications = () => {
    const {position} = this.props;
    const {className} = this.props.theme.notification;
    const {name, enterTimeout, leaveTimeout} = this.props.theme.notificationsContainer.transition;
    let {notifications} = this.props;

    // when notifications are displayed at the bottom,
    // we display notifications from bottom to top
    if (position.startsWith('b')) {
      notifications = notifications.reverse();
    }

    return notifications.map((notification) => (
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
    ));
  };

  render() {
    const {className} = this.props.theme.notificationsContainer;
    const {position} = this.props;

    return (
      <div className={`${className.main} ${className.position(position)}`}>
        <TransitionGroup>
          {this._renderNotifications()}
        </TransitionGroup>
      </div>
    );
  }
}

export class ExpectedNotificationsSystem extends Component {
  static defaultProps = {
    notifications: []
  };

  _renderNotificationsContainers = () => {
    const {notifications, theme} = this.props;
    const positions = mapObjectValues(POSITIONS);
    const containers = [];

    // render all notifications in the same container at the top for small screens
    if (window.innerWidth < theme.smallScreenMin) {
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

  render() {
    const {className} = this.props.theme.notificationsSystem;
    return (
      <div className={className}>
        {this._renderNotificationsContainers()}
      </div>
    );
  }
}
