import Notifications from './components/Notifications/Notifications';
import reducer, {
  actions,
  types,
  addNotification,
  updateNotification,
  removeNotification
} from './redux/modules/notifications';

export {
  Notifications, actions, types, reducer, addNotification, updateNotification, removeNotification
};
