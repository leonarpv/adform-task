import { shallow } from 'enzyme'
import React from 'react'
import BaseField from '../BaseField'
import Datepicker from './Datepicker'
import DatePicker from 'react-datepicker'

describe('Datepicker', () => {
    it('should render properly', () => {
        const onChange = jest.fn()

        const wrapper = shallow(<Datepicker onChange={onChange} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('should render datepicker', () => {
        const onChange = jest.fn()

        const wrapper = shallow(<Datepicker onChange={onChange} />)

        expect(wrapper.find(BaseField).exists()).toBe(true)
        expect(wrapper.find(DatePicker).exists()).toBe(true)
    })
})
