import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCampaignUsers } from './api'
import {
    Campaign,
    CampaignFilters,
    CampaignUser,
    CampaignWithUser,
} from './types'
import { LoadingStatus } from 'core/loading'
import { filterCampaigns, validateCampaignData } from './utils'

type CampaignUserMap = { [key: number]: CampaignUser }

interface CampaignsState {
    campaigns: CampaignWithUser[]
    campaignsFiltered: CampaignWithUser[]
    campaignsStatus: LoadingStatus
    campaignUsers: CampaignUserMap
    campaignUsersLoaded: boolean
    campaignUsersStatus: LoadingStatus
    campaignValidationError?: string
    filters?: CampaignFilters
}

export const fetchCampaignUsers = createAsyncThunk<
    CampaignUserMap,
    void,
    { state: CampaignsState }
>('campaigns/fetchCampaignUsers', async (_, { getState }) => {
    const { campaignUsers, campaignUsersLoaded } = getState()

    if (campaignUsersLoaded) {
        return campaignUsers
    }

    const { data } = await getCampaignUsers()

    const userMap = data.reduce(
        (acc: CampaignUserMap, u: CampaignUser) =>
            Object.assign(acc, { [u.id]: u }),
        {}
    )

    return userMap
})

export const importCampaigns = createAsyncThunk<
    CampaignWithUser[],
    unknown,
    { state: CampaignsState }
>(
    'campaigns/importCampaigns',
    async (input: unknown, { dispatch, getState }) => {
        const campaigns = typeof input === 'string' ? JSON.parse(input) : input

        const validationError = validateCampaignData(campaigns)

        if (validationError) {
            throw new Error(validationError)
        }

        await dispatch(fetchCampaignUsers())

        const { campaignUsers } = getState()

        const campaignsWithUsers = (campaigns as Campaign[]).map((c) => ({
            ...c,
            user: campaignUsers[c.userId] || null,
        }))

        return campaignsWithUsers
    }
)

const initialState = {
    campaigns: [],
    campaignsFiltered: [],
    campaignsStatus: LoadingStatus.Idle,
    campaignUsers: {},
    campaignUsersLoaded: false,
    campaignUsersStatus: LoadingStatus.Idle,
    campaignValidationError: undefined,
    filters: undefined,
} as CampaignsState

export const campaignsSlice = createSlice({
    name: 'campaigns',
    initialState,
    reducers: {
        setCampaignFilters: (state, action) => {
            state.filters = action.payload
            state.campaignsFiltered = filterCampaigns(
                state.campaigns,
                state.filters
            )
        },
    },
    extraReducers: {
        [fetchCampaignUsers.pending.type]: (state) => {
            state.campaignUsersStatus = LoadingStatus.Pending
        },
        [fetchCampaignUsers.fulfilled.type]: (state, action) => {
            state.campaignUsers = action.payload
            state.campaignUsersLoaded = true
            state.campaignUsersStatus = LoadingStatus.Succeeded
        },
        [fetchCampaignUsers.rejected.type]: (state) => {
            state.campaignUsersStatus = LoadingStatus.Failed
        },
        [importCampaigns.pending.type]: (state) => {
            state.campaignsStatus = LoadingStatus.Pending
            state.campaignValidationError = undefined
        },
        [importCampaigns.fulfilled.type]: (state, action) => {
            const campaigns = [...state.campaigns, ...action.payload]

            state.campaigns = campaigns
            state.campaignsStatus = LoadingStatus.Succeeded
            state.campaignsFiltered = filterCampaigns(campaigns, state.filters)
        },
        [importCampaigns.rejected.type]: (state, action) => {
            state.campaignsStatus = LoadingStatus.Failed
            state.campaignValidationError = action.error?.message
        },
    },
})

export const { setCampaignFilters } = campaignsSlice.actions

export const selectCampaigns = (state: CampaignsState) => state
