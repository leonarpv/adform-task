import { shallow } from 'enzyme'
import React from 'react'
import Button from 'components/button/Button'

describe('Button', () => {
    it('should render properly', () => {
        const wrapper = shallow(<Button />)

        expect(wrapper).toMatchSnapshot()
    })

    it('should render button', () => {
        const wrapper = shallow(<Button />)

        expect(wrapper.find('button').exists()).toBe(true)
        expect(wrapper.find('button.button--secondary').exists()).toBe(false)
    })

    it('should render button in secondary state', () => {
        const wrapper = shallow(<Button secondary={true} />)

        expect(wrapper.find('button.button--secondary').exists()).toBe(true)
    })
})
