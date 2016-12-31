import {STATUS} from '../constants';

/**
 * Convert status in a understandable status for the Notification component
 * @param {String|Number} status
 * @returns {String} status an understandable status
 */
export function convertStatus(status) {
  const reHttpStatusCode = /^\d{3}$/;
  // convert HTTP status code
  if (reHttpStatusCode.test(status)) {
    switch (true) {
      case /^1/.test(status):
        return STATUS.info;
      case /^2/.test(status):
        return STATUS.success;
      case /^(4|5)/.test(status):
        return STATUS.error;
    }
  }
  return status;
}

/**
 * Create a Timer
 * @param {Function} callback
 * @param {Number} delay
 * @constructor
 */
export function Timer(delay, callback) {
  let timerId;
  let start;
  let remaining = delay;

  this.pause = () => {
    clearTimeout(timerId);
    remaining -= new Date() - start;
  };
  this.resume = () => {
    start = new Date();
    clearTimeout(timerId);
    timerId = setTimeout(callback, remaining);
  };

  this.getTimeRemaining = () => {
    return remaining;
  };
}

/**
 * Treat data of a notification
 * @param {Object} notification
 * @returns {Object} a notification
 */
export function treatNotification(notification) {
  if (notification.dismissAfter) {
    notification.dismissAfter = parseInt(notification.dismissAfter);
  }
  if (notification.image) {
    notification.status = STATUS.default;
  }
  else {
    notification.status = convertStatus(notification.status);
  }
  if (!notification.buttons) {
    notification.buttons = [];
  }
  return notification;
}

/**
 * Preload an image
 * @param {String} url url of image to load
 * @param {Function} onload Function called when image is loaded
 * @returns {void}
 */
export function preloadImage(url, onload) {
  var image = new Image();
  image.src = url;
  image.onload = onload;
  return image;
}

/**
 * Return values of an Object in an Array
 * @param {Object} obj
 * @returns {Array}
 */
export function mapObjectValues(obj) {
  var array = [];

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      array.push(obj[key]);
    }
  }
  return array;
}
