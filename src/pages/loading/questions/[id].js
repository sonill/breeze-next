import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Questions = () => {
    const router = useRouter()

    const { id } = router.query

    // useEffect(() => {
    //     router.replace(`/questions/${id}`)
    // })

    return (
        <>
            <div
                id="app-body"
                className="container mx-auto flex max-w-7xl mt-4">
                <div id="app-navigation-sidebar" className="w-[160px] "></div>

                <main id="app-content-area" className="flex-1">
                    <div className="pl-5">
                        <div className="flex items-start justify-between border-b pb-4 mb-4">
                            <div className="flex-1">
                                <div className="mb-3 bg-gray-300 h-10 block w- rounded animate-pulse flex-1"></div>
                                <ul className="flex ">
                                    <li className="mr-6 bg-gray-100 block w-[100px] h-[20px] rounded animate-pulse "></li>
                                    <li className="mr-6 bg-gray-100 block w-[100px] h-[20px] rounded animate-pulse "></li>
                                </ul>
                            </div>
                            <div className="ml-5 min-w-[150px] justify-end bg-blue-200 h-10 block w- rounded animate-pulse"></div>
                        </div>
                        <div className="flex">
                            <div
                                id="app-content-area-body"
                                className="mt-3 flex-1">
                                <div className="answers-container">
                                    <LoadingBox />
                                </div>
                            </div>
                            <div className=" w-[300px] ml-[25px]"></div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

const LoadingBox = () => {
    return (
        <div className="wrapper flex">
            <div className="content-area flex-1">
                <div className="mb-3 bg-gray-100 h-10 block w- rounded animate-pulse flex-1"></div>
                <div className="share-author mt-5 mb-4 flex justify-between text-xs text-gray-300">
                    <ul className="flex flex-1">
                        <li className="mr-4">Share</li>
                        <li className="mr-4">Edit</li>
                        <li className="mr-4">Follow</li>
                        <li className="mr-4">Flag</li>
                    </ul>
                    <div className="author-details w-[200px] rounded-[3px] bg-blue-50 h-[80px] p-2"></div>
                </div>
                <div className="comments-wrapper text-xs"></div>
            </div>
        </div>
    )
}
export default Questions
