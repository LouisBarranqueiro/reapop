import {expect} from 'chai';
import {types, actions} from '../../src/redux/modules/notifications';

describe('actions', () => {
  it('should create an action to add a notification', () => {
    const notification = {
      id: 1234567899874,
      message: 'message',
      type: 'error',
      dismissible: false,
      dismissAfter: 4000
    };
    const expectedAction = {
      type: types.NOTIFICATION_ADD,
      payload: notification
    };
    expect(actions.pushNotification(notification)).to.deep.equal(expectedAction)
  });
});