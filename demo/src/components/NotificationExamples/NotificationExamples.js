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
      actions: [{
        name: 'OK',
        primary: true,
        onClick: function() {
          alert('You clicked on OK button.');
        }
      }]

    });
    setTimeout(function() {
      notif.status = 'success';
      notif.message = 'Your file has been successfully uploaded';
      notif.dismissible = true;
      notif.dismissAfter = 5000;
      notif.actions = [{
        name: 'OK',
        primary: true,
        onClick: function() {
          alert('You clicked on OK button.');
        }
      }, {
        name: 'Details',
        onClick: function() {
          alert('You clicked on Details button.');
        }

      }];
      updateNotification(notif);
    }, 3000);
  }

  /**
   * Render form
   * @returns {XML}
   */
  render() {
    return (
      <div>
        <button className='btn btn-primary btn-block'
                onClick={this._notificationUpdatedExample}>
          Notification updated example
        </button>
      </div>
    );
  }
}

export default connect(null, {notify, updateNotification})(NotificationExamples);
