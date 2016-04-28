import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {createStore, compose, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {
  reducer as notificationsReducer,
  Notifications,
  addNotification as notify,
  updateNotification
} from 'react-redux-notification';

// React component
class Demo extends Component {
  
  constructor(props) {
    super(props);
    this._pushNotification = this._pushNotification.bind(this);
    this._pushAndUpdateNotificationExample = this._pushAndUpdateNotificationExample.bind(this);
    this._onTitleChange = this._onTitleChange.bind(this);
    this._onMessageChange = this._onMessageChange.bind(this);
    this._onTypeChange = this._onTypeChange.bind(this);
    this._onDurationChange = this._onDurationChange.bind(this);
    this._onDismissibleChange = this._onDismissibleChange.bind(this);
    this.state = {
      title: 'Welcome on demo!',
      message: 'Hey buddy, here you can see what you can do with it.',
      type: 'info',
      dismissAfter: 5000,
      dismissible: true
    }
  }

  componentDidMount() {
    const {notify, updateNotification} = this.props;
    let notif = notify(Object.assign({}, this.state, {
      dismissAfter:0
    }));
    setTimeout(function() {
      notif.message = 'If you got any questions, create an issue on Github repository.';
      notif.dismissAfter = 5000;
      updateNotification(notif);
    }, 4000);
  }
  _pushNotification(event) {
    event.preventDefault();
    const {notify} = this.props;
    notify({
      title: this.state.title,
      message: this.state.message,
      type: this.state.type,
      dismissible: this.state.dismissible,
      dismissAfter: this.state.dismissAfter
    });
  }
  
  _pushAndUpdateNotificationExample() {
    event.preventDefault();
    const {notify, updateNotification} = this.props;
    let notif = notify({
      message: 'Your file is uploading...',
      type: 'info',
      dismissible: false,
      dismissAfter: 0
    });
    setTimeout(function() {
      notif.type = 'success';
      notif.message = 'Your file has been successfully uploaded';
      notif.dismissible = true;
      notif.dismissAfter = 5000;
      updateNotification(notif);
    }, 3000);
  }

  _onTitleChange(event) {
    this.setState({title: event.target.value})
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
    const config = {
      type: 'info',
      dismissible:true,
      dismissAfter:5000
    };
    return (
      <div>
        <Notifications defaultValues={config} />
        <div className="container-fluid">
          <div
            className="col-xs-10 col-xs-offset-1 col-sm-8 col-md-4">
            <div className="panel panel-default">
              <div className="panel-heading">Notification creator</div>
              <div className="panel-body">
                <form onSubmit={this._pushNotification}>
                  <div className="form-group">
                    <label for="title">Title</label>
                    <input className="form-control" type="text" name="title"
                           onChange={this._onTitleChange} value={this.state.title}/>
                  </div>
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
                  <button type="submit" className="btn btn-primary btn-block">Push</button>
                </form>
                <hr/>
                <button onClick={this._pushAndUpdateNotificationExample}
                        className="btn btn-success btn-block">Notification updated example
                </button>
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
const App = connect(null, {notify, updateNotification})(Demo);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);