import { shallow } from 'enzyme'
import React from 'react'
import CampaignStatus from './CampaignStatus'

describe('CampaignStatus', () => {
    it('should render properly', () => {
        const active = true

        const wrapper = shallow(<CampaignStatus active={active} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('should render status badge', () => {
        const active = true

        const wrapper = shallow(<CampaignStatus active={active} />)

        expect(
            wrapper
                .find('.campaign-status__badge.campaign-status__badge--active')
                .exists()
        ).toBe(true)
    })

    it('should render status badge in inactive state', () => {
        const active = false

        const wrapper = shallow(<CampaignStatus active={active} />)

        expect(
            wrapper
                .find(
                    '.campaign-status__badge.campaign-status__badge--inactive'
                )
                .exists()
        ).toBe(true)
    })
})
