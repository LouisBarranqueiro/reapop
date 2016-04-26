import {handleActions, createAction} from 'redux-actions';

// An array to store notifications object
const INITIAL_DATA = [];
// Action types
const NOTIFICATION_ADD = 'NOTIFICATION_ADD';
const NOTIFICATION_UPDATE = 'NOTIFICATION_UPDATE';
const NOTIFICATION_REMOVE = 'NOTIFICATION_REMOVE';

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
const pushNotification = createAction(NOTIFICATION_ADD, (notification) => {
  return notification;
});

/**
 * Update a notification (Redux action)
 * @param {Object} notification
 * @returns {Object} notification
 */
export const updateNotification = createAction(NOTIFICATION_UPDATE, (notification) => {
  return notification;
});

/**
 * Remove a notification (Redux action)
 * @param {Number} notification id
 * @returns {Number} notification id
 */
export const removeNotification = createAction(NOTIFICATION_REMOVE, (id) => id);

// Actions
export const actions = {
  pushNotification: pushNotification,
  updateNotification: updateNotification,
  removeNotification: removeNotification
};

// Actions
export const types = {
  NOTIFICATION_ADD: NOTIFICATION_ADD,
  NOTIFICATION_UPDATE: NOTIFICATION_UPDATE,
  NOTIFICATION_REMOVE: NOTIFICATION_REMOVE
};

// Reducers
export default handleActions({
  [NOTIFICATION_ADD]: (state, {payload}) => {
    return [...state, payload];
  },
  [NOTIFICATION_UPDATE]: (state, {payload}) => {
    // get index of the notification
    const index = state.findIndex((notification) => {
      return notification.id === payload.id;
    });
    // replace the old notification by the new one
    state[index] = payload;
    return [...state];
  },
  [NOTIFICATION_REMOVE]: (state, {payload}) => {
    return state.filter((notification) => notification.id !== payload);
  }
}, INITIAL_DATA);
