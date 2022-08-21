import Head from 'next/head'
import Header from '@/components/Layouts/Header'
import FormGroup from '@/components/Forms/FormGroup'
import EditorComponent from '@/components/Forms/EditorComponent'
import TagsSelect from '@/components/Forms/TagsSelect'
import LoadingIndicator from '@/components/LoadingIndicator'
import { useAuth } from '@/hooks/auth'
import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import SimilarQuestions from './SimilarQuestions'

const Ask = () => {
    // authentication.
    const { user } = useAuth({ middleware: 'auth' })

    // state
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('Explain your questions in detail')
    const [selTags, setSelTags] = useState([])
    const [tagKeyword, setTagKeyword] = useState('')
    const [tagsSearchUrl, setTagsSearchUrl] = useState('')
    const [questionsSearchUrl, setQuestionsSearchUrl] = useState('')

    const timer = useRef(null)

    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data: tagsData } = useSWR(tagsSearchUrl, fetcher)
    const { data: QuestionsData } = useSWR(questionsSearchUrl, fetcher)

    // questions

    useEffect(() => {
        console.log('title changed')
        setQuestionsSearchUrl(
            title.length > 5
                ? process.env.NEXT_PUBLIC_API_BASE_URL + 'questions/' + title
                : '',
        )
    }, [title])

    useEffect(() => {
        console.log('questionsSearchUrl', questionsSearchUrl)
    }, [questionsSearchUrl])

    // end questions

    // tags

    const handleTagSearch = keyword => {
        setTagKeyword(keyword)
    }

    useEffect(() => {
        clearTimeout(timer.current)

        // wait few seconds before triggering swr request.
        timer.current = setTimeout(() => {
            setTagsSearchUrl(
                tagKeyword
                    ? process.env.NEXT_PUBLIC_API_BASE_URL +
                          'tags/' +
                          tagKeyword
                    : '',
            )
        }, 500)
    }, [tagKeyword])

    // end tags

    return (
        <>
            <Head>
                <title>Ask a Question</title>
            </Head>

            <Header />

            {!user && <LoadingIndicator />}

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
                                        className="w-[100%] text-xs py-2 border-gray-400 rounded focus:outline outline-offset-0 focus:border-0 focus:outline-4 focus:outline-blue-500/20"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                    <SimilarQuestions data={QuestionsData} />
                                </FormGroup>

                                <FormGroup
                                    id="body"
                                    title="Body"
                                    description="Include all the information someone would need to answer your question">
                                    <EditorComponent
                                        value={body}
                                        setBody={setBody}
                                    />
                                </FormGroup>

                                <FormGroup
                                    id="tags"
                                    title="Tags"
                                    description="Add up to 5 tags to describe what your question is about. ">
                                    <TagsSelect
                                        selTags={selTags}
                                        setSelTags={setSelTags}
                                        tagKeyword={tagKeyword}
                                        handleTagSearch={handleTagSearch}
                                        suggestions={tagsData?.data.map(
                                            item => ({
                                                id: item.slug,
                                                text: item.name,
                                            }),
                                        )}
                                    />
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

export default Ask
