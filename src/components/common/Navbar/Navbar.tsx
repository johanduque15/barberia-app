import Container from "../../ui/Container/Container"
import { useState } from "react"

export default function Navbar(){
    const [menuOpen, setMenuOpen] = useState(false);
    return(
        <header className="border-b border-barber-gray">
            <Container>
                <div className="flex items-center justify-between h-16">
                    <h1 className="text-xl text-bold text-barber-gold">
                        Barberia
                    </h1>

                    <nav className="hidden md:flex gap-8 text-sm font-medium">
                        <a href="#">Servicios</a>
                        <a href="#">Barberos</a>
                        <a href="#">Reservas</a>
                    </nav>

                    <button    
                        className="md:hidden text-barber-gold"
                        onClick={()=> setMenuOpen(!menuOpen)}
                    >
                        ☰
                    </button>
                </div>

                {menuOpen && (
                    <nav className="flex flex-col gap-4 py-4 md:hidden text-sm font-medium">
                        <a href="#">Servicios</a>
                        <a href="#">Barberos</a>
                        <a href="#">Reservas</a>
                    </nav>
                )}
            </Container>

        </header>
    )
}