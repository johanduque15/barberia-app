import Container from "../../ui/Container/Container";
import Section from "../../ui/Section/Section";
import Button from '../../ui/Button/Button';

export default function ReservationCTA(){
    return(
        <Section>
            <Container>
                <div className="rounded-lg border border-barber-gold bg-zinc-900 px-6 py-12 text-center md:px-12">
                    <h2 className="text-3xl font-bold text-barber-gold md:text-4xl">
                        Reserva ahora
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-barber-gray">
                        Escoge tu servicio, selecciona a tu barbero y gestiona tu reserva de forma rapida y facil.
                    </p>

                    <div className="mt-8">
                        <Button>
                            Reservar cita
                        </Button>
                    </div>
                </div>
            </Container>
        </Section>
    )
}