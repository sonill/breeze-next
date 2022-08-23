import FormGroup from '@/components/Forms/FormGroup'
import EditorComponent from '@/components/Forms/EditorComponent'
import TagsSelect from '@/components/Forms/TagsSelect'
import { useAuth } from '@/hooks/auth'
import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import SimilarQuestions from './SimilarQuestions'
import axios from '@/lib/axios'
import AskQuestionLayout from '@/components/Layouts/AskQuestionLayout'
import LoadingIndicator from '@/components/LoadingIndicator'

const Ask = () => {
    // authentication.
    const { user } = useAuth({ middleware: 'auth' })

    // state
    const [title, setTitle] = useState('')
    const [body, setBody] = useState()
    const [selTags, setSelTags] = useState([])
    const [tagKeyword, setTagKeyword] = useState('')
    const [tagsSearchUrl, setTagsSearchUrl] = useState('')
    const [questionsSearchUrl, setQuestionsSearchUrl] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [processing, setProcessing] = useState(false)

    const timer = useRef(null)

    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data: tagsData } = useSWR(tagsSearchUrl, fetcher)
    const { data: questionsData, error: questionError } = useSWR(
        questionsSearchUrl,
        fetcher,
    )

    const resetErrorMessage = () => {
        setErrorMessage('')
    }

    // questions

    useEffect(() => {
        setQuestionsSearchUrl(
            title.length > 5
                ? process.env.NEXT_PUBLIC_API_BASE_URL +
                      'search-questions/' +
                      title
                : '',
        )
    }, [title])

    // end questions

    // tags

    // useEffect(() => {
    //     console.log(selTags.map(item => item.text))
    // }, [selTags])

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

    const handleSubmit = async event => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        setProcessing(true)

        setErrorMessage('')

        // Get data from the form.
        const data = {
            title: title,
            body: body,
            tags: selTags.map(item => item.text),
        }

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)

        // API endpoint where we send form data.
        const endpoint = process.env.NEXT_PUBLIC_API_BASE_URL + 'questions'

        // Form the request for sending data to the server.
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        }

        const response = await axios
            .get(process.env.NEXT_PUBLIC_BACKEND_URL + '/sanctum/csrf-cookie')
            .then(() => {
                axios
                    .post(endpoint, options)
                    .then(res => {
                        const response = res.data

                        if ('error' in response) {
                            // validation error.
                            setErrorMessage(response.message)
                        }

                        setProcessing(false)
                    })
                    .catch(function (error) {
                        console.log('error', error)
                    })
            })

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        // const result = await response.json()
    }

    return (
        <AskQuestionLayout
            pageTitle="Ask a Question"
            errorMessage={errorMessage}
            resetErrorMessage={resetErrorMessage}>
            {!user && <LoadingIndicator />}
            {processing && <LoadingIndicator loadingState={true} />}

            <form onSubmit={handleSubmit}>
                <div
                    className=" mr-[20px] bg-white rounded p-4 text-xs"
                    style={{ boxShadow: '0 0 7px #ccc' }}>
                    <FormGroup
                        id="title"
                        title="Title"
                        description="Be specific and imagine you're asking a question to another person">
                        <input
                            type="text"
                            placeholder="Is there any r function?"
                            className="w-[100%] font-medium  py-2 border-gray-400 rounded focus:outline outline-offset-0 focus:border-0 focus:outline-4 focus:outline-blue-500/20"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <SimilarQuestions
                            data={questionsData}
                            isLoading={
                                questionsSearchUrl &&
                                !questionsData &&
                                !questionError
                            }
                        />
                    </FormGroup>

                    <FormGroup
                        id="body"
                        title="Body"
                        description="Include all the information someone would need to answer your question">
                        <EditorComponent value={body} setBody={setBody} />
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
                            suggestions={tagsData?.data.map(item => ({
                                id: item.slug,
                                text: item.name,
                            }))}
                        />
                    </FormGroup>
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="rounded-[5px] bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-700 cursor-pointer"
                        onClick={() => {}}>
                        Publish
                    </button>
                </div>
            </form>
        </AskQuestionLayout>
    )
}

export default Ask
