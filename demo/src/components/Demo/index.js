import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import RandomNotificationCreator from '../RandomNotificationCreator'
import Footer from '../Footer'
import NotificationCreator from '../NotificationCreator'
import NotificationExamples from '../NotificationExamples'

import {THEMES, DEFAULT_THEME} from '../../../themes'
import NotificationsSystem, {notify} from '../../../../src'
import css from './styles.scss'

class Demo extends Component {
  static propTypes = {
    notify: PropTypes.func.isRequired
  };

  /**
   * Bind methods
   * @param {Object} props
   * @returns {void}
   */
  constructor(props) {
    super(props)
    this.state = {
      windowWidth: window.innerWidth,
      themeName: DEFAULT_THEME
    }
    this._updateWindowWidth = this._updateWindowWidth.bind(this)
  }

  /**
   * Update window width state
   * @returns {void}
   * @private
   */
  _updateWindowWidth() {
    this.setState({windowWidth: window.innerWidth})
  }

  /**
   * Update window height state when component is mounted
   * @returns {void}
   */
  componentDidMount() {
    const {notify} = this.props

    window.addEventListener('resize', this._updateWindowWidth)
    const notif = notify({
      title: 'Welcome on demo!',
      message: 'Hey buddy, here you can see what you can do with it.',
      status: 'info',
      dismissible: false,
      dismissAfter: 0
    })
    setTimeout(function() {
      notif.message = 'Resize the window, theme is responsive!'
      notif.dismissAfter = 5000
      notify(notif)
    }, 3000)
  }

  /**
   * Update window height state when component will unmount
   * @returns {void}
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this._updateWindowWidth)
  }

  /**
   * Update the theme used to display notifications
   * @param {String} themeName the name of the theme
   * @returns {void}
   */
  _onThemeChange = (themeName) => {
    this.setState({themeName: themeName})
  };

  /**
   * Render component
   * @returns {XML}
   */
  render() {
    const {themeName} = this.state
    const defaultValues = {
      status: 'info',
      position: 'tr',
      dismissible: true,
      dismissAfter: 5000,
      allowHTML: true,
      closeButton: false
    }

    return (
      <div className={css.background}>
        <div className={`${css['logo-container']} text-center`}>
          <div className={css.logo}>Reapop</div>
          <div className={css.description}>A React and Redux notifications system</div>
          <RandomNotificationCreator/>
        </div>
        <NotificationsSystem theme={THEMES[themeName].theme} defaultValues={defaultValues}/>
        {window.innerWidth > 767
          ? (
            <div className={css.sidebar}>
              <NotificationCreator onThemeChange={this._onThemeChange}/>
              <hr/>
              <NotificationExamples/>
            </div>
          ) : null
        }
        <Footer/>
      </div>
    )
  }
}

export default connect(null, {notify})(Demo)
