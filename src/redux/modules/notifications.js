import {handleActions, createAction} from 'redux-actions';

// An array to store notifications object
const INITIAL_DATA = [];
// Action types
const NOTIFICATION_ADD = 'NOTIFICATION_ADD';
const NOTIFICATION_REMOVE = 'NOTIFICATION_REMOVE';

/**
 * Push a notification (Action)
 * @param {Object} notification
 * @returns {Object} notification
 */
export const pushNotification = createAction(NOTIFICATION_ADD, (notification) => {
  notification.id = new Date().getTime();
  return notification;
});

/**
 * Remove a notification (Action)
 * @param {String} notification id
 * @returns {String} notification id
 */
export const removeNotification = createAction(NOTIFICATION_REMOVE, (id) => id);

// Actions
export const actions = {
  pushNotification: pushNotification,
  removeNotification: removeNotification
};

// Reducers
export default handleActions({
  [NOTIFICATION_ADD]: (state, {payload}) => {
    return [...state, payload];
  },
  [NOTIFICATION_REMOVE]: (state, {payload}) => {
    return state.filter((notification) => notification.id !== payload);
  }
}, INITIAL_DATA);
