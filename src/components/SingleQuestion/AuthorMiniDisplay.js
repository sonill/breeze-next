import nFormatter from '@/Helpers/numbers'
import dayjs from 'dayjs'
import Link from 'next/link'

const AuthorMiniDisplay = ({ isQuestion, data }) => {
    const user = data.user

    if (!user) return <></>

    return (
        <div className="author-details w-[200px] rounded-[3px] bg-blue-50 p-2">
            <div className="mb-1">
                {isQuestion ? 'asked ' : 'answered '}
                {dayjs(data.created_at).format('MMM D, YYYY [at] HH:s')}
            </div>
            <Link href="/">
                <a className="text-blue-600">{user.name}</a>
            </Link>
            <ul className="flex mt-1">
                <li className="mr-3 text-gray-700">
                    <strong>{nFormatter(user.reputation_score)}</strong>
                </li>

                {user.badges.gold && (
                    <li>
                        <span className="mr-1 inline-block h-[7px] w-[7px] rounded-[50%] bg-orange-500"></span>
                        {user.badges.gold}
                    </li>
                )}

                {user.badges.silver && (
                    <li className="ml-2">
                        <span className="mr-1 inline-block h-[7px] w-[7px] rounded-[50%] bg-gray-400"></span>
                        {user.badges.silver}
                    </li>
                )}

                {user.badges.bronze && (
                    <li className="ml-2">
                        <span className="mr-1 inline-block h-[7px] w-[7px] rounded-[50%] bg-yellow-700"></span>
                        {user.badges.bronze}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default AuthorMiniDisplay
