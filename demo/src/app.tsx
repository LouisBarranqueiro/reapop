import 'react-hot-loader'
import {hot} from 'react-hot-loader/root'
import React from 'react'
import {Provider} from 'react-redux'
import {render} from 'react-dom'
import {createStore, compose, combineReducers} from 'redux'
import Demo from './components/Demo'
import {POSITIONS, reducer as notificationsReducer} from '../../src'
import './styles/global.scss'
import {setUpNotifications} from '../../src'

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    combineReducers({
        notifications: notificationsReducer(),
    }),
    composeEnhancers()
)

setUpNotifications({
    defaultProps: {
        position: POSITIONS.topRight,
        dismissible: true,
        allowHTML: true,
    },
})

const App = hot(() => (
    <Provider store={store}>
        <Demo />
    </Provider>
))

render(<App />, document.getElementById('root'))
