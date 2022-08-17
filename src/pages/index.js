import { useAuth } from '@/hooks/auth'
import AppLayout from '@/components/Layouts/AppLayout'
import RightSidebar from '@/components/Layouts/RightSidebar'
import Question from '../components/Questions/Question'
import ButtonGroupComponent from '@/components/ButtonGroupComponent'
import BlueBtn from '@/components/BlueBtn'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LoadingIndicator from '@/components/LoadingIndicator'

const Home = ({ posts }) => {
    // const { user } = useAuth({ middleware: 'guest' })

    const { query } = useRouter()

    const [questions, setQuestions] = useState(posts)
    const [isLoading, setIsLoading] = useState(false)

    const defaultTab = 'interesting'

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
                console.log('fetch')
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
        <AppLayout pageTitle="Home Page">
            {isLoading && <LoadingIndicator />}
            <div className="flex">
                <div className="left-content flex-1">
                    {/* Section Title */}
                    <div className="flex-1 pb-4">
                        <div className="flex justify-between align-middle items-start">
                            <h3 className="ml-5 text-[28px] flex-1">
                                Top Questions{' '}
                            </h3>
                            <BlueBtn label="Add Question" url="#" />
                        </div>

                        <div className="mt-[5px] flex justify-end">
                            <ButtonGroupComponent
                                defaultTab={defaultTab}
                                updateQuestions={updateQuestions}
                                tabs={[
                                    {
                                        label: 'Interesting',
                                        route: '/?tab=interesting',
                                    },
                                    {
                                        label: 'Bountied',
                                        route: '/?tab=bountied',
                                    },
                                    {
                                        label: 'Hot',
                                        route: '/?tab=hot',
                                    },
                                    {
                                        label: 'Week',
                                        route: '/?tab=week',
                                    },
                                    {
                                        label: 'Month',
                                        route: '/?tab=month',
                                    },
                                ]}
                            />
                        </div>
                    </div>

                    {/* contents */}
                    <div className="questions-list mb-6">
                        {questions?.data?.map(post => (
                            <Question key={post.id} data={post} />
                        ))}
                    </div>
                </div>

                <RightSidebar />
            </div>
        </AppLayout>
    )
}

export async function getStaticProps({ params }) {
    const res = await fetch(
        process.env.NEXT_PUBLIC_API_BASE_URL + 'questions-by-tags/interesting',
    )
    const posts = await res.json()

    return {
        props: {
            posts,
        },
        revalidate: 60,
    }
}

export default Home
