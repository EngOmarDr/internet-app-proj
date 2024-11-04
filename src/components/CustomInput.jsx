

// eslint-disable-next-line react/prop-types
export function CustomInput({ name, type, value, onChange, required=true, placeholder }) {
    return (
        <input
            className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
            placeholder={placeholder}
            name={name}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
        />
    )
}