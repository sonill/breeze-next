import Link from 'next/link'
import dayjs from 'dayjs'

const Question = ({ data }) => {
    return (
        <>
            <div className="single-question flex border-t p-4 text-[12px]">
                <div className="flex w-[120px] justify-end">
                    <ul className="stats text-right">
                        <li className="mb-2">{data.votes} votes</li>
                        <li
                            className={`mb-2 block rounded border py-1 px-2 ${
                                data.selected_answer
                                    ? 'text-white bg-green-700'
                                    : null
                            } `}>
                            {data.total_comments} answers
                        </li>
                        <li className="mb-2">{data.views} views</li>
                    </ul>
                </div>

                <div className="question ml-7 flex-1">
                    <h2 className="mb-3">
                        <Link href={`/loading/questions/${data.id}`}>
                            <a className="text-lg text-blue-700">
                                {data.question}
                            </a>
                        </Link>
                    </h2>
                    <div className="flex justify-between">
                        <div className="text-gray-600">
                            <a
                                href="http://stackoverflow.test/users/17"
                                className="text-blue-600">
                                {data.user.name}
                            </a>{' '}
                            asked on {dayjs(data.created_at).format('MMM D')}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Question
