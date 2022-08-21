import 'react-quill/dist/quill.snow.css'
import '../../styles/react-tags.css'

import 'tailwindcss/tailwind.css'
import LoadingIndicator from '@/components/LoadingIndicator'

import { SessionProvider } from 'next-auth/react'

// const App = ({ Component, pageProps }) => <Component {...pageProps} />
const App = ({ Component, pageProps: { session, ...pageProps } }) => {
    return (
        <>
            <SessionProvider session={session}>
                <LoadingIndicator />
                <Component {...pageProps} />
            </SessionProvider>
        </>
    )
}

export default App
