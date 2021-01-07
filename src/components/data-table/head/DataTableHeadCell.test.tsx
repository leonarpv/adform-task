import { shallow } from 'enzyme'
import React from 'react'
import DataTableHeadCell from './DataTableHeadCell'
import { Mock } from 'ts-mockery'
import {ColumnDefinition} from "../types";

describe('DataTableHeadCell', () => {
    it('should render properly', () => {
        const column = Mock.of<ColumnDefinition<string>>()

        const wrapper = shallow(<DataTableHeadCell column={column} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('should render table head cell', () => {
        const column = Mock.of<ColumnDefinition<string>>({
            title: 'title'
        })

        const wrapper = shallow(<DataTableHeadCell column={column} />)

        expect(wrapper.find('.data-table__cell.data-table__cell--head').exists()).toBe(true)
        expect(wrapper.find('.data-table__cell.data-table__cell--head').text()).toBe(column.title)
    })
})
