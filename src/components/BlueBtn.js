const BlueBtn = ({ url, label }) => {
    return (
        <a
            href={url}
            className="rounded-[5px] bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-700">
            {label}
        </a>
    )
}

export default BlueBtn
