import Notifications from './components/Notifications/Notifications';
import {actions} from './redux/modules/notifications';
import reducer, {addNotification, updateNotification, removeNotification} from './redux/modules/notifications';

export {
  Notifications, actions, reducer, addNotification, updateNotification, removeNotification
};
