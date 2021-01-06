export const getAmountString = (amount: number) => {
    if (amount >= 1000000) {
        return `${(amount / 1000000).toFixed(1)}M`
    }

    if (amount >= 1000) {
        return `${(amount / 1000).toFixed(1)}k`
    }

    return amount.toString()
}

export const currencyFormatter = (amount: number, currency: string = 'USD') => {
    return `${getAmountString(amount)} ${currency}`
}
