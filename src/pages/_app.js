import 'tailwindcss/tailwind.css'
import Router from 'next/router'
import { useEffect, useState } from 'react'

const App = ({ Component, pageProps }) => <Component {...pageProps} />

// const App = ({ Component, pageProps }) => {
//     const [loading, setLoading] = useState(false)
//     useEffect(() => {
//         const start = () => {
//             setLoading(true)
//         }
//         const end = () => {
//             console.log('findished')
//             setLoading(false)
//         }
//         Router.events.on('routeChangeStart', start)
//         Router.events.on('routeChangeComplete', end)
//         Router.events.on('routeChangeError', end)
//         return () => {
//             Router.events.off('routeChangeStart', start)
//             Router.events.off('routeChangeComplete', end)
//             Router.events.off('routeChangeError', end)
//         }
//     }, [])
//     return <>{loading ? <h1>Loading...</h1> : <Component {...pageProps} />}</>
// }

export default App
