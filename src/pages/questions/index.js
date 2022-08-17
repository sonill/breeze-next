import AppLayout from '@/components/Layouts/AppLayout'
import RightSidebar from '@/components/Layouts/RightSidebar'
import Question from '../../components/Questions/Question'
import ButtonGroupComponent from '@/components/ButtonGroupComponent'
import BlueBtn from '@/components/BlueBtn'

const Home = ({ posts }) => {
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
                            <BlueBtn label="Add Question" url="#" />
                        </div>

                        <div className="mt-[15px] flex items-center">
                            <div className="flex-1 ml-5">
                                {posts.meta.total} questions
                            </div>
                            {/* <ButtonGroupComponent
                                tabs={[
                                    {
                                        label: 'Newest',
                                        route: '/questions',
                                    },
                                    {
                                        label: 'Active',
                                        route: '/questions?tab=active',
                                    },
                                    {
                                        label: 'Bountied',
                                        route: '/questions?tab=bountied',
                                    },
                                    {
                                        label: 'Unanswered',
                                        route: '/questions?tab=unanswered',
                                    },
                                ]} */}
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
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + 'questions')
    const posts = await res.json()

    return {
        props: {
            posts,
        },
    }
}

export default Home
