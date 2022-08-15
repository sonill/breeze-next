import AppLayout from '@/components/Layouts/AppLayout'
import RightSidebar from '@/components/Layouts/RightSidebar'
import SingleAnswer from '@/components/SingleAnswer'
import { data } from 'autoprefixer'
import { useRouter } from 'next/router'

const Questions = ({ questions, answers }) => {
    return (
        <AppLayout pageTitle="Home Page">
            <>
                <div className="pl-5 pt-5">
                    <div className="flex items-start justify-between border-b pb-4 mb-4">
                        <div>
                            <h3 className="mb-3 text-[25px] leading-[1.3]">
                                {questions.data.question}
                            </h3>
                            <ul className="flex text-[13px] text-gray-500">
                                <li className="mr-6">Asked 2 days ago</li>
                                <li className="mr-6">Viewed 1 times</li>
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
                                <h3 className="text-xl">15 Answers</h3>

                                {answers.data.map(answer => (
                                    <SingleAnswer data={answer} />
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

export async function getServerSideProps(context) {
    const id = context.params.id

    const questions_re = await fetch(
        process.env.API_BASE_URL + 'questions/' + id,
    )
    const questions = await questions_re.json()

    const answers_res = await fetch(
        process.env.API_BASE_URL + 'answersofquestion/' + id,
    )
    const answers = await answers_res.json()

    console.log(questions)
    return {
        props: {
            questions,
            answers,
        },
    }
}

export default Questions
