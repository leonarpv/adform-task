import { shallow } from 'enzyme'
import React from 'react'
import { ColumnDefinition } from '../types'
import DataTableBodyRow from './DataTableBodyRow'
import { Mock } from 'ts-mockery'
import DataTableBodyCell from './DataTableBodyCell'

describe('DataTableBodyCell', () => {
    it('should render properly', () => {
        const text = 'text'
        const column = Mock.of<ColumnDefinition<string>>({
            accessor: () => text,
        })
        const sourceEntry = 'sourceEntry'

        const wrapper = shallow(
            <DataTableBodyCell column={column} sourceEntry={sourceEntry} />
        )

        expect(wrapper).toMatchSnapshot()
    })

    it('should render table head', () => {
        const text = 'text'
        const column = Mock.of<ColumnDefinition<string>>({
            accessor: () => text,
        })
        const sourceEntry = 'sourceEntry'

        const wrapper = shallow(
            <DataTableBodyCell column={column} sourceEntry={sourceEntry} />
        )

        expect(
            wrapper.find('.data-table__cell.data-table__cell--body').exists()
        ).toBe(true)
        expect(
            wrapper.find('.data-table__cell.data-table__cell--body').text()
        ).toBe(text)
    })
})
