import React from 'react'
import DataTable from 'components/data-table/DataTable'
import { ColumnDefinition } from 'components/data-table/types'
import { CampaignWithUser } from '../types'
import { currencyFormatter } from 'core/currencyFormatter'
import { dateFormatter } from 'core/dateFormatter'
import { LoadingStatus } from 'core/loading'
import CampaignStatus from '../status/CampaignStatus'
import dayjs from 'dayjs'

type Props = {
    campaigns: CampaignWithUser[]
    campaignsStatus: LoadingStatus
}

export const columns: ColumnDefinition<CampaignWithUser>[] = [
    {
        title: 'Name',
        accessor: (c) => c.name,
    },
    {
        title: 'User Name',
        accessor: (c) => (c.user ? c.user.name : 'Unknown user'),
    },
    {
        title: 'Start Date',
        accessor: (c) => dateFormatter(c.startDate),
    },
    {
        title: 'End Date',
        accessor: (c) => dateFormatter(c.endDate),
    },
    {
        title: 'Active',
        accessor: (c) => {
            const startDate = dayjs(c.startDate)
            const endDate = dayjs(c.endDate)
            const currentDate = dayjs()

            const active =
                currentDate.isAfter(startDate) && currentDate.isBefore(endDate)

            return <CampaignStatus active={active} />
        },
    },
    {
        title: 'Budget',
        accessor: (c) => currencyFormatter(c.Budget),
    },
]

const CampaignTable = ({ campaigns, campaignsStatus }: Props) => {
    const emptyText =
        campaignsStatus === LoadingStatus.Pending
            ? 'Loading..'
            : 'No data to display'

    return (
        <DataTable columns={columns} emptyText={emptyText} source={campaigns} />
    )
}

export default CampaignTable
