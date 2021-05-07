import React, {SyntheticEvent, useState} from 'react'
import {useDispatch} from 'react-redux'
import Switch from 'demo/src/components/Switch'
import {NewNotification, Notification, NotificationButton} from 'src'

import {notify, POSITIONS, STATUSES} from 'src'
import {THEMES, ThemeNames, TransitionNames, TRANSITIONS} from 'demo/src/constants'

type Props = {
    onTransitionChange: (transition: TransitionNames) => void
    onThemeChange: (themeName: ThemeNames) => void
    themeName: ThemeNames
    transitionName: TransitionNames
}

const NotificationCreator = (props: Props) => {
    const dispatch = useDispatch()
    const [notification, setNotification] = useState<NewNotification>({
        title: 'Welcome to the demo!',
        message: 'Use the notification creator to discover what you can do with it',
        status: STATUSES.none,
        position: POSITIONS.topRight,
        image: undefined,
        dismissAfter: 5000,
        dismissible: true,
        showDismissButton: false,
        buttons: [
            {
                name: '',
                primary: true,
            },
            {
                name: '',
                primary: false,
            },
        ],
        allowHTML: true,
    })
    const [button1, setButton1] = useState<NotificationButton>({name: ''})
    const [button2, setButton2] = useState<NotificationButton>({name: ''})
    const createNotification = (event: SyntheticEvent) => {
        event.preventDefault()
        const buttons = []
        if (button1.name) {
            buttons.push(button1)
        }
        if (button2.name) {
            buttons.push(button2)
        }
        dispatch(
            notify({
                title: notification.title,
                message: notification.message,
                position: notification.position,
                image: notification.image,
                status: notification.status,
                dismissible: notification.dismissible,
                dismissAfter: notification.dismissAfter,
                showDismissButton: notification.showDismissButton,
                buttons,
                allowHTML: notification.allowHTML,
            })
        )
    }

    const onNotificationAttrChange = (attribute: keyof Notification, inputAttr: 'value' | 'checked' = 'value') => {
        return (event: SyntheticEvent) =>
            setNotification({...notification, [attribute]: (event.target as HTMLInputElement)[inputAttr]})
    }

    const onButton1AttrChange = (attribute: keyof NotificationButton, inputAttr: 'value' | 'checked' = 'value') => {
        return (event: SyntheticEvent) =>
            setButton1({...button1, [attribute]: (event.target as HTMLInputElement)[inputAttr]})
    }

    const onButton2AttrChange = (attribute: keyof NotificationButton, inputAttr: 'value' | 'checked' = 'value') => {
        return (event: SyntheticEvent) =>
            setButton2({...button1, [attribute]: (event.target as HTMLInputElement)[inputAttr]})
    }
    const {title, message, status, position, dismissAfter, dismissible, showDismissButton, image} = notification
    const {onThemeChange, onTransitionChange, themeName, transitionName} = props

    return (
        <div>
            <h3 className="text-center mb-5">Notification Creator</h3>
            <form onSubmit={createNotification}>
                <div>
                    <div className="row">
                        <div className="col-sm-6">
                            <label className="form-label fw-bold" htmlFor="title">
                                Theme
                            </label>
                            <select
                                className="form-select"
                                id="theme"
                                name="theme"
                                defaultValue={themeName}
                                onChange={(evt) =>
                                    onThemeChange(((evt.target as HTMLSelectElement).value as unknown) as ThemeNames)
                                }
                            >
                                {Object.keys(THEMES).map((themeName) => {
                                    return (
                                        <option key={themeName} value={themeName}>
                                            {themeName}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="col-sm-6">
                            <label className="form-label fw-bold" htmlFor="title">
                                Transition
                            </label>
                            <select
                                className="form-select"
                                id="transition"
                                name="transition"
                                defaultValue={transitionName}
                                onChange={(evt) =>
                                    onTransitionChange(
                                        ((evt.target as HTMLSelectElement).value as unknown) as TransitionNames
                                    )
                                }
                            >
                                {Object.keys(TRANSITIONS).map((transition) => {
                                    return (
                                        <option key={transition} value={transition}>
                                            {transition}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <hr className="mt-4 mb-4" />
                <div className="mb-3">
                    <label className="form-label fw-bold" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={onNotificationAttrChange('title')}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold" htmlFor="message">
                        Message
                    </label>
                    <textarea
                        className="form-control"
                        id="message"
                        value={message}
                        rows={3}
                        onChange={onNotificationAttrChange('message')}
                    />
                </div>
                <div className="mb-3">
                    <div className="row">
                        <div className="col-sm-6">
                            <label className="form-label fw-bold" htmlFor="status">
                                Position
                            </label>
                            <select
                                className="form-select"
                                id="position"
                                name="position"
                                defaultValue={position}
                                onChange={onNotificationAttrChange('position')}
                            >
                                {Object.values(POSITIONS).map((position) => (
                                    <option key={position} value={position}>
                                        {position.replaceAll('-', ' ')}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-sm-6">
                            <label className="form-label fw-bold" htmlFor="status">
                                Status
                            </label>
                            <select
                                className="form-select"
                                id="status"
                                name="status"
                                defaultValue={status}
                                onChange={onNotificationAttrChange('status')}
                            >
                                {Object.values(STATUSES).map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="row">
                        <div className="col-sm-6">
                            <label className="form-label fw-bold" htmlFor="dismissAfter">
                                Dismiss after (ms)
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                name="dismissAfter"
                                onChange={onNotificationAttrChange('dismissAfter')}
                                value={dismissAfter}
                            />
                        </div>
                        <div className="col-sm-6">
                            <label className="form-label fw-bold" htmlFor="dismissible">
                                Dismissible
                            </label>
                            <Switch
                                name="dismissible"
                                checked={dismissible as boolean}
                                onChange={onNotificationAttrChange('dismissible', 'checked')}
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <label className="form-label fw-bold" htmlFor="button1-name">
                                First button
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                name="action1-name"
                                value={button1.name}
                                onChange={onButton1AttrChange('name')}
                            />
                        </div>
                        <div className="col-sm-6">
                            <label className="form-label fw-bold" htmlFor="button1-primary">
                                Primary button
                            </label>
                            <Switch
                                name="button1-primary"
                                checked={!!button1.primary}
                                onChange={onButton1AttrChange('primary', 'checked')}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <label className="form-label fw-bold" htmlFor="button2-name">
                                Second button
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                name="button2-name"
                                onChange={onButton2AttrChange('name')}
                                value={button2.name}
                            />
                        </div>
                        <div className="col-sm-6">
                            <label className="form-label text-s fw-bold" htmlFor="button2-primary">
                                Primary button
                            </label>
                            <Switch
                                name="button2-primary"
                                checked={!!button2.primary}
                                onChange={onButton2AttrChange('primary', 'checked')}
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-4 row">
                    <div className="col-sm-6">
                        <label className="form-label fw-bold" htmlFor="allowHTML">
                            With image
                        </label>
                        <Switch
                            name="image"
                            checked={!!image}
                            onChange={(event) => {
                                const baseUrl = window.location.href.replace(/index\.html/, '')
                                setNotification({
                                    ...notification,
                                    image: (event.target as HTMLInputElement).checked
                                        ? `${baseUrl}static/images/image-1.png`
                                        : undefined,
                                })
                            }}
                        />
                    </div>
                    <div className="col-sm-6">
                        <label className="form-label fw-bold" htmlFor="dismissButton">
                            Dismiss button
                        </label>
                        <Switch
                            name="showDismissButton"
                            checked={showDismissButton as boolean}
                            onChange={onNotificationAttrChange('showDismissButton', 'checked')}
                        />
                    </div>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-block">
                        Notify
                    </button>
                </div>
            </form>
        </div>
    )
}

export default NotificationCreator
