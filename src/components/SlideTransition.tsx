import {Transition} from 'react-transition-group'
import React, {RefObject} from 'react'
import {POSITIONS} from '../constants'
import {Notification} from '../reducers/notifications/types'
import {TransitionProps} from 'react-transition-group/Transition'

type Props = {
    notification: Notification
    duration?: number
} & Omit<TransitionProps<HTMLElement>, 'addEndListener'>

const SlideTransition = (props: Props) => {
    const duration = props.duration || 300
    const colapseAnimationDuration = 250
    const {children, notification, nodeRef, ...otherProps} = props
    const getNode = () => (nodeRef as RefObject<HTMLElement>).current as HTMLElement
    const transformDirection = ([POSITIONS.topCenter, POSITIONS.bottomCenter] as string[]).includes(
        notification.position
    )
        ? 'translateY'
        : 'translateX'
    const transformValue = ([POSITIONS.topCenter, POSITIONS.topLeft, POSITIONS.bottomLeft] as string[]).includes(
        notification.position
    )
        ? '-100%'
        : '100%'

    // eslint-disable-next-line no-undef
    const animationProps: KeyframeAnimationOptions = {
        fill: 'forwards',
        duration,
    }
    const onEnter = () => {
        getNode().animate(
            [
                {transform: `${transformDirection}(${transformValue})`, opacity: 0},
                {transform: `${transformDirection}(0)`, opacity: 1},
            ],
            animationProps
        )
    }
    const onExit = () => {
        const hideAnimationDuration = duration
        getNode().animate([{transform: `${transformDirection}(${transformValue})`, opacity: 0}], animationProps)
        setTimeout(() => {
            // `150px`: A value higher than the height a notification can have
            // to create a smooth animation for displayed notifications
            // when a notification is removed from a container.
            getNode().animate([{maxHeight: '150px'}, {margin: 0, maxHeight: 0}], {
                ...animationProps,
                duration: colapseAnimationDuration,
            })
        }, hideAnimationDuration)
    }

    return (
        <Transition
            nodeRef={nodeRef}
            onEnter={onEnter}
            onExit={onExit}
            timeout={duration + colapseAnimationDuration}
            {...otherProps}
        >
            {children}
        </Transition>
    )
}

export default SlideTransition
