import Link from 'next/link'
import { useRouter } from 'next/router'

const ButtonGroupComponent = ({ label, url, selected, isLastItem, tabs }) => {
    const { pathname, query } = useRouter()
    const totalItems = tabs.length

    const selTab = query.tab !== undefined ? query.tab : 'active'

    const selectedCss = curRoute => {
        console.log(pathname + '?tab=' + query.tab, curRoute)
        return curRoute === pathname + '?tab=' + query.tab
            ? `bg-gray-200 `
            : null
    }

    return (
        <ul className="flex rounded-[3px] border border-gray-400 text-[14px]">
            {tabs.map((item, index) => (
                <li key={item.label} className="flex">
                    <Link href={item.route}>
                        <a
                            className={`block border-r text-xs border-gray-400 px-3 py-[6px] hover:bg-gray-100 ${selectedCss(
                                item.route,
                            )} ${index >= totalItems ? `border-r-0` : null}`}>
                            {item.label}
                        </a>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default ButtonGroupComponent
/* A component that is used to create a button group. */
