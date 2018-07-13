import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  notify,
  removeNotifications
} from '../../../../src';

class NotificationExamples extends Component {
  static propTypes = {
    notify: PropTypes.func.isRequired,
    removeNotifications: PropTypes.func.isRequired
  };

  /**
   * Bind methods
   * @param {Object} props
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this._notificationUpdatedExample = this._notificationUpdatedExample.bind(this);
    this._notificationWithImage = this._notificationWithImage.bind(this);
  }

  /**
   * Example of a notification updated
   * @returns {void}
   * @private
   */
  _notificationUpdatedExample() {
    const {notify} = this.props;
    let notif = notify({
      title: 'Upload status',
      message: 'Your file is uploading...',
      status: 'loading',
      dismissible: false,
      dismissAfter: 0
    });
    setTimeout(function() {
      notif.status = 'success';
      notif.message = 'Your file has been successfully uploaded';
      notif.dismissAfter = 5000;
      notif.buttons = [{
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
      notify(notif);
    }, 3000);
  }

  /**
   * Example of a notification with an image
   * @returns {void}
   * @private
   */
  _notificationWithImage() {
    const {notify} = this.props;
    let path = window.location.href;
    path = path.replace(/index\.html/, '');

    notify({
      title: 'Steve Frizeli added you',
      message: 'Do you want to accept him as friend?',
      image: `${path}static/images/image-2.png`,
      dismissible: false,
      dismissAfter: 0,
      buttons: [{
        name: 'Yes',
        primary: true
      }, {
        name: 'No'
      }],
      allowHTML: true
    });
  }

  /**
   * Example to remove all notifications
   * @returns {void}
   * @private
   */
  _removeNotifications = () => {
    this.props.removeNotifications();
  }

  /**
   * Render form
   * @returns {XML}
   */
  render() {
    return (
      <div>
        <button className='btn btn-primary btn-block' onClick={this._notificationUpdatedExample}>
          Notification updated example
        </button>
        <button className='btn btn-primary btn-block' onClick={this._notificationWithImage}>
          Notification with image
        </button>
        <button className='btn btn-primary btn-block' onClick={this._removeNotifications}>
          Remove all notifications
        </button>
      </div>
    );
  }
}

export default connect(null, {
  notify,
  removeNotifications
})(NotificationExamples);
