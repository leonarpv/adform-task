import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { campaignsSlice } from './features/campaigns/store'

export const store = configureStore({
    reducer: campaignsSlice.reducer,
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
