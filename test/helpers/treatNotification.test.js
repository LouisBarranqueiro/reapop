import {treatNotification} from '../../src/helpers';
import {genNotification} from '../fixtures';
import {STATUS} from '../../src/constants';

describe('treatNotification()', () => {
  it('should treat notifications', () => {
    let notification = genNotification();
    notification.dismissAfter = '2500';
    notification.status = 200;
    delete notification.buttons;
    notification = treatNotification(notification);
    expect(notification.dismissAfter).toBe(2500);
    expect(notification.status).toBe(STATUS.success);
    expect(notification.buttons).toEqual([]);
  });
});
