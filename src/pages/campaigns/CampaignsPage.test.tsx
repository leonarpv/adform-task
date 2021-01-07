import React from 'react'
import { shallow } from 'enzyme'
import CampaignsPage from './CampaignsPage'
import Campaigns from 'features/campaigns/Campaigns'

describe('CampaignsPage', () => {
    it('should render properly', () => {
        const wrapper = shallow(<CampaignsPage />)

        expect(wrapper).toMatchSnapshot()
    })

    it('render Campaigns component', () => {
        const wrapper = shallow(<CampaignsPage />)

        expect(wrapper.find(Campaigns).exists()).toBe(true)
    })
})
