import { CampaignUser } from './types'
import { Mock } from 'ts-mockery'
import { AxiosResponse } from 'axios'
import * as http from 'core/http'
import { getCampaignUsers } from './api'

jest.mock('core/http')

describe('campaigns api', () => {
    beforeEach(() => jest.clearAllMocks())

    describe('getCampaignUsers', () => {
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

            const get = jest.spyOn(http.http, 'get').mockResolvedValue(response)

            const result = await getCampaignUsers()

            expect(get).toHaveBeenCalledTimes(1)
            expect(get).toHaveBeenCalledWith(
                'https://jsonplaceholder.typicode.com/users'
            )

            expect(result).toBe(response)
        })
    })
})
