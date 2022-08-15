import Link from 'next/link'

const LeftSidebar = ({ user }) => {
    return (
        <div
            id="app-navigation-sidebar"
            className="h-[calc(100vh-46px)] w-[160px] overflow-hidden overflow-y-auto border-r mt-5 text-sm">
            <ul className="mb-[20px]">
                <li>
                    <Link href="/">
                        <a className="block border-r-[3px] border-orange-600 bg-gray-100 p-2 font-bold">
                            Home
                        </a>
                    </Link>
                </li>
            </ul>

            <h5 className="mb-[7px] px-2 text-[12px] text-gray-400">PUBLIC</h5>

            <ul>
                <li className="">
                    <Link href="/questions">
                        <a className="block p-2 text-gray-500 hover:text-black">
                            Questions
                        </a>
                    </Link>
                </li>
                <li className="">
                    <Link href="/">
                        <a className="block p-2 text-gray-500 hover:text-black">
                            Tags
                        </a>
                    </Link>
                </li>
                <li className="">
                    <Link href="/">
                        <a className="block p-2 text-gray-500 hover:text-black">
                            Users
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default LeftSidebar
