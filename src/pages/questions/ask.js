import Head from 'next/head'
import Header from '@/components/Layouts/Header'
import FormGroup from '@/components/Forms/FormGroup'
import EditorComponent from '@/components/Forms/EditorComponent'

const Ask = () => {
    return (
        <>
            <Head>
                <title>Ask a Question</title>
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

                        <div className="flex ">
                            {/* editor-container */}
                            <div
                                id="editor-container"
                                className="flex-1 mr-[20px] bg-white rounded p-4 text-xs"
                                style={{ boxShadow: '0 0 7px #ccc' }}>
                                <FormGroup
                                    id="title"
                                    title="Title"
                                    description="Be specific and imagine you're asking a question to another person">
                                    <input
                                        type="text"
                                        placeholder="Is there any r function?"
                                    />
                                </FormGroup>

                                <FormGroup
                                    id="body"
                                    title="Body"
                                    description="Include all the information someone would need to answer your question">
                                    {/* <textarea placeholder="Is there any r function?"></textarea> */}
                                    <EditorComponent
                                        value="this is default text"
                                        onChange={() => {}}
                                    />
                                </FormGroup>

                                <FormGroup
                                    id="tags"
                                    title="Tags"
                                    description="Add up to 5 tags to describe what your question is about">
                                    <textarea placeholder="ex: mysql laravel ajax"></textarea>
                                </FormGroup>
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

// export async function getStaticProps() {
//     const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + 'questions')
//     const posts = await res.json()

//     return {
//         props: {
//             posts,
//         },
//     }
// }

export default Ask
