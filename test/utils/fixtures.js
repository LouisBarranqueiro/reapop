import {STATUS, POSITIONS} from '../../src/constants';
import faker from 'faker';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

export const imageUrl = 'https://avatars3.githubusercontent.com/u/4705626?v=3&s=10';

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

/**
 * Check propTypes of a React component
 * @param {Object} object object to be validated
 * @param {Object} propTypes object with defined prop types
 * @returns {void}
 */
export function checkPropTypes(object, propTypes) {
  let errors = {};
  let propName;
  // Check if object have the same property that propTypes (depth: 1 is enough)
  // if you remove a propType validation inadvertently, it will throw an error
  for (propName in object) {
    if (!propTypes.hasOwnProperty(propName)) {
      errors[propName] = 'prop is not validated by propTypes';
    }
  }

  // Check if object have the same property that propTypes object
  // and if it have the correct type
  for (propName in propTypes) {
    if (propTypes.hasOwnProperty(propName)) {
      let error = propTypes[propName](object, propName, JSON.stringify(object), 'prop', null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
      if (error) {
        errors[propName] = error.message;
      }
    }
  }

  return errors;
}
