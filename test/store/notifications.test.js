import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import reducer, {
  types,
  addNotification,
  updateNotification,
  removeNotification
} from '../../src/store/notifications';
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

describe('notifications', () => {
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
        expect(store.getActions()).toEqual(expectedAction);
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
        expect(store.getActions()).toEqual(expectedAction);
      });
    });

    describe('updateNotification()', () => {
      it('should create an action to update a notification', () => {
        const expectedAction = {
          type: types.UPDATE_NOTIFICATION,
          payload: fixture
        };
        expect(updateNotification(fixture)).toEqual(expectedAction);
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
          .toThrow('A notification must have an `id` property to be updated')
          .toNotEqual(expectedAction);
      });
    });

    describe('removeNotification()', () => {
      it('should create an action to remove a notification', () => {
        const id = fixture.id;
        const expectedAction = {
          type: types.REMOVE_NOTIFICATION,
          payload: id
        };
        expect(removeNotification(id)).toEqual(expectedAction);
      });
    });
  });

  describe('Reducers', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual([]);
    });

    it('should handle ADD_NOTIFICATION', () => {
      expect(
        reducer([], {
          type: types.ADD_NOTIFICATION,
          payload: fixture
        })
      ).toEqual([fixture]);
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
      ).toEqual([newNotification]);
    });

    it('should handle REMOVE_NOTIFICATION', () => {
      expect(
        reducer([fixture], {
          type: types.REMOVE_NOTIFICATION,
          payload: fixture.id
        })
      ).toEqual([]);
    });
  });
});
