import {createContext} from 'react'
import {Theme} from '..'

export const ThemeContext = createContext<Theme | undefined>(undefined)
