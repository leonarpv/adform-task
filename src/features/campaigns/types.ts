export type Campaign = {
    id: number
    name: string
    startDate: string
    endDate: string
    Budget: number
    userId: number
}

export type CampaignUser = {
    id: number
    name: string
}

export type CampaignWithUser = {
    user: CampaignUser | null
} & Campaign

export type CampaignFilters = {
    name?: string
    startDate?: string
    endDate?: string
}
