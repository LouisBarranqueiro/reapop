import React from 'react'
import {useDispatch} from 'react-redux'
import {STATUSES, POSITIONS, notify, dismissNotifications} from 'src'
import {Position, Status} from 'src'

const getRandomBoolean = () => Math.random() >= 0.5
const getRandomElem = (items: any[]) => items[Math.floor(Math.random() * items.length)]
const getRandomWord = () => getRandomElem(['Tempor', 'Orci', 'Neque', 'Enim', 'Quis', 'Arcu'])

const NotificationButtons = () => {
    const dispatch = useDispatch()
    const updatedNotification = () => {
        const notif = dispatch(
            notify({
                id: 'updated-notification',
                title: 'Repository transfer',
                message: 'Your repository is being transfered...',
                position: POSITIONS.topRight,
                status: STATUSES.loading,
                dismissible: false,
                dismissAfter: 0,
            })
        ).payload

        setTimeout(() => {
            notif.status = STATUSES.success
            notif.message = 'Your repository have been transfered.'
            notif.buttons = [{name: 'OK', primary: true}, {name: 'Details'}]
            dispatch(notify(notif))
        }, 3000)
    }

    const randomNotification = () => {
        const buttons = []
        const showDismissButton = getRandomBoolean()
        if (!showDismissButton && getRandomBoolean()) {
            for (let i = 0; i < getRandomElem([1, 2]); i++) {
                buttons.push({
                    name: getRandomWord(),
                    primary: getRandomBoolean(),
                })
            }
        }
        dispatch(
            notify({
                title: getRandomBoolean() ? `Lorem ipsum dolor sit amet` : '',
                message: 'Laboris nisi ut aliquip ex ea commodo consequat. ',
                position: getRandomElem(Object.values(POSITIONS)) as Position,
                status: getRandomElem(Object.values(STATUSES)) as Status,
                dismissible: getRandomBoolean(),
                dismissAfter: 5000,
                showDismissButton,
                allowHTML: getRandomBoolean(),
                buttons: buttons,
            })
        )
    }

    return (
        <div className="mt-4">
            <button className="btn btn-primary font-weight-bold m-1" onClick={randomNotification}>
                Random notification
            </button>
            <button className="btn btn-primary font-weight-bold m-1" onClick={updatedNotification}>
                Updated notification
            </button>
            <button className="btn btn-primary font-weight-bold m-1" onClick={() => dispatch(dismissNotifications())}>
                Clear notifications
            </button>
        </div>
    )
}
export default NotificationButtons
