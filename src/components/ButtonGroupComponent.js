const ButtonGroupComponent = ({ label, url, selected, isLastItem }) => {
    return (
        <li className="flex">
            <a
                className={`block border-r text-xs border-gray-400 px-3 py-[6px] hover:bg-gray-50 ${
                    selected ? `bg-gray-100 ` : null
                } ${isLastItem ? `border-r-0` : null}`}
                href={url}>
                {label}
            </a>
        </li>
    )
}

export default ButtonGroupComponent
