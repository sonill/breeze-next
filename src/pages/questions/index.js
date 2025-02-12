import AppLayout from '@/components/Layouts/AppLayout'
import RightSidebar from '@/components/Layouts/RightSidebar'
import Question from '../../components/Questions/Question'
import ButtonGroupComponent from '@/components/ButtonGroupComponent'
import AskBtn from '@/components/AskBtn'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Home = ({ posts }) => {
    const { query } = useRouter()

    const [questions, setQuestions] = useState(posts)
    const [isLoading, setIsLoading] = useState(false)

    const defaultTab = 'active'

    const fetchUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL +
        'questions-by-tags/' +
        (query.tab == undefined ? query.tab : query.tab)

    const fetchData = async () => {
        // fetch is already initiated.
        if (isLoading) return

        setIsLoading(true)
        return await fetch(fetchUrl)
            .then(res => res.json())
            .then(result => {
                setQuestions(result)

                // fetch finished.
                setIsLoading(false)
            })
            .catch(e => console.log(e))
    }

    const updateQuestions = async curTab => {
        if (curTab === defaultTab) {
            setQuestions(posts)
        } else {
            fetchData()
        }
    }

    useEffect(() => {
        //    console.log('selTab', selTab)

        if (query.tab !== undefined && query.tab !== defaultTab) {
            fetchData()
        }
    }, [query.tab])

    return (
        <AppLayout pageTitle="All Questions Page">
            <div className="flex">
                <div className="left-content flex-1">
                    {/* Section Title */}
                    <div className="flex-1 pb-4">
                        <div className="flex justify-between align-middle items-start">
                            <h3 className="ml-5 text-[28px] flex-1">
                                All Questions{' '}
                            </h3>
                            <AskBtn />
                        </div>

                        <div className="mt-[15px] flex items-center">
                            <div className="flex-1 ml-5">
                                {posts.meta.total} questions
                            </div>
                            <ButtonGroupComponent
                                defaultTab={defaultTab}
                                updateQuestions={updateQuestions}
                                tabs={[
                                    {
                                        label: 'Newest',
                                        route: '/questions/?tab=newest',
                                    },
                                    {
                                        label: 'Active',
                                        route: '/questions/?tab=active',
                                    },
                                    {
                                        label: 'Bountied',
                                        route: '/questions/?tab=bountied',
                                    },
                                    {
                                        label: 'Unanswered',
                                        route: '/questions/?tab=unanswered',
                                    },
                                ]}
                            />
                        </div>
                    </div>

                    {/* contents */}
                    <div className="questions-list mb-6">
                        {questions.data.map(post => (
                            <Question key={post.id} data={post} />
                        ))}
                    </div>
                </div>

                <RightSidebar />
            </div>
        </AppLayout>
    )
}

export async function getStaticProps() {
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + 'questions')
    const posts = await res.json()

    return {
        props: {
            posts,
        },
    }
}

export default Home
