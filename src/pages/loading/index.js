import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Questions = () => {
    const router = useRouter()

    const { id } = router.query

    useEffect(() => {
        router.replace(`/`)
    })

    return (
        <>
            <div
                id="app-body"
                className="container mx-auto flex max-w-7xl mt-4">
                <div id="app-navigation-sidebar" className="w-[160px] "></div>

                <main id="app-content-area" className="flex-1">
                    <div className="flex">
                        <div className="left-content flex-1">
                            <div className="flex-1 pb-4">
                                <div className="flex items-start justify-between border-b pb-4 mb-4">
                                    <div className="flex-1">
                                        <div>
                                            <div className="mb-1 bg-gray-300 h-4 block w- rounded animate-pulse flex-1"></div>
                                            <div className="mb-3 bg-gray-300 h-4 block w- rounded animate-pulse flex-1"></div>
                                        </div>
                                        <ul className="flex ">
                                            <li className="mr-6 bg-gray-100 block w-[100px] h-[15px] rounded animate-pulse "></li>
                                            <li className="mr-6 bg-gray-100 block w-[100px] h-[15px] rounded animate-pulse "></li>
                                        </ul>
                                    </div>
                                    <div className="ml-5 min-w-[150px] justify-end bg-blue-200 h-10 block w- rounded animate-pulse"></div>
                                </div>
                                <div className="mt-[15px] flex items-center">
                                    <div className="flex-1 ml-5"></div>
                                    <ul className="flex rounded-[3px] border border-gray-400 text-[14px]">
                                        <li className="flex">
                                            <a className="block border-r text-xs border-gray-400 px-3 py-[6px] hover:bg-gray-100 null null">
                                                Newest
                                            </a>
                                        </li>
                                        <li className="flex">
                                            <a className="block border-r text-xs border-gray-400 px-3 py-[6px] hover:bg-gray-100 bg-gray-200 null">
                                                Active
                                            </a>
                                        </li>
                                        <li className="flex">
                                            <a className="block border-r text-xs border-gray-400 px-3 py-[6px] hover:bg-gray-100 null null">
                                                Bountied
                                            </a>
                                        </li>
                                        <li className="flex">
                                            <a className="block border-r text-xs border-gray-400 px-3 py-[6px] hover:bg-gray-100 null null">
                                                Unanswered
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="questions-list mb-6">
                                <LoadingBox />
                                <LoadingBox />
                                <LoadingBox />
                            </div>
                        </div>
                        <div className=" w-[300px]  ml-[25px]"></div>
                    </div>
                </main>
            </div>
        </>
    )
}

const LoadingBox = () => {
    return (
        <div className="single-question flex border-t p-4 text-[12px]">
            <div className="flex w-[120px] justify-end">
                <ul className="w-[90px]">
                    <li className="mb-2 block rounded animate-pulse bg-gray-100 h-2"></li>
                    <li className="mb-2 block rounded animate-pulse bg-gray-100 h-2"></li>
                    <li className="mb-2 block rounded animate-pulse bg-gray-100 h-2"></li>
                </ul>
            </div>
            <div className="question ml-7 flex-1">
                <div className="mb-1 bg-blue-100 h-[12px] animate-pulse rounded"></div>
                <div className="mb-3 bg-blue-100 h-[12px] animate-pulse rounded"></div>
                <div className="flex ">
                    <div className=" bg-blue-100 block h-[10px] w-[75px] animate-pulse rounded mr-2"></div>
                    <div className=" bg-gray-100 block h-[10px] w-[75px] animate-pulse rounded"></div>
                </div>
            </div>
        </div>
    )
}
export default Questions
