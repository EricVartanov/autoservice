"use client";

const VIN_MAX_LENGTH = 24;

export function sanitizeVin(raw) {
    return raw.replace(/[^A-Za-z0-9-]/g, "").toUpperCase().slice(0, VIN_MAX_LENGTH);
}

export default function VinInput({
    value,
    onChange,
    className = "",
    placeholder,
    maxLength = VIN_MAX_LENGTH,
    ...props
}) {
    const handleChange = (e) => {
        onChange(sanitizeVin(e.target.value).slice(0, maxLength));
    };

    return (
        <input
            type="text"
            inputMode="text"
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck={false}
            autoComplete="off"
            maxLength={maxLength}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={className}
            {...props}
        />
    );
}
