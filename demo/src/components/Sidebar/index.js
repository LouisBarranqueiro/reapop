import React, {Component} from 'react';
import css from './styles.scss';
import NotificationCreator from '../NotificationCreator';
import NotificationExamples from '../NotificationExamples';

class Sidebar extends Component {
  /**
   * Render component
   * @returns {XML}
   * @private
   */
  render() {
    return (
      <div className={css['sidebar']}>
        <NotificationCreator/>
        <hr/>
        <NotificationExamples/>
      </div>
    );
  }
}

export default Sidebar;
