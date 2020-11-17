import React, {SyntheticEvent} from 'react'
import css from './Switch.scss'

type Props = {
    name: string
    onChange: (event: SyntheticEvent) => void
    checked: boolean
}

const Switch = (props: Props) => {
    const {name, onChange, checked} = props
    return (
        <div className={css.onoffswitch}>
            <input
                type="checkbox"
                className={css['onoffswitch-checkbox']}
                id={name}
                name={name}
                onChange={onChange}
                checked={checked}
            />
            <label className={css['onoffswitch-label']} htmlFor={name}>
                <span className={css['onoffswitch-inner']} />
                <span className={css['onoffswitch-switch']} />
            </label>
        </div>
    )
}

export default Switch
