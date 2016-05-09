import React, {Component} from 'react';
import css from './Switch.scss';

class Input extends Component {
  /**
   * propTypes
   */
  static propTypes = {
    variable: React.PropTypes.object.isRequired,
    label: React.PropTypes.string.isRequired
  };

  /**
   * Render
   * @returns {XML}
   */
  render() {
    const {variable, label} = this.props;
    return (
      <div className='form-group'>
        <div className={css['onoffswitch']}>
          <input type="checkbox"
                 className={css['onoffswitch-checkbox']}
                 id={variable.name}
            {...variable}
                 />
          <label className={css['onoffswitch-label']} htmlFor={variable.name}>
            <span className={css['onoffswitch-inner']}></span>
            <span className={css['onoffswitch-switch']}></span>
          </label>
        </div>
      </div>
    );
  }
}

export default Input;
