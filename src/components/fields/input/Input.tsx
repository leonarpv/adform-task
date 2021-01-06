import React from 'react'
import BaseField, { BaseFieldProps } from '../BaseField'
import './input.scss'

type Props = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> &
    BaseFieldProps

const Input = ({ label, error, ...rest }: Props) => {
    return (
        <BaseField label={label} error={error}>
            <input className="input" {...rest} />
        </BaseField>
    )
}

export default Input
