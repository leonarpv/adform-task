import { shallow } from 'enzyme'
import React from 'react'
import Input from './Input'
import BaseField from '../BaseField'

describe('Input', () => {
    it('should render properly', () => {
        const wrapper = shallow(<Input />)

        expect(wrapper).toMatchSnapshot()
    })

    it('should render input', () => {
        const wrapper = shallow(<Input />)

        expect(wrapper.find(BaseField).exists()).toBe(true)
        expect(wrapper.find('input.input').exists()).toBe(true)
    })
})
