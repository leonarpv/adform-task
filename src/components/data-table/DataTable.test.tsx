import { shallow } from 'enzyme'
import React from 'react'
import Button from 'components/button/Button'
import DataTable from './DataTable'
import DataTableHead from './head/DataTableHead'
import DataTableBody from './body/DataTableBody'
import { ColumnDefinition } from './types'

describe('DataTable', () => {
    it('should render properly', () => {
        const columns: ColumnDefinition<string>[] = []
        const source: string[] = []

        const wrapper = shallow(<DataTable columns={columns} source={source} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('should render table', () => {
        const columns: ColumnDefinition<string>[] = []
        const source: string[] = []

        const wrapper = shallow(<DataTable columns={columns} source={source} />)

        expect(wrapper.find('.data-table').exists()).toBe(true)
        expect(wrapper.find(DataTableHead).exists()).toBe(true)
        expect(wrapper.find(DataTableBody).exists()).toBe(true)
    })
})
