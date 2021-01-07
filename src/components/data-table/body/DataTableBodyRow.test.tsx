import { shallow } from 'enzyme'
import React from 'react'
import { ColumnDefinition } from '../types'
import DataTableBodyRow from './DataTableBodyRow'
import { Mock } from 'ts-mockery'
import DataTableBodyCell from "./DataTableBodyCell";

describe('DataTableBodyRow', () => {
    it('should render properly', () => {
        const columns: ColumnDefinition<string>[] = []
        const sourceEntry = 'sourceEntry'

        const wrapper = shallow(
            <DataTableBodyRow columns={columns} sourceEntry={sourceEntry} />
        )

        expect(wrapper).toMatchSnapshot()
    })

    it('should render table body row', () => {
        const columns: ColumnDefinition<string>[] = [
            Mock.of<ColumnDefinition<string>>(),
            Mock.of<ColumnDefinition<string>>(),
        ]
        const sourceEntry = 'sourceEntry'

        const wrapper = shallow(
            <DataTableBodyRow columns={columns} sourceEntry={sourceEntry} />
        )

        expect(wrapper.find('.data-table__row').exists()).toBe(true)
        expect(wrapper.find(DataTableBodyCell).length).toBe(2)
    })
})
