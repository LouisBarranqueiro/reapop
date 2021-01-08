import React, {RefObject} from 'react'
import {Transition} from 'react-transition-group'
import {TransitionProps} from 'react-transition-group/Transition'

type Props = {
    duration?: number
} & Omit<TransitionProps<HTMLElement>, 'addEndListener'>

const GrowTransition = (props: Props) => {
    const colapseAnimationDuration = 250
    const duration = props.duration || 300
    const {children, nodeRef, ...otherProps} = props
    const getNode = () => (nodeRef as RefObject<HTMLElement>).current as HTMLElement
    // eslint-disable-next-line no-undef
    const animationProps: KeyframeAnimationOptions = {
        fill: 'forwards',
        duration,
    }
    const onEnter = () => {
        getNode().animate(
            [
                {
                    transform: 'scale(0.6)',
                    opacity: 0,
                },
                {
                    transform: 'scale(1)',
                    opacity: 1,
                },
            ],
            animationProps
        )
    }
    const onExit = () => {
        const hideAnimationDuration = duration
        getNode().animate([{transform: 'scale(0.6)', opacity: 0}], animationProps)
        setTimeout(() => {
            // `150px`: A value higher than the height a notification can have
            // to create a smooth animation for displayed notifications
            // when a notification is removed from a container.
            getNode().animate([{maxHeight: '150px'}, {margin: 0, maxHeight: 0}], {
                fill: 'forwards',
                duration: hideAnimationDuration,
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

export default GrowTransition
