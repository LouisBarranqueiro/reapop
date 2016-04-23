import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {createStore, compose, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {
  reducer as notificationsReducer,
  Notifications,
  pushNotification
} from 'react-redux-notification';

// React component
class Demo extends Component {

  constructor(props) {
    super(props);
    this._pushNotification = this._pushNotification.bind(this);
    this._onMessageChange = this._onMessageChange.bind(this);
    this._onTypeChange = this._onTypeChange.bind(this);
    this._onDurationChange = this._onDurationChange.bind(this);
    this._onDismissibleChange = this._onDismissibleChange.bind(this);
    this.state = {
      message: 'Hey buddy, i\'m a notification!',
      type: 'info',
      duration: 5000,
      dismissible: true
    }
  }

  _pushNotification(event) {
    event.preventDefault();
    const {pushNotification} = this.props;
    console.log(this.state);
    pushNotification(this.state.message, this.state.type, this.state.duration, this.state.dismissible);
  }

  _onMessageChange(event) {
    this.setState({message: event.target.value})
  }

  _onTypeChange(event) {
    this.setState({type: event.target.value})
  }

  _onDurationChange(event) {
    this.setState({duration: event.target.value})
  }

  _onDismissibleChange(event) {
    this.setState({dismissible: event.target.checked})
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Notifications/>
        <div className="container">
          <div
            className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
            <div className="panel panel-default">
              <div className="panel-heading"> Notification creator</div>
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
                      <option value="danger">danger</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label for="message">Dismissible (by clicking on)</label>
                    <input className="form-control" type="checkbox" name="dismissible"
                           onChange={this._onDismissibleChange} checked={this.state.dismissible}/>
                  </div>
                  <div className="form-group">
                    <label for="message">Duration</label>
                    <input className="form-control" type="text" name="duration"
                           onChange={this._onDurationChange} value={this.state.duration}/>
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg btn-block">Push</button>
                </form>
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
const App = connect(null, {pushNotification})(Demo);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);