import React from 'react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import BaseField, { BaseFieldProps } from '../BaseField'
import './datepicker.scss'

type Props = ReactDatePickerProps & BaseFieldProps

const Datepicker = ({ label, error, ...rest }: Props) => {
    return (
        <BaseField label={label} error={error}>
            <DatePicker className="datepicker" {...rest} />
        </BaseField>
    )
}

export default Datepicker
