import React, {Component} from 'react';
import {connect} from 'react-redux';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import RandomNotificationCreator from '../RandomNotificationCreator';
import NotificationsSystem, {addNotification as notify, updateNotification} from '../../../../src';
import {css} from './index';

class Demo extends Component {
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
    this.state = {
      windowWidth: window.innerWidth
    };
    this._updateWindowWidth = this._updateWindowWidth.bind(this);
  }

  /**
   * Update window width state
   * @returns {void}
   * @private
   */
  _updateWindowWidth() {
    this.setState({windowWidth: window.innerWidth});
  }

  /**
   * Update window height state when component is mounted
   * @returns {void}
   */
  componentDidMount() {
    const {notify, updateNotification} = this.props;

    window.addEventListener('resize', this._updateWindowWidth);
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
   * Update window height state when component will unmount
   * @returns {void}
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this._updateWindowWidth);
  }

  /**
   * Render component
   * @returns {XML}
   */
  render() {
    const defaultValues = {
      status: 'info',
      position: 'tr',
      dismissible: true,
      dismissAfter: 5000,
      allowHTML: true
    };

    return (
      <div className={css['background']}>
        <div className={`${css['logo-container']} text-center`}>
          <div className={css['logo']}>Reapop</div>
          <div className={css['description']}>A React and Redux notifications system</div>
          <RandomNotificationCreator/>
        </div>
        <NotificationsSystem defaultValues={defaultValues}/>
        {(window.innerWidth > 767 ? <Sidebar/> : '')}
        <Footer/>
      </div>
    );
  }
}

export default connect(null, {notify, updateNotification})(Demo);
