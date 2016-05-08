import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Notifications,
  addNotification as notify,
  updateNotification
} from '../../../../src/index';
import {css} from './index';
import NotificationCreator from '../NotificationCreator';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this._notificationUpdatedExample = this._notificationUpdatedExample.bind(this);
    this._notificationWithCallbacksExample = this._notificationWithCallbacksExample.bind(this);
    this.state = {
      showActions: false,
      title: 'Welcome on demo!',
      message: 'Hey buddy, here you can see what you can do with it.',
      status: 'info',
      dismissAfter: 5000,
      dismissible: true,
      action1: {
        name: '',
        primary: true
      },
      action2: {
        name: '',
        primary: false
      }
    }
  }

  componentDidMount() {
    const {notify, updateNotification} = this.props;
    let notif = notify({
      title: 'Welcome on demo!',
      message: 'Hey buddy, here you can see what you can do with it.',
      status: 'info',
      dismissible: false,
      dismissAfter: 0
    });
    setTimeout(function() {
      notif.message = 'If you got any questions, create an issue on Github repository.';
      notif.dismissAfter = 5000;
      updateNotification(notif);
    }, 4000);
  }

  /**
   * Example of a notification updated
   */
  _notificationUpdatedExample() {
    const {notify, updateNotification} = this.props;
    let notif = notify({
      title: 'Upload status',
      message: 'Your file is uploading...',
      status: 'info',
      dismissible: false,
      dismissAfter: 0
    });
    setTimeout(function() {
      notif.status = 'success';
      notif.message = 'Your file has been successfully uploaded';
      notif.dismissible = true;
      notif.dismissAfter = 5000;
      updateNotification(notif);
    }, 3000);
  }

  /**
   * Example of a notification with callbacks `onAdd` and `onRemove`
   */
  _notificationWithCallbacksExample() {
    const {notify} = this.props;
    notify({
      message: 'Component is mounted',
      status: 'info',
      dismissible: false,
      dismissAfter: 3000,
      onAdd: function() {
        alert('Notification component did mount');
      },
      onRemove: function() {
        alert('Notification component will unmount');
      }
    });
  }

  render() {
    return (
      <div className={css['sidebar']}>
        <NotificationCreator/>
      </div>
    );
  }
}

export default connect(null, {notify, updateNotification})(Sidebar);