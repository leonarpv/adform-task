import React from 'react'
import CampaignsPage from 'pages/campaigns/CampaignsPage'
import { Provider } from 'react-redux'
import { store } from './store'
import { ToastContainer } from 'react-toastify'

const App = () => {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <CampaignsPage />
                <ToastContainer />
            </Provider>
        </React.StrictMode>
    )
}

export default App
