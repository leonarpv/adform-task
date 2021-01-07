import { shallow } from 'enzyme'
import React from 'react'
import BaseField from '../BaseField'
import TextArea from './TextArea'

describe('TextArea', () => {
    it('should render properly', () => {
        const wrapper = shallow(<TextArea />)

        expect(wrapper).toMatchSnapshot()
    })

    it('should render text area', () => {
        const wrapper = shallow(<TextArea />)

        expect(wrapper.find(BaseField).exists()).toBe(true)
        expect(wrapper.find('textarea.text-area').exists()).toBe(true)
    })
})
