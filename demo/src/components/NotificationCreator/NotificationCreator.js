import React, {Component} from 'react';
import update from 'react/lib/update';
import {connect} from 'react-redux';
import Switch from '../Switch';
import {addNotification as notify} from '../../../../src/index';

class NotificationCreator extends Component {
  static propTypes = {
    notify: React.PropTypes.func.isRequired
  };
  
  /**
   * Bind methods and define initial state
   * @param {Object} props
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this._addNotification = this._addNotification.bind(this);
    this._onTitleChange = this._onTitleChange.bind(this);
    this._onMessageChange = this._onMessageChange.bind(this);
    this._onPositionChange = this._onPositionChange.bind(this);
    this._onStatusChange = this._onStatusChange.bind(this);
    this._onDismissAfterChange = this._onDismissAfterChange.bind(this);
    this._onDismissibleChange = this._onDismissibleChange.bind(this);
    this._onAction1NameChange = this._onAction1NameChange.bind(this);
    this._onAction1PrimaryChange = this._onAction1PrimaryChange.bind(this);
    this._onAction2NameChange = this._onAction2NameChange.bind(this);
    this._onAction2PrimaryChange = this._onAction2PrimaryChange.bind(this);
    this._onAllowHTMLChange = this._onAllowHTMLChange.bind(this);
    this.state = {
      notification: {
        title: 'Welcome on demo!',
        message: 'Hey buddy, here you can see what you can do with it.',
        position: 'tr',
        status: 'default',
        dismissAfter: 5000,
        dismissible: true,
        actions: [{
          name: '',
          primary: true
        }, {
          name: '',
          primary: false
        }],
        allowHTML: false
      }
    };
  }
  
  /**
   * Add a notification
   * @param {Object} event
   * @returns {void}
   * @private
   */
  _addNotification(event) {
    event.preventDefault();
    const {notification, notification: {actions}} = this.state;
    const {notify} = this.props;
    let _actions = [];
    if (actions[0].name) {
      _actions.push(actions[0]);
    }
    if (actions[1].name) {
      _actions.push(actions[1]);
    }
    notify({
      title: notification.title,
      message: notification.message,
      position: notification.position,
      status: notification.status,
      dismissible: notification.dismissible,
      dismissAfter: notification.dismissAfter,
      actions: _actions,
      allowHTML: notification.allowHTML
    });
  }
  
  /**
   * Update title
   * @param {Object} event
   * @returns {void}
   * @private
   */
  _onTitleChange(event) {
    const newState = update(this.state, {
      notification: {
        title: {$set: event.target.value}
      }
    });
    this.setState(newState);
  }
  
  /**
   * Update message
   * @param {Object} event
   * @returns {void}
   * @private
   */
  _onMessageChange(event) {
    const newState = update(this.state, {
      notification: {
        message: {$set: event.target.value}
      }
    });
    this.setState(newState);
  }
  
  /**
   * Update status
   * @param {Object} event
   * @returns {void}
   * @private
   */
  _onStatusChange(event) {
    const newState = update(this.state, {
      notification: {
        status: {$set: event.target.value}
      }
    });
    this.setState(newState);
  }

  /**
   * Update position
   * @param {Object} event
   * @returns {void}
   * @private
   */
  _onPositionChange(event) {
    const newState = update(this.state, {
      notification: {
        position: {$set: event.target.value}
      }
    });
    this.setState(newState);
  }
  
  /**
   * Update dismiss duration
   * @param {Object} event
   * @returns {void}
   * @private
   */
  _onDismissAfterChange(event) {
    const newState = update(this.state, {
      notification: {
        dismissAfter: {$set: event.target.value}
      }
    });
    this.setState(newState);
  }
  
  /**
   * Update `dismissisble` variable state
   * @param {Object} event
   * @returns {void}
   * @private
   */
  _onDismissibleChange(event) {
    const newState = update(this.state, {
      notification: {
        dismissible: {$set: event.target.checked}
      }
    });
    this.setState(newState);
  }
  
  /**
   * Update first action name
   * @param {Object} event
   * @returns {void}
   * @private
   */
  _onAction1NameChange(event) {
    const newState = update(this.state, {
      notification: {
        actions: {
          0: {
            name: {$set: event.target.value}
          }
        }
      }
    });
    this.setState(newState);
  }
  
