import {STATUS} from '../../src/constants';
import faker from 'faker';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

/**
 * Generate a redux store
 * @param {Object} reducers
 * @returns {Object} store
 */
export function mockStore(reducers) {
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  return mockStore(reducers);
}

/**
 * Generate notifications
 * @param {Number} numb number of notifications generated
 * @param {Object} notification a notification base
 * @returns {Array}
 */
export function genNotifications(numb, notification = {}) {
  let notifications = [];
  for (let i = 0; i < numb; i++) {
    notifications.push(genNotification(notification));
  }
  return notifications;
}

/**
 * Generate a notification
 * @param {Object} notification a notification base
 * @returns {Object} notification
 */
export function genNotification(notification = {}) {
  const numb = faker.random.number();
  return Object.assign({}, {
    id: faker.random.number(),
    title: faker.lorem.sentence(),
    message: faker.lorem.sentence(),
    status: faker.random.objectElement(STATUS),
    dismissible: faker.random.boolean(),
    dismissAfter: faker.random.number(),
    allowHTML: faker.random.boolean(),
    actions: [{
      name: faker.lorem.words(),
      primary: faker.random.boolean(),
      onClick: () => {
        return numb * 2;
      }
    }, {
      name: faker.lorem.words(),
      primary: faker.random.boolean(),
      onClick: () => {
        return numb * 3;
      }
    }],
    onAdd: () => {
      return numb;
    },
    onRemove: () => {
      return numb * 2;
    }
  }, notification);
}
