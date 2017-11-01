import React, {Component} from 'react';
import {connect} from 'react-redux';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import RandomNotificationCreator from '../RandomNotificationCreator';
import NotificationsSystem, {
  addNotification as notify,
  updateNotification
} from '../../../../src';
import css from './styles.scss';
import themeWybo from 'reapop-theme-wybo';
import themeBs from 'reapop-theme-bootstrap';

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
      windowWidth: window.innerWidth,
      theme: 'wybo'
    };
    this._updateWindowWidth = this._updateWindowWidth.bind(this);
    this.handleChangeTheme = this.handleChangeTheme.bind(this);
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
    const notif = notify({
      title: 'Welcome on demo!',
      message: 'Hey buddy, here you can see what you can do with it.',
      status: 'info',
      dismissible: false,
      dismissAfter: 0
    });
    setTimeout(function() {
      notif.message = 'Resize the window, theme is responsive!';
      notif.dismissAfter = 5000;
      updateNotification(notif);
    }, 3000);
  }

  /**
   * Update window height state when component will unmount
   * @returns {void}
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this._updateWindowWidth);
  }

  handleChangeTheme(e) {
    this.setState({
      theme: e.target.value
    });
  }

  getTheme() {
    if (this.state.theme === 'wybo') {
      return themeWybo;
    }

    return themeBs;
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
      allowHTML: true,
      closeButton: false
    };

    const theme = this.getTheme();

    return (
      <div className={css['background']}>
        <div className={`${css['logo-container']} text-center`}>
          <div className={css['logo']}>Reapop</div>
          <div className={css['description']}>A React and Redux notifications system</div>
          <RandomNotificationCreator/>
        </div>
        <NotificationsSystem theme={theme} defaultValues={defaultValues}/>
        {(window.innerWidth > 767 ? <Sidebar currentTheme={this.state.theme} onChangeTheme={this.handleChangeTheme}/> : '')}
        <Footer/>
      </div>
    );
  }
}

export default connect(null, {notify, updateNotification})(Demo);
