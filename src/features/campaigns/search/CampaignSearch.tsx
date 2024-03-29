import React, { ChangeEvent, ReactNode } from 'react'
import { CampaignFilters } from '../types'
import Datepicker from 'components/fields/datepicker/Datepicker'
import Input from 'components/fields/input/Input'
import dayjs from 'dayjs'
import './campaignSearch.scss'

type Props = {
    children?: ReactNode
    filters?: CampaignFilters
    onChange: (search: CampaignFilters) => void
}

const CampaignSearch = ({ children, filters, onChange }: Props) => {
    const handleStartDateChange = (date: Date | null) => {
        onChange({ ...filters, startDate: date?.toString() })
    }

    const handleEndDateChange = (date: Date | null) => {
        onChange({ ...filters, endDate: date?.toString() })
    }

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange({ ...filters, name: e.target.value })
    }

    const startDate = filters?.startDate
        ? dayjs(filters.startDate).toDate()
        : undefined

    const endDate = filters?.endDate
        ? dayjs(filters.endDate).toDate()
        : undefined

    return (
        <div className="campaign-search">
            <div className="campaign-search__inputs">
                <div className="campaign-search__date-pickers">
                    {children}
                    <Datepicker
                        label="Start Date"
                        isClearable
                        maxDate={endDate}
                        selected={startDate}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={handleStartDateChange}
                        selectsStart
                    />
                    <Datepicker
                        label="End Date"
                        isClearable
                        minDate={startDate}
                        selected={endDate}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={handleEndDateChange}
                        selectsEnd
                    />
                </div>

                <Input
                    label="Search By Name"
                    value={filters?.name || ''}
                    type="text"
                    onChange={handleNameChange}
                />
            </div>
        </div>
    )
}

export default CampaignSearch
