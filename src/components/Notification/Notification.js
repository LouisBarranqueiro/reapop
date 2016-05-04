import React, {Component} from 'react';
import {connect} from 'react-redux';
import css from './Notification.scss';
import {removeNotification} from '../../store/notifications';

// default className for Notification component
export const className = {
  main: css['notification'],
  status: function(status) {
    return css[`notification-${status}`];
  },
  // `fa` corresponds to font-awesome's class name
  icon: `fa ${css['notification-icon']}`,
  title: css['notification-title'],
  message: ''
};

export class Notification extends Component {
  // Default properties
  static defaultProps = {
    className: className,
    onAdd: function() {
    },
    onRemove: function() {
    }
  };

  // Properties types
  static propTypes = {
    id: React.PropTypes.number.isRequired,
    title: React.PropTypes.string,
    message: React.PropTypes.string,
    status: React.PropTypes.oneOfType([
      React.PropTypes.string.isRequired,
      React.PropTypes.number.isRequired
    ]),
    dismissAfter: React.PropTypes.number.isRequired,
    dismissible: React.PropTypes.bool.isRequired,
    removeNotification: React.PropTypes.func.isRequired,
    onAdd: React.PropTypes.func,
    onRemove: React.PropTypes.func,
    className: React.PropTypes.object.isRequired
  };

  /**
   * Constructor
   * Bind methods
   * @param {Object} props
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this._remove = this._remove.bind(this);
  }
  
  /**
   * Remove the notification
   * @private
   * @returns {void}
   */
  _remove() {
    const {removeNotification, id} = this.props;
    removeNotification(id);
  }

  /**
   * Run `onAdd` callback function when component is mounted
   * @returns {void}
   */
  componentDidMount() {
    const {onAdd} = this.props;
    onAdd();
  }

  /**
   * Run `onRemove` callback function when component will unmount
   * @returns {void}
   */
  componentWillUnmount() {
    const {onRemove} = this.props;
    onRemove();
  }

  /**
   * Render
   * @returns {XML}
   */
  render() {
    const {title, message, status, dismissAfter, dismissible, className} = this.props;
    let titleDiv = null;
    if (title) {
      titleDiv = <h4 className={className.title}>{title}</h4>;
    }
    // remove automatically notification after `dismissAfter` time
    if (dismissAfter > 0) {
      setTimeout(() => this._remove(), dismissAfter);
    }
    return (
      <div className={`${className.main} ${className.status(status)}`}
           onClick={dismissible ? this._remove : ''}>
        <i className={className.icon}></i>
        {titleDiv}
        <p className={className.message}>
          {message}
        </p>
      </div>
    );
  }
}

export default connect(null, {removeNotification})(Notification);
