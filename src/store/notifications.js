import {treatNotification, preloadImage} from '../helpers';

// An array to store notifications object
const INITIAL_STATE = [];
// Action types
const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
const UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION';
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

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
    notification.id = new Date().getTime();
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

// Action creators
export const actions = {
  addNotification: addNotification,
  updateNotification: updateNotification,
  removeNotification: removeNotification
};

// Actions types
export const types = {
  ADD_NOTIFICATION: ADD_NOTIFICATION,
  UPDATE_NOTIFICATION: UPDATE_NOTIFICATION,
  REMOVE_NOTIFICATION: REMOVE_NOTIFICATION
};

// Reducers
export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case ADD_NOTIFICATION:
      return [...state, payload];
    case UPDATE_NOTIFICATION:
      // get index of the notification
      const index = state.findIndex((notification) => notification.id === payload.id);
      // replace the old notification by the new one
      state[index] = Object.assign({}, payload);
      return [...state];
    case REMOVE_NOTIFICATION:
      return state.filter((notification) => notification.id !== payload);
    default:
      return state;
  }
};
