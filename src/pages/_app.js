import 'tailwindcss/tailwind.css'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import LoadingIndicator from '@/components/LoadingIndicator'

// const App = ({ Component, pageProps }) => <Component {...pageProps} />

const App = ({ Component, pageProps }) => {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const start = () => {
            setLoading(true)
        }
        const end = () => {
            setLoading(false)
        }
        Router.events.on('routeChangeStart', start)
        Router.events.on('routeChangeComplete', end)
        Router.events.on('routeChangeError', end)
        return () => {
            Router.events.off('routeChangeStart', start)
            Router.events.off('routeChangeComplete', end)
            Router.events.off('routeChangeError', end)
        }
    }, [])

    return (
        <>
            {loading && <LoadingIndicator />}
            <Component {...pageProps} />
        </>
    )
}

export default App
