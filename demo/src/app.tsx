import React from 'react'
import {Provider} from 'react-redux'
import {createRoot} from 'react-dom/client'
import {createStore, combineReducers} from 'redux'
import Demo from './components/Demo'
import {POSITIONS, reducer as notificationsReducer} from '../../src'
import './styles/global.scss'
import {setUpNotifications} from '../../src'
import {composeWithDevTools} from '@redux-devtools/extension'

const store = createStore(
    combineReducers({
        notifications: notificationsReducer(),
    }),
    composeWithDevTools()
)

setUpNotifications({
    defaultProps: {
        position: POSITIONS.topRight,
        dismissible: true,
        allowHTML: true,
    },
})

const App = () => (
    <React.StrictMode>
        <Provider store={store}>
            <Demo />
        </Provider>
    </React.StrictMode>
)
const rootElem = document.getElementById('root')
const root = createRoot(rootElem!)
root.render(<App />)
