import React, {Component} from 'react';
import css from './styles.scss';

export default class Footer extends Component {

  render() {
    return (
      <div className={css['footer']}>
        <a href='https://github.com/LouisBarranqueiro/reapop#compatiblity'>Compatibility</a> -
        <a href='https://github.com/LouisBarranqueiro/reapop/blob/master/docs/api.md'> API documentation</a> -
        <a href='https://github.com/LouisBarranqueiro/reapop'> Source code</a>
      </div>
    );
  }
}
