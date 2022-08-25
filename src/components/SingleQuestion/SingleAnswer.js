import AuthorMiniDisplay from './AuthorMiniDisplay'
import ShareAnswer from '../Layouts/ShareAnswer'
import VotesActionBtn from './VotesActionBtn'
import Tags from './Tags'
import parse from 'html-react-parser'

const SingleAnswer = ({
    data,
    isQuestion,
    question_id,
    setToastItems,
    selectedAnswer,
    setSelectedAnswer,
}) => {
    return (
        <div className="border-b py-5">
            <div className="wrapper flex">
                <VotesActionBtn
                    votes={data.votes}
                    isQuestion={isQuestion}
                    question_id={question_id}
                    answer_id={data.id}
                    setToastItems={setToastItems}
                    setSelectedAnswer={setSelectedAnswer}
                    selectedAnswer={selectedAnswer}
                />

                <div className="content-area ml-6 flex-1">
                    <div className="mb-3">
                        {parse(data.content)}
                        <Tags tags={data.tags} />
                    </div>

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
