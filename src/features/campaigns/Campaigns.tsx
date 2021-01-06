import React from 'react'
import { useFailedLoadingToast, useSuccessLoadingToast } from 'core/loading'
import CampaignTable from './table/CampaignTable'
import CampaignSearch from './search/CampaignSearch'
import { Campaign, CampaignFilters } from './types'
import { importCampaigns, selectCampaigns, setCampaignFilters } from './store'
import { useAppDispatch } from 'store'
import { useSelector } from 'react-redux'
import CampaignImport from './import/CampaignImport'

declare global {
    interface Window {
        AddCampaigns: (campaigns: Campaign[]) => void
    }
}

const Campaigns = () => {
    const dispatch = useAppDispatch()

    const {
        campaignsStatus,
        campaignUsersStatus,
        campaignsFiltered,
        campaignValidationError,
        filters,
    } = useSelector(selectCampaigns)

    useSuccessLoadingToast({
        status: campaignsStatus,
        message: 'Campaign Data Imported',
    })
    useFailedLoadingToast({
        status: campaignsStatus,
        message: campaignValidationError,
    })
    useFailedLoadingToast({
        status: campaignUsersStatus,
        message: 'User Fetch Failed',
    })

    window.AddCampaigns = (campaigns: Campaign[]) => {
        dispatch(importCampaigns(campaigns))
    }

    const handleChange = (filters: CampaignFilters) => {
        dispatch(setCampaignFilters(filters))
    }

    const handleImport = (campaignString: string) => {
        dispatch(importCampaigns(campaignString))
    }

    return (
        <>
            <CampaignSearch filters={filters} onChange={handleChange}>
                <CampaignImport onImport={handleImport} />
            </CampaignSearch>
            <CampaignTable
                campaigns={campaignsFiltered}
                campaignsStatus={campaignsStatus}
            />
        </>
    )
}

export default Campaigns
