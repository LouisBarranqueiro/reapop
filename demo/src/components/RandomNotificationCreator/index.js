import React, {Component} from 'react';
import {connect} from 'react-redux';
import faker from 'faker';
import {STATUS, POSITIONS, addNotification as notify} from '../../../../index';
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
    const buttons = [];
    let image = null;
    if (faker.random.boolean()) {
      for (let i = 0; i < 2; i++) {
        if (faker.random.boolean()) {
          buttons.push({
            name: faker.lorem.word(),
            primary: faker.random.boolean()
          });
        }
      }
    }
    if (faker.random.boolean()) {
      image = `/static/images/image-${faker.random.number({
        min: 1,
        max: 3
      })}.png`;
    }
    notify({
      title: (faker.random.boolean() ? faker.lorem.sentence(5) : ''),
      message: faker.lorem.sentence(5),
      image: image,
      position: faker.random.objectElement(POSITIONS),
      status: faker.random.objectElement(STATUS),
      dismissible: faker.random.boolean(),
      dismissAfter: 0,
      allowHTML: faker.random.boolean(),
      buttons: buttons
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
