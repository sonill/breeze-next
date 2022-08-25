import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import { useState } from 'react'
import Alert from '../Alert'
import EditorComponent from '../Forms/EditorComponent'
import LoadingIndicator from '../LoadingIndicator'

const PostAnswer = ({ question_id }) => {
    const { user } = useAuth({ middlewares: 'guest' })

    const [answer, setAnswer] = useState('')
    const [errorMessages, setErrorMessage] = useState([])
    const [processing, setProcessing] = useState(false)

    const resetErrorMessage = () => {
        setErrorMessage([])
    }

    const validateForm = () => {
        const errMsg = []

        if (!answer || answer.replace(/<[^>]+>/g, '').length < 1) {
            errMsg.push('Answer field cannot be empty.')
        }

        setErrorMessage(errMsg)

        return errMsg.length < 1
    }

    const handleSubmit = async event => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        if (!validateForm()) {
            return
        }

        setProcessing(true)

        await axios
            .get(process.env.NEXT_PUBLIC_BACKEND_URL + '/sanctum/csrf-cookie')
            .then(() => {
                console.log('asdf')
                axios
                    .post(process.env.NEXT_PUBLIC_API_BASE_URL + 'answers', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: {
                            question_id: question_id,
                            answer: answer,
                        },
                    })
                    .then(res => {
                        // redirect.
                        // router.push('/questions/' + question_id)
                        window.location.reload(true)
                    })
                    .catch(error => {
                        if (error?.response?.data?.message) {
                            Object.values(error?.response?.data?.message).map(
                                item => {
                                    setErrorMessage(prevState => [
                                        ...prevState,
                                        ...item,
                                    ])
                                },
                            )
                        } else {
                            console.log('error', error)
                        }
                    })
            })

        setProcessing(false)
    }

    if (!user)
        return (
            <>
                Please <a href="/login">login</a> or{' '}
                <a href="/register">signup</a> to submit your answer
            </>
        )

    return (
        <>
            {processing && <LoadingIndicator loadingState={true} />}
            <p>
                Know someone who can answer? Share a link to this{' '}
                <a href="#" className="text-blue-600">
                    question
                </a>{' '}
                via email, Twitter, or Facebook.
            </p>
            <h3 className="text-xl my-3">Your Answers</h3>

            <Alert errorMessages={errorMessages} onClick={resetErrorMessage} />

            <form method="POST" onSubmit={handleSubmit} className="mt-3">
                <EditorComponent value={answer} setBody={setAnswer} />

                <button
                    type="submit"
                    className="rounded-[5px] mt-6 bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-700 cursor-pointer">
                    Post your answer
                </button>
            </form>
        </>
    )
}

export default PostAnswer
