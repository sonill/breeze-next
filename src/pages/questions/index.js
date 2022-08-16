import AppLayout from '@/components/Layouts/AppLayout'
import RightSidebar from '@/components/Layouts/RightSidebar'
import Question from '../../components/Questions/Question'
import ButtonGroupComponent from '@/components/ButtonGroupComponent'
import BlueBtn from '@/components/BlueBtn'

const Home = ({ posts }) => {
    return (
        <AppLayout pageTitle="Home Page">
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
                            {/* <ul className="flex rounded-[3px] border border-gray-400 text-[14px]"> */}
                            <ButtonGroupComponent
                                label="Newest"
                                url="#"
                                tabs={[
                                    {
                                        label: 'Newest',
                                        route: '/questions?tab=newest',
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
                                ]}
                            />
                            {/* <ButtonGroupComponent
                                    label="Active"
                                    url="#"
                                    selected={1}
                                />
                                <ButtonGroupComponent
                                    label="Bountied"
                                    url="#"
                                />
                                <ButtonGroupComponent
                                    label="Unanswered"
                                    url="#"
                                />
                                <ButtonGroupComponent
                                    label="Month"
                                    url="#"
                                    isLastItem={1}
                                /> */}
                            {/* </ul> */}
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
