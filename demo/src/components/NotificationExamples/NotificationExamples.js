import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  addNotification as notify,
  updateNotification
} from '../../../../src/index';

class NotificationExamples extends Component {
  static propTypes = {
    notify: React.PropTypes.func.isRequired,
    updateNotification: React.PropTypes.func.isRequired
  };
  
  /**
   * Bind methods
   * @param {Object} props
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this._notificationUpdatedExample = this._notificationUpdatedExample.bind(this);
    this._notificationWithCallbacksExample = this._notificationWithCallbacksExample.bind(this);
  }

  /**
   * Example of a notification updated
   * @returns {void}
   * @private
   */
  _notificationUpdatedExample() {
    const {notify, updateNotification} = this.props;
    let notif = notify({
      title: 'Upload status',
      message: 'Your file is uploading...',
      status: 'info',
      dismissible: false,
      dismissAfter: 0,
      actions:[
        {
          name:'ok'
        }
      ]

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
   * @returns {void}
   * @private
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

  /**
   * Render form
   * @returns {XML}
   */
  render() {
    return (
      <div>
        <h4>Examples</h4>
        <button className='btn btn-primary btn-block' onClick={this._notificationUpdatedExample}>Notification updated</button>
        <button className='btn btn-primary btn-block' onClick={this._notificationWithCallbacksExample}>Notification with callbacks </button>
        <button className='btn btn-primary btn-block' onClick={this._notificationUpdatedExample}>Notification with actions callbacks</button>
      </div>
    );
  }
}

export default connect(null, {notify, updateNotification})(NotificationExamples);
