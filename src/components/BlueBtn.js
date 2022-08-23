const BlueBtn = ({ url, label, onClick }) => {
    let props = {
        className:
            'rounded-[5px] bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-700 cursor-pointer',
        onClick: onClick,
    }

    if (url) {
        props = { ...props, href: url }
    }

    return <a {...props}>{label}</a>
}

export default BlueBtn
