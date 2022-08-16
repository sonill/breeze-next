import Link from 'next/link'

const ShareAnswer = () => {
    return (
        <ul className="flex flex-1">
            <li className="mr-4">
                <Link href="/">
                    <a>Share</a>
                </Link>
            </li>
            <li className="mr-4">
                <Link href="/">
                    <a>Edit</a>
                </Link>
            </li>
            <li className="mr-4">
                <Link href="/">
                    <a>Follow</a>
                </Link>
            </li>
            <li className="mr-4">
                <Link href="/">
                    <a>Flag</a>
                </Link>
            </li>
        </ul>
    )
}

export default ShareAnswer
