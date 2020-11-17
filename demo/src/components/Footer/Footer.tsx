import React from 'react'
import css from './Footer.scss'

export const Footer = () => {
    return (
        <div className={css.footer}>
            <a href="https://github.com/LouisBarranqueiro/reapop#compatibility">Compatibility</a> -{' '}
            <a href="https://github.com/LouisBarranqueiro/reapop#documentation">Documentation</a> -{' '}
            <a href="https://github.com/LouisBarranqueiro/reapop">Source code</a>
        </div>
    )
}

export default Footer
