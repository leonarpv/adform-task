import { CampaignFilters, CampaignWithUser } from './types'
import dayjs from 'dayjs'

export const filterCampaigns = (
    campaigns: CampaignWithUser[],
    filters?: CampaignFilters
) => {
    let result = campaigns

    if (!filters) {
        return result
    }

    const { startDate, endDate, name } = filters

    if (name) {
        result = result.filter((c) =>
            c.name.toLowerCase().includes(name.toLocaleLowerCase())
        )
    }

    if (startDate) {
        const filterStartDate = dayjs(startDate)

        result = result.filter(
            (c) =>
                dayjs(c.startDate).isAfter(filterStartDate) ||
                dayjs(c.endDate).isAfter(filterStartDate)
        )
    }

    if (endDate) {
        const filterEndDate = dayjs(endDate)

        result = result.filter(
            (c) =>
                dayjs(c.startDate).isBefore(filterEndDate) ||
                dayjs(c.endDate).isBefore(filterEndDate)
        )
    }

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

        if (!entry.hasOwnProperty('id') || !entry.id) {
            return `Invalid entry no. ${i + 1}, missing property id`
        }

        if (!entry.hasOwnProperty('name') || !entry.name) {
            return `Invalid entry no. ${i + 1}, missing property name`
        }

        if (
            !entry.hasOwnProperty('startDate') ||
            !entry.startDate ||
            !dayjs(entry.startDate).isValid()
        ) {
            return `Invalid entry no. ${i + 1}, missing property startDate`
        }

        if (
            !entry.hasOwnProperty('endDate') ||
            !entry.endDate ||
            !dayjs(entry.endDate).isValid()
        ) {
            return `Invalid entry no. ${i + 1}, missing property endDate`
        }

        if (!entry.hasOwnProperty('Budget') || !entry.Budget) {
            return `Invalid entry no. ${i + 1}, missing property Budget`
        }

        if (!entry.hasOwnProperty('userId') || !entry.userId) {
            return `Invalid entry no. ${i + 1}, missing property userId`
        }
    }

    return undefined
}
