import nFormatter from '@/Helpers/numbers'
import { data } from 'autoprefixer'
import Link from 'next/link'
import dayjs from 'dayjs'
import AuthorMiniDisplay from './AuthorMiniDisplay'
import ShareAnswer from '../Layouts/ShareAnswer'
import VotesActionBtn from './VotesActionBtn'

const SingleAnswer = ({ data, isQuestion }) => {
    return (
        <div className="border-b py-5">
            <div className="wrapper flex">
                <VotesActionBtn votes={data.votes} />

                <div className="content-area ml-6 flex-1">
                    <div className="mb-3">{data.content}</div>

                    <div className="share-author mt-5 mb-4 flex justify-between text-xs text-gray-500">
                        <ShareAnswer />
                        <AuthorMiniDisplay
                            isQuestion={isQuestion}
                            data={data}
                        />
                    </div>

                    <div className="comments-wrapper text-xs"></div>
                </div>
            </div>
        </div>
    )
}

export default SingleAnswer
