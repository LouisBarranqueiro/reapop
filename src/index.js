import NotificationsSystem from './components/NotificationsSystem';
import {STATUS, POSITIONS, DEFAULT_NOTIFICATION} from './constants';
import reducer, {
  actions,
  types,
  addNotification,
  updateNotification,
  removeNotification,
  removeNotifications
} from './store/notifications';

export {
  // constants
  // default value for notifications
  DEFAULT_NOTIFICATION,
  // all available status
  STATUS,
  // all available positions
  POSITIONS,
  // all action creators
  actions,
  // actions types
  types,
  // reducer
  reducer,
  // action creators separately
  addNotification,
  updateNotification,
  removeNotification,
  removeNotifications
};
// NotificationsSystem React component
export default NotificationsSystem;
