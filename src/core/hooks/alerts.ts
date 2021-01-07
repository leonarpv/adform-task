import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { LoadingStatus } from '../loading'

type Config = {
    status: LoadingStatus
    message?: string
}

export const useFailedLoadingToast = ({ message, status }: Config) =>
    useEffect(() => {
        if (status === LoadingStatus.Failed) {
            toast(message, { type: 'error' })
        }
    }, [message, status])

export const useSuccessLoadingToast = ({ message, status }: Config) =>
    useEffect(() => {
        if (status === LoadingStatus.Succeeded) {
            toast(message, { type: 'success' })
        }
    }, [message, status])
