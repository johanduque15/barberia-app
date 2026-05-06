import Container from "../components/ui/Container/Container";
import Section from "../components/ui/Section/Section";
import Button from "../components/ui/Button/Button";

const sumaryCards = [
    {title: "Citas hoy", value: "8"},
    {title: "Usuarios registrados", value: "24"},
    {title: "Servicios activos", value: "3"},
    {title: "Barberos activos", value: "3"},
]

const recentAppointments = [
    {
        id: 1,
        client: "Johan Perez",
        service: "Corte Clasico",
        barber: "Andres Acosta",
        date: "2026-03-15",
        time: "10:00",
        status: "Confirmada",
    },
    {
        id: 2,
        client: "Carlos Gomez",
        service: "Arreglo de barba",
        barber: "Pedro Perez",
        date: "2026-03-15",
        time: "11:30",
        status: "Pendiente",
    },
]

const services = [
    {id: 1, name: "Corte clasico", price: "15€", duration: "30 min"},
    {id: 2, name: "Arreglo de barba", price: "10", duration: "20 min"},
    {id: 3, name: "Afeitado tradicional", price: "18€", duration: "40 min"},
]

const barbers = [
    {id: 1, name: "Andres Acosta", speciality: "Cortes clasicos"},
    {id: 2, name: "Jose Jimenez", speciality: "Barba y tintes"},
    {id: 3, name: "Pedro Perez", price: "18€", duration: "Degradados"},
]

export default function AdminPage() {
    return (
        <Section>
            <Container>
                <div className="space-y-10">
                    <div className="space-y-4">
                        <span className="text-sm uppercase tracking-[0.2em] text-barber-gray">
                            Panel de administración
                        </span>

                        <h1 className="text-4xl font-bold text-barber-gold md:text-5xl">
                            Gestión de la barberia
                        </h1>

                        <p className="max-w-2xl text-barber-gray">
                            Desde aqui el administrados podrá gestionar citas,servicios,barberos,
                            y usuarios.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                        {sumaryCards.map((card) => (
                            <article
                                key={card.title}
                                className="rounded-2xl border border-barber-gray bg-zinc-900 p-6"
                            >
                                <p className="text-sm text-barber-gray">{card.title}</p>
                                <p className="mt-3 text-3xl font-bold text-barber-gold">
                                    {card.value}
                                </p>
                            </article>
                        ))}
                    </div>

                    <div className="grid gap-8 xl:grid-cols-2">
                        <section className="rounded-2xl border border-barber-gray bg-zinc-900 p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-semibold text-barber-gold">
                                    Citas recientes
                                </h2>

                                <Button variant="secondary">Ver todas</Button>
                            </div>

                            <div className="space-y-4">
                                {recentAppointments.map((appointment) => (
                                    <article
                                        key={appointment.id}
                                        className="rounded-xl border border-barber-gray bg-zinc-900 p-4"
                                    >
                                        <div className="space-y-2 text-sm text-barber-gray">
                                            <p>
                                                <span className="text-barber-gold">Cliente:</span>{" "}
                                                {appointment.client}
                                            </p>
                                            <p>
                                                <span className="text-barber-gold">Servicio:</span>{" "}
                                                {appointment.service}
                                            </p>
                                            <p>
                                                <span className="text-barber-gold">Barbero:</span>{" "}
                                                {appointment.barber}
                                            </p>
                                            <p>
                                                <span className="text-barber-gold">Fecha:</span>{" "}
                                                {appointment.date} - {appointment.time}
                                            </p>
                                            <p>
                                                <span className="text-barber-gold">Estado:</span>{" "}
                                                {appointment.status}
                                            </p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>

                        <section className="rounded-2xl border border-barber-gray bg-zinc-900 p-6">
                            <div className="mb-6 items-center justify-between">
                                <h2 className="text-2xl font-semibold text-barber-gold">
                                    Servicios
                                </h2>

                                <Button> Nuevo servicio</Button>
                            </div>

                            <div className="space-y-4">
                                {services.map((service) => (
                                    <article
                                        key={service.id}
                                        className="rounded-xl border border-barber-gray bg-zinc-900 p-4"
                                    >
                                        <div className="space-y-2 text-sm text-barber-gray">
                                            <p>
                                                <span className="text-barber-gold">Nombre:</span>{" "}
                                                {service.name}
                                            </p>
                                            <p>
                                                <span className="text-barber-gold">Precio:</span>{" "}
                                                {service.price}
                                            </p>
                                            <p>
                                                <span className="text-barber-gold">Duración:</span>{" "}
                                                {service.duration}
                                            </p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    </div>

                    <section className="rounded-2xl border border-barber-gray bg-zinc-900 p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-barber-gold">
                                Barberos
                            </h2>

                            <Button>Nuevo barbero</Button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {barbers.map((barber) => (
                                <article
                                    key={barber.id}
                                    className="rounded-xl border border-barber-gray bg-zinc-900 p-4"
                                >
                                    <h3 className="text-lg font-semibold text-barber-gold">
                                        {barber.name}
                                    </h3>

                                    <p className="mt-2 text-sm text-barber-gray">
                                        {barber.speciality}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </section>
                </div>
            </Container>
        </Section>
    )
}