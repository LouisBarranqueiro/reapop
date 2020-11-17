import {ThemeContext} from '../contexts/themeContext'
import {useContext} from 'react'

export const useTheme = () => useContext(ThemeContext)
