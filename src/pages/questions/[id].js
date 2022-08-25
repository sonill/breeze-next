import AskBtn from '@/components/AskBtn'
import AppLayout from '@/components/Layouts/AppLayout'
import RightSidebar from '@/components/Layouts/RightSidebar'
import PostAnswer from '@/components/Questions/PostAnswer'
import SingleAnswer from '@/components/SingleQuestion/SingleAnswer'
import Toast from '@/components/Toast'
import axios from '@/lib/axios'
import daysjs from 'dayjs'
import { useEffect, useState } from 'react'

const Questions = ({ questions, answers }) => {
    const [toastItems, setToastItems] = useState([])
    const [selectedAnswer, setSelectedAnswer] = useState()

    if (!questions || !answers) return <></>

    useEffect(() => {
        // update selected answer
        setSelectedAnswer(questions.data.selected_answer)

        // increment question view.
        axios.get(
            process.env.NEXT_PUBLIC_BACKEND_URL +
                '/api/increment-views/' +
                questions.data.id,
        )
    }, [])

    return (
        <AppLayout pageTitle={questions.data.question}>
            <Toast items={toastItems} setToastItems={setToastItems} />
            <>
                <div className="pl-5 ">
                    <div className="flex items-start justify-between border-b pb-4 mb-4">
                        <div>
                            <h3 className="mb-3 text-[25px] leading-[1.3]">
                                {questions.data.question}
                            </h3>
                            <ul className="flex text-[13px] text-gray-500">
                                <li className="mr-6">
                                    Asked{' '}
                                    {daysjs(questions.data.created_at).format(
                                        'MMM D, YYYY',
                                    )}{' '}
                                </li>
                                <li className="mr-6">
                                    Viewed {questions.data.views} times
                                </li>
                            </ul>
                        </div>
                        <div className="flex min-w-[150px] justify-end">
                            <AskBtn />
                        </div>
                    </div>

                    <div className="flex">
                        <div
                            id="app-content-area-body"
                            className=" mt-3 flex-1">
                            <SingleAnswer
                                data={questions.data}
                                isQuestion={true}
                                question_id={questions.data.id}
                                setToastItems={setToastItems}
                            />

                            <div className="answers-container mt-[60px]">
                                {answers.data.length > 0 ? (
                                    <>
                                        <h3 className="text-xl">
                                            {answers.data.length} Answers
                                        </h3>

                                        {answers.data.map(answer => (
                                            <SingleAnswer
                                                key={answer.id}
                                                data={answer}
                                                setToastItems={setToastItems}
                                                question_id={questions.data.id}
                                                setSelectedAnswer={
                                                    setSelectedAnswer
                                                }
                                                selectedAnswer={selectedAnswer}
                                            />
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        <PostAnswer
                                            question_id={questions.data.id}
                                        />
                                    </>
                                )}

                                <p className="mt-6">
                                    Browse other questions tagged python or{' '}
                                    <a className="text-blue-600">
                                        ask your own question
                                    </a>
                                    .
                                </p>
                            </div>
                        </div>
                        <RightSidebar />
                    </div>
                </div>
            </>
        </AppLayout>
    )
}

export async function getStaticPaths() {
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + 'questions')
    const posts = await res.json()

    return {
        paths: posts.data.map(item => ({
            params: {
                id: item.id.toString(),
            },
        })),
        fallback: true,
    }
}

export async function getStaticProps({ params, res }) {
    const id = params.id

    const questions_re = await fetch(
        process.env.NEXT_PUBLIC_API_BASE_URL + 'questions/' + id,
    )
    const questions = await questions_re.json()

    const answers_res = await fetch(
        process.env.NEXT_PUBLIC_API_BASE_URL + 'answersofquestion/' + id,
    )
    const answers = await answers_res.json()

    if (!questions || !answers) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            questions,
            answers,
        },
        revalidate: 60, // 1 mins.
    }
}

export default Questions
