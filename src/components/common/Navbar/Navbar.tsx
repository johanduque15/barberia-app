import { Link, NavLink } from "react-router";
import Container from "../../ui/Container/Container"
import { useState } from "react"
import useAuth from "../../../hooks/useAuth";
import logoBarberia from "../../../assets/Duques barber shop.png";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth()

    const navLinkClass = ({ isActive }: { isActive: boolean }) => isActive
        ? "text-barber-gold" : "text-barber-gray transition hover:text-barber-gold";

    return (
        <header className="border-b border-barber-gray">
            <Container>
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="text-xl font-bold text-barber-gold">
                        <img 
                            src={logoBarberia} 
                            alt="Duque's Barber Shop" 
                            className="h-12 w-auto object-contain"
                            />
                    </Link>

                    <nav className="hidden md:flex gap-8 text-sm font-medium">
                        {/* <NavLink to="/servicios" className={navLinkClass}>
                            Servicios
                        </NavLink> */}

                        <NavLink to="/reservar" className={navLinkClass}>
                            Reservar
                        </NavLink>

                        {isAuthenticated && (
                            <NavLink to="/mis-citas" className={navLinkClass}>
                                Mis citas
                            </NavLink>
                        )}

                        {isAuthenticated ? (
                            <button
                                type="button"
                                onClick={logout}
                                className="text-barber-gray transition hover:text-barber-gold"
                            >
                                Cerrar sesión
                            </button>
                        ) : (
                            <NavLink to="/login" className={navLinkClass}>
                                Login
                            </NavLink>
                        )}
                    </nav>

                    <button
                        className="md:hidden text-barber-gold"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        ☰
                    </button>
                </div>

                {menuOpen && (
                    <nav className="flex flex-col gap-4 py-4 md:hidden text-sm font-medium">
                        <NavLink
                            to="/servicios"
                            className={navLinkClass}
                            onClick={() => setMenuOpen(false)}
                        >
                            Servicios
                        </NavLink>

                        <NavLink
                            to="/reservar"
                            className={navLinkClass}
                            onClick={() => setMenuOpen(false)}
                        >
                            Reservar
                        </NavLink>

                        {isAuthenticated && (
                            <NavLink 
                                to="/mis-citas" 
                                className={navLinkClass}
                                onClick={() => setMenuOpen(false)}
                                >
                                Mis citas
                            </NavLink>
                        )}

                        {isAuthenticated ? (
                            <button
                                type="button"
                                onClick={() => {
                                    logout()
                                    setMenuOpen(false)
                                }}
                                className="text-left text-barber-gray transition hover:text-barber-gold"
                            >
                                Cerrar sesión
                            </button>
                        ) : (
                            <NavLink
                                to="/login"
                                className={navLinkClass}
                                onClick={() => setMenuOpen(false)}
                            >
                                Login
                            </NavLink>
                        )}
                    </nav>
                )}
            </Container>

        </header>
    )
}