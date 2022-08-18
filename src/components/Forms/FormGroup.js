import { Children, cloneElement } from 'react'

const FormGroup = ({ title, description, children, id }) => {
    return (
        <div className="form-group mb-6">
            <label for={id}>
                <span className="font-medium text-sm text-gray-700">
                    {title}
                </span>
                {description && <p className="mt-1 mb-2">{description}</p>}
            </label>

            {Children.map(children, child => {
                return cloneElement(child, {
                    id: id,
                    className:
                        'w-[100%] text-xs py-2 border-gray-400 rounded focus:outline outline-offset-0 focus:border-0 focus:outline-4 focus:outline-blue-500/20',
                })
            })}
        </div>
    )
}

export default FormGroup
