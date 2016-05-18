import css from './styles/styles.scss';

// media breakpoint - small screen min width
export const smallScreenMin = 768;

// default className for NotificationsSystem component
export const notificationsSystemClassName = css['notifications-system'];

// default className for NotificationsContainer component
export const notificationsContainerClassName = {
  main: css['notifications-container'],
  position: function(position) {
    return css[`notifications-container--${position}`];
  }
};

// default transition for Notification component
export const notificationsContainerTransition = {
  appearTimeout: 400,
  enterTimeout: 400,
  leaveTimeout: 400,
  name: {
    appear: css['notification-appear'],
    appearActive: css['notification-appear-active'],
    enter: css['notification-enter'],
    enterActive: css['notification-enter-active'],
    leave: css['notification-leave'],
    leaveActive: css['notification-leave-active']
  }
};

// default className for Notification component
export const notificationClassName = {
  main: css['notification'],
  meta: css['notification-meta'],
  title: css['notification-title'],
  message: css['notification-message'],
  icon: `fa ${css['notification-icon']}`,
  status: (status) => {
    return css[`notification--${status}`];
  },
  dismissible: css['notification--dismissible'],
  // `fa` corresponds to font-awesome's class name
  buttons: (count) => {
    if (count === 0) {
      return '';
    }
    else if (count === 1) {
      return css['notification--buttons-1'];
    }
    else if (count === 2) {
      return css['notification--buttons-2'];
    }
    return css['notification-buttons'];
  },
  button: css['notification-button'],
  buttonText: css['notification-button-text']
};

export default {
  smallScreenMin,
  notificationsSystem: {
    className: notificationsSystemClassName
  },
  notificationsContainer: {
    className: notificationsContainerClassName,
    transition: notificationsContainerTransition
  },
  notification: {
    className: notificationClassName
  }
}