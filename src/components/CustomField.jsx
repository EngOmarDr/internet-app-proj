
import { CustomInput } from './CustomInput'

// eslint-disable-next-line react/prop-types
export function CustomField({ name, type, value, onChange, required = true, placeholder, children }) {
    return (
        <div>
            <label className="text-gray-800 text-sm mb-2 block">{placeholder}</label>
            <div className="relative flex items-center">
                <CustomInput
                    placeholder={placeholder}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    required={required}
                />
                {children}
            </div>
        </div>
    )
}