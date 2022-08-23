import Head from 'next/head'
import Header from '@/components/Layouts/Header'
import Alert from '../Alert'

const AskQuestionLayout = ({
    pageTitle,
    children,
    errorMessage,
    resetErrorMessage,
}) => {
    const errorText = []

    if (errorMessage) {
        Object.values(errorMessage).map((item, index) => {
            item.map(errorMsg => {
                errorText.push(errorMsg)
            })
        })
    }
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
            </Head>

            <Header />

            <div className="pt-[52px] bg-gray-100  pb-[50px]">
                <div id="app-body" className="container mx-auto  max-w-7xl ">
                    <main id="app-content-area" className="">
                        <h2
                            className="text-[28px] text-gray-700 py-10 block bg-right flex-1 bg-no-repeat"
                            style={{
                                backgroundImage:
                                    'url(/images/ask-background.svg)',
                            }}>
                            Ask a public question
                        </h2>

                        <div className="flex items-start">
                            {/* editor-container */}
                            <div id="editor-container" className="flex-1">
                                {errorMessage && (
                                    <div className="mr-[20px] mb-3">
                                        <Alert
                                            errorMessage={errorText}
                                            onClick={resetErrorMessage}
                                        />
                                    </div>
                                )}

                                {children}
                            </div>
                            {/* sidebar */}
                            <div
                                className="editor-sidebar w-[300px] bg-white  rounded p-4 text-xs "
                                style={{ boxShadow: '0 0 7px #ccc' }}>
                                sidebar
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default AskQuestionLayout
