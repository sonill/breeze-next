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
                            <ul className="flex rounded-[3px] border border-gray-400 text-[14px]">
                                <ButtonGroupComponent
                                    label="Interesting"
                                    url="#"
                                    selected={1}
                                />
                                <ButtonGroupComponent label="Hot" url="#" />
                                <ButtonGroupComponent label="Week" url="#" />
                                <ButtonGroupComponent
                                    label="Month"
                                    url="#"
                                    isLastItem={1}
                                />
                            </ul>
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