  /**
   * Update first action status
   * @param {Object} event
   * @returns {void}
   * @private
   */
  _onAction1PrimaryChange(event) {
    const newState = update(this.state, {
      notification: {
        actions: {
          0: {
            primary: {$set: event.target.checked}
          }
        }
      }
    });
    this.setState(newState);
  }
  
  /**
   * Update second action name
   * @param {Object} event
   * @returns {void}
   * @private
   */
  _onAction2NameChange(event) {
    const newState = update(this.state, {
      notification: {
        actions: {
          1: {
            name: {$set: event.target.value}
          }
        }
      }
    });
    this.setState(newState);
  }
  
  /**
   * Update second action status
   * @param {Object} event
   * @returns {void}
   * @private
   */
  _onAction2PrimaryChange(event) {
    const newState = update(this.state, {
      notification: {
        actions: {
          1: {
            primary: {$set: event.target.checked}
          }
        }
      }
    });
    this.setState(newState);
  }
  
  /**
   * Update `dismissisble` variable state
   * @param {Object} event
   * @returns {void}
   * @private
   */
  _onAllowHTMLChange(event) {
    const newState = update(this.state, {
      notification: {
        allowHTML: {$set: event.target.checked}
      }
    });
    this.setState(newState);
  }
  
  /**
   * Render form
   * @returns {XML}
   */
  render() {
    const {title, message, dismissAfter, dismissible, allowHTML, actions} = this.state.notification;
    return (
      <div>
        <h4 className='text-center'>Notification Creator</h4>
        <form onSubmit={this._addNotification}>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input className='form-control' type='text' id='title' name='title' value={title}
              onChange={this._onTitleChange}/>
          </div>
          <div className='form-group'>
            <label htmlFor='message'>Message</label>
            <textarea className='form-control' id='message' value={message}
              onChange={this._onMessageChange}>
            </textarea>
          </div>
          <div className='form-group'>
            <div className='row'>
              <div className='col-xs-6'>
                <label htmlFor='status'>Position</label>
                <select className='form-control' id='position' name='position'
                  onChange={this._onPositionChange}>
                  <option value='tr'>Top right</option>
                  <option value='tl'>Top left</option>
                  <option value='br'>Bottom right</option>
                  <option value='bl'>Bottom left</option>
                </select>
              </div>
              <div className='col-xs-6'>
                <label htmlFor='status'>Status</label>
                <select className='form-control' id='status' name='status'
                  onChange={this._onStatusChange}>
                  <option value='default'>Default</option>
                  <option value='info'>Info</option>
                  <option value='success'>Success</option>
                  <option value='warning'>Warning</option>
                  <option value='error'>Error</option>
                </select>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <div className='row'>
              <div className='col-xs-6'>
                <label htmlFor='dismissAfter'>Dismiss after (ms)</label>
                <input className='form-control' type='text' name='dismissAfter'
                  onChange={this._onDismissAfterChange} value={dismissAfter}/>
              </div>
              <div className='col-xs-6'>
                <label htmlFor='dismissible'>Dismissible (by clicking on it)</label>
                <Switch name='dismissible' checked={dismissible}
                  onChange={this._onDismissibleChange}/>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <div className='row'>
              <div className='col-xs-6'>
                <label htmlFor='action1-name'>First action</label>
                <input className='form-control' type='text' name='action1-name'
                  value={actions[0].name} onChange={this._onAction1NameChange}/>
              </div>
              <div className='col-xs-6'>
                <label htmlFor='action1-primary'>Primary action</label>
                <Switch name='action1-primary' checked={actions[0].primary}
                  onChange={this._onAction1PrimaryChange}/>
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-6'>
                <label htmlFor='action2-name'>Second action</label>
                <input className='form-control' type='text' name='action2-name'
                  onChange={this._onAction2NameChange} value={actions[1].name}/>
              </div>
              <div className='col-xs-6'>
                <label htmlFor='action2-primary'>Primary action</label>
                <Switch name='action2-primary' checked={actions[1].primary}
                  onChange={this._onAction2PrimaryChange}/>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='allowHTML'>Allow HTML in message</label>
            <Switch name='allowHTML' checked={allowHTML}
              onChange={this._onAllowHTMLChange}/>
          </div>
          <button type='submit' className='btn btn-primary btn-block'>
            Notify
          </button>
        </form>
      </div>
    );
  }
}

export default connect(null, {notify})(NotificationCreator);
