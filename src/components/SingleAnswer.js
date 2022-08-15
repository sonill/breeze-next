import nFormatter from '@/Helpers/numbers'
import { data } from 'autoprefixer'
import Link from 'next/link'
import dayjs from 'dayjs'

const SingleAnswer = ({ data, isQuestion }) => {
    return (
        <div className="border-b py-5">
            <div className="wrapper flex">
                <div className="stats flex w-[50px] flex-col items-center">
                    <button
                        type="button"
                        className="h-[40px] text-[40px] leading-none text-gray-300">
                        <ion-icon name="caret-up-outline"></ion-icon>
                    </button>
                    <span className="text-[20px] text-gray-500">
                        {nFormatter(data.votes)}
                    </span>
                    <button
                        type="button"
                        className="h-[40px] text-[40px] leading-none text-gray-300">
                        <ion-icon name="caret-down-outline"></ion-icon>
                    </button>

                    <button
                        id="removeAsSelected"
                        type="button"
                        className="h-[40px] text-[40px] leading-none text-gray-300"
                        title="Mark answer as selected">
                        <svg
                            width="32"
                            height="23"
                            viewBox="0 0 32 23"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="fill-gray-300 w-[20px]">
                            <path d="M31.0627 5.40005L14.1814 22.0737C12.9313 23.3088 10.9034 23.3088 9.65217 22.0737L0.937917 13.4654C-0.312639 12.2304 -0.312639 10.2271 0.937917 8.99189C2.18871 7.75639 4.21638 7.75639 5.46662 8.99142L11.9174 15.3634L26.5333 0.92627C27.784 -0.309225 29.8119 -0.308289 31.0622 0.92627C32.3125 2.16153 32.3125 4.16409 31.0627 5.40005Z" />
                        </svg>
                    </button>
                </div>

                <div className="content-area ml-6 flex-1">
                    <div className="mb-3">{data.content}</div>

                    <div className="share-author mt-5 mb-4 flex justify-between text-xs text-gray-500">
                        <ul className="flex flex-1">
                            <li className="mr-4">
                                <Link href="/">
                                    <a>Share</a>
                                </Link>
                            </li>
                            <li className="mr-4">
                                <Link href="/">
                                    <a>Edit</a>
                                </Link>
                            </li>
                            <li className="mr-4">
                                <Link href="/">
                                    <a>Follow</a>
                                </Link>
                            </li>
                            <li className="mr-4">
                                <Link href="/">
                                    <a>Flag</a>
                                </Link>
                            </li>
                        </ul>
                        <div className="author-details w-[200px] rounded-[3px] bg-blue-50 p-2">
                            <div className="mb-1">
                                {isQuestion ? 'asked ' : 'answered '}
                                {dayjs(data.created_at).format(
                                    'MMM D, YYYY [at] HH:s',
                                )}
                            </div>
                            <Link href="/">
                                <a className="text-blue-600">
                                    {data.user.name}
                                </a>
                            </Link>
                            <ul className="flex mt-1">
                                <li className="mr-3 text-gray-700">
                                    <strong>
                                        {nFormatter(data.user.reputation_score)}
                                    </strong>
                                </li>

                                {data.user.badges.gold && (
                                    <li>
                                        <span className="mr-1 inline-block h-[7px] w-[7px] rounded-[50%] bg-orange-500"></span>
                                        {data.user.badges.gold}
                                    </li>
                                )}

                                {data.user.badges.silver && (
                                    <li className="ml-2">
                                        <span className="mr-1 inline-block h-[7px] w-[7px] rounded-[50%] bg-gray-400"></span>
                                        {data.user.badges.silver}
                                    </li>
                                )}

                                {data.user.badges.bronze && (
                                    <li className="ml-2">
                                        <span className="mr-1 inline-block h-[7px] w-[7px] rounded-[50%] bg-yellow-700"></span>
                                        {data.user.badges.bronze}
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div className="comments-wrapper text-xs"></div>
                </div>
            </div>
        </div>
    )
}

export default SingleAnswer
