import React, {ReactNode} from 'react'
import {Transition} from 'react-transition-group'

type Props = {
    children: ReactNode
    duration?: number
    [index: string]: any
}

const FadeTransition = (props: Props) => {
    const duration = props.duration || 300
    const {children, ...otherProps} = props
    // eslint-disable-next-line no-undef
    const animationProps: KeyframeAnimationOptions = {
        fill: 'forwards',
        duration,
    }
    const onEnter = (node: HTMLElement) => {
        node.animate([{opacity: 0}, {opacity: 1}], animationProps)
    }
    const onExit = (node: HTMLElement) => {
        node.animate(
            [
                {
                    maxHeight: '150px',
                },
                {
                    opacity: 0,
                    maxHeight: 0,
                    margin: 0,
                },
            ],
            animationProps
        )
    }

    return (
        <Transition onEnter={onEnter} onExit={onExit} timeout={duration + 100} {...otherProps}>
            {children}
        </Transition>
    )
}

export default FadeTransition
