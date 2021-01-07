import { http } from 'core/http'
import { CampaignUser } from './types'

export const getCampaignUsers = () => {
    return http.get<CampaignUser[]>(
        'https://jsonplaceholder.typicode.com/users'
    )
}
