import AppLayout from '@/components/Layouts/AppLayout'
import RightSidebar from '@/components/Layouts/RightSidebar'
import SingleAnswer from '@/components/SingleQuestion/SingleAnswer'
import daysjs from 'dayjs'

const Questions = ({ questions, answers }) => {
    // console.log('questions', questions)
    // console.log('answers', answers)
    if (!questions || !answers) return <></>
    return (
        <AppLayout pageTitle={questions.data.question}>
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
                            <a
                                href="#"
                                className="rounded-[5px] bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-700">
                                Ask Question
                            </a>
                        </div>
                    </div>

                    <div className="flex">
                        <div
                            id="app-content-area-body"
                            className=" mt-3 flex-1">
                            <SingleAnswer
                                data={questions.data}
                                isQuestion={true}
                            />

                            <div className="answers-container mt-[60px]">
                                <h3 className="text-xl">
                                    {answers.data.length} Answers
                                </h3>

                                {answers.data.map(answer => (
                                    <SingleAnswer
                                        key={answer.id}
                                        data={answer}
                                    />
                                ))}
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
    const res = await fetch(process.env.API_BASE_URL + 'questions')
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
    // res.setHeader(
    //     'Cache-Control',
    //     'public, s-maxage=1000, stale-while-revalidate=59',
    // )

    const id = params.id

    const questions_re = await fetch(
        process.env.API_BASE_URL + 'questions/' + id,
    )
    const questions = await questions_re.json()

    const answers_res = await fetch(
        process.env.API_BASE_URL + 'answersofquestion/' + id,
    )
    const answers = await answers_res.json()

    return {
        props: {
            questions,
            answers,
        },
    }
}

export default Questions
