import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import AppLayout from '@/components/Layouts/AppLayout'
import RightSidebar from '@/components/Layouts/RightSidebar'
import Question from '../components/Questions/Question'
import ButtonGroupComponent from '@/components/ButtonGroupComponent'
import BlueBtn from '@/components/BlueBtn'

const Home = ({ posts }) => {
    // const { user } = useAuth({ middleware: 'guest' })

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
                        {posts.data.map(post => (
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
    const res = await fetch(process.env.API_BASE_URL + 'questions')
    const posts = await res.json()

    return {
        props: {
            posts,
        },
    }
}

export default Home
