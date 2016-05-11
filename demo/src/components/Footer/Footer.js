import React, {Component} from 'react';
import {css} from './index';

export default class Footer extends Component {

  render() {
    return (
      <div className={css['footer']}>
        <a>Compatibility</a> -
        <a> Documentation</a> -
        <a href='https://github.com/LouisBarranqueiro/reapop'> Source code</a>
      </div>
    );
  }
}
