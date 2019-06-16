import {treatNotification, preloadImage} from '../helpers'
import {DEFAULT_NOTIFICATION} from '../constants'

type DispatchType = ({ type: string, [key: any]: any }) => any

type GetStateType = () => any

// An array to store notifications object
const INITIAL_STATE: Array<?Object> = []
// Action types
const ADD_NOTIFICATION: string = 'ADD_NOTIFICATION'
const UPDATE_NOTIFICATION: string = 'UPDATE_NOTIFICATION'
const REMOVE_NOTIFICATION: string = 'REMOVE_NOTIFICATION'
const REMOVE_NOTIFICATIONS: string = 'REMOVE_NOTIFICATIONS'

/**
 * Add a notification (thunk action creator)
 *
 * We use a thunk here to create an `ADD_NOTIFICATION` action
 * and only return the notification object.
 * @param {Object} notification
 * @returns {Object} notification
 */
export const addNotification = (notification: Object) => (dispatch: DispatchType): Object => {
  if (!notification.id) {
    notification.id = new Date().getTime()
  }
  notification = treatNotification(notification)
  // if there is an image, we preload it
  // and add notification when image is loaded
  if (notification.image) {
    preloadImage(notification.image, dispatch.bind(this, _addNotification(notification)))
  }
  else {
    dispatch(_addNotification(notification))
  }
  return notification
}

/**
 * Add a notification (action creator)
 *
 * @param {Object} notification
 * @returns {{type: string, payload: {Object}}}
 * @private
 */
function _addNotification(notification: Object): Object {
  return {
    type: ADD_NOTIFICATION,
    payload: notification
  }
}

/**
 * Update or create a notification
 * @param {Object} notification
 * @returns {{type: string, payload: {Object}}}
 */
export const notify = (notification: Object) => (dispatch: DispatchType, getState: GetStateType): Object => {
  const notifications = getState().notifications
  const doesNotifExist = notifications.find(notif => notif.id === notification.id)

  if (doesNotifExist) {
    return dispatch(updateNotification(notification))
  }

  return dispatch(addNotification(notification))
}

/**
 * Update a notification (thunk action creator)
 *
 * We use a thunk here to create an UPDATE_NOTIFICATION action
 * and only return the notification object.
 * @param {Object} notification
 * @returns {Object} notification
 */
export const updateNotification = (notification: Object) =>
  (dispatch: DispatchType, getState: GetStateType): Object => {
    if (!notification.id) {
      throw new Error('A notification must have an `id` property to be updated')
    }

    const notifications = getState().notifications
    const index = notifications.findIndex((oldNotification) => oldNotification.id === notification.id)
    const currNotification = notifications[index]

    notification = treatNotification(notification)

    // if image is different, then we preload it
    // and update notification when image is loaded
    if (notification.image && (!currNotification.image || (currNotification.image &&
      notification.image !== currNotification.image))) {
      preloadImage(notification.image, dispatch.bind(this, _updateNotification(notification)))
    }
    else {
      dispatch(_updateNotification(notification))
    }
    return notification
  }

/**
 * Update a notification (action creator)
 *
 * @param {Object} notification
 * @returns {{type: string, payload: {Object}}}
 * @private
 */
function _updateNotification(notification: Object): Object {
  return {
    type: UPDATE_NOTIFICATION,
    payload: notification
  }
}

/**
 * Remove a notification (action creator)
 *
 * @param {Object} notification
 * @returns {{type: string, payload: {Object}}}
 */
export function removeNotification(notification: Object): Object {
  return {
    type: REMOVE_NOTIFICATION,
    payload: notification
  }
}

/**
 * Remove all notifications (action creator)
 *
 * @returns {{type: string}}
 */
export function removeNotifications(): Object {
  return {
    type: REMOVE_NOTIFICATIONS
  }
}

// Action creators
export const actions = {
  addNotification: addNotification,
  updateNotification: updateNotification,
  removeNotification: removeNotification,
  removeNotifications: removeNotifications
}

// Actions types
export const types = {
  ADD_NOTIFICATION: ADD_NOTIFICATION,
  UPDATE_NOTIFICATION: UPDATE_NOTIFICATION,
  REMOVE_NOTIFICATION: REMOVE_NOTIFICATION,
  REMOVE_NOTIFICATIONS: REMOVE_NOTIFICATIONS
}

// Reducers
export default (defaultNotification: Object = DEFAULT_NOTIFICATION) => {
  return (state: Object = INITIAL_STATE, {type, payload}: Object): Array<?Object> => {
    switch (type) {
      case ADD_NOTIFICATION:
        const notification = Object.assign({}, defaultNotification, payload)
        return [...state, notification]
      case UPDATE_NOTIFICATION:
        return state.map((notification) => {
          if (notification.id === payload.id) {
            return Object.assign({}, defaultNotification, payload)
          }
          return notification
        })
      case REMOVE_NOTIFICATION:
        return state.filter((notification) => notification.id !== payload)
      case REMOVE_NOTIFICATIONS:
        return []
      default:
        return state
    }
  }
}
