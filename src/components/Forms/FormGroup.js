import { Children, cloneElement } from 'react'

const FormGroup = ({ title, description, children, id }) => {
    return (
        <div className="form-group mb-6">
            <label htmlFor={id}>
                <span className="font-medium text-sm text-gray-700">
                    {title}
                </span>
                {description && <p className="mt-1 mb-2">{description}</p>}
            </label>

            {children}
        </div>
    )
}

export default FormGroup
