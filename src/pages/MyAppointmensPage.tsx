import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { Link } from "react-router";

import Container from "../components/ui/Container/Container";
import Section from "../components/ui/Section/Section";
import Button from "../components/ui/Button/Button";
import Input from "../components/ui/Input/Input";
import Label from "../components/ui/Label/Label";
import Select from "../components/ui/Select/Select";
import useAuth from "../hooks/useAuth";
import api from "../services/api";

import type { Barber, BarbersResponse, Service, ServicesResponse } from "../types/booking";
import type { MyAppointment, MyAppointmentsResponse } from "../types/appointments";

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

function getBackendMessage(error: unknown, fallbackMessage: string) {
    if (isAxiosError<{ message?: string }>(error)) {
        return error.response?.data?.message ?? fallbackMessage;
    }

    return fallbackMessage;
}

export default function MyAppointmentsPage() {
    const { user } = useAuth();

    const [appointments, setAppointments] = useState<MyAppointment[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [barbers, setBarbers] = useState<Barber[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [editingAppointmentId, setEditingAppointmentId] = useState<number | null>(null);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const serviceOptions = services.map((service) => ({
        value: String(service.servicio_id),
        label: `${service.nombre} - ${service.precio}€ - ${service.duracion_minutos} min`,
    }));

    const barberOptions = barbers.map((barber) => ({
        value: String(barber.barbero_id),
        label: `${barber.nombre} ${barber.apellidos}`,
    }));

    const loadData = async () => {
        try {
            setIsLoading(true);
            setErrorMessage("");

            const [appointmentsResponse, servicesResponse, barbersResponse] = await Promise.all([
                api.get<MyAppointmentsResponse>("/appointments/my"),
                api.get<ServicesResponse>("/services"),
                api.get<BarbersResponse>("/barbers"),
            ]);

            setAppointments(appointmentsResponse.data.appointments);
            setServices(servicesResponse.data.services);
            setBarbers(barbersResponse.data.barbers);
        } catch {
            setErrorMessage("No se pudieron cargar tus citas.");
        } finally {
            setIsLoading(false);
        }
    };

    function isSaturdayDate(fecha: string) {
        if (!fecha) return false;

        const date = new Date(`${fecha}T00:00:00`);
        return date.getDay() === 6;
    }

    useEffect(() => {
        loadData();
    }, []);

    const handleCancelAppointment = async (appointmentId: number) => {
        const shouldCancel = window.confirm("¿Seguro que quieres cancelar esta cita?");

        if (!shouldCancel) {
            return;
        }

        try {
            setErrorMessage("");
            setSuccessMessage("");

            await api.patch(`/appointments/${appointmentId}/cancel`);

            setSuccessMessage("Cita cancelada correctamente.");
            await loadData();
        } catch (error) {
            setErrorMessage(
                getBackendMessage(error, "No se pudo cancelar la cita.")
            );
        }
    };

    const handleUpdateAppointment = async (
        event: React.FormEvent<HTMLFormElement>,
        appointmentId: number
    ) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const fecha = String(formData.get("fecha") ?? "");
        const hora = String(formData.get("hora") ?? "");
        const barbero_id = Number(formData.get("barbero_id"));
        const servicio_id = Number(formData.get("servicio_id"));

        if (isSaturdayDate(fecha) && hora >= "14:00") {
            setErrorMessage("Los sábados solo se permiten citas antes de las 14:00.");
            return;
        }

        if (!fecha || !hora || !barbero_id || !servicio_id) {
            setErrorMessage("Fecha, hora, barbero y servicio son obligatorios.");
            return;
        }

        try {
            setErrorMessage("");
            setSuccessMessage("");

            await api.patch(`/appointments/${appointmentId}`, {
                fecha,
                hora,
                barbero_id,
                servicio_id,
            });

            setSuccessMessage("Cita reprogramada correctamente.");
            setEditingAppointmentId(null);

            await loadData();
        } catch (error) {
            setErrorMessage(
                getBackendMessage(error, "No se pudo reprogramar la cita.")
            );
        }
    };

    const MAX_BOOKING_DAYS_AHEAD = 90;

    function getTodayDateInputValue() {
        return new Date().toISOString().slice(0, 10);
    }

    function getMaxBookingDateInputValue() {
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + MAX_BOOKING_DAYS_AHEAD);
        return maxDate.toISOString().slice(0, 10);
    }

    const todayDate = getTodayDateInputValue();
    const maxBookingDate = getMaxBookingDateInputValue();

    return (
        <Section>
            <Container>
                <div className="space-y-10">
                    <div className="space-y-4">
                        <span className="text-sm uppercase tracking-[0.2em] text-barber-gray">
                            Panel de usuario
                        </span>

                        <h1 className="text-4xl font-bold text-barber-gold md:text-5xl">
                            Mis citas
                        </h1>

                        <p className="max-w-2xl text-barber-gray">
                            Aquí podrás consultar tus reservas activas, reprogramarlas o cancelarlas.
                            Sesión actual:{" "}
                            <span className="text-barber-gold">{user?.email}</span>
                        </p>
                    </div>

                    {errorMessage && (
                        <p className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-400">
                            {errorMessage}
                        </p>
                    )}

                    {successMessage && (
                        <p className="rounded-xl border border-green-500/40 bg-green-500/10 p-4 text-sm text-green-400">
                            {successMessage}
                        </p>
                    )}

                    {isLoading ? (
                        <div className="rounded-2xl border border-barber-gray bg-zinc-900 p-8 text-center">
                            <p className="text-barber-gray">Cargando tus citas...</p>
                        </div>
                    ) : appointments.length === 0 ? (
                        <div className="rounded-2xl border border-barber-gray bg-zinc-900 p-8 text-center">
                            <h2 className="text-2xl font-semibold text-barber-gold">
                                No tienes citas todavía
                            </h2>

                            <p className="mt-3 text-barber-gray">
                                Aquí aparecerán tus citas para que puedas gestionarlas.
                            </p>

                            <div className="mt-6">
                                <Link to="/reservar">
                                    <Button>Reservar una cita</Button>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {appointments.map((appointment) => {
                                const isCancelled = appointment.estado === "cancelada";
                                const isEditing = editingAppointmentId === appointment.cita_id;

                                return (
                                    <article
                                        key={appointment.cita_id}
                                        className="rounded-2xl border border-barber-gray bg-zinc-900 p-6"
                                    >
                                        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                                            <div className="space-y-3">
                                                <h2 className="text-2xl font-semibold text-barber-gold">
                                                    {appointment.servicio}
                                                </h2>

                                                <div className="space-y-1 text-sm text-barber-gray">
                                                    <p>
                                                        <span className="text-barber-gold">Barbero:</span>{" "}
                                                        {appointment.barbero_nombre} {appointment.barbero_apellidos}
                                                    </p>

                                                    <p>
                                                        <span className="text-barber-gold">Fecha:</span>{" "}
                                                        {appointment.fecha}
                                                    </p>

                                                    <p>
                                                        <span className="text-barber-gold">Hora:</span>{" "}
                                                        {appointment.hora}
                                                    </p>

                                                    <p>
                                                        <span className="text-barber-gold">Estado:</span>{" "}
                                                        {appointment.estado}
                                                    </p>

                                                    <p>
                                                        <span className="text-barber-gold">Precio:</span>{" "}
                                                        {appointment.precio}€
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-3 md:w-48">
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                    disabled={isCancelled}
                                                    onClick={() =>
                                                        setEditingAppointmentId(
                                                            isEditing ? null : appointment.cita_id
                                                        )
                                                    }
                                                >
                                                    {isEditing ? "Cerrar edición" : "Reprogramar"}
                                                </Button>

                                                <Button
                                                    type="button"
                                                    disabled={isCancelled}
                                                    onClick={() =>
                                                        handleCancelAppointment(appointment.cita_id)
                                                    }
                                                >
                                                    Cancelar cita
                                                </Button>
                                            </div>
                                        </div>

                                        {isEditing && !isCancelled && (
                                            <form
                                                className="mt-6 grid gap-6 border-t border-barber-gray pt-6 md:grid-cols-2"
                                                onSubmit={(event) =>
                                                    handleUpdateAppointment(event, appointment.cita_id)
                                                }
                                            >
                                                <div>
                                                    <Label htmlFor={`servicio-${appointment.cita_id}`}>
                                                        Servicio
                                                    </Label>

                                                    <Select
                                                        id={`servicio-${appointment.cita_id}`}
                                                        name="servicio_id"
                                                        defaultValue={String(appointment.servicio_id)}
                                                        placeholder="Selecciona un servicio"
                                                        options={serviceOptions}
                                                    />
                                                </div>

                                                <div>
                                                    <Label htmlFor={`barbero-${appointment.cita_id}`}>
                                                        Barbero
                                                    </Label>

                                                    <Select
                                                        id={`barbero-${appointment.cita_id}`}
                                                        name="barbero_id"
                                                        defaultValue={String(appointment.barbero_id)}
                                                        placeholder="Selecciona un barbero"
                                                        options={barberOptions}
                                                    />
                                                </div>

                                                <div>
                                                    <Label htmlFor={`fecha-${appointment.cita_id}`}>
                                                        Fecha
                                                    </Label>

                                                    <Input
                                                        id={`fecha-${appointment.cita_id}`}
                                                        name="fecha"
                                                        type="date"
                                                        min={todayDate}
                                                        max={maxBookingDate}
                                                        defaultValue={appointment.fecha}
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <Label htmlFor={`hora-${appointment.cita_id}`}>
                                                        Hora
                                                    </Label>

                                                    <Select
                                                        id={`hora-${appointment.cita_id}`}
                                                        name="hora"
                                                        defaultValue={appointment.hora.slice(0, 5)}
                                                        placeholder="Selecciona una hora"
                                                        options={timeOptions}
                                                    />
                                                </div>

                                                <div className="md:col-span-2">
                                                    <Button type="submit" className="w-full">
                                                        Guardar cambios
                                                    </Button>
                                                </div>
                                            </form>
                                        )}
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </div>
            </Container>
        </Section>
    );
}