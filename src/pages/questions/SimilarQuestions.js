import Link from 'next/link'

const SimilarQuestions = ({ data }) => {
    return (
        <div class="similar-questions-wrapper mt-3 border rounded border-gray-300">
            <div className="title p-4 text-gray-700 bg-gray-100 text-[16px] rounded-t">
                Similar Questions
            </div>
            <div class="similar-questions-body p-4">
                <div className="flex border-b items-start">
                    <div className="bg-green-600 rounded p-2 text-center text-white mr-4">
                        2 <br />
                        answer
                    </div>
                    <div className="flex-1">
                        <h3 className="mb-1 text-[16px]">
                            <Link href={`/questions/`}>
                                <a className="text-lg text-blue-700">wuation</a>
                            </Link>
                        </h3>
                        <p>asdfasdfasdfsdfasdf</p>
                        <div className="text-right">
                            <div className="text-gray-600">
                                {/* asked on {dayjs(data.created_at).format('MMM D')} by */}
                                <a
                                    href="http://stackoverflow.test/users/17"
                                    className="text-blue-600">
                                    name
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SimilarQuestions
