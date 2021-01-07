import { shallow } from 'enzyme'
import React from 'react'
import BaseField from './BaseField'

describe('BaseField', () => {
    it('should render properly', () => {
        const wrapper = shallow(<BaseField />)

        expect(wrapper).toMatchSnapshot()
    })

    it('should render base input', () => {
        const wrapper = shallow(<BaseField />)

        expect(wrapper.find('.base-field').exists()).toBe(true)
    })

    it('should render base input in errored state', () => {
        const error = 'error'

        const wrapper = shallow(<BaseField error={error} />)

        expect(wrapper.find('.base-field').exists()).toBe(true)
        expect(wrapper.find('.base-field__error-indicator').exists()).toBe(true)
        expect(wrapper.find('.base-field__error').exists()).toBe(true)
        expect(wrapper.find('.base-field__error').text()).toBe(error)
    })

    it('should render label', () => {
        const label = 'label'

        const wrapper = shallow(<BaseField label={label} />)

        expect(wrapper.find('.base-field').exists()).toBe(true)
        expect(wrapper.find('.base-field__error-indicator').exists()).toBe(
            false
        )
        expect(wrapper.find('.base-field__error').exists()).toBe(false)
        expect(wrapper.find('.base-field__label').exists()).toBe(true)
        expect(wrapper.find('.base-field__label').text()).toBe(`${label}:`)
    })
})
