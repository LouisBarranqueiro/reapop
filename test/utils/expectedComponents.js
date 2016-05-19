import React, {Component} from 'react';

export class ExpectedNotification extends Component {
  /**
   * Return HTML message
   * @returns {Object}
   * @private
   */
  _messageToHTML() {
    const {message} = this.props.notification;
    return {
      __html: message
    };
  }
  
  /**
   * Render button(s)
   * @returns {*}
   */
  _renderButtons() {
    const {
      className,
      notification: {buttons}
    } = this.props;

    return buttons.map((button) => {
      return (
        <button key={button.name} className={className.button} onClick={button.onClick}>
          <span className={className.buttonText}>
            {(button.primary
              ? <b>{button.name}</b>
              : button.name)}
          </span>
        </button>
      );
    });
  }
  
  /**
   * Render
   * @returns {XML}
   */
  render() {
    const {
      className,
      notification: {title, message, status, dismissible, buttons, allowHTML}
    } = this.props;
    const isDismissible = (dismissible && buttons.length === 0);
    return (
      <div className={
           `${className.main} ${className.status(status)}
            ${(isDismissible ? className.dismissible : '')}
            ${className.buttons(buttons.length)}`}>
        <i className={className.icon}></i>
        <div className={className.meta}>
          {(title
            ? <h4 className={className.title}>{title}</h4>
            : '')}
          {(message
            ? (allowHTML
            ? <p className={className.message} dangerouslySetInnerHTML={this._messageToHTML()}/>
            : <p className={className.message}>{message}</p>)
            : '')}
        </div>
        {(buttons.length
          ? <div className={className.buttons()} onClick={this._remove}>
          {this._renderButtons()}
          </div>
          : '')}
      </div>
    );
  }
}
