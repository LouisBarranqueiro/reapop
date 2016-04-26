import React, {Component} from 'react';
import {connect} from 'react-redux';
import css from './Notification.scss';
import {removeNotification} from '../../redux/modules/notifications';

class Notification extends Component {
  static propTypes = {
    id: React.PropTypes.number.isRequired,
    message: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    dismissAfter: React.PropTypes.number.isRequired,
    dismissible: React.PropTypes.bool.isRequired,
    removeNotification: React.PropTypes.func.isRequired
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
    const {message, type, dismissAfter, dismissible} = this.props;
    // remove automatically notification after `dismissAfter` time
    if (dismissAfter > 0) {
      setTimeout(() => this._remove(), dismissAfter);
    }
    return (
      <div className={`${css['notification']} ${css[`notification-${type}`]}`}
           onClick={dismissible ? this._remove : ''}>
        <i className={`fa ${css['notification-icon']}`}></i>
        {message}
      </div>
    );
  }
}

export default connect(null, {removeNotification})(Notification);
