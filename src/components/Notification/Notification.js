import React, {Component} from 'react';
import {connect} from 'react-redux';
import css from './Notification.scss';
import {removeNotification} from '../../store/notifications';

// default className for Notification component
export const className = {
  main: css['notification'],
  meta: css['notification-meta'],
  status: function(status) {
    return css[`notification--${status}`];
  },
  dismissible: css['notification--dismissible'],
  // `fa` corresponds to font-awesome's class name
  icon: `fa ${css['notification-icon']}`,
  title: css['notification-title'],
  message: css['notification-message'],
  actions: function(count) {
    if (count === 1) {
      return css['notification--actions-1'];
    }
    else if (count === 2) {
      return css['notification--actions-2'];
    }
    return css['notification-actions'];
  },
  action: css['notification-action']
};

export class Notification extends Component {
  // Default properties
  static defaultProps = {
    className: className,
    onAdd: function() {
    },
    onRemove: function() {
    },
    actions: []
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
    actions: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func.isRequired
      })
    ),
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
    const {id, onAdd, actions} = this.props;
    // update the component to render correctly the action buttons
    if (actions.length && this.refs[id]) {
      this.forceUpdate();
    }
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
   * Render action button(s)
   * @returns {*}
   */
  renderActions() {
    const {actions, className} = this.props;
    return actions.map((action) => {
      return (
        <button key={action.name} className={className.action}
                onClick={action.onClick}>
          {(action.primary
            ? <b>{action.name}</b>
            : action.name)}
        </button>
      );
    });
  }

  /**
   * Render
   * @returns {XML}
   */
  render() {
    const {id, title, message, status, dismissAfter, dismissible, className, actions} = this.props;
    const isDismissible = (dismissible && actions.length === 0);
    let titleDiv = null;
    let actionDiv = null;
    let style = {};
    // add title
    if (title) {
      titleDiv = <h4 className={className.title}>{title}</h4>;
    }
    // add action button(s)
    if (actions.length) {
      // We use `ref` to get height of notification.
      // We simulate a height of 100% or 50% for buttons depending on number of actions
      if (this.refs[id]) {
        style = {
          height: this.refs[id].clientHeight
        };
      }
      actionDiv = (
        <div className={className.actions()} style={style}
             onClick={dismissible ? this._remove : ''}>
          {this.renderActions()}
        </div>
      );
    }
    // remove automatically notification after `dismissAfter` time
    if (dismissAfter > 0) {
      setTimeout(() => this._remove(), dismissAfter);
    }
    
    return (
      <div ref={id} className={
           `${className.main} ${className.status(status)} ${(isDismissible ? className.dismissible : '')} ${className.actions(actions.length)}`}
           onClick={isDismissible ? this._remove : ''}>
        <i className={className.icon}></i>
        <div className={className.meta}>
          {titleDiv}
          <p className={className.message}>
            {message}
          </p>
        </div>
        {actionDiv}
      </div>
    );
  }
}

export default connect(null, {removeNotification})(Notification);
