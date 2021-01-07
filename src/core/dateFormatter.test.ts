import { dateFormatter } from './dateFormatter'

describe('dateFormatter', () => {
    it('should format date', () => {
        const input = '2020-12-21'

        const result = dateFormatter(input)

        expect(result).toBe('21/12/2020')
    })
})
