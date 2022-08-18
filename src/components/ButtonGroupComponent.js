import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const ButtonGroupComponent = ({ tabs, defaultTab, updateQuestions }) => {
    const { query } = useRouter()
    const totalItems = tabs.length
    const [selTab, setSelTab] = useState(defaultTab)

    useEffect(() => {
        if (query.tab !== undefined && selTab != query.tab) {
            setSelTab(query.tab)
        }
    }, [query.tab])

    const extractTabName = route => {
        if (route.indexOf('/questions/?tab=') >= 0) {
            return route.replace('/questions/?tab=', '')
        } else if (route.indexOf('/?tab=') >= 0) {
            return route.replace('/?tab=', '')
        } else {
            return route.replace('?tab=', '')
        }
    }

    const handleTabClick = route => {
        const curTab = extractTabName(route)

        // update local state.
        setSelTab(curTab)

        // fetch new data for currently selected tab.
        updateQuestions(curTab)
    }

    const selectedCss = curRoute => {
        return extractTabName(curRoute) == selTab ? `bg-gray-200 ` : null
    }

    return (
        <ul className="flex rounded-[3px] border border-gray-400 text-[14px]">
            {tabs.map((item, index) => (
                <li key={item.label} className="flex">
                    <Link href={item.route}>
                        <a
                            onClick={e => handleTabClick(item.route)}
                            className={`block border-r text-xs border-gray-400 px-3 py-[6px] hover:bg-gray-100 ${selectedCss(
                                item.route,
                            )} ${
                                index >= totalItems - 1 ? `border-r-0 ` : null
                            }`}>
                            {item.label}
                        </a>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default ButtonGroupComponent
