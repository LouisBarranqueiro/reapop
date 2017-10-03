import React, {Component} from 'react';
import css from './styles.scss';
import NotificationCreator from '../NotificationCreator';
import NotificationExamples from '../NotificationExamples';

class Sidebar extends Component {
  static propTypes = {
    currentTheme: React.PropTypes.string.isRequired,
    onChangeTheme: React.PropTypes.func.isRequired
  };

  /**
   * Render component
   * @returns {XML}
   * @private
   */
  render() {
    return (
      <div className={css['sidebar']}>
        <h4 className='text-center'>Select a theme</h4>
        <select className='form-control' value={this.props.currentTheme} onChange={this.props.onChangeTheme}>
          <option value={'wybo'}>Wybo</option>
          <option value={'bootstrap'}>Bootstrap</option>
        </select>
        <NotificationCreator/>
        <hr/>
        <NotificationExamples/>
      </div>
    );
  }
}

export default Sidebar;
