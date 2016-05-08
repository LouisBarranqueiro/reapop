import React, {Component} from 'react';
import update from 'react/lib/update';
import {connect} from 'react-redux';
import Switch from '../Switch';
import {
  Notifications,
  addNotification as notify,
  updateNotification
} from '../../../../src/index';
import {css} from './index';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this._addNotification = this._addNotification.bind(this);
    this._notificationUpdatedExample = this._notificationUpdatedExample.bind(this);
    this._notificationWithCallbacksExample = this._notificationWithCallbacksExample.bind(this);
    this._onTitleChange = this._onTitleChange.bind(this);
    this._onMessageChange = this._onMessageChange.bind(this);
    this._onStatusChange = this._onStatusChange.bind(this);
    this._onDismissAfterChange = this._onDismissAfterChange.bind(this);
    this._onDismissibleChange = this._onDismissibleChange.bind(this);
    this._onAction1NameChange = this._onAction1NameChange.bind(this);
    this._onAction1PrimaryChange = this._onAction1PrimaryChange.bind(this);
    this._onAction2NameChange = this._onAction2NameChange.bind(this);
    this._onAction2PrimaryChange = this._onAction2PrimaryChange.bind(this);
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
  
  _addNotification(event) {
    event.preventDefault();
    const {notify} = this.props;
    let actions = [];
    if (this.state.action1.name) {
      actions.push(this.state.action1);
    }
    if (this.state.action2.name) {
      actions.push(this.state.action2);
    }
    notify({
      title: this.state.title,
      message: this.state.message,
      status: this.state.status,
      dismissible: this.state.dismissible,
      dismissAfter: this.state.dismissAfter,
      actions: actions
    });
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
  
  _onTitleChange(event) {
    this.setState({title: event.target.value})
  }
  
  _onMessageChange(event) {
    this.setState({message: event.target.value})
  }
  
  _onStatusChange(event) {
    this.setState({status: event.target.value})
  }
  
  _onDismissAfterChange(event) {
    this.setState({dismissAfter: event.target.value})
  }
  
  _onDismissibleChange(event) {
    this.setState({dismissible: event.target.checked})
  }
  
  _onAction1NameChange(event) {
    const newState = update(this.state, {
      action1: {
        name: {$set: event.target.value}
      }
    });
    this.setState(newState)
  }
  
  _onAction1PrimaryChange(event) {
    const newState = update(this.state, {
      action1: {
        primary: {$set: event.target.checked}
      }
    });
    this.setState(newState);
  }
  
  _onAction2NameChange(event) {
    const newState = update(this.state, {
      action2: {
        name: {$set: event.target.value}
      }
    });
    this.setState(newState)
  }
  
  _onAction2PrimaryChange(event) {
    const newState = update(this.state, {
      action2: {
        primary: {$set: event.target.checked}
      }
    });
    this.setState(newState);
  }
  
  _renderActions() {
    return (
      <div className="form-group">
        <div className="row">
          <div className="col-xs-5">
            <label>
              Name
            </label>
            <input className="form-control" type="text" name="action1-name"
                   onChange={this._onAction1NameChange}
                   value={this.state.action1.name}/>
          </div>
          <div className="col-xs-7">
            <label>
              Primary action
            </label>
            <Switch label="action1-primary"
                    variable={{name:'action1-primary',checked:this.state.action1.primary,onChange:this._onAction1PrimaryChange}}/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-5">
            <label>
              Name
            </label>
            <input className="form-control" type="text" name="action2-name"
                   onChange={this._onAction2NameChange}
                   value={this.state.action2.name}/>
          </div>
          <div className="col-xs-7">
            <label>
              Primary action
            </label>
            <Switch label="action2-primary"
                    variable={{name:'action2-primary',checked:this.state.action2.primary,onChange:this._onAction2PrimaryChange}}/>
          </div>
        </div>
      </div>
    );
  }
  
  render() {
    return (
      <div className={css['sidebar']}>
        <div id="notification-creator">
          <form onSubmit={this._addNotification}>
            <div className="form-group">
              <label for="title">Title</label>
              <input className="form-control" type="text" id="title" name="title"
                     onChange={this._onTitleChange} value={this.state.title}/>
            </div>
            <div className="form-group">
              <label for="message">Message</label>
                    <textarea className="form-control" id="message" value={this.state.message}
                              onChange={this._onMessageChange}></textarea>
            </div>
            <div className="form-group">
              <label for="status">Status</label>
              <select className="form-control" id="status" name="status"
                      onChange={this._onStatusChange}>
                <option value="info">info</option>
                <option value="success">success</option>
                <option value="warning">warning</option>
                <option value="error">error</option>
              </select>
            </div>
            <div className="form-group">
              <label for="dismissAfter">Dismiss after (ms)</label>
              <input className="form-control" type="text" name="dismissAfter"
                     onChange={this._onDismissAfterChange}
                     value={this.state.dismissAfter}/>
            </div>
            <div className="form-group">
              <label for="dismissible">Dismissible (by clicking on it)</label>
              <Switch label="dismissible"
                      variable={{name:'dismissible',checked:this.state.dismissible,onChange:this._onDismissibleChange}}/>
            </div>
            {(this.state.showActions
              ? this._renderActions()
              : <button onClick={() => {this.setState({showActions: true})}}
                        className="btn btn-success btn-block">
              Add action buttons
            </button>)}
            <hr/>
            <button type="submit" className="btn btn-primary btn-block">
              Notify
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, {notify, updateNotification})(Sidebar);