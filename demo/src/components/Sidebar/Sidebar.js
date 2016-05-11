import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  addNotification as notify,
  updateNotification
} from '../../../../src/index';
import {css} from './index';
import NotificationCreator from '../NotificationCreator';
import NotificationExamples from '../NotificationExamples';

class Sidebar extends Component {
  static propTypes = {
    notify: React.PropTypes.func.isRequired,
    updateNotification: React.PropTypes.func.isRequired
  };
  
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
   * Render component
   * @returns {XML}
   * @private
   */
  render() {
    return (
      <div className={css['sidebar']}>
        <NotificationCreator/>
        <hr/>
        <NotificationExamples/>
      </div>
    );
  }
}

export default connect(null, {notify, updateNotification})(Sidebar);
