import type { InputHTMLAttributes } from "react";

type InputProps = {
    className?: string
} & InputHTMLAttributes<HTMLInputElement>

export default function Input({
    className = "",
     ...props
    }:InputProps){
        return(
            <input 
                className={`w-full rounded-md border border-barber-gray bg-zinc-950 px-4 py-3 text-sm 
                    text-white placeholder:text-zinc-500 tramsition focus:border-barber-gold 
                    focus:outline-none ${className}`}
                    {...props}
            />
        )
    }