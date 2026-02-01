import React from 'react'

// eslint-disable-next-line react/display-name
const CustomInput = React.forwardRef(({ name, type, placeholder,...props }, ref) => {
    return (
        <input
            className="w-full text-sm text-gray-800 border border-gray-300 px-3 py-2 rounded-lg outline-blue-600"
            placeholder={placeholder}
            name={name}
            type={type}
            ref={ref}
            {...props}
        />
    )
})

export default CustomInput
