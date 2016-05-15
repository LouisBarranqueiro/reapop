import React, {Component} from 'react';
import {connect} from 'react-redux';
import {STATUS, POSITIONS, addNotification as notify} from '../../../../src';
import css from './styles.scss';

class RandomNotificationCreator extends Component {
  static propTypes = {
    notify: React.PropTypes.func.isRequired
  };

  /**
   * Bind methods
   * @param {Object} props
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this._randomNotification = this._randomNotification.bind(this);
  }

  /**
   * Create random notification with faker
   * @returns {void}
   * @private
   */
  _randomNotification() {
    const {notify} = this.props;
    const actions = [];
    if (faker.random.boolean()) {
      for (let i = 0; i < 2; i++) {
        if (faker.random.boolean()) {
          actions.push({
            name: faker.lorem.word(),
            primary: faker.random.boolean()
          });
        }
      }
    }
    notify({
      title: (faker.random.boolean() ? faker.lorem.sentence(5) : ''),
      message: faker.lorem.sentence(5),
      position: faker.random.objectElement(POSITIONS),
      status: faker.random.objectElement(STATUS),
      dismissible: faker.random.boolean(),
      dismissAfter: 3000,
      allowHTML: faker.random.boolean(),
      actions: actions
    });
  }

  /**
   * Render component
   * @returns {XML}
   */
  render() {
    return (
      <button className={`btn btn-primary ${css['button']}`} onClick={this._randomNotification}>
        <b>Random notification</b>
      </button>
    );
  }
}
export default connect(null, {notify})(RandomNotificationCreator);
