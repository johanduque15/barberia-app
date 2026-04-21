import type { ButtonHTMLAttributes, ReactNode } from "react"

type ButtonProps = {
    children: ReactNode
    variant?: "primary" | "secondary"
    className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({
    children,
    variant = "primary",
    className = "",
    ...props
}: ButtonProps) {
    const baseStyles =
        "inline-flex min-h-11 items-center justify-center px-6 py-3 text-sm font-semibold rounded-md transition disabled:cursor-not-allowed disabled:opacity-50"

    const variants = {
        primary: "bg-barber-gold text-black hover:opaccity-90",
        secondary: "border border-barber-gold text-barber-gold hover:bg-barber-gold hover:text-black"
    }


    return (
        <button className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

