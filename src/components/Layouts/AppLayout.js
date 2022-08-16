import Navigation from '@/components/Layouts/Navigation'
// import { useAuth } from '@/hooks/auth'
import LeftSidebar from './LeftSidebar'
import Header from './Header'
import Head from 'next/head'

const AppLayout = ({ pageTitle, children }) => {
    // const { user } = useAuth({ middleware: 'auth' })

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
            </Head>

            <Header />

            <div id="app-body" className="container mx-auto flex max-w-7xl">
                <LeftSidebar />

                <main id="app-content-area" className="flex-1">
                    {children}
                </main>
            </div>
        </>
    )
}

export default AppLayout
