import {handleActions, createAction} from 'redux-actions';

// An array to store notifications object
const INITIAL_DATA = [];
// Action types
const NOTIFICATION_ADD = 'NOTIFICATION_ADD';
const NOTIFICATION_REMOVE = 'NOTIFICATION_REMOVE';

/**
 * Push a notification (Action)
 * @param {String} message Text displayed into notification
 * @param {String} type (success|info|warning|error)
 * @param {Number} expireAfter time before the notification disappear
 * @param {Boolean} dismissible disappear when user click on
 * @returns {Object} notification
 */
export const pushNotification = createAction(NOTIFICATION_ADD, (message, type, expireAfter, dismissible) => {
  return {
    id: new Date().getTime(),
    expireAfter,
    message,
    type,
    dismissible
  };
});

// Remove a notification (Action)
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
