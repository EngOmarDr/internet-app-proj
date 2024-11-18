import React from 'react';
import CustomInput from './CustomInput'

// eslint-disable-next-line react/display-name, react/prop-types
const CustomField = React.forwardRef(({ name, type, placeholder, children,...props }, ref) => {
    return (
        <div>
            <label className="text-gray-800 text-sm mb-2 block">{placeholder}</label>
            <div className="relative flex items-center">
                <CustomInput
                    placeholder={placeholder}
                    name={name}
                    type={type}
                    ref={ref}
                    {...props}
                />
                {children}
            </div>
        </div>
    );
});

export default CustomField