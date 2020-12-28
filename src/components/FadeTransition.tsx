import React, {RefObject} from 'react'
import {Transition} from 'react-transition-group'
import {TransitionProps} from 'react-transition-group/Transition'

type Props = {
    duration?: number
} & Omit<TransitionProps<HTMLElement>, 'addEndListener'>

const FadeTransition = (props: Props) => {
    const duration = props.duration || 300
    const {children, nodeRef, ...otherProps} = props
    const getNode = () => (nodeRef as RefObject<HTMLElement>).current as HTMLElement
    // eslint-disable-next-line no-undef
    const animationProps: KeyframeAnimationOptions = {
        fill: 'forwards',
        duration,
    }
    const onEnter = () => {
        getNode().animate([{opacity: 0}, {opacity: 1}], animationProps)
    }
    const onExit = () => {
        getNode().animate(
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
        <Transition nodeRef={nodeRef} onEnter={onEnter} onExit={onExit} timeout={duration + 100} {...otherProps}>
            {children}
        </Transition>
    )
}

export default FadeTransition
