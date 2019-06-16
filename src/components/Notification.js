import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Timer} from '../helpers'
import {removeNotification} from '../store/notifications'

import type {Node} from 'react'
import type {Theme} from '../types'

type Props = {
  className: $PropertyType<$PropertyType<Theme, 'notification'>, 'className'>,
  notification: {
    id: string | number,
    title: ?string,
    message: ?string,
    image: ?string,
    status: string,
    position: string,
    dismissAfter: number,
    dismissible: boolean,
    onAdd: (...any) => any,
    onRemove: (...any) => any,
    closeButton: boolean,
    buttons: Array<{
      name: string,
      primary: ?boolean,
      onClick: ?(...any) => any
    }>,
    allowHTML: boolean
  },
  removeNotification: typeof removeNotification
}

type State = {
  timer: ?Timer
}

/**
 * Create a timer
 * @param {Number} dismissAfter
 * @param {Function} callback
 * @returns {Function|null} a Timer
 */
function createTimer(dismissAfter, callback): ?Timer {
  if (dismissAfter > 0) {
    return new Timer(dismissAfter, callback)
  }
  return null
}

export class Notification extends Component<Props, State> {
  /**
   * Start the timer
   * @param {Object} props
   * @returns {void}
   */
  constructor(props: Props) {
    const {dismissAfter} = props.notification
    super(props)
    this.state = {
      timer: createTimer(dismissAfter, this._removeNotification)
    }
  }

  componentDidMount() {
    const {onAdd} = this.props.notification
    const {timer} = this.state

    if (timer) {
      timer.resume()
    }

    if (typeof onAdd === 'function') {
      onAdd()
    }
  }

  componentWillUnmount() {
    const {onRemove} = this.props.notification
    if (typeof onRemove === 'function') {
      onRemove()
    }
  }

  /**
   * Update the timer
   * @param {Object} nextProps
   * @returns {void}
   */
  componentWillReceiveProps(nextProps: Props) {
    const {dismissAfter} = nextProps.notification
    this.setState({
      timer: createTimer(dismissAfter, this._removeNotification)
    })
  }

  _removeNotification = () => {
    const {removeNotification, notification: {id}} = this.props
    removeNotification(id)
  }

  _pauseTimer = () => {
    const {timer} = this.state
    // $FlowFixMe
    timer.pause()
  }

  _resumeTimer = () => {
    const {timer} = this.state
    // $FlowFixMe
    timer.resume()
  }

  _setHTML = (content: string): Object => {
    return {
      __html: content
    }
  }

  _renderButtons = () => {
    const {
      className,
      notification: {buttons}
    } = this.props

    return buttons.map<Node>(({name, onClick, primary}: Object): Node => (
      <button key={name} className={className.button} onClick={onClick}>
        <span className={className.buttonText}>
          {primary ? <b>{name}</b> : name}
        </span>
      </button>
    ))
  }

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

    return (
      <div
        className={className.wrapper}
        onClick={dismissible && !closeButton ? this._removeNotification : null}
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
                <span className={className.closeButton} onClick={this._removeNotification}/>
              </div>
            ) :
            null
          }
          {buttons.length
            ? (
              <div className={className.buttons()} onClick={this._removeNotification}>
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

// $FlowFixMe
export default connect(null, {removeNotification})(Notification)
