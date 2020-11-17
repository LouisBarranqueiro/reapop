import {createContext} from 'react'
import NotificationIcon from '../components/NotificationIcon'
import Notification from '../components/Notification'
import SlideTransition from '../components/SlideTransition'
import GrowTransition from '../components/GrowTransition'
import FadeTransition from '../components/FadeTransition'

export type ComponentContextType = {
    Transition?: typeof SlideTransition | typeof GrowTransition | typeof FadeTransition
    NotificationIcon?: typeof NotificationIcon
    Notification?: typeof Notification
}

export const ComponentsContext = createContext<ComponentContextType>({})
