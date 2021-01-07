import { dateFormatter } from './dateFormatter'
import each from 'jest-each'
import { currencyFormatter } from './currencyFormatter'

describe('currencyFormatter', () => {
    const cases = each`
      amount       | expectedResult
      ${100}       | ${'100 USD'}
      ${511}       | ${'511 USD'}
      ${56456456}  | ${'56.5M USD'}
      ${22123}     | ${'22.1k USD'}
      ${5121.213}  | ${'5.1k USD'}
      ${23.54}     | ${'23.5 USD'}
      ${23.56}     | ${'23.6 USD'}
    `

    cases.it(
        'should add correct class modifier by size',
        ({ amount, expectedResult }) => {
            const result = currencyFormatter(amount)

            expect(result).toEqual(expectedResult)
        }
    )
})
