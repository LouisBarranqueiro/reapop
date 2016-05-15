import React, {Component} from 'react';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import RandomNotificationCreator from '../RandomNotificationCreator';
import Notifications from '../../../../src/index';
import {css} from './index';

class Demo extends Component {
  render() {
    const defaultValues = {
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
          <RandomNotificationCreator/>
        </div>
        <Notifications defaultValues={defaultValues}/>
        <Sidebar/>
        <Footer/>
      </div>
    );
  }
}

export default Demo;
