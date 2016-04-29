import {handleActions, createAction} from 'redux-actions';
import {convertStatus} from '../../helpers';
// An array to store notifications object
const INITIAL_DATA = [];
// Action types
const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
const UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION';
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

/**
 * Add a notification (thunk action creator)
 *
 * We use a thunk here to call ADD_NOTIFICATION action
 * and only return the notification object.
 * @param {Object} notification
 * @returns {Object} notification
 */
export const addNotification = (notification) => (dispatch) => {
  notification.id = new Date().getTime();
  notification.status = convertStatus(notification.status);
  dispatch(_addNotification(notification));
  return notification;
};

// Add a notification (action creator)
const _addNotification = createAction(ADD_NOTIFICATION, (notification) => notification);

// Update a notification (action creator)
export const updateNotification = createAction(UPDATE_NOTIFICATION, (notification) => {
  notification.status = convertStatus(notification.status);
  return notification;
});

// Remove a notification (action creator)
export const removeNotification = createAction(REMOVE_NOTIFICATION, (id) => id);

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
    const index = state.findIndex((notification) => {
      return notification.id === payload.id;
    });
    // replace the old notification by the new one
    state[index] = payload;
    return [...state];
  },
  [REMOVE_NOTIFICATION]: (state, {payload}) => {
    return state.filter((notification) => notification.id !== payload);
  }
}, INITIAL_DATA);
