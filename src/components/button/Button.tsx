import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import classNames from 'classnames'
import './button.scss'

type Props = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> & {
    secondary?: boolean
}

const Button = ({ secondary, ...rest }: Props) => {
    const className = classNames('button', {
        'button--secondary': secondary,
    })

    return <button className={className} {...rest} />
}

export default Button
