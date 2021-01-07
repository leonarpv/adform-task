import { shallow } from 'enzyme'
import React from 'react'
import DataTableHeadCell from './DataTableHeadCell'
import DataTableHead from './DataTableHead'
import { Mock } from 'ts-mockery'
import { ColumnDefinition } from '../types'

describe('DataTableHead', () => {
    it('should render properly', () => {
        const columns: ColumnDefinition<string>[] = []

        const wrapper = shallow(<DataTableHead columns={columns} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('should render table head', () => {
        const columns: ColumnDefinition<string>[] = [
            Mock.of<ColumnDefinition<string>>(),
            Mock.of<ColumnDefinition<string>>(),
        ]

        const wrapper = shallow(<DataTableHead columns={columns} />)

        expect(wrapper.find('.data-table__head').exists()).toBe(true)
        expect(wrapper.find('.data-table__row').exists()).toBe(true)
        expect(wrapper.find(DataTableHeadCell).length).toBe(2)
    })
})
