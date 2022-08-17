import Link from 'next/link'

const Header = () => {
    return (
        <header id="main-header" className="bg-gray-50 shadow">
            <div className="container mx-auto flex max-w-7xl items-center py-[7px]">
                <Link href="/">
                    <a>
                        <img
                            src="http://stackoverflow.test/images/logo.svg"
                            className="max-w-full"
                        />
                    </a>
                </Link>

                <div className="search-box mx-8 flex flex-1 border border-gray-300">
                    <input
                        type="text"
                        className="flex-1 border-0 text-sm"
                        placeholder="Search"
                    />

                    <button type="submit" name="search" className="px-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="w-5">
                            <path
                                d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                                fill="none"
                                stroke="currentColor"
                                strokeMiterlimit="10"
                                strokeWidth="32"
                            />
                            <path
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeMiterlimit="10"
                                strokeWidth="32"
                                d="M338.29 338.29L448 448"
                            />
                        </svg>
                    </button>
                </div>

                <div className="user-details flex items-center">
                    <img
                        src="http://stackoverflow.test/images/user.png"
                        width="24"
                        height="24"
                        alt=""
                        className="mr-2 rounded-md border"
                    />
                    <strong className="text-xs">550</strong>
                </div>
            </div>
        </header>
    )
}

export default Header
