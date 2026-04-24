
import Container from "../components/ui/Container/Container"
import Section from "../components/ui/Section/Section"
import Button from "../components/ui/Button/Button"
import Input from "../components/ui/Input/Input"
import Label from '../components/ui/Label/Label';
import Select from "../components/ui/Select/Select"

const serviceOptions = [
    { value: "corte-clasico", label: "Corte clasico" },
    { value: "barba", label: "Arreglo de barba" },
    { value: "afeitado", label: "Afeitado tradicional" },
]

const barberOptions = [
    { value: "andres", label: "Andres Acosta" },
    { value: "pedro", label: "Pedro Perez" },
    { value: "jose", label: "Jose Jimenez" },
]

const timeOptions = [
    { value: "10:00", label: "10:00" },
    { value: "11:00", label: "11:00" },
    { value: "12:00", label: "12:00" },
    { value: "13:00", label: "13:00" },
    { value: "14:00", label: "14:00" },
    { value: "17:00", label: "17:00" },
    { value: "18:00", label: "18:00" },
    { value: "19:00", label: "19:00" },
    { value: "20:00", label: "20:00" },
]

export default function BookingPage() {
    return (
        <Section>
            <Container>
                <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                    <div className="space-y-6">
                        <span className="text-sm uppercase tracking-[0.2em] text-barber-gray">
                            Reserva online
                        </span>

                        <h1 className="text-4xl font-bold text-barber-gold md:text-5xl">
                            Reserva tu cita en pocos pasos
                        </h1>

                        <p className="max-w-xl text-barber-gray">
                            Elige tu servicio, selecciona tu barbero y reserva el horario que mejor se adapte a ti.
                        </p>

                        <div className="space-y-4 rounded-2xl border-border-barber-gray bg-zinc-900/60 p-6">
                            <div>
                                <h2 className="text-base font-semibold text-barber-gold">
                                    ¿Como funciona?
                                </h2>
                                <p className="mt-2 text-sm text-barber-gray">
                                    Selecciona el servicio, escoge el barbero, la fecha y hora que desees.
                                    Confirma tus datos para completar la reserva.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-base font-semibold text-barber-gold">
                                    Facil de gestionar
                                </h2>
                                <p className="mt-2 text-sm text-barber-gray">
                                    Podras modificar o cancelar tu reserva en cualquier momento.
                                </p>
                            </div>
                        </div>
                    </div>

                    <article className="rounded-2xl border border-barber-gray bg-zinc-900 p-6 md:p-8">
                        <form className="space-y-6">
                            <div>
                                <Label htmlFor="fullName">Nombre Completo</Label>
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    placeholder="Tu nombre y apellidos"
                                />
                            </div>

                            <div>
                                <Label htmlFor="email">Correo electronico</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="tuemail@email.com"
                                />
                            </div>

                            <div className="grid gap-6 md:grid cols-2">
                                <div>
                                    <Label htmlFor="service">Servicio</Label>
                                    <Select
                                        id="service"
                                        name="service"
                                        defaultValue=""
                                        placeholder="Selecciona un servicio"
                                        options={serviceOptions}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="barber">Barbero</Label>
                                    <Select
                                        id="barber"
                                        name="barber"
                                        defaultValue=""
                                        placeholder="Selecciona un barbero"
                                        options={barberOptions}
                                    />
                                </div>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="date">Fecha</Label>
                                    <Input id="date" name="date" type="date" />
                                </div>

                                <div>
                                    <Label htmlFor="time">Hora</Label>
                                    <Select
                                        id="time"
                                        name="time"
                                        defaultValue=""
                                        placeholder="Seleccione una hora"
                                        options={timeOptions}
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full">
                                Confirmar reserva
                            </Button>
                        </form>
                    </article>
                </div>
            </Container>
        </Section>
    )
}