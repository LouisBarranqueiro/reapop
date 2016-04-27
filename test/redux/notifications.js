import {expect} from 'chai';
import reducer, {types, actions} from '../../src/redux/modules/notifications';

const notification = {
  id: 1234567899874,
  message: 'message',
  type: 'error',
  dismissible: false,
  dismissAfter: 4000
};

describe('actions', () => {
  it('should create an action to add a notification', () => {
    const expectedAction = {
      type: types.ADD_NOTIFICATION,
      payload: notification
    };
    expect(actions.pushNotification(notification)).to.deep.equal(expectedAction)
  });
});

describe('reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal([])
  });
  
  it('should handle ADD_NOTIFICATION', () => {
    expect(
      reducer([], {
        type: types.ADD_NOTIFICATION,
        payload: notification
      })
    ).to.deep.equal([notification])
  });

  it('should handle UPDATE_NOTIFICATION', () => {
    const newNotification = {
      id: notification.id,
      message: 'message updated',
      type:'error',
      dismissible:true,
      dismissAfter: 10000
    };
    expect(
      reducer([notification],{
        type: types.UPDATE_NOTIFICATION,
        payload: newNotification
      })
    ).to.deep.equal([newNotification])
  });

  it('should handle REMOVE_NOTIFICATION', () => {
    expect(
      reducer([notification],{
        type: types.REMOVE_NOTIFICATION,
        payload: notification.id
      })
    ).to.deep.equal([])
  });
});