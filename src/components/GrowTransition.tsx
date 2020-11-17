import React, {ReactNode} from 'react'
import {Transition} from 'react-transition-group'

type Props = {
    children: ReactNode
    duration?: number
    [index: string]: any
}

const GrowTransition = (props: Props) => {
    const colapseAnimationDuration = 250
    const duration = props.duration || 300
    const {children, ...otherProps} = props
    // eslint-disable-next-line no-undef
    const animationProps: KeyframeAnimationOptions = {
        fill: 'forwards',
        duration,
    }
    const onEnter = (node: HTMLElement) => {
        node.animate(
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
    const onExit = (node: HTMLElement) => {
        const hideAnimationDuration = duration
        node.animate([{transform: 'scale(0.6)', opacity: 0}], animationProps)
        setTimeout(() => {
            // `150px`: A value higher than the height a notification can have
            // to create a smooth animation for displayed notifications
            // when a notification is removed from a container.
            node.animate([{maxHeight: '150px'}, {margin: 0, maxHeight: 0}], {
                fill: 'forwards',
                duration: hideAnimationDuration,
            })
        }, hideAnimationDuration)
    }

    return (
        <Transition onEnter={onEnter} onExit={onExit} timeout={duration + colapseAnimationDuration} {...otherProps}>
            {children}
        </Transition>
    )
}

export default GrowTransition
