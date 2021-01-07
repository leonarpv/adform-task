const round = (number: number) => Math.round(number * 10) / 10

const getAmountString = (amount: number) => {
    if (amount >= 1000000) {
        return `${round(amount / 1000000)}M`
    }

    if (amount >= 1000) {
        return `${round(amount / 1000)}k`
    }

    return round(amount).toString()
}

export const currencyFormatter = (amount: number, currency: string = 'USD') => {
    return `${getAmountString(amount)} ${currency}`
}
