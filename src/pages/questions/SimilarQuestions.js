import dayjs from 'dayjs'
import Link from 'next/link'

const SimilarQuestions = ({ data, isLoading }) => {
    const limitWords = (text = '', limit = 0) => {
        if (limit < 1) return ''
        let allWords = text.split(' ')
        return allWords.slice(0, limit).join(' ')
    }

    if (!data?.data.length && !isLoading) return <></>

    return (
        <div className="similar-questions-wrapper mt-3 border rounded border-gray-300 ">
            <div className="title p-4 text-gray-700 bg-gray-100 text-[16px] rounded-t">
                Similar Questions
            </div>
            <div className="similar-questions-body p-4 max-h-[250px] overflow-scroll overflow-x-hidden ">
                {!data && isLoading ? (
                    <div className="flex items-center min-h-[100px] justify-center">
                        <div>Loading</div>
                    </div>
                ) : null}
                {data?.data.map(item => (
                    <div
                        key={item.id}
                        className="flex border-b mb-4 last:border-0 last:mb-0 items-start">
                        <div className="bg-[#5eba7d] rounded p-2 text-center text-white mr-4">
                            {item.total_answers} <br />
                            answer
                        </div>
                        <div className="flex-1">
                            <h3 className="mb-1 text-[16px]">
                                <Link href={`/questions/${item.id}`}>
                                    <a
                                        target="_blank"
                                        className="text-[16px] text-blue-700 leading-[1.3]">
                                        {item.question}
                                    </a>
                                </Link>
                            </h3>
                            <p>{limitWords(item.content, 10)}</p>
                            <div className="text-right mb-4">
                                <div className="text-gray-600">
                                    asked on{' '}
                                    {dayjs(item.created_at).format('MMM D')} by{' '}
                                    <a
                                        href={`http://stackoverflow.test/users/${item.user.id}`}
                                        className="text-blue-600">
                                        {item.user.name}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SimilarQuestions
