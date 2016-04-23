import React, {Component} from 'react';
import {connect} from 'react-redux';
import css from './Notification.scss';
import {removeNotification} from '../../redux/modules/notifications';

class Notification extends Component {
  static propTypes = {
    id: React.PropTypes.number,
    message: React.PropTypes.string,
    type: React.PropTypes.string,
    removeNotification: React.PropTypes.func
  };

  /**
   * Constructor
   * Bind methods
   * @param {Object} props
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this._remove = this._remove.bind(this);
  }

  /**
   * Remove the notification
   * @private
   * @returns {void}
   */
  _remove() {
    const {removeNotification, id} = this.props;
    removeNotification(id);
  }

  /**
   * Render
   * @returns {XML}
   */
  render() {
    const {message, type} = this.props;
    return (
      <div className={`${css['notification']} ${css[`notification-${type}`]}`}
           onClick={this._remove}>
        <i className={`fa ${css['notification-icon']}`}></i>
        {message}
      </div>
    );
  }
}

export default connect(null, {removeNotification})(Notification);
