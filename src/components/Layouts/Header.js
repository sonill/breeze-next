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
                        <ion-icon name="search-outline"></ion-icon>
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
