import Link from 'next/link'
import { useRouter } from 'next/router'

const LeftSidebar = () => {
    return (
        <div
            id="app-navigation-sidebar"
            className="h-[calc(100vh-46px)] w-[160px] overflow-hidden overflow-y-auto border-r  text-sm">
            <ul className="mb-[20px]">
                <li>
                    <MenuLink route="/loading" label="Home" />
                </li>
            </ul>

            <h5 className=" px-2 text-[12px] text-gray-400">PUBLIC</h5>

            <ul>
                <li className="">
                    <MenuLink route="/loading/questions" label="Questions" />
                </li>
                <li className="">
                    <MenuLink route="/tags" label="Tags" />
                </li>
                <li className="">
                    <MenuLink route="/users" label="Users" />
                </li>
            </ul>
        </div>
    )
}

const MenuLink = ({ route, label }) => {
    const router = useRouter()

    return (
        <Link href={route}>
            <a
                className={`block p-2 text-gray-500 hover:text-black ${
                    router.pathname == route ? 'bg-gray-100 font-bold ' : null
                }`}>
                {label}
            </a>
        </Link>
    )
}

export default LeftSidebar
