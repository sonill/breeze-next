import Link from 'next/link'

const Tags = ({ tags }) => {
    if (!tags) return <></>
    return (
        <ul className="text-[12px] flex mt-3">
            {tags.map(item => (
                <li
                    key={item.slug}
                    className="bg-blue-100 rounded-sm mr-2 px-3 py-[3px]">
                    <Link href={`/questions/taged/${item.slug}`}>
                        <a>{item.name}</a>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default Tags
