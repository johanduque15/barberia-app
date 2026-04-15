import Container from "../../ui/Container/Container";

export default function Footer(){
    return(
        <footer className="border-t border-barber-gray bg-barber-black py-10">
            <Container>
                    <div className="grid gap-8 md:grid-cols-3">
                        <div>
                            <h2 className="text-xl font-bold text-barber-gold">
                                Duque´s Barber Shop
                            </h2>

                            <p className="mt-3 text-sm leading-relaxed text-barber-gray">
                                Estilo clasico para el hombre moderno. Reserva tu cita online.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-barber-gold">
                                Horario
                            </h3>

                            <p className="mt-3 text-sm text-barber-gray">
                                Lunes a Viernes: de 10:00 a 20:00
                            </p>
                            
                            <p className="mt-1 text-sm text-barber-gray">
                                Sabado: de 10:00 a 14:00
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-barber-gold">
                                Contacto
                            </h3>

                            <p className="mt-3 text-sm text-barber-gray">
                                Avenida de las fantacias 24
                            </p>
                            <p className="mt-1 text-sm text-barber-gray">
                                Madrid, España
                            </p>
                            <p className="mt-1 text-sm text-barber-gray">
                                info@duquebarbershop.com
                            </p>
                        </div>
                    </div>
                    
                    <div className="mt-10 border-t border-barber-gray pt-6 text-center text-xs text-barber-gray">
                        © 2026 DuqueBarberShop. Todos los derechos reservados.
                    </div>
            </Container>
        </footer>
    )
}