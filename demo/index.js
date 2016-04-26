import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {createStore, compose, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {
  reducer as notificationsReducer,
  Notifications,
  addNotification,
  updateNotification
} from 'react-redux-notification';

// React component
class Demo extends Component {

  constructor(props) {
    super(props);
    this._pushNotification = this._pushNotification.bind(this);
    this._pushAndUpdateNotificationExample = this._pushAndUpdateNotificationExample.bind(this);
    this._onMessageChange = this._onMessageChange.bind(this);
    this._onTypeChange = this._onTypeChange.bind(this);
    this._onDurationChange = this._onDurationChange.bind(this);
    this._onDismissibleChange = this._onDismissibleChange.bind(this);
    this.state = {
      message: 'Hey buddy, i\'m a notification!',
      type: 'info',
      dismissAfter: 5000,
      dismissible: true
    }
  }

  _pushNotification(event) {
    event.preventDefault();
    const {addNotification} = this.props;
    addNotification({
      message: this.state.message,
      type: this.state.type,
      dismissible: this.state.dismissible,
      dismissAfter: this.state.dismissAfter
    });
  }

  _pushAndUpdateNotificationExample() {
    event.preventDefault();
    const {addNotification, updateNotification} = this.props;
    let notif = addNotification({
      message: 'Your file is uploading...',
      type: 'info',
      dismissible: false,
      dismissAfter: 0
    });
    setTimeout(function() {
      notif.type ='success';
      notif.message ='Your file has been successfully uploaded';
      notif.dismissible = true;
      notif.dismissAfter = 5000;
      updateNotification(notif);
    }, 3000);
  }

  _onMessageChange(event) {
    this.setState({message: event.target.value})
  }

  _onTypeChange(event) {
    this.setState({type: event.target.value})
  }

  _onDurationChange(event) {
    this.setState({dismissAfter: event.target.value})
  }

  _onDismissibleChange(event) {
    this.setState({dismissible: event.target.checked})
  }

  render() {

    return (
      <div>
        <Notifications notificationConfig={{}}/>
        <div className="container">
          <div
            className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
            <div className="panel panel-default">
              <div className="panel-heading">Notification creator</div>
              <div className="panel-body">
                <form onSubmit={this._pushNotification}>
                  <div className="form-group">
                    <label for="message">Message</label>
                    <textarea className="form-control" id="message" value={this.state.message}
                              onChange={this._onMessageChange}></textarea>
                  </div>
                  <div className="form-group">
                    <label for="message">Type</label>
                    <select className="form-control" onChange={this._onTypeChange}>
                      <option value="info">info</option>
                      <option value="success">success</option>
                      <option value="warning">warning</option>
                      <option value="error">error</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label for="message">Dismissible (by clicking on)</label>
                    <input className="form-control" type="checkbox" name="dismissible"
                           onChange={this._onDismissibleChange} checked={this.state.dismissible}/>
                  </div>
                  <div className="form-group">
                    <label for="message">Expire after (sec)</label>
                    <input className="form-control" type="text" name="duration"
                           onChange={this._onDurationChange} value={this.state.dismissAfter}/>
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg btn-block">Push</button>
                </form>
                <hr/>
                  <button onClick={this._pushAndUpdateNotificationExample} className="btn btn-success btn-lg btn-block">Notification updated example</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

// Store
const createStoreWithMiddleware = compose(
  applyMiddleware(thunk)
)(createStore);

const store =
  createStoreWithMiddleware(combineReducers({notifications: notificationsReducer}), {});

// Connected Component
const App = connect(null, {addNotification, updateNotification})(Demo);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);