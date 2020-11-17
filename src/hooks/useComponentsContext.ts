import {useContext} from 'react'
import {ComponentsContext} from '../contexts/componentsContext'

export const useComponentsContext = () => {
    return useContext(ComponentsContext)
}
