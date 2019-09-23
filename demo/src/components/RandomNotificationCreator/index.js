import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import faker from 'faker'
import {STATUS, POSITIONS, notify} from '../../../../src'
import css from './styles.scss'

class RandomNotificationCreator extends Component {
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
    this._randomNotification = this._randomNotification.bind(this)
  }

  /**
   * Create random notification with faker
   * @returns {void}
   * @private
   */
  _randomNotification() {
    const {notify} = this.props
    const buttons = []
    let image = null
    let path = window.location.href
    path = path.replace(/index\.html/, '')
    if (faker.random.boolean()) {
      for (let i = 0; i < 2; i++) {
        if (faker.random.boolean()) {
          buttons.push({
            name: faker.lorem.word(),
            primary: faker.random.boolean()
          })
        }
      }
    }
    if (faker.random.boolean()) {
      image = `${path}static/images/image-${faker.random.number({
        min: 1,
        max: 3
      })}.png`
    }
    notify({
      title: (faker.random.boolean() ? faker.lorem.sentence(5) : ''),
      message: faker.lorem.sentence(5),
      image: image,
      position: faker.random.objectElement(POSITIONS),
      status: faker.random.objectElement(STATUS),
      dismissible: faker.random.boolean(),
      dismissAfter: 5000,
      closeButton: faker.random.boolean(),
      allowHTML: faker.random.boolean(),
      buttons: buttons
    })
  }

  /**
   * Render component
   * @returns {XML}
   */
  render() {
    return (
      <button className={`btn btn-primary ${css.button}`} onClick={this._randomNotification}>
        <b>Random notification</b>
      </button>
    )
  }
}
export default connect(null, {notify})(RandomNotificationCreator)
