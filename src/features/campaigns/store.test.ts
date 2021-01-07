import * as api from './api'
import * as utils from './utils'
import {
    campaignsSlice,
    CampaignsState,
    fetchCampaignUsers,
    importCampaigns,
    setCampaignFilters,
} from './store'
import {
    Campaign,
    CampaignFilters,
    CampaignUser,
    CampaignWithUser,
} from './types'
import { Mock } from 'ts-mockery'
import { AxiosResponse } from 'axios'
import {
    configureStore,
    PayloadAction,
    SerializedError,
} from '@reduxjs/toolkit'
import { LoadingStatus } from '../../core/loading'

jest.mock('./api', () => ({
    getCampaignUsers: jest.fn(),
}))

jest.mock('./utils', () => ({
    filterCampaigns: jest.fn(),
    validateCampaignData: jest.fn(),
}))

describe('campaigns store', () => {
    beforeEach(() => jest.clearAllMocks())

    describe('fetchCampaignUsers', () => {
        it('should call user api', async () => {
            const users = [
                Mock.of<CampaignUser>({
                    name: 'name1',
                    id: 1,
                }),
                Mock.of<CampaignUser>({
                    name: 'name2',
                    id: 2,
                }),
            ]

            const response = Mock.of<AxiosResponse>({
                data: users,
            })

            const getCampaignUsers = jest
                .spyOn(api, 'getCampaignUsers')
                .mockReturnValue(Promise.resolve(response))

            const state = Mock.of<CampaignsState>()

            const dispatch = jest.fn()
            const getState = jest.fn(() => state)
            const extra = jest.fn()

            const result = await fetchCampaignUsers()(dispatch, getState, extra)

            expect(getCampaignUsers).toHaveBeenCalledTimes(1)

            expect(result.payload).toEqual({
                [users[0].id]: users[0],
                [users[1].id]: users[1],
            })
        })

        it('should not call user api if users were already loaded', async () => {
            const users = [
                Mock.of<CampaignUser>({
                    name: 'name1',
                    id: 1,
                }),
                Mock.of<CampaignUser>({
                    name: 'name2',
                    id: 2,
                }),
            ]

            const getCampaignUsers = jest.spyOn(api, 'getCampaignUsers')

            const state = Mock.of<CampaignsState>({
                campaignUsersLoaded: true,
                campaignUsers: {
                    '1': Mock.of<CampaignUser>({
                        name: 'name1',
                        id: 1,
                    }),
                },
            })

            const dispatch = jest.fn()
            const getState = jest.fn(() => state)
            const extra = jest.fn()

            const result = await fetchCampaignUsers()(dispatch, getState, extra)

            expect(getCampaignUsers).toHaveBeenCalledTimes(0)

            expect(result.payload).toBe(state.campaignUsers)
        })
    })

    describe('importCampaigns', () => {
        it('should validate and add users to campaigns', async () => {
            const campaigns = [
                Mock.of<Campaign>({
                    name: 'name1',
                    id: 1,
                    userId: 1,
                }),
                Mock.of<Campaign>({
                    name: 'name2',
                    id: 2,
                    userId: 2,
                }),
            ]

            jest.spyOn(api, 'getCampaignUsers')
            const validateCampaignData = jest
                .spyOn(utils, 'validateCampaignData')
                .mockReturnValue(undefined)

            const state = Mock.of<CampaignsState>({
                campaignUsers: {
                    '1': Mock.of<CampaignUser>({
                        name: 'name1',
                        id: 1,
                    }),
                },
            })

            const dispatch = jest.fn()
            const getState = jest.fn(() => state)
            const extra = jest.fn()

            const result = await importCampaigns(campaigns)(
                dispatch,
                getState,
                extra
            )

            expect(validateCampaignData).toHaveBeenCalledTimes(1)
            expect(validateCampaignData).toHaveBeenCalledWith(campaigns)

            expect(result.payload).toEqual([
                {
                    id: 1,
                    name: 'name1',
                    user: { id: 1, name: 'name1' },
                    userId: 1,
                },
                { id: 2, name: 'name2', user: null, userId: 2 },
            ])
        })

        it('should return error if validation fails', async () => {
            const campaigns = [
                Mock.of<Campaign>({
                    name: 'name1',
                    id: 1,
                    userId: 1,
                }),
                Mock.of<Campaign>({
                    name: 'name2',
                    id: 2,
                    userId: 2,
                }),
            ]

            const validationError = 'validationError'

            jest.spyOn(api, 'getCampaignUsers')
            const validateCampaignData = jest
                .spyOn(utils, 'validateCampaignData')
                .mockReturnValue(validationError)

            const state = Mock.of<CampaignsState>({
                campaignUsers: {
                    '1': Mock.of<CampaignUser>({
                        name: 'name1',
                        id: 1,
                    }),
                },
            })

            const dispatch = jest.fn()
            const getState = jest.fn(() => state)
            const extra = jest.fn()

            const result = (await importCampaigns(campaigns)(
                dispatch,
                getState,
                extra
            )) as PayloadAction<
                unknown,
                string,
                {
                    arg: unknown
                    requestId: string
                    rejectedWithValue: boolean
                    requestStatus: 'rejected'
                    aborted: boolean
                    condition: boolean
                },
                SerializedError
            >

            expect(validateCampaignData).toHaveBeenCalledTimes(1)
            expect(validateCampaignData).toHaveBeenCalledWith(campaigns)

            expect(result.payload).toBeFalsy()
            expect(result.meta.requestStatus).toBe('rejected')
            expect(result.error.message).toBe(validationError)
        })
    })

    describe('campaigns reducer', () => {
        it('should set filters', async () => {
            const store = configureStore({
                reducer: campaignsSlice.reducer,
            })

            const filters = Mock.of<CampaignFilters>({
                name: 'name',
            })

            await store.dispatch(setCampaignFilters(filters))

            const state = store.getState()

            expect(state.filters).toBe(filters)
        })

        it('should load users', async () => {
            const users = [
                Mock.of<CampaignUser>({
                    name: 'name1',
                    id: 1,
                }),
                Mock.of<CampaignUser>({
                    name: 'name2',
                    id: 2,
                }),
            ]

            const response = Mock.of<AxiosResponse>({
                data: users,
            })

            jest.spyOn(api, 'getCampaignUsers').mockResolvedValue(response)

            const store = configureStore({
                reducer: campaignsSlice.reducer,
            })

            await store.dispatch(fetchCampaignUsers())

            const state = store.getState()

            expect(state.campaignUsersLoaded).toBe(true)
            expect(state.campaignUsersStatus).toBe(LoadingStatus.Succeeded)
            expect(state.campaignUsers).toEqual({
                '1': { id: 1, name: 'name1' },
                '2': { id: 2, name: 'name2' },
            })
        })

        it('should set failed user status', async () => {
            jest.spyOn(api, 'getCampaignUsers').mockRejectedValue(new Error())
            jest.spyOn(utils, 'validateCampaignData')

            const store = configureStore({
                reducer: campaignsSlice.reducer,
            })

            await store.dispatch(fetchCampaignUsers())

            const state = store.getState()

            expect(state.campaignUsersLoaded).toBe(false)
            expect(state.campaignUsersStatus).toBe(LoadingStatus.Failed)
            expect(state.campaignUsers).toEqual({})
        })

        it('should import campaigns', async () => {
            const users = [
                Mock.of<CampaignUser>({
                    name: 'name1',
                    id: 1,
                }),
            ]

            const response = Mock.of<AxiosResponse>({
                data: users,
            })

            const campaigns = [
                Mock.of<Campaign>({
                    id: 1,
                    userId: 1,
                }),
                Mock.of<Campaign>({
                    id: 2,
                    userId: 2,
                }),
            ]

            const filteredCampaigns: CampaignWithUser[] = [
                Mock.of<CampaignWithUser>({
                    id: 1,
                    userId: 1,
                }),
            ]

            jest.spyOn(api, 'getCampaignUsers').mockResolvedValue(response)
            jest.spyOn(utils, 'validateCampaignData').mockReturnValue(undefined)
            jest.spyOn(utils, 'filterCampaigns').mockReturnValue(
                filteredCampaigns
            )

            const store = configureStore({
                reducer: campaignsSlice.reducer,
            })

            await store.dispatch(importCampaigns(campaigns))

            const state = store.getState()

            expect(state.campaigns).toEqual([
                { id: 1, user: { id: 1, name: 'name1' }, userId: 1 },
                { id: 2, user: null, userId: 2 },
            ])
            expect(state.campaignsStatus).toBe(LoadingStatus.Succeeded)
            expect(state.campaignsFiltered).toEqual(filteredCampaigns)
        })

        it('should failed campaign import status ', async () => {
            const users = [
                Mock.of<CampaignUser>({
                    name: 'name1',
                    id: 1,
                }),
            ]

            const response = Mock.of<AxiosResponse>({
                data: users,
            })

            const campaigns = [
                Mock.of<Campaign>({
                    id: 1,
                    userId: 1,
                }),
                Mock.of<Campaign>({
                    id: 2,
                    userId: 2,
                }),
            ]

            const filteredCampaigns: CampaignWithUser[] = [
                Mock.of<CampaignWithUser>({
                    id: 1,
                    userId: 1,
                }),
            ]

            const error = 'error'

            jest.spyOn(api, 'getCampaignUsers').mockResolvedValue(response)
            jest.spyOn(utils, 'validateCampaignData').mockReturnValue(error)
            jest.spyOn(utils, 'filterCampaigns').mockReturnValue(
                filteredCampaigns
            )

            const store = configureStore({
                reducer: campaignsSlice.reducer,
            })

            await store.dispatch(importCampaigns(campaigns))

            const state = store.getState()

            expect(state.campaigns).toEqual([])
            expect(state.campaignsStatus).toBe(LoadingStatus.Failed)
            expect(state.campaignValidationError).toEqual(error)
        })
    })
})
