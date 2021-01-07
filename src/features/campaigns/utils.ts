import { CampaignFilters, CampaignWithUser } from './types'
import dayjs from 'dayjs'

export const filterCampaigns = (
    campaigns: CampaignWithUser[],
    filters: CampaignFilters = {}
) => {
    const { startDate, endDate, name } = filters

    const result = campaigns.filter((c) => {
        const includesName =
            !name || c.name.toLowerCase().includes(name.toLowerCase())

        if (!includesName) {
            return false
        }

        const campaignStartDate = dayjs(c.startDate)
        const campaignEndDate = dayjs(c.endDate)

        const endDateBeforeStart = campaignEndDate.isBefore(campaignStartDate)

        if (endDateBeforeStart) {
            return false
        }

        const filterStartDate = startDate && dayjs(startDate)
        const filterEndDate = endDate && dayjs(endDate)

        const startDateInRange =
            (!filterStartDate ||
                !campaignStartDate.isBefore(filterStartDate)) &&
            (!filterEndDate || !campaignStartDate.isAfter(filterEndDate))

        const endDateInRange =
            (!filterStartDate || !campaignEndDate.isBefore(filterStartDate)) &&
            (!filterEndDate || !campaignEndDate.isAfter(filterEndDate))

        return startDateInRange || endDateInRange
    })

    return result
}

export const validateCampaignData = (value: unknown): string | undefined => {
    if (!value) {
        return 'No Input Provided'
    }

    if (!Array.isArray(value)) {
        return 'Input must be an JSON array'
    }

    for (const [i, entry] of value.entries()) {
        if (!(typeof entry === 'object')) {
            return `Invalid entry no. ${i + 1}`
        }

        if (!entry.id) {
            return `Invalid entry no. ${i + 1}, missing property id`
        }

        if (!entry.name) {
            return `Invalid entry no. ${i + 1}, missing property name`
        }

        if (!entry.startDate || !dayjs(entry.startDate).isValid()) {
            return `Invalid entry no. ${i + 1}, missing property startDate`
        }

        if (!entry.endDate || !dayjs(entry.endDate).isValid()) {
            return `Invalid entry no. ${i + 1}, missing property endDate`
        }

        if (!entry.Budget) {
            return `Invalid entry no. ${i + 1}, missing property Budget`
        }

        if (!entry.userId) {
            return `Invalid entry no. ${i + 1}, missing property userId`
        }
    }

    return undefined
}
