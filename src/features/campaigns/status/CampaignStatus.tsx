import React from 'react'
import classNames from 'classnames'
import './campaignStatus.scss'

type Props = {
    active: boolean
}

const CampaignStatus = ({ active }: Props) => {
    const badgeClassName = classNames(
        'campaign-status__badge',
        active
            ? 'campaign-status__badge--active'
            : 'campaign-status__badge--inactive'
    )

    return (
        <span className="campaign-status">
            <span className={badgeClassName} />

            {active ? 'Active' : 'Inactive'}
        </span>
    )
}

export default CampaignStatus
