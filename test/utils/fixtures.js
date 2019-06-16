import {STATUS, POSITIONS, TOP, DEFAULT_STATUS} from '../../src/constants'
import faker from 'faker'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

export const imageUrl = 'https://httpbin.org/image/jpeg'

/**
 * Generate a redux store
 * @param {Object} reducers
 * @returns {Object} store
 */
export function mockStore(reducers) {
  const middleware = [thunk]
  const mockStore = configureMockStore(middleware)
  return mockStore(reducers)
}

/**
 * Generate a random notification
 * @param {Object} notification a notification base
 * @returns {Object} notification
 */
export function genRandomNotification(notification = {}) {
  const numb = faker.random.number()

  return Object.assign({}, {
    id: faker.random.number(),
    title: faker.lorem.sentence(),
    message: faker.lorem.sentence(),
    image: imageUrl,
    position: faker.random.objectElement(POSITIONS),
    status: faker.random.objectElement(STATUS),
    dismissible: faker.random.boolean(),
    dismissAfter: faker.random.number(),
    allowHTML: faker.random.boolean(),
    closeButton: faker.random.boolean(),
    buttons: [{
      name: faker.lorem.words(),
      primary: faker.random.boolean(),
      onClick: () => {
        return numb * 2
      }
    }, {
      name: faker.lorem.words(),
      primary: faker.random.boolean(),
      onClick: () => {
        return numb * 3
      }
    }],
    onAdd: () => {
      return numb
    },
    onRemove: () => {
      return numb * 2
    }
  }, notification)
}

/**
 * Generate random notifications
 * @param {Number} numb - number of notifications generated
 * @param {Object} notification - a base notification
 * @returns {Array}
 */
export function genRandomNotifications(numb, notification = {}) {
  let notifications = []
  for (let i = 0; i < numb; i++) {
    notifications.push(genRandomNotification(notification))
  }
  return notifications
};

/**
 * Generate notifications
 * @param {Number} numb number of notifications generated
 * @param {Object} notification a notification base
 * @returns {Array}
 */
export function genNotifications(numb, notification = {}) {
  let notifications = []
  for (let i = 0; i < numb; i++) {
    notifications.push(genNotification(i))
  }
  return notifications
};

/**
 * Generate a notification
 *
 * @param {Number} id - the ID of the notification
 * @returns {Object} notification
 */
export function genNotification(id = 1) {
  return {
    id: id,
    title: 'a title',
    message: 'a message',
    image: imageUrl,
    position: TOP,
    status: DEFAULT_STATUS,
    dismissible: true,
    dismissAfter: 0,
    allowHTML: true,
    closeButton: true,
    buttons: [{
      name: 'Yes',
      primary: true,
      onClick: jest.fn(() => 1)
    }, {
      name: 'No',
      primary: false,
      onClick: jest.fn(() => 1)
    }],
    onAdd: jest.fn(),
    onRemove: jest.fn()
  }
}
