import { shallow } from 'enzyme'
import React, { ChangeEvent, SyntheticEvent } from 'react'
import CampaignSearch from './CampaignSearch'
import { CampaignFilters } from '../types'
import Datepicker from 'components/fields/datepicker/Datepicker'
import Input from 'components/fields/input/Input'
import { Mock } from 'ts-mockery'

describe('CampaignSearch', () => {
    it('should render properly', () => {
        const filters: CampaignFilters = {}
        const onChange = jest.fn()

        const wrapper = shallow(
            <CampaignSearch filters={filters} onChange={onChange} />
        )

        expect(wrapper).toMatchSnapshot()
    })

    it('should render datepickers and input', () => {
        const filters: CampaignFilters = {}
        const onChange = jest.fn()

        const wrapper = shallow(
            <CampaignSearch filters={filters} onChange={onChange} />
        )

        expect(wrapper.find(Datepicker).length).toBe(2)
        expect(wrapper.find(Input).exists()).toBe(true)
    })

    it('should call onChange on startDate datepicker change', () => {
        const filters: CampaignFilters = {}
        const onChange = jest.fn()

        const wrapper = shallow(
            <CampaignSearch filters={filters} onChange={onChange} />
        )

        const changedDate = new Date()
        const event = Mock.of<SyntheticEvent<HTMLInputElement, Event>>()

        wrapper.find(Datepicker).at(0).props().onChange(changedDate, event)

        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange).toHaveBeenCalledWith({
            startDate: changedDate.toString(),
        })
    })

    it('should call onChange on endDate datepicker change', () => {
        const filters: CampaignFilters = {}
        const onChange = jest.fn()

        const wrapper = shallow(
            <CampaignSearch filters={filters} onChange={onChange} />
        )

        const changedDate = new Date()
        const event = Mock.of<SyntheticEvent<HTMLInputElement, Event>>()

        wrapper.find(Datepicker).at(1).props().onChange(changedDate, event)

        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange).toHaveBeenCalledWith({
            endDate: changedDate.toString(),
        })
    })

    it('should call onChange on name input change', () => {
        const filters: CampaignFilters = {}
        const onChange = jest.fn()

        const wrapper = shallow(
            <CampaignSearch filters={filters} onChange={onChange} />
        )

        const event = Mock.of<ChangeEvent<HTMLInputElement>>({
            target: {
                value: 'value',
            },
        })

        const onInputChange = wrapper.find(Input).props().onChange

        expect(onInputChange).toBeDefined()

        onInputChange && onInputChange(event)

        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange).toHaveBeenCalledWith({ name: event.target.value })
    })
})
