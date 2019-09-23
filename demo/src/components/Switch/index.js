import React, {Component} from 'react'
import PropTypes from 'prop-types'
import css from './styles.scss'
class Input extends Component {
  /**
   * propTypes
   */
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
    variable: PropTypes.object
  };

  /**
   * Render
   * @returns {XML}
   */
  render() {
    const {variable, name, onChange, checked} = this.props
    return (
      <div className={css.onoffswitch}>
        <input type='checkbox' className={css['onoffswitch-checkbox']} id={name}
          name={name}
          onChange={onChange} checked={checked} {...variable}
        />
        <label className={css['onoffswitch-label']} htmlFor={name}>
          <span className={css['onoffswitch-inner']}/>
          <span className={css['onoffswitch-switch']}/>
        </label>
      </div>
    )
  }
}

export default Input
