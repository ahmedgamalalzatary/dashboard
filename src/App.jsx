import './App.css'
import { useState } from 'react'
import Layout from './Components/Layout'
import MainContent from './Components/MainContent'
import './i18n'

function App() {
    const [activePage, setActivePage] = useState('dashboard')

    return (
        <Layout activePage={activePage} setActivePage={setActivePage}>
            <MainContent activePage={activePage} />
        </Layout>
    )
}

export default App
