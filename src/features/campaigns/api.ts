import { http } from 'core/http'

export const getCampaignUsers = () => {
    return http.get(' https://jsonplaceholder.typicode.com/users')
}
