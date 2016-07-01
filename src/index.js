import NotificationsSystem from './components/NotificationsSystem';
import {STATUS, POSITIONS} from './constants';
import reducer, {
  actions,
  types,
  addNotification,
  updateNotification,
  removeNotification
} from './store/notifications';

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
