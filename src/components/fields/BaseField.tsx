import React, { ReactNode } from 'react'
import classNames from 'classnames'
import './baseField.scss'

export type BaseFieldProps = {
    children?: ReactNode
    label?: string
    error?: string
}

const BaseField = ({ children, label, error }: BaseFieldProps) => {
    const className = classNames('base-field', {
        'base-field--errored': error,
    })

    return (
        <div className={className}>
            {error && <span className="base-field__error-indicator" />}
            {label && <label className="base-field__label">{label}:</label>}
            {children}
            {error && <span className="base-field__error">{error}</span>}
        </div>
    )
}

export default BaseField
