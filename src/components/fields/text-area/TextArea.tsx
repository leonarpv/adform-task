import React, { DetailedHTMLProps, TextareaHTMLAttributes } from 'react'
import BaseField, { BaseFieldProps } from '../BaseField'
import './textArea.scss'

type Props = DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
> &
    BaseFieldProps

const TextArea = ({ label, error, ...rest }: Props) => {
    return (
        <BaseField label={label} error={error}>
            <textarea className="text-area" {...rest} />
        </BaseField>
    )
}

export default TextArea
