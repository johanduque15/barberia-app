
type ButtonProps = {
    children: React.ReactNode;
    variant?: "primary" | "secondary"
}

export default function Button({children,variant = "primary"}: ButtonProps){

    const baseStyles = "inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-md transition"
    
    const variants = {
        primary: "bg-barber-gold text-black opaccity-90",
        secondary: "border border-barber-gold text-barber-gold hover:bg-barber-gold hover:text-black"
    }


    return (
        <button className={`${baseStyles} ${variants[variant]}`}>
            {children}
        </button>
    )
}

