import {handleActions, createAction} from 'redux-actions';
import {treatNotification, preloadImage} from '../helpers';

// An array to store notifications object
const INITIAL_DATA = [];
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
  if (notification.id === undefined) {
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

// Add a notification (action creator)
const _addNotification = createAction(ADD_NOTIFICATION);

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

// Update a notification (action creator)
const _updateNotification = createAction(UPDATE_NOTIFICATION);

// Remove a notification (action creator)
export const removeNotification = createAction(REMOVE_NOTIFICATION);

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
export default handleActions({
  [ADD_NOTIFICATION]: (state, {payload}) => {
    return [...state, payload];
  },
  [UPDATE_NOTIFICATION]: (state, {payload}) => {
    // get index of the notification
    const index = state.findIndex((notification) => notification.id === payload.id);
    // replace the old notification by the new one
    state[index] = Object.assign({}, payload);
    return [...state];
  },
  [REMOVE_NOTIFICATION]: (state, {payload}) => {
    return state.filter((notification) => notification.id !== payload);
  }
}, INITIAL_DATA);
