import { shallow } from 'enzyme'
import React from 'react'
import { ColumnDefinition } from '../types'
import DataTableBody from './DataTableBody'
import DataTableBodyRow from './DataTableBodyRow'

describe('DataTableBody', () => {
    it('should render properly', () => {
        const columns: ColumnDefinition<string>[] = []
        const source: string[] = []

        const wrapper = shallow(
            <DataTableBody columns={columns} source={source} />
        )

        expect(wrapper).toMatchSnapshot()
    })

    it('should render table body', () => {
        const columns: ColumnDefinition<string>[] = []
        const source: string[] = ['string1', 'string2']

        const wrapper = shallow(
            <DataTableBody columns={columns} source={source} />
        )

        expect(wrapper.find('.data-table__body').exists()).toBe(true)
        expect(wrapper.find(DataTableBodyRow).length).toBe(2)
    })

    it('should render empty table body is source is empty', () => {
        const columns: ColumnDefinition<string>[] = []
        const source: string[] = []

        const wrapper = shallow(
            <DataTableBody columns={columns} source={source} />
        )

        expect(wrapper.find('.data-table__body').exists()).toBe(true)
        expect(wrapper.find(DataTableBodyRow).length).toBe(0)
        expect(wrapper.find('.data-table__empty-content').exists()).toBe(true)
        expect(wrapper.find('.data-table__empty-content').text()).toBe(
            'No Data'
        )
    })

    it('should render provided empty table text', () => {
        const columns: ColumnDefinition<string>[] = []
        const source: string[] = []
        const emptyText = 'emptyText'

        const wrapper = shallow(
            <DataTableBody
                columns={columns}
                source={source}
                emptyText={emptyText}
            />
        )

        expect(wrapper.find('.data-table__body').exists()).toBe(true)
        expect(wrapper.find(DataTableBodyRow).length).toBe(0)
        expect(wrapper.find('.data-table__empty-content').exists()).toBe(true)
        expect(wrapper.find('.data-table__empty-content').text()).toBe(
            emptyText
        )
    })
})
