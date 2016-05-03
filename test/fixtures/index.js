import STATUS from '../../src/constants';
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
 * @returns {Array}
 */
export function genNotifications(numb) {
  let notifications = [];
  for (let i = 0; i < numb; i++) {
    notifications.push(genNotification());
  }
  return notifications;
}

/**
 * Generate a notification
 * @returns {void}
 */
export function genNotification() {
  const numb = faker.random.number();
  return {
    id: faker.random.number(),
    title: faker.lorem.sentence(),
    message: faker.lorem.sentence(),
    status: faker.random.objectElement(STATUS),
    dismissible: faker.random.boolean(),
    dismissAfter: faker.random.number(),
    onAdd: function() {
      return numb;
    },
    onRemove: function() {
      return numb * 2;
    }
  };
}
