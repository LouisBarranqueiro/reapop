import faker from 'faker';
import {mockStore, genNotification, imageUrl} from '../utils/fixtures';
import reducer, {
  types,
  addNotification,
  notify,
  updateNotification,
  removeNotification,
  removeNotifications
} from '../../src/store/notifications';
import {SUCCESS_STATUS, DEFAULT_NOTIFICATION, BOTTOM_CENTER} from '../../src/constants';

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
        }, 1900);
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

    describe('notify()', () => {
      let store = null;

      beforeEach('init store', () => {
        store = mockStore({notifications: [notification]});
      });

      it('should create an action to add a notification', () => {
        store = mockStore({notifications: []});
        // we remove image to not wait loading of image (preload feature)
        notification.image = null;
        const notificationAdded = store.dispatch(notify(notification));
        const expectedAction = [{
          type: types.ADD_NOTIFICATION,
          payload: Object.assign({}, notification, {
            id: notificationAdded.id
          })
        }];

        expect(store.getActions()).toEqual(expectedAction);
        expect(notificationAdded).toEqual(expectedAction[0].payload);
      });

      it('should create an action to add a notification (notification without id)', () => {
        store = mockStore({notifications: []});
        delete notification.id;
        // we remove image to not wait loading of image (preload feature)
        notification.image = null;
        const notificationAdded = store.dispatch(notify(notification));
        const expectedAction = [{
          type: types.ADD_NOTIFICATION,
          payload: Object.assign({}, notification, {
            id: notificationAdded.id
          })
        }];

        expect(store.getActions()).toEqual(expectedAction);
        expect(notificationAdded).toEqual(expectedAction[0].payload);
      });

      it('should create an action to update a notification', () => {
        const expectedAction = [{
          type: types.UPDATE_NOTIFICATION,
          payload: notification
        }];
        const notificationUpdated = store.dispatch(notify(notification));

        expect(store.getActions()).toEqual(expectedAction);
        expect(notificationUpdated).toEqual(notification);
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
        expect(() => store.dispatch(updateNotification(notification)))
          .toThrow('A notification must have an `id` property to be updated');
      });

      it('should load image then create an action to update a notification (new image)', (done) => {
        // add a notification without image in the store
        notification = genNotification({image: null});
        store = mockStore({notifications: [notification]});
        // update notification with an image
        const notificationUpdated = Object.assign({}, notification, {image: imageUrl});
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
        }, 1900);
      });

      it('should load image then create an action to update a notification (image is different)', (done) => {
        // update notification image url
        const notificationUpdated = Object.assign({}, notification, {
          image: 'https://httpbin.org/image/png'
        });
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
        }, 1900);
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

      describe('removeNotifications()', () => {
        it('should create an action to remove all notifications', () => {
          const expectedAction = {
            type: types.REMOVE_NOTIFICATIONS
          };
          expect(removeNotifications()).toEqual(expectedAction);
        });
      });
    });
  });

  describe('Reducers', () => {
    it('should return the initial state', () => {
      expect(reducer()(undefined, {})).toEqual([]);
    });

    it('should handle ADD_NOTIFICATION', () => {
      const notification2 = genNotification();
      expect(
        reducer()([], {
          type: types.ADD_NOTIFICATION,
          payload: notification
        })
      ).toEqual([notification]);

      expect(
        reducer()([notification], {
          type: types.ADD_NOTIFICATION,
          payload: notification2
        })
      ).toEqual([notification, notification2]);
    });

    it('should handle ADD_NOTIFICATION (default notification values)', () => {
      delete notification.status;
      delete notification.dismissAfter;
      delete notification.dismissible;
      delete notification.closeButton;
      delete notification.allowHTML;
      const notif = reducer()([], {
        type: types.ADD_NOTIFICATION,
        payload: notification
      })[0];

      expect(notif.status).toEqual(DEFAULT_NOTIFICATION.status);
      expect(notif.dismissAfter).toEqual(DEFAULT_NOTIFICATION.dismissAfter);
      expect(notif.dismissible).toEqual(DEFAULT_NOTIFICATION.dismissible);
      expect(notif.closeButton).toEqual(DEFAULT_NOTIFICATION.closeButton);
      expect(notif.allowHTML).toEqual(DEFAULT_NOTIFICATION.allowHTML);
    });

    it('should handle ADD_NOTIFICATION (custom notification values)', () => {
      const customValue = {
        status: SUCCESS_STATUS,
        position: BOTTOM_CENTER,
        dismissible: false,
        dismissAfter: 2333,
        allowHTML: true,
        closeButton: true
      };
      delete notification.status;
      delete notification.dismissAfter;
      delete notification.dismissible;
      delete notification.closeButton;
      delete notification.allowHTML;
      const notif = reducer(customValue)([], {
        type: types.ADD_NOTIFICATION,
        payload: notification
      })[0];

      expect(notif.status).toEqual(customValue.status);
      expect(notif.dismissAfter).toEqual(customValue.dismissAfter);
      expect(notif.dismissible).toEqual(customValue.dismissible);
      expect(notif.closeButton).toEqual(customValue.closeButton);
      expect(notif.allowHTML).toEqual(customValue.allowHTML);
    });

    it('should handle UPDATE_NOTIFICATION', () => {
      expect(
        reducer()([notification], {
          type: types.UPDATE_NOTIFICATION,
          payload: notification
        })
      ).toEqual([notification]);
    });

    it('should handle UPDATE_NOTIFICATION (default notification values)', () => {
      delete notification.status;
      delete notification.dismissAfter;
      delete notification.dismissible;
      delete notification.closeButton;
      delete notification.allowHTML;
      const notif = reducer()([notification], {
        type: types.UPDATE_NOTIFICATION,
        payload: notification
      })[0];

      expect(notif.status).toEqual(DEFAULT_NOTIFICATION.status);
      expect(notif.dismissAfter).toEqual(DEFAULT_NOTIFICATION.dismissAfter);
      expect(notif.dismissible).toEqual(DEFAULT_NOTIFICATION.dismissible);
      expect(notif.closeButton).toEqual(DEFAULT_NOTIFICATION.closeButton);
      expect(notif.allowHTML).toEqual(DEFAULT_NOTIFICATION.allowHTML);
    });

    it('should handle UPDATE_NOTIFICATION (custom notification values)', () => {
      const customValue = {
        status: SUCCESS_STATUS,
        position: BOTTOM_CENTER,
        dismissible: false,
        dismissAfter: 2333,
        allowHTML: true,
        closeButton: true
      };
      delete notification.status;
      delete notification.dismissAfter;
      delete notification.dismissible;
      delete notification.closeButton;
      delete notification.allowHTML;
      const notif = reducer(customValue)([notification], {
        type: types.UPDATE_NOTIFICATION,
        payload: notification
      })[0];

      expect(notif.status).toEqual(customValue.status);
      expect(notif.dismissAfter).toEqual(customValue.dismissAfter);
      expect(notif.dismissible).toEqual(customValue.dismissible);
      expect(notif.closeButton).toEqual(customValue.closeButton);
      expect(notif.allowHTML).toEqual(customValue.allowHTML);
    });

    it('should handle REMOVE_NOTIFICATION', () => {
      expect(
        reducer()([notification], {
          type: types.REMOVE_NOTIFICATION,
          payload: notification.id
        })
      ).toEqual([]);
    });

    it('should handle REMOVE_NOTIFICATIONS', () => {
      expect(
        reducer()([notification], {
          type: types.REMOVE_NOTIFICATIONS
        })
      ).toEqual([]);
    });
  });
});
