import { useAuth } from '@/hooks/auth'
import AppLayout from '@/components/Layouts/AppLayout'
import RightSidebar from '@/components/Layouts/RightSidebar'
import Question from '../components/Questions/Question'
import ButtonGroupComponent from '@/components/ButtonGroupComponent'
import BlueBtn from '@/components/BlueBtn'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const Home = ({ posts }) => {
    // const { user } = useAuth({ middleware: 'guest' })

    const [questions, setQuestions] = useState(posts)

    const fetchUrl = process.env.NEXT_PUBLIC_API_BASE_URL + 'questions/'

    const fetchData = async () => await fetch(fetchUrl).then(res => res.json())
    // const { data, error } = useSWR(fetchUrl, url => {
    //     fetch(url).then(res => res.json())
    // })

    const updateQuestions = async curTab => {
        // console.log('--------------------------')

        // if (curTab === 'interesting') {
        //     setQuestions(posts)
        // } else {
        //     setFetchNewData(true)
        // }

        if (curTab === 'interesting') {
            setQuestions(posts)
        } else {
            console.log('else')
            setQuestions([])
            await fetch(fetchUrl)
                .then(res => res.json())
                .then(result => {
                    console.log('fetch')
                })
                .catch(e => console.log(e))
        }
    }

    // const = datafetchData()
    // setQuestions()
    // const fetchUrl = process.env.NEXT_PUBLIC_API_BASE_URL + 'questions/'
    // const { data, error } = useSWR(fetchUrl, fetchUrl =>
    //     fetch(url).then(res => res.json()),
    // )
    // const fetchData = async () => {
    //     await fetch(fetchUrl)
    //         .then(res => res.json())
    //         .catch(e => alert(e))
    // }
    // console.log('test', fetchData())
    // console.log('curTab', curTab)
    // console.log('data', data)

    // if (error) return 'An error has occurred.'
    // if (!data) return 'Loading...'

    // useEffect(() => {
    //     // fetch api if url changes.
    //     // if (selTab == 'interesting') {
    //     //     setQuestions(posts)
    //     // } else {
    //     //     setQuestions([])
    //     // }
    // }, [selTab])

    return (
        <AppLayout pageTitle="Home Page">
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

                        <div className="mt-[15px] flex justify-end">
                            <ButtonGroupComponent
                                defaultTab="interesting"
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
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + 'questions')
    const posts = await res.json()

    return {
        props: {
            posts,
        },
        revalidate: 60,
    }
}

export default Home
