import faker from 'faker';
import {mockStore, genNotification} from '../utils/fixtures';
import reducer, {
  types,
  addNotification,
  updateNotification,
  removeNotification
} from '../../src/store/notifications';
import {SUCCESS_STATUS} from '../../src/constants';

describe('notifications', () => {
  let notification = null;

  beforeEach('generate a new notification', () => {
    notification = genNotification();
  });

  describe('Actions', () => {
    describe('addNotification()', () => {
      let store = null;

      beforeEach('init store', () => {
        store = mockStore({notifications: []});
      });

      it('should create an action to add a notification ' +
        '(add `id` property if not given and convert status)', () => {
        const customId = 'ACTION_ID';
        notification.id = customId;
        // we remove the image, otherwise `treatNotification()` helper will update
        // status of notification
        notification.image = null;
        // here we simulate an HTTP success status code (200 = OK)
        notification.status = 200;
        const notificationAdded = store.dispatch(addNotification(notification));
        const expectedAction = [{
          type: types.ADD_NOTIFICATION,
          payload: Object.assign({}, notification, {
            id: notificationAdded.id,
            status: SUCCESS_STATUS
          })
        }];
        expect(notificationAdded.id).toEqual(customId);
        expect(store.getActions()).toEqual(expectedAction);
      });

      it('should create an action to add a notification ' +
        '(and convert status)', () => {
        notification.id = null;
        // we remove the image, otherwise `treatNotification()` helper will update
        // status of notification
        notification.image = null;
        // here we simulate an HTTP success status code (200 = OK)
        notification.status = 200;
        const notificationAdded = store.dispatch(addNotification(notification));
        const expectedAction = [{
          type: types.ADD_NOTIFICATION,
          payload: Object.assign({}, notification, {
            id: notificationAdded.id,
            status: SUCCESS_STATUS
          })
        }];
        expect(store.getActions()).toEqual(expectedAction);
      });

      it('should load image then create an action to add a notification (new image)', (done) => {
        const notificationAdded = store.dispatch(addNotification(notification));
        const expectedAction = [{
          type: types.ADD_NOTIFICATION,
          payload: notificationAdded
        }];

        // image not loaded yet, so store should be empty
        expect(store.getActions()).toEqual([]);

        setTimeout(() => {
          // image should be loaded now, so store should contains the notification updated
          expect(store.getActions()).toEqual(expectedAction);
          done();
        }, 500);
      });

      it('should create an action to add a notification ' +
        '(add `id` property and don\'t convert status)', () => {
        notification.id = null;
        // we remove image to not wait loading of image (preload feature)
        notification.image = null;
        const notificationAdded = store.dispatch(addNotification(notification));
        const expectedAction = [{
          type: types.ADD_NOTIFICATION,
          payload: Object.assign({}, notification, {
            id: notificationAdded.id
          })
        }];
        expect(store.getActions()).toEqual(expectedAction);
      });
    });

    describe('updateNotification()', () => {
      let store = null;

      beforeEach('init store', () => {
        store = mockStore({notifications: [notification]});
      });

      it('shouldn\'t wait to load image and create an action to update a notification (same image)', () => {
        const expectedAction = [{
          type: types.UPDATE_NOTIFICATION,
          payload: notification
        }];

        store.dispatch(updateNotification(notification));
        expect(store.getActions()).toEqual(expectedAction);
      });

      it('shouldn\'t create an action to update a notification ' +
        '(notification without `id` property)', () => {
        notification.id = null;
        // we remove image to not wait loading of image (preload feature)
        notification.image = null;
        const expectedAction = {
          type: types.UPDATE_NOTIFICATION,
          payload: notification
        };

        expect(store.dispatch.bind(store, updateNotification(notification)))
          .toThrow('A notification must have an `id` property to be updated')
          .toNotEqual(expectedAction);
      });

      it('should load image then create an action to update a notification (new image)', (done) => {
        // add a notification without image in the store
        notification = genNotification({image: null});
        store = mockStore({notifications: [notification]});
        // update notification with an image
        const notificationUpdated = Object.assign({}, notification, {image: 'http://placehold.it/45x45'});
        const expectedAction = [{
          type: types.UPDATE_NOTIFICATION,
          payload: notificationUpdated
        }];

        expect(store.getActions()).toEqual([]);
        store.dispatch(updateNotification(notificationUpdated));
        // image not loaded yet, so store should be empty
        expect(store.getActions()).toEqual([]);

        setTimeout(() => {
          // image should be loaded now, so store should contains the notification updated
          expect(store.getActions()).toEqual(expectedAction);
          done();
        }, 500);
      });

      it('should load image then create an action to update a notification (image is different)', (done) => {
        // update notification image url
        const notificationUpdated = Object.assign({}, notification, {image: 'http://placehold.it/45x45'});
        const expectedAction = [{
          type: types.UPDATE_NOTIFICATION,
          payload: notificationUpdated
        }];

        expect(store.getActions()).toEqual([]);
        store.dispatch(updateNotification(notificationUpdated));
        // image not loaded yet, so store should be empty
        expect(store.getActions()).toEqual([]);

        setTimeout(() => {
          // image should be loaded now, so store should contains the notification updated
          expect(store.getActions()).toEqual(expectedAction);
          done();
        }, 500);
      });
    });

    describe('removeNotification()', () => {
      it('should create an action to remove a notification', () => {
        const id = faker.random.number();
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
      const notification2 = genNotification();
      expect(
        reducer([], {
          type: types.ADD_NOTIFICATION,
          payload: notification
        })
      ).toEqual([notification]);
      expect(
        reducer([notification], {
          type: types.ADD_NOTIFICATION,
          payload: notification2
        })
      ).toEqual([notification, notification2]);
    });

    it('should handle UPDATE_NOTIFICATION', () => {
      expect(
        reducer([notification], {
          type: types.UPDATE_NOTIFICATION,
          payload: notification
        })
      ).toEqual([notification]);
    });

    it('should handle REMOVE_NOTIFICATION', () => {
      expect(
        reducer([notification], {
          type: types.REMOVE_NOTIFICATION,
          payload: notification.id
        })
      ).toEqual([]);
    });
  });
});
