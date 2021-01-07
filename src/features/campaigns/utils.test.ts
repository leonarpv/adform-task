import { filterCampaigns, validateCampaignData } from './utils'
import { CampaignFilters, CampaignWithUser } from './types'
import { Mock } from 'ts-mockery'

describe('campaigns utils', () => {
    describe('filterCampaigns', () => {
        it('should filter out campaigns that have starDate after endDate', () => {
            const campaigns: CampaignWithUser[] = [
                Mock.of<CampaignWithUser>({
                    id: 1,
                    startDate: '2020-12-20',
                    endDate: '2020-11-20',
                }),
                Mock.of<CampaignWithUser>({
                    id: 2,
                    startDate: '2020-12-20',
                    endDate: '2021-11-20',
                }),
            ]

            const result = filterCampaigns(campaigns)

            expect(result.length).toBe(1)
            expect(result[0].id).toBe(2)
        })

        it('should filter by name', () => {
            const filters: CampaignFilters = {
                name: 'test',
            }

            const campaigns: CampaignWithUser[] = [
                Mock.of<CampaignWithUser>({
                    id: 1,
                    name: '--test--',
                }),
                Mock.of<CampaignWithUser>({
                    id: 2,
                    name: '--tes--',
                }),
                Mock.of<CampaignWithUser>({
                    id: 3,
                    name: 'testing',
                }),
                Mock.of<CampaignWithUser>({
                    id: 4,
                    name: 'tes',
                }),
            ]

            const result = filterCampaigns(campaigns, filters)

            expect(result.length).toBe(2)
            expect(result[0].id).toBe(1)
            expect(result[1].id).toBe(3)
        })

        it('should filter by start date', () => {
            const filters: CampaignFilters = {
                startDate: '2020-12-21',
            }

            const campaigns: CampaignWithUser[] = [
                Mock.of<CampaignWithUser>({
                    id: 1,
                    endDate: '2020-12-22',
                    startDate: '2020-12-21',
                }),
                Mock.of<CampaignWithUser>({
                    id: 2,
                    endDate: '2020-12-20',
                    startDate: '2020-12-19',
                }),
                Mock.of<CampaignWithUser>({
                    id: 3,
                    endDate: '2021-12-21',
                    startDate: '2020-12-20',
                }),
                Mock.of<CampaignWithUser>({
                    id: 4,
                    endDate: '2022-12-21',
                    startDate: '2019-12-21',
                }),
            ]

            const result = filterCampaigns(campaigns, filters)

            expect(result.length).toBe(3)
            expect(result[0].id).toBe(1)
            expect(result[1].id).toBe(3)
            expect(result[2].id).toBe(4)
        })

        it('should filter by end date', () => {
            const filters: CampaignFilters = {
                endDate: '2020-12-21',
            }

            const campaigns: CampaignWithUser[] = [
                Mock.of<CampaignWithUser>({
                    id: 1,
                    endDate: '2020-12-23',
                    startDate: '2020-12-22',
                }),
                Mock.of<CampaignWithUser>({
                    id: 2,
                    endDate: '2020-12-20',
                    startDate: '2020-12-19',
                }),
                Mock.of<CampaignWithUser>({
                    id: 3,
                    endDate: '2021-12-21',
                    startDate: '2020-12-20',
                }),
                Mock.of<CampaignWithUser>({
                    id: 4,
                    endDate: '2022-12-21',
                    startDate: '2019-12-21',
                }),
            ]

            const result = filterCampaigns(campaigns, filters)

            expect(result.length).toBe(3)
            expect(result[0].id).toBe(2)
            expect(result[1].id).toBe(3)
            expect(result[2].id).toBe(4)
        })

        it('should select campaign if only startDate matches', () => {
            const filters: CampaignFilters = {
                startDate: '2020-12-19',
                endDate: '2020-12-21',
            }

            const campaigns: CampaignWithUser[] = [
                Mock.of<CampaignWithUser>({
                    id: 1,
                    endDate: '2020-12-24',
                    startDate: '2020-12-20',
                }),
                Mock.of<CampaignWithUser>({
                    id: 2,
                    endDate: '2020-12-25',
                    startDate: '2020-12-24',
                }),
            ]

            const result = filterCampaigns(campaigns, filters)

            expect(result.length).toBe(1)
            expect(result[0].id).toBe(1)
        })

        it('should select campaign if only endDate matches', () => {
            const filters: CampaignFilters = {
                startDate: '2020-12-19',
                endDate: '2020-12-21',
            }

            const campaigns: CampaignWithUser[] = [
                Mock.of<CampaignWithUser>({
                    id: 1,
                    endDate: '2020-12-20',
                    startDate: '2020-12-18',
                }),
                Mock.of<CampaignWithUser>({
                    id: 2,
                    endDate: '2020-12-25',
                    startDate: '2020-12-24',
                }),
            ]

            const result = filterCampaigns(campaigns, filters)

            expect(result.length).toBe(1)
            expect(result[0].id).toBe(1)
        })
    })

    describe('validateCampaignData', () => {
        it('should return error if data is not provided', () => {
            const campaigns = null

            const result = validateCampaignData(campaigns)

            expect(result).toBe('No Input Provided')
        })

        it('should return error if data is not an array', () => {
            const campaigns = Mock.of<CampaignWithUser>({
                id: 1,
                endDate: '2020-12-24',
                startDate: '2020-12-20',
            })

            const result = validateCampaignData(campaigns)

            expect(result).toBe('Input must be an JSON array')
        })

        it('should return error if id is not defined', () => {
            const campaigns = [
                {
                    id: 1,
                    name: 'name1',
                    startDate: '2020-12-12',
                    endDate: '2020-12-21',
                    Budget: 23132,
                    userId: 1,
                },
                {
                    name: 'name2',
                    startDate: '2020-12-12',
                    endDate: '2020-12-21',
                    Budget: 23132,
                    userId: 1,
                },
            ]

            const result = validateCampaignData(campaigns)

            expect(result).toBe('Invalid entry no. 2, missing property id')
        })

        it('should return error if name is not defined', () => {
            const campaigns = [
                {
                    id: 1,
                    name: 'name1',
                    startDate: '2020-12-12',
                    endDate: '2020-12-21',
                    Budget: 23132,
                    userId: 1,
                },
                {
                    id: 2,
                    startDate: '2020-12-12',
                    endDate: '2020-12-21',
                    Budget: 23132,
                    userId: 1,
                },
            ]

            const result = validateCampaignData(campaigns)

            expect(result).toBe('Invalid entry no. 2, missing property name')
        })

        it('should return error if startDate is not defined', () => {
            const campaigns = [
                {
                    id: 1,
                    name: 'name1',
                    startDate: '2020-12-12',
                    endDate: '2020-12-21',
                    Budget: 23132,
                    userId: 1,
                },
                {
                    id: 2,
                    name: 'name2',
                    endDate: '2020-12-21',
                    Budget: 23132,
                    userId: 1,
                },
            ]

            const result = validateCampaignData(campaigns)

            expect(result).toBe(
                'Invalid entry no. 2, missing property startDate'
            )
        })

        it('should return error if startDate is not a valid date', () => {
            const campaigns = [
                {
                    id: 1,
                    name: 'name1',
                    startDate: '2020-12-12',
                    endDate: '2020-12-21',
                    Budget: 23132,
                    userId: 1,
                },
                {
                    id: 2,
                    name: 'name2',
                    startDate: 'invalid',
                    endDate: '2020-12-21',
                    Budget: 23132,
                    userId: 1,
                },
            ]

            const result = validateCampaignData(campaigns)

            expect(result).toBe(
                'Invalid entry no. 2, missing property startDate'
            )
        })

        it('should return error if endDate is not defined', () => {
            const campaigns = [
                {
                    id: 1,
                    name: 'name1',
                    startDate: '2020-12-12',
                    endDate: '2020-12-21',
                    Budget: 23132,
                    userId: 1,
                },
                {
                    id: 2,
                    name: 'name2',
                    startDate: '2020-12-12',
                    Budget: 23132,
                    userId: 1,
                },
            ]

            const result = validateCampaignData(campaigns)

            expect(result).toBe('Invalid entry no. 2, missing property endDate')
        })

        it('should return error if endDate is not a valid date', () => {
            const campaigns = [
                {
                    id: 1,
                    name: 'name1',
                    startDate: '2020-12-12',
                    endDate: '2020-12-21',
                    Budget: 23132,
                    userId: 1,
                },
                {
                    id: 2,
                    name: 'name2',
                    startDate: '2020-12-21',
                    endDate: 'invalid',
                    Budget: 23132,
                    userId: 1,
                },
            ]

            const result = validateCampaignData(campaigns)

            expect(result).toBe('Invalid entry no. 2, missing property endDate')
        })

        it('should return error if Budget is not defined', () => {
            const campaigns = [
                {
                    id: 1,
                    name: 'name1',
                    startDate: '2020-12-12',
                    endDate: '2020-12-21',
                    Budget: 23132,
                    userId: 1,
                },
                {
                    id: 2,
                    name: 'name2',
                    startDate: '2020-12-12',
                    endDate: '2020-12-21',
                    userId: 1,
                },
            ]

            const result = validateCampaignData(campaigns)

            expect(result).toBe('Invalid entry no. 2, missing property Budget')
        })

        it('should return error if userId is not defined', () => {
            const campaigns = [
                {
                    id: 1,
                    name: 'name1',
                    startDate: '2020-12-12',
                    endDate: '2020-12-21',
                    Budget: 23132,
                    userId: 1,
                },
                {
                    id: 2,
                    name: 'name2',
                    startDate: '2020-12-12',
                    endDate: '2020-12-21',
                    Budget: 23132,
                },
            ]

            const result = validateCampaignData(campaigns)

            expect(result).toBe('Invalid entry no. 2, missing property userId')
        })
    })
})
