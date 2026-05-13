import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Container from "../components/ui/Container/Container";
import Section from "../components/ui/Section/Section";
import Button from "../components/ui/Button/Button";
import Input from "../components/ui/Input/Input";
import Label from "../components/ui/Label/Label";
import Select from "../components/ui/Select/Select";
import api from "../services/api";

import type {
    Barber,
    BarbersResponse,
    CreateAppointmentResponse,
    Service,
    ServicesResponse,
} from "../types/booking";

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
];

const MAX_BOOKING_DAYS_AHEAD = 90;

function getTodayDateInputValue() {
    return new Date().toISOString().slice(0, 10);
}

function getMaxBookingDateInputValue() {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + MAX_BOOKING_DAYS_AHEAD);
    return maxDate.toISOString().slice(0, 10);
}

function isSaturdayDate(fecha: string) {
    if (!fecha) return false;

    const date = new Date(`${fecha}T00:00:00`);
    return date.getDay() === 6;
}

export default function BookingPage() {
    const navigate = useNavigate();

    const [services, setServices] = useState<Service[]>([]);
    const [barbers, setBarbers] = useState<Barber[]>([]);

    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const loadBookingData = async () => {
            try {
                setIsLoadingData(true);
                setErrorMessage("");

                const [servicesResponse, barbersResponse] = await Promise.all([
                    api.get<ServicesResponse>("/services"),
                    api.get<BarbersResponse>("/barbers"),
                ]);

                setServices(servicesResponse.data.services);
                setBarbers(barbersResponse.data.barbers);
            } catch {
                setErrorMessage("No se pudieron cargar los servicios y barberos.");
            } finally {
                setIsLoadingData(false);
            }
        };

        loadBookingData();
    }, []);

    const serviceOptions = services.map((service) => ({
        value: String(service.servicio_id),
        label: `${service.nombre} - ${service.precio}€ - ${service.duracion_minutos} min`,
    }));

    const barberOptions = barbers.map((barber) => ({
        value: String(barber.barbero_id),
        label: `${barber.nombre} ${barber.apellidos}`,
    }));

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setErrorMessage("");
        setSuccessMessage("");
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);

        const servicio_id = Number(formData.get("servicio_id"));
        const barbero_id = Number(formData.get("barbero_id"));
        const fecha = String(formData.get("fecha") ?? "");
        const hora = String(formData.get("hora") ?? "");

        if (!servicio_id || !barbero_id || !fecha || !hora) {
            setErrorMessage("Debes seleccionar servicio, barbero, fecha y hora.");
            setIsSubmitting(false);
            return;
        }

        try {
            await api.post<CreateAppointmentResponse>("/appointments", {
                fecha,
                hora,
                barbero_id,
                servicio_id,
            });

            setSuccessMessage("Cita creada correctamente.");

            setTimeout(() => {
                navigate("/mis-citas");
            }, 800);
        } catch (error: unknown) {
            const backendMessage =
                typeof error === "object" &&
                    error !== null &&
                    "response" in error &&
                    typeof error.response === "object" &&
                    error.response !== null &&
                    "data" in error.response &&
                    typeof error.response.data === "object" &&
                    error.response.data !== null &&
                    "message" in error.response.data
                    ? String(error.response.data.message)
                    : "No se pudo crear la cita. Revisa los datos e inténtalo de nuevo.";

            setErrorMessage(backendMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const todayDate = getTodayDateInputValue();
    const maxBookingDate = getMaxBookingDateInputValue();
    const [selectedDate, setSelectedDate] = useState("");
    const availableTimeOptions = isSaturdayDate(selectedDate)
  ? timeOptions.filter((timeOption) => timeOption.value < "14:00")
  : timeOptions;

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

                        <div className="space-y-4 rounded-2xl border border-barber-gray bg-zinc-900/60 p-6">
                            <div>
                                <h2 className="text-base font-semibold text-barber-gold">
                                    ¿Cómo funciona?
                                </h2>

                                <p className="mt-2 text-sm text-barber-gray">
                                    Selecciona el servicio, escoge el barbero, la fecha y hora que desees.
                                    Confirma tus datos para completar la reserva.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-base font-semibold text-barber-gold">
                                    Fácil de gestionar
                                </h2>

                                <p className="mt-2 text-sm text-barber-gray">
                                    Podrás modificar o cancelar tu reserva en cualquier momento.
                                </p>
                            </div>
                        </div>
                    </div>

                    <article className="rounded-2xl border border-barber-gray bg-zinc-900 p-6 md:p-8">
                        {isLoadingData ? (
                            <p className="text-sm text-barber-gray">
                                Cargando datos de reserva...
                            </p>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="servicio_id">Servicio</Label>
                                        <Select
                                            id="servicio_id"
                                            name="servicio_id"
                                            defaultValue=""
                                            placeholder="Selecciona un servicio"
                                            options={serviceOptions}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="barbero_id">Barbero</Label>
                                        <Select
                                            id="barbero_id"
                                            name="barbero_id"
                                            defaultValue=""
                                            placeholder="Selecciona un barbero"
                                            options={barberOptions}
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="fecha">Fecha</Label>
                                        <Input 
                                            id="fecha" 
                                            name="fecha" 
                                            type="date" 
                                            min={todayDate} 
                                            max={maxBookingDate}
                                            value={selectedDate}
                                            onChange={(event) => setSelectedDate(event.target.value)} 
                                            required 
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="hora">Hora</Label>
                                        <Select
                                            id="hora"
                                            name="hora"
                                            defaultValue=""
                                            placeholder="Selecciona una hora"
                                            options={availableTimeOptions}
                                        />
                                    </div>
                                </div>

                                {errorMessage && (
                                    <p className="text-sm text-red-500">{errorMessage}</p>
                                )}

                                {successMessage && (
                                    <p className="text-sm text-green-500">{successMessage}</p>
                                )}

                                <Button type="submit" className="w-full">
                                    {isSubmitting ? "Creando reserva..." : "Confirmar reserva"}
                                </Button>
                            </form>
                        )}
                    </article>
                </div>
            </Container>
        </Section>
    );
}