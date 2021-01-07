import { shallow } from 'enzyme'
import React, { ChangeEvent, FormEvent } from 'react'
import Modal from 'react-modal'
import CampaignImport from './CampaignImport'
import Button from 'components/button/Button'
import TextArea from 'components/fields/text-area/TextArea'
import { Mock } from 'ts-mockery'

describe('CampaignImport', () => {
    it('should render properly', () => {
        const onImport = jest.fn()

        const wrapper = shallow(<CampaignImport onImport={onImport} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('should render datepickers and input', () => {
        const onImport = jest.fn()

        const wrapper = shallow(<CampaignImport onImport={onImport} />)

        expect(wrapper.find(Button).length).toBe(3)
        expect(wrapper.find(Modal).exists()).toBe(true)
        expect(wrapper.find(TextArea).exists()).toBe(true)
        expect(wrapper.find('form').exists()).toBe(true)
    })

    it('should call onImport on TextArea change', () => {
        const onImport = jest.fn()

        const wrapper = shallow(<CampaignImport onImport={onImport} />)

        const submitEvent = Mock.of<FormEvent<HTMLFormElement>>({
            preventDefault: jest.fn(),
        })

        const changeEvent = Mock.of<ChangeEvent<HTMLTextAreaElement>>({
            target: {
                value: 'value',
            },
        })

        const onInputChange = wrapper.find(TextArea).props().onChange

        expect(onInputChange).toBeDefined()

        onInputChange && onInputChange(changeEvent)

        const onSubmit = wrapper.find('form').props().onSubmit

        expect(onSubmit).toBeDefined()

        onSubmit && onSubmit(submitEvent)

        expect(onImport).toHaveBeenCalledTimes(1)
        expect(onImport).toHaveBeenCalledWith(changeEvent.target.value)
    })
})
