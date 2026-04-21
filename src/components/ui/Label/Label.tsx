import type { LabelHTMLAttributes, ReactNode } from "react";

type LabelProps = {
    children: ReactNode
    className?: string
} & LabelHTMLAttributes<HTMLLabelElement>

export default function Label({
    children,
    className = "",
    ...props
}: LabelProps) {
    return (
        <label
            className={`mb-2 block text-sm font-medium text-barber-gold ${className}`}
            {...props}
        >
            {children}
        </label>
    )
}