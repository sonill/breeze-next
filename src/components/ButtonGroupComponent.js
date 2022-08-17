import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const ButtonGroupComponent = ({ tabs, defaultTab, updateQuestions }) => {
    const { pathname, query } = useRouter()
    const totalItems = tabs.length

    const [selTab, setSelTab] = useState(
        query.tab !== undefined ? query.tab : defaultTab,
    )

    console.log('selTab', selTab, query.tab, query.tab == undefined)

    const handleTabClick = (e, route) => {
        // e.preventDefault()

        const curTab = route.replace('/?tab=', '')

        // udpate local state.
        setSelTab(curTab)

        // fetch new data for currently selected tab.
        updateQuestions(curTab)
    }

    // const selTab = query.tab !== undefined ? query.tab : defaultTab

    const selectedCss = curRoute => {
        return curRoute.replace('/?tab=', '') == selTab ? `bg-gray-200 ` : null
    }

    return (
        <ul className="flex rounded-[3px] border border-gray-400 text-[14px]">
            {tabs.map((item, index) => (
                <li key={item.label} className="flex">
                    <Link href={item.route}>
                        <a
                            onClick={e => handleTabClick(e, item.route)}
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
