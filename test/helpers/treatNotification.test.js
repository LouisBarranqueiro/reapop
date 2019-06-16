import {treatNotification} from '../../src/helpers';
import {genRandomNotification} from '../utils/fixtures';
import {STATUS} from '../../src/constants';

describe('treatNotification()', () => {
  it('should treat notifications', () => {
    let notification = genRandomNotification();
    let notification2 = genRandomNotification({dismissAfter: null});

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
});
