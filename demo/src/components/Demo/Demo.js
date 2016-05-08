import React, {Component} from 'react';
import Sidebar from '../Sidebar';
import {Notifications} from '../../../../src/index';
import {css} from './index';

class Demo extends Component {
  render() {
    const config = {
      status: 'info',
      dismissible: true,
      dismissAfter: 5000
    };
    return (
      <div className={css['background']}>
        <div id="background"></div>
        <Notifications defaultValues={config}/>
        <Sidebar/>
      </div>
    );
  }
}

export default Demo;