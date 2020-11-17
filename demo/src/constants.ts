import wyboTheme from '../../src/themes/wybo'
import bootstrapTheme from '../../src/themes/bootstrap'
import {FadeTransition, GrowTransition, SlideTransition} from '../../src'
import atalhoTheme from '../../src/themes/atalho'

export type ThemeNames = keyof typeof THEMES

export const THEMES = {
    Atalho: atalhoTheme,
    Wybo: wyboTheme,
    Bootstrap: bootstrapTheme,
}

export type TransitionNames = keyof typeof TRANSITIONS

export const TRANSITIONS = {
    Fade: FadeTransition,
    Slide: SlideTransition,
    Grow: GrowTransition,
}
