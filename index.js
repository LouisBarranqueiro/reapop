import NotificationsSystem from './src/components/NotificationsSystem';
import {STATUS, POSITIONS} from './src/constants';
import reducer, {
  actions,
  types,
  addNotification,
  updateNotification,
  removeNotification
} from './src/store/notifications';

export {
  // constants
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
  removeNotification
};
// NotificationsSystem React component
export default NotificationsSystem;
