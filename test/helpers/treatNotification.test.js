import {treatNotification} from '../../src/helpers';
import {genNotification} from '../utils/fixtures';
import {STATUS} from '../../src/constants';

describe('treatNotification()', () => {
  it('should treat notifications', () => {
    let notification = genNotification();
    let notification2 = genNotification({dismissAfter: null});

    notification.dismissAfter = '2500';
    notification.status = 200;
    notification.image = null;
    notification.buttons = null;

    notification = treatNotification(notification);
    notification2 = treatNotification(notification2);

    expect(notification.dismissAfter).toBe(2500);
    expect(notification2.dismissAfter).toBe(null);
    expect(notification.status).toBe(STATUS.success);
    expect(notification.buttons).toEqual([]);
  });

  it('should update notification status to `default` (with image)', () => {
    let notification = genNotification({
      status: STATUS.info
    });
    notification = treatNotification(notification);
    expect(notification.status).toEqual(STATUS.default);
  });
});
