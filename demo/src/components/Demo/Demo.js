import React, {Component} from 'react';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import Notifications from '../../../../src/index';
import {css} from './index';

class Demo extends Component {
  render() {
    const config = {
      status: 'info',
      position: 'tr',
      dismissible: true,
      dismissAfter: 5000,
      allowHTML: true
    };
    return (
      <div className={css['background']}>
        <div className={`${css['logo-container']} text-center`}>
          <div className={css['logo']}>Reapop</div>
          <div className={css['description']}>A React and Redux notifications system</div>
        </div>
        <Notifications defaultValues={config}/>
        <Sidebar/>
        <Footer/>
      </div>
    );
  }
}

export default Demo;
