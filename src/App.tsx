import React from 'react'
import CampaignsPage from 'pages/campaigns/CampaignsPage'
import { cssTransition, ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { store } from './store'

const transition = cssTransition({
    enter: 'fadeIn',
    exit: 'fadeOut',
    duration: 350,
})

const App = () => {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <CampaignsPage />
                <ToastContainer transition={transition} />
            </Provider>
        </React.StrictMode>
    )
}

export default App
