import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'

import packageJson from 'package.json'
import {notify, STATUSES} from 'src'

import NotificationButtons from 'demo/src/components/NotificationButtons'
import NotificationCreator from 'demo/src/components/NotificationCreator'
import Footer from 'demo/src/components/Footer'
import {ThemeNames, TransitionNames} from 'demo/src/constants'
import css from './Demo.scss'
import Notifications from '../Notifications'

const Demo = () => {
    const dispatch = useDispatch()
    const [themeName, setThemeName] = useState<ThemeNames>('Atalho')
    const [transitionName, setTransitionName] = useState<TransitionNames>('Slide')

    useEffect(() => {
        setTimeout(function () {
            const notification = dispatch(
                notify({
                    id: 'custom-id',
                    title: 'Welcome to the demo!',
                    message: 'Use the notification creator to discover what you can do with it.',
                    status: STATUSES.loading,
                    dismissible: false,
                    dismissAfter: 0,
                })
            ).payload

            setTimeout(function () {
                notification.message = 'One last thing, notifications can be updated.'
                notification.status = STATUSES.success
                notification.dismissAfter = 3000
                dispatch(notify(notification))
            }, 3500)
        }, 500)
    }, [])

    return (
        <div className={css.background}>
            <div className={`${css['logo-container']} text-center`}>
                <div className={css.logo}>Reapop</div>
                <div className={css.description}>{packageJson.description}</div>
                <NotificationButtons />
            </div>
            <Notifications themeName={themeName} transitionName={transitionName} />
            {window.innerWidth > 767 ? (
                <div className={css.sidebar}>
                    <NotificationCreator
                        transitionName={transitionName}
                        themeName={themeName}
                        onTransitionChange={(transition) => setTransitionName(transition)}
                        onThemeChange={(theme) => setThemeName(theme)}
                    />
                </div>
            ) : null}
            <Footer />
        </div>
    )
}

export default Demo
