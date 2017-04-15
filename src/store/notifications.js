import {treatNotification} from '../helpers';
import {DEFAULT_NOTIFICATION} from '../constants';

// An array to store notifications object
const INITIAL_STATE = [];
// Action types
const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
const UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION';
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
const REMOVE_NOTIFICATIONS = 'REMOVE_NOTIFICATIONS';
const IMAGE_LOADED = 'IMAGE_LOADED';

/**
 * Add a notification (thunk action creator)
 *
 * We use a thunk here to create an ADD_NOTIFICATION action
 * and only return the notification object.
 * @param {Object} notification
 * @returns {Object} notification
 */
export const addNotification = (notification) => {
  if (!notification.id) {
    notification.id = new Date().getTime();
  }
  notification = treatNotification(notification);

  return _addNotification(notification);
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
export const updateNotification = (notification) => {
  if (!notification.id) {
    throw new Error('A notification must have an `id` property to be updated');
  }
  notification = treatNotification(notification);

  return _updateNotification(notification);
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

export const imageLoaded = (notification) => {
  if (!notification.id) {
    throw new Error('A notification must have an `id` property to be updated');
  }
  return _imageLoaded(notification);
};

export function _imageLoaded(notification) {
  return {
    type: IMAGE_LOADED,
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
        {
        // get index of the notification
          const index = state.findIndex((notification) => notification.id === payload.id);
        // replace the old notification by the new one
          state[index] = Object.assign({}, defaultNotification, payload);
          return [...state];
        }
      case IMAGE_LOADED:
        {
          const modifiedPayload = Object.assign({}, payload, {
            fetchImage: false
          });
          // get index of the notification
          const index = state.findIndex((notification) => notification.id === modifiedPayload.id);
          // replace the old notification by the new one
          state[index] = Object.assign({}, defaultNotification, modifiedPayload);
          return [...state];
        }
      case REMOVE_NOTIFICATION:
        return state.filter((notification) => notification.id !== payload);
      case REMOVE_NOTIFICATIONS:
        return [];
      default:
        return state;
    }
  };
};
