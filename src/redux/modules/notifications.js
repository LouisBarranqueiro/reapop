import {handleActions, createAction} from 'redux-actions';

// An array to store notifications object
const INITIAL_DATA = [];
// Action types
const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
const UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION';
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

/**
 * Add a notification
 * @param {Object} notification
 * @returns {Object} notification
 */
export const addNotification = (notification) => {
  return (dispatch) => {
    notification.id = new Date().getTime();
    dispatch(pushNotification(notification));
    return notification;
  };
};

/**
 * Add a notification (Redux action)
 * @param {Object} notification
 * @returns {Object} notification
 */
const pushNotification = createAction(ADD_NOTIFICATION, (notification) => {
  return notification;
});

/**
 * Update a notification (Redux action)
 * @param {Object} notification
 * @returns {Object} notification
 */
export const updateNotification = createAction(UPDATE_NOTIFICATION, (notification) => {
  return notification;
});

/**
 * Remove a notification (Redux action)
 * @param {Number} notification id
 * @returns {Number} notification id
 */
export const removeNotification = createAction(REMOVE_NOTIFICATION, (id) => id);

// Actions
export const actions = {
  pushNotification: pushNotification,
  updateNotification: updateNotification,
  removeNotification: removeNotification
};

// Actions
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
