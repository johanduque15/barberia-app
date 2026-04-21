
import type { SelectHTMLAttributes } from "react"

type SelectOption = {
    value: string
    label: string
}
type SelectProps = {
    options: SelectOption[]
    placeholder?: string
    className?: string
} & SelectHTMLAttributes<HTMLSelectElement>

export default function Select({
    options,
    placeholder,
    className = "",
    ...props
}: SelectProps) {
    return (
        <select
            className={`w-full rounded-md border border-barber-gray bg-zinc-950 px-4 py-3 text-sm text-white
                transition focus:border-barber-gold focus:outline-none ${className}`
            }{...props}
        >
            {placeholder && (
                <option value="" disabled>
                    {placeholder}
                </option>
            )}
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}