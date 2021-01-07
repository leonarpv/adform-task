import { shallow } from 'enzyme'
import React from 'react'
import CampaignTable, { columns } from './CampaignTable'
import { LoadingStatus } from 'core/loading'
import DataTable from 'components/data-table/DataTable'
import { CampaignWithUser } from '../types'
import { Mock } from 'ts-mockery'
import CampaignStatus from '../status/CampaignStatus'

describe('CampaignTable', () => {
    it('should render properly', () => {
        const campaigns: CampaignWithUser[] = []
        const campaignsStatus = LoadingStatus.Failed

        const wrapper = shallow(
            <CampaignTable
                campaigns={campaigns}
                campaignsStatus={campaignsStatus}
            />
        )

        expect(wrapper).toMatchSnapshot()
    })

    it('should render table', () => {
        const campaigns: CampaignWithUser[] = []
        const campaignsStatus = LoadingStatus.Failed

        const wrapper = shallow(
            <CampaignTable
                campaigns={campaigns}
                campaignsStatus={campaignsStatus}
            />
        )

        expect(wrapper.find(DataTable).exists()).toBe(true)
        expect(wrapper.find(DataTable).props().columns).toBe(columns)
        expect(wrapper.find(DataTable).props().emptyText).toBe(
            'No data to display'
        )
        expect(wrapper.find(DataTable).props().source).toBe(campaigns)
    })

    it('should render loading state if status is pending', () => {
        const campaigns: CampaignWithUser[] = []
        const campaignsStatus = LoadingStatus.Pending

        const wrapper = shallow(
            <CampaignTable
                campaigns={campaigns}
                campaignsStatus={campaignsStatus}
            />
        )

        expect(wrapper.find(DataTable).exists()).toBe(true)
        expect(wrapper.find(DataTable).props().columns).toBe(columns)
        expect(wrapper.find(DataTable).props().emptyText).toBe('Loading..')
        expect(wrapper.find(DataTable).props().source).toBe(campaigns)
    })

    describe('column definitions', () => {
        it('should select campaign name', () => {
            const campaign = Mock.of<CampaignWithUser>({
                name: 'name',
            })

            const result = columns[0].accessor(campaign)

            expect(result).toBe(campaign.name)
        })

        it('should select campaign user name', () => {
            const userName = 'userName'
            const campaign = Mock.of<CampaignWithUser>({
                user: {
                    name: userName,
                },
            })

            const result = columns[1].accessor(campaign)

            expect(result).toBe(userName)
        })

        it('should return placeholder if user data does not exist', () => {
            const campaign = Mock.of<CampaignWithUser>({
                user: null,
            })

            const result = columns[1].accessor(campaign)

            expect(result).toBe('Unknown user')
        })

        it('should select startDate', () => {
            const campaign = Mock.of<CampaignWithUser>({
                startDate: '2020-12-12',
            })

            const result = columns[2].accessor(campaign)

            expect(result).toBe('12/12/2020')
        })

        it('should select endDate', () => {
            const campaign = Mock.of<CampaignWithUser>({
                endDate: '2020-12-12',
            })

            const result = columns[3].accessor(campaign)

            expect(result).toBe('12/12/2020')
        })

        it('should select active status', () => {
            const campaign = Mock.of<CampaignWithUser>({
                startDate: '2020-12-12',
                endDate: '2030-12-12',
            })

            const result = columns[4].accessor(campaign)

            expect(result).toEqual(<CampaignStatus active={true} />)
        })

        it('should select inactive status', () => {
            const campaign = Mock.of<CampaignWithUser>({
                startDate: '2020-12-12',
                endDate: '2020-12-13',
            })

            const result = columns[4].accessor(campaign)

            expect(result).toEqual(<CampaignStatus active={false} />)
        })
    })
})
