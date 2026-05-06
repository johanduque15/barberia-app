import Container from "../components/ui/Container/Container";
import Section from "../components/ui/Section/Section";
import Button from '../components/ui/Button/Button';
import useAuth from "../hooks/useAuth";

const mockAppointmens = [
    {
        id: 1,
        service: "corte clásico",
        barber: "Pedro Perez",
        date: "2026-03-15",
        time: "10:00",
        status: "Confirmada",
    },
    {
        id: 2,
        service: "Arreglo de barba",
        barber: "Andres Acosta",
        date: "2026-03-18",
        time: "17:00",
        status: "Pendiente",
    },
]

export default function MyAppointmentsPage() {
    const { user } = useAuth()

    return (
        <Section>
            <Container>
                <div className=" space-y-10">
                    <div className="space-y-4">
                        <span className="text-sm uppercase tracking-[0.2em] text-barber-gray">
                            Panel de usuario
                        </span>

                        <h1 className="text-4xl font-fond text-barber-gold md:text-5xl">
                            Mis citas
                        </h1>

                        <p className="max-w-2xl text-barber-gray">
                            Aqui podras consultar tus reservas activas,
                            reprogramarlas o cancelarlas. Sesión actual :{" "}
                            <span className="text-barber-gold"> {user?.email}</span>
                        </p>
                    </div>

                    {mockAppointmens.length === 0 ? (
                        <div className="rounded-2xl border border-barber-gray bg-zinc-900 p-8 text-center">
                            <h2 className="text-2xl font-semibold text-barber-gold">
                                No tienes citas todavia
                            </h2>

                            <p className="mt-3 text-barber-gray">
                                Aquí aparecera tu cita para que la gestiones
                            </p>

                            <div className="mt-6">
                                <Button> Reservar una cita </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {mockAppointmens.map((appointment) => (
                                <article
                                    key={appointment.id}
                                    className="rounded-2xl border-barber-gray bg-zinc-900 p-6"
                                >
                                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                                        <div className="space-y-3">
                                            <h2 className="text-2xl font-semibold text-barber-gold">
                                                {appointment.service}
                                            </h2>
                                            <div className="space-y-1 text-sm text-barber-gray">
                                                <p>
                                                    <span className="text-barber-gold">Barbero:</span>{" "}
                                                    {appointment.barber}
                                                </p>
                                                <p>
                                                    <span className="text-barber-gold">Fecha:</span>{" "}
                                                    {appointment.date}
                                                </p>
                                                <p>
                                                    <span className="text-barber-gold">Hora:</span>{" "}
                                                    {appointment.time}
                                                </p>
                                                <p>
                                                    <span className="text-barber-gold">Estado:</span>{" "}
                                                    {appointment.status}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3 md:w-48">
                                            <Button variant="secondary">Reprogramar</Button>
                                            <Button>Cancelar cita</Button>

                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                </div>
            </Container>
        </Section>
    )
}