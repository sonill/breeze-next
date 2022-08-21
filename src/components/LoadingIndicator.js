import { Router } from 'next/router'
import { useEffect, useState } from 'react'
import styles from './LoadingIndicator.module.css'

const LoadingIndicator = () => {
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

    if (!loading) return <></>

    return (
        <div className={styles.wrapper}>
            <div className={styles.loader}></div>
        </div>
    )
}

export default LoadingIndicator
