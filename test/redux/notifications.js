import {expect} from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import reducer, {
  types,
  addNotification,
  updateNotification,
  removeNotification
} from '../../src/redux/modules/notifications';
import STATUS from '../../src/constants';

// standard notification
const fixture = {
  id: 1234567899874,
  title: 'title',
  message: 'message',
  status: STATUS.error,
  dismissible: false,
  dismissAfter: 4000
};

describe('Redux', () => {
  describe('Actions', () => {
    describe('addNotification()', () => {
      it('should create an action to add a notification ' +
        '(add `id` property and convert status)', () => {
        // setup
        const middleware = [thunk];
        const mockStore = configureMockStore(middleware);
        const notification = {
          title: 'title',
          message: 'message',
          status: STATUS.error,
          dismissible: false,
          dismissAfter: 4000
        };
        // init store
        const store = mockStore({notifications: []});
        // add a notification
        const notificationAdded = store.dispatch(addNotification(notification));
        // verify
        const expectedAction = [{
          type: types.ADD_NOTIFICATION,
          payload: Object.assign({}, notification, {
            id: notificationAdded.id
          })
        }];
        expect(store.getActions()).to.deep.equal(expectedAction);
      });

      it('should create an action to add a notification ' +
        '(add `id` property and don\'t convert status)', () => {
        // setup
        const middleware = [thunk];
        const mockStore = configureMockStore(middleware);
        const notification = {
          title: 'title',
          message: 'message',
          // here we simulate an HTTP success status code (200 = OK)
          status: 200,
          dismissible: false,
          dismissAfter: 4000
        };
        // init store
        const store = mockStore({notifications: []});
        // add a notification
        const notificationAdded = store.dispatch(addNotification(notification));
        // verify
        const expectedAction = [{
          type: types.ADD_NOTIFICATION,
          payload: Object.assign({}, notification, {
            id: notificationAdded.id,
            status: STATUS.success
          })
        }];
        expect(store.getActions()).to.deep.equal(expectedAction);
      });

      it('shouldn\'t create an action to add a notification ' +
        '(notification without `title` and `message` property)', () => {
        // setup
        const middleware = [thunk];
        const mockStore = configureMockStore(middleware);
        const notification = {
          // here we simulate an HTTP success status code (200 = OK)
          status: 200,
          dismissible: false,
          dismissAfter: 4000
        };
        // init store
        const store = mockStore({notifications: []});
        // add a notification
        let notificationAdded = {};
        try {
          notificationAdded = store.dispatch(addNotification(notification));
        }
        catch (error) {
          // verify that error is thrown
          expect(error).to.be.an.instanceof(Error);
          expect(error.message)
            .to.equal('A notification must have a `title` or a `message` property');
        }
        // verify that no notification is returned
        expect(notificationAdded).to.deep.equal({});
        // verify that actions of store is empty
        expect(store.getActions()).to.deep.equal([]);
      });
    });

    describe('updateNotification()', () => {
      it('should create an action to update a notification', () => {
        const expectedAction = {
          type: types.UPDATE_NOTIFICATION,
          payload: fixture
        };
        expect(updateNotification(fixture)).to.deep.equal(expectedAction);
      });

      it('shouldn\'t create an action to update a notification ' +
        '(notification without `id` property)', () => {
        const notification = {
          title: 'title'
        };
        const expectedAction = {
          type: types.UPDATE_NOTIFICATION,
          payload: notification
        };
        expect(updateNotification.bind(updateNotification, notification))
          .to.throw('A notification must have an `id` property to be updated')
          .and.not.equal(expectedAction);
      });

      it('shouldn\'t create an action to update a notification ' +
        '(notification without `title` and `message` property)', () => {
        const notification = {
          id: 123123123
        };
        const expectedAction = {
          type: types.UPDATE_NOTIFICATION,
          payload: notification
        };
        expect(updateNotification.bind(updateNotification, notification))
          .to.throw('A notification must have a `title` or a `message` property')
          .and.not.equal(expectedAction);
      });
    });

    describe('removeNotification()', () => {
      it('should create an action to remove a notification', () => {
        const id = fixture.id;
        const expectedAction = {
          type: types.REMOVE_NOTIFICATION,
          payload: id
        };
        expect(removeNotification(id)).to.deep.equal(expectedAction);
      });
    });
  });

  describe('Reducers', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.deep.equal([]);
    });

    it('should handle ADD_NOTIFICATION', () => {
      expect(
        reducer([], {
          type: types.ADD_NOTIFICATION,
          payload: fixture
        })
      ).to.deep.equal([fixture]);
    });

    it('should handle UPDATE_NOTIFICATION', () => {
      const newNotification = {
        id: fixture.id,
        message: 'message updated',
        type: STATUS.error,
        dismissible: true,
        dismissAfter: 10000
      };
      expect(
        reducer([fixture], {
          type: types.UPDATE_NOTIFICATION,
          payload: newNotification
        })
      ).to.deep.equal([newNotification]);
    });

    it('should handle REMOVE_NOTIFICATION', () => {
      expect(
        reducer([fixture], {
          type: types.REMOVE_NOTIFICATION,
          payload: fixture.id
        })
      ).to.deep.equal([]);
    });
  });
});
