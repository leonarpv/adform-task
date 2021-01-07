import { shallow } from 'enzyme'
import Campaigns from './Campaigns'
import React from 'react'
import * as alerts from 'core/hooks/alerts'
import * as store from 'store'
import * as reactRedux from 'react-redux'
import CampaignSearch from './search/CampaignSearch'
import CampaignImport from './import/CampaignImport'
import CampaignTable from './table/CampaignTable'
import { CampaignsState, selectCampaigns } from './store'
import { Mock } from 'ts-mockery'
import { LoadingStatus } from '../../core/loading'

jest.mock('core/hooks/alerts', () => ({
    useFailedLoadingToast: jest.fn(),
    useSuccessLoadingToast: jest.fn(),
}))

jest.mock('store', () => ({
    useAppDispatch: jest.fn(),
}))

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
}))

describe('Campaigns', () => {
    beforeEach(() => jest.clearAllMocks())

    it('should render properly', () => {
        const state = Mock.of<CampaignsState>({})

        jest.spyOn(alerts, 'useFailedLoadingToast')
        jest.spyOn(alerts, 'useSuccessLoadingToast')
        jest.spyOn(store, 'useAppDispatch')
        jest.spyOn(reactRedux, 'useSelector').mockReturnValue(state)

        const wrapper = shallow(<Campaigns />)

        expect(wrapper).toMatchSnapshot()
    })

    it('should initialize component', () => {
        const state = Mock.of<CampaignsState>({
            campaignsStatus: LoadingStatus.Failed,
            campaignUsersStatus: LoadingStatus.Succeeded,
            campaignValidationError: 'campaignValidationError',
        })

        const useFailedLoadingToast = jest.spyOn(
            alerts,
            'useFailedLoadingToast'
        )
        const useSuccessLoadingToast = jest.spyOn(
            alerts,
            'useSuccessLoadingToast'
        )
        const useAppDispatch = jest.spyOn(store, 'useAppDispatch')
        const useSelector = jest
            .spyOn(reactRedux, 'useSelector')
            .mockReturnValue(state)

        const wrapper = shallow(<Campaigns />)

        expect(useFailedLoadingToast).toHaveBeenCalledTimes(2)
        expect(useFailedLoadingToast).toHaveBeenNthCalledWith(1, {
            status: state.campaignsStatus,
            message: state.campaignValidationError,
        })
        expect(useFailedLoadingToast).toHaveBeenNthCalledWith(2, {
            status: state.campaignUsersStatus,
            message: 'User Fetch Failed',
        })

        expect(useSuccessLoadingToast).toHaveBeenCalledTimes(1)
        expect(useSuccessLoadingToast).toHaveBeenCalledWith({
            status: state.campaignsStatus,
            message: 'Campaign Data Imported',
        })

        expect(useAppDispatch).toHaveBeenCalledTimes(1)

        expect(useSelector).toHaveBeenCalledTimes(1)
        expect(useSelector).toHaveBeenCalledWith(selectCampaigns)

        expect(wrapper.find(CampaignSearch).exists()).toBe(true)
        expect(wrapper.find(CampaignImport).exists()).toBe(true)
        expect(wrapper.find(CampaignTable).exists()).toBe(true)
    })
})
