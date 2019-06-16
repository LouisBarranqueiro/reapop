import React, {Component} from 'react'
import css from './styles.scss'

export default class Footer extends Component {
  render() {
    return (
      <div className={css['footer']}>
        <a href='https://github.com/LouisBarranqueiro/reapop#compatibility'>Compatibility</a> -
        <a href='https://github.com/LouisBarranqueiro/reapop#reapop'> Documentation</a> -
        <a href='https://github.com/LouisBarranqueiro/reapop'> Source code</a>
      </div>
    )
  }
}
