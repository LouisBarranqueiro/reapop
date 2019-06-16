import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Timer, mapObjectValues} from '../helpers'
import {removeNotification} from '../store/notifications'
import {POSITIONS} from '../constants'

/**
 * Create a timer
 * @param {Number} dismissAfter
 * @param {Function} callback
 * @returns {Function|null} a Timer
 */
function createTimer(dismissAfter, callback) {
  if (dismissAfter > 0) {
    return new Timer(dismissAfter, callback)
  }
  return null
}

export class Notification extends Component {
  static propTypes = {
    className: PropTypes.shape({
      main: PropTypes.string.isRequired,
      wrapper: PropTypes.string.isRequired,
      meta: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      imageContainer: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      status: PropTypes.func.isRequired,
      dismissible: PropTypes.string.isRequired,
      closeButtonContainer: PropTypes.string.isRequired,
      closeButton: PropTypes.string.isRequired,
      buttons: PropTypes.func.isRequired,
      button: PropTypes.string.isRequired,
      buttonText: PropTypes.string.isRequired
    }).isRequired,
    notification: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      title: PropTypes.string,
      message: PropTypes.string,
      image: PropTypes.string,
      status: PropTypes.string.isRequired,
      position: PropTypes.oneOf(mapObjectValues(POSITIONS)),
      dismissAfter: PropTypes.number.isRequired,
      dismissible: PropTypes.bool.isRequired,
      onAdd: PropTypes.func,
      onRemove: PropTypes.func,
      closeButton: PropTypes.bool.isRequired,
      buttons: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          onClick: PropTypes.func
        })
      ).isRequired,
      allowHTML: PropTypes.bool.isRequired
    }).isRequired,
    removeNotification: PropTypes.func.isRequired
  };

  /**
   * Init timer
   * @param {Object} props
   * @returns {void}
   */
  constructor(props) {
    const {dismissAfter} = props.notification
    super(props)
    this.state = {
      timer: createTimer(dismissAfter, this._remove)
    }
  }

  /**
   * Run `onAdd` callback function when component is mounted
   * @returns {void}
   */
  componentDidMount() {
    const {onAdd} = this.props.notification
    if (typeof onAdd === 'function') {
      onAdd()
    }
  }

  /**
   * Run `onRemove` callback function when component will unmount
   * @returns {void}
   */
  componentWillUnmount() {
    const {onRemove} = this.props.notification
    if (typeof onRemove === 'function') {
      onRemove()
    }
  }

  /**
   * Update timer
   * @param {Object} nextProps
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    const {dismissAfter} = nextProps.notification
    this.setState({
      timer: createTimer(dismissAfter, this._remove)
    })
  }

  /**
   * Remove the notification
   * @private
   * @returns {void}
   */
  _remove = () => {
    const {removeNotification, notification: {id}} = this.props
    removeNotification(id)
  };

  /**
   * Pauses the timer
   * @returns {void}
   * @private
   */
  _pauseTimer = () => {
    const {timer} = this.state
    timer.pause()
  };

  /**
   * Resumes the timer
   * @returns {void}
   * @private
   */
  _resumeTimer = () => {
    const {timer} = this.state
    timer.resume()
  };

  /**
   * Wrap content in an object ready for HTML
   * @param {String} content a text
   * @returns {Object}
   * @private
   */
  _setHTML = (content) => {
    return {
      __html: content
    }
  };

  /**
   * Render button(s)
   * @returns {*}
   */
  _renderButtons = () => {
    const {
      className,
      notification: {buttons}
    } = this.props

    return buttons.map(({name, onClick, primary}) => (
      <button key={name} className={className.button} onClick={onClick}>
        <span className={className.buttonText}>
          {primary ? <b>{name}</b> : name}
        </span>
      </button>
    ))
  };

  /**
   * Render
   * @returns {XML}
   */
  render() {
    const {
      className,
      notification: {
        title,
        message,
        status,
        dismissible,
        closeButton,
        buttons,
        image,
        allowHTML
      }
    } = this.props
    const {timer} = this.state
    const notificationClass = [
      className.main,
      className.status(status),
      className.buttons(buttons.length),
      dismissible && !closeButton ? className.dismissible : null
    ].join(' ')

    if (timer) {
      this._resumeTimer()
    }

    return (
      <div
        className={className.wrapper}
        onClick={dismissible && !closeButton ? this._remove : null}
        onMouseEnter={timer ? this._pauseTimer : null}
        onMouseLeave={timer ? this._resumeTimer : null}
      >
        <div className={notificationClass}>
          {image
            ? (
              <div className={className.imageContainer}>
                <span className={className.image} style={{backgroundImage: `url(${image})`}}/>
              </div>
            ) : (
              <span className={className.icon}/>
            )
          }
          <div className={className.meta}>
            {title
              ?
              allowHTML
                ? <h4 className={className.title} dangerouslySetInnerHTML={this._setHTML(title)}/>
                : <h4 className={className.title}>{title}</h4>
              :
              null
            }
            {message
              ?
              allowHTML
                ? <p className={className.message} dangerouslySetInnerHTML={this._setHTML(message)}/>
                : <p className={className.message}>{message}</p>
              :
              null
            }
          </div>
          {dismissible && closeButton
            ? (
              <div className={className.closeButtonContainer}>
                <span className={className.closeButton} onClick={this._remove}/>
              </div>
            ) :
            null
          }
          {buttons.length
            ? (
              <div className={className.buttons()} onClick={this._remove}>
                {this._renderButtons()}
              </div>
            )
            :
            null
          }
        </div>
      </div>
    )
  }
}

export default connect(null, {removeNotification})(Notification)
