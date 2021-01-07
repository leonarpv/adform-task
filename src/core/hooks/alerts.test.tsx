import React from 'react'
import { useFailedLoadingToast, useSuccessLoadingToast } from './alerts'
import { LoadingStatus } from '../loading'
import { shallow } from 'enzyme'
import * as toastify from 'react-toastify'

jest.mock('react-toastify', () => ({
    toast: jest.fn(),
}))

describe('alerts', () => {
    beforeEach(() => jest.clearAllMocks())

    describe('useFailedLoadingToast', () => {
        it('should show an alert if status changes to Failed', () => {
            const status = LoadingStatus.Pending

            const toast = jest.spyOn(toastify, 'toast')

            jest.spyOn(React, 'useEffect').mockImplementation((f) => f())

            const message = 'message'

            const TestComponent = ({ status }: { status: LoadingStatus }) => {
                useFailedLoadingToast({
                    message,
                    status,
                })

                return <></>
            }

            const wrapper = shallow(<TestComponent status={status} />)

            wrapper.setProps({
                status: LoadingStatus.Failed,
            })

            expect(toast).toHaveBeenCalledTimes(1)
            expect(toast).toHaveBeenCalledWith(message, { type: 'error' })
        })
    })

    describe('useSuccessLoadingToast', () => {
        it('should show an alert if status changes to Succeeded', () => {
            const status = LoadingStatus.Pending

            const toast = jest.spyOn(toastify, 'toast')

            jest.spyOn(React, 'useEffect').mockImplementation((f) => f())

            const message = 'message'

            const TestComponent = ({ status }: { status: LoadingStatus }) => {
                useSuccessLoadingToast({
                    message,
                    status,
                })

                return <></>
            }

            const wrapper = shallow(<TestComponent status={status} />)

            wrapper.setProps({
                status: LoadingStatus.Succeeded,
            })

            expect(toast).toHaveBeenCalledTimes(1)
            expect(toast).toHaveBeenCalledWith(message, { type: 'success' })
        })
    })
})
