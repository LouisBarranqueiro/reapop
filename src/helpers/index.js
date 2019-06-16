import {STATUS} from '../constants'

/**
 * Convert status in a understandable status for the Notification component
 *
 * @param {String|Number} status
 * @returns {String} status
 */
export function convertStatus(status: string | number): string | number {
  const reHttpStatusCode = /^\d{3}$/
  // convert HTTP status code
  // $FlowFixMe
  if (reHttpStatusCode.test(status)) {
    switch (true) {
      // $FlowFixMe
      case /^1/.test(status):
        return STATUS.info
      // $FlowFixMe
      case /^2/.test(status):
        return STATUS.success
      // $FlowFixMe
      case /^(4|5)/.test(status):
        return STATUS.error
    }
  }
  return status
}

export class Timer {
  _timerId: ?TimeoutID
  _start: ?Date
  _remaining: number
  _callback: (...any) => any

  constructor(delay: number, callback: (...any) => any) {
    this._timerId = null
    this._start = null
    this._remaining = delay
    this._callback = callback
  }

  resume() {
    this._start = new Date()
    clearTimeout(this._timerId)
    this._timerId = setTimeout(this._callback, this._remaining)
  }

  getTimeRemaining(): number {
    return this._remaining
  }

  pause() {
    clearTimeout(this._timerId)
    // $FlowFixMe
    this._remaining -= new Date() - this._start
  }
}

/**
 * Treat data of a notification
 *
 * @param {Object} notification
 * @returns {Object} a notification
 */
export function treatNotification(notification: Object) {
  if (notification.dismissAfter) {
    notification.dismissAfter = parseInt(notification.dismissAfter)
  }

  notification.status = convertStatus(notification.status)

  if (!notification.buttons) {
    notification.buttons = []
  }

  return notification
}

/**
 * Preload an image
 *
 * @param {String} url - the url of the image to load
 * @param {Function} callback - The function called when image is loaded or not
 * @returns {Object}
 */
export function preloadImage(url: string, callback: (...any) => any): Object {
  const image = new Image()
  image.src = url
  image.onload = callback
  image.onerror = callback
  return image
}

/**
 * Return values of an `Object` in an `Array`
 *
 * @param {Object} obj
 * @returns {Array}
 */
export function mapObjectValues(obj: Object): Array<any> {
  const array = []
  Object.keys(obj).forEach(key => array.push(obj[key]))
  return array
}
