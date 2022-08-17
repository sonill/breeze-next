import { useAuth } from '@/hooks/auth'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const ref = useRef()

    const { user, logout } = useAuth({ middlewares: 'guest' })

    const handleLogout = () => {
        if (user) {
            logout()
        }
    }

    useEffect(() => {
        // show hide user menu modal
        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', checkIfClickedOutside)

        return () => {
            // Cleanup the event listener
            document.removeEventListener('mousedown', checkIfClickedOutside)
        }
    }, [isMenuOpen])

    return (
        <header id="main-header" className="bg-gray-50 shadow">
            <div className="container mx-auto flex max-w-7xl items-center py-[7px]">
                <Link href="/">
                    <a>
                        <img
                            src="http://stackoverflow.test/images/logo.svg"
                            className="h-[30px]"
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

                <div ref={ref}>
                    <div className="user-details ">
                        {user ? (
                            <button
                                type="button"
                                className="flex items-center text-xs"
                                onClick={() =>
                                    setIsMenuOpen(oldState => !oldState)
                                }>
                                <img
                                    src="http://stackoverflow.test/images/user.png"
                                    width="24"
                                    height="24"
                                    alt=""
                                    className="mr-2 rounded-md border"
                                />
                                <strong className="">
                                    {user.data.reputation_score}
                                </strong>

                                <div>
                                    <span className="ml-3 mr-1 inline-block h-[7px] w-[7px] rounded-[50%] bg-orange-500"></span>
                                    {user.data.badges.gold}
                                </div>
                                <div>
                                    <span className="ml-3 mr-1 inline-block h-[7px] w-[7px] rounded-[50%] bg-gray-400"></span>
                                    {user.data.badges.silver}
                                </div>
                                <div>
                                    <span className="ml-3 mr-1 inline-block h-[7px] w-[7px] rounded-[50%] bg-yellow-700"></span>
                                    {user.data.badges.bronze}
                                </div>
                            </button>
                        ) : (
                            <>
                                <Link href="/login">
                                    <a className="text-xs bg-blue-200 border border-blue-200 font-bold text-blue-700  rounded px-3 py-2 mr-1">
                                        Log In
                                    </a>
                                </Link>
                                <Link href="/register">
                                    <a className="text-xs bg-blue-500 border border-blue-600 text-white rounded px-3 py-2 mr-1 font-bold">
                                        Register
                                    </a>
                                </Link>
                            </>
                        )}
                    </div>
                    {isMenuOpen && user && (
                        <div className="absolute  w-[190px] top-14 right-1 text-sm text-white rounded bg-gray-700 divide-gray-600">
                            <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                                <div className="capitalize font-medium">
                                    {user ? user.data.name : 'Guest'}
                                </div>
                                <div className="font-medium truncate">
                                    {user?.data.email}
                                </div>
                            </div>
                            {user && (
                                <ul
                                    className="py-1 text-sm border-t text-gray-200"
                                    aria-labelledby="dropdownUserAvatarButton">
                                    <li>
                                        <Link href="/">
                                            <a className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                Profile
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            )}
                            <div className="py-1 border-t">
                                <a
                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                                    onClick={handleLogout}>
                                    {user ? 'Sign out' : 'Sign in'}
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
