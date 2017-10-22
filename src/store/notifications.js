import {treatNotification, preloadImage, genId} from '../helpers';
import {DEFAULT_NOTIFICATION} from '../constants';

// An array to store notifications object
const INITIAL_STATE = [];
// Action types
const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
const UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION';
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
const REMOVE_NOTIFICATIONS = 'REMOVE_NOTIFICATIONS';

/**
 * Add a notification (thunk action creator)
 *
 * We use a thunk here to create an ADD_NOTIFICATION action
 * and only return the notification object.
 * @param {Object} notification
 * @returns {Object} notification
 */
export const addNotification = (notification) => (dispatch) => {
  if (!notification.id) {
    notification.id = genId();
  }
  notification = treatNotification(notification);
  // if there is an image, we preload it
  // and add notification when image is loaded
  if (notification.image) {
    preloadImage(notification.image, dispatch.bind(this, _addNotification(notification)));
  }
  else {
    dispatch(_addNotification(notification));
  }
  return notification;
};

/**
 * Add a notification (action creator)
 *
 * @param {Object} notification
 * @returns {{type: string, payload: {Object}}}
 * @private
 */
function _addNotification(notification) {
  return {
    type: ADD_NOTIFICATION,
    payload: notification
  };
}

/**
 * Update a notification (thunk action creator)
 *
 * We use a thunk here to create an UPDATE_NOTIFICATION action
 * and only return the notification object.
 * @param {Object} notification
 * @returns {Object} notification
 */
export const updateNotification = (notification) => (dispatch, getState) => {
  if (!notification.id) {
    throw new Error('A notification must have an `id` property to be updated');
  }

  const notifications = getState().notifications;
  const index = notifications.findIndex((oldNotification) => oldNotification.id === notification.id);
  const currNotification = notifications[index];

  notification = treatNotification(notification);

  // if image is different, then we preload it
  // and update notification when image is loaded
  if (notification.image && (!currNotification.image || (currNotification.image &&
    notification.image !== currNotification.image))) {
    preloadImage(notification.image, dispatch.bind(this, _updateNotification(notification)));
  }
  else {
    dispatch(_updateNotification(notification));
  }
  return notification;
};

/**
 * Update a notification (action creator)
 *
 * @param {Object} notification
 * @returns {{type: string, payload: {Object}}}
 * @private
 */
function _updateNotification(notification) {
  return {
    type: UPDATE_NOTIFICATION,
    payload: notification
  };
}

/**
 * Remove a notification (action creator)
 *
 * @param {Object} notification
 * @returns {{type: string, payload: {Object}}}
 */
export function removeNotification(notification) {
  return {
    type: REMOVE_NOTIFICATION,
    payload: notification
  };
}

/**
 * Remove all notifications (action creator)
 *
 * @returns {{type: string}}
 */
export function removeNotifications() {
  return {
    type: REMOVE_NOTIFICATIONS
  };
}

// Action creators
export const actions = {
  addNotification: addNotification,
  updateNotification: updateNotification,
  removeNotification: removeNotification,
  removeNotifications: removeNotifications
};

// Actions types
export const types = {
  ADD_NOTIFICATION: ADD_NOTIFICATION,
  UPDATE_NOTIFICATION: UPDATE_NOTIFICATION,
  REMOVE_NOTIFICATION: REMOVE_NOTIFICATION,
  REMOVE_NOTIFICATIONS: REMOVE_NOTIFICATIONS
};

// Reducers
export default (defaultNotification = DEFAULT_NOTIFICATION) => {
  return (state = INITIAL_STATE, {type, payload}) => {
    switch (type) {
      case ADD_NOTIFICATION:
        const notification = Object.assign({}, defaultNotification, payload);
        return [...state, notification];
      case UPDATE_NOTIFICATION:
        return state.map((notification) => {
          if (notification.id === payload.id) {
            return Object.assign({}, defaultNotification, payload);
          }
          return notification;
        });
      case REMOVE_NOTIFICATION:
        return state.filter((notification) => notification.id !== payload);
      case REMOVE_NOTIFICATIONS:
        return [];
      default:
        return state;
    }
  };
};
