import { useEffect } from 'react'

const Toast = ({ items, setToastItems }) => {
    const getCssNames = status => {
        if (status == 'danger') return 'bg-red-100  border-red-400 text-red-700'
        if (status == 'warning')
            return 'bg-orange-100  border-orange-400 text-orange-700'
        if (status == 'success')
            return 'bg-green-100  border-green-400 text-green-700'
    }

    const getButtonCssNames = status => {
        if (status == 'danger') return 'text-red-700'
        if (status == 'warning') return 'text-orange-700'
        if (status == 'success') return 'text-green-700'
    }

    let ToastItems = items

    const deleteToastItem = itemIndex => {
        setToastItems(ToastItems.filter((item, index) => index != itemIndex))
    }

    useEffect(() => {
        return
        const interval = setInterval(() => {
            // if (ToastItems.length < 1) {
            //     clearInterval(interval)
            // }

            // if (ToastItems.length > 1) {
            //     ToastItems = ToastItems.slice(1)
            // } else {
            //     ToastItems = []
            // }

            // remove first element from arary.
            setToastItems(ToastItems)
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    if (items?.length < 1) return <></>

    return (
        <div className={`fixed bottom-3 left-0 right-3`} role="alert">
            <div className="flex items-end flex-col justify-end">
                {items?.length > 0 &&
                    items.map((item, index) => (
                        <div
                            key={index}
                            className={
                                getCssNames(item.status) +
                                ' border px-4 py-3 my-1 rounded w-[400px] text-[14px] relative'
                            }>
                            {item.message}
                            <button
                                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                                onClick={() => deleteToastItem(index)}>
                                <svg
                                    className={
                                        getButtonCssNames(item.status) +
                                        ' fill-current h-6 w-6 '
                                    }
                                    role="button"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20">
                                    <title>Close</title>
                                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                                </svg>
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Toast
