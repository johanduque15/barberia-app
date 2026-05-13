import { useEffect, useMemo, useState } from "react";
import { isAxiosError } from "axios";

import Container from "../components/ui/Container/Container";
import Section from "../components/ui/Section/Section";
import Button from "../components/ui/Button/Button";
import Input from "../components/ui/Input/Input";
import Label from "../components/ui/Label/Label";
import Select from "../components/ui/Select/Select";
import api from "../services/api";

import type {
  AdminAppointment,
  AdminAppointmentsResponse,
  AdminBarber,
  AdminBarbersResponse,
  AdminService,
  AdminServicesResponse,
  AppointmentStatus,
} from "../types/admin";

const statusOptions = [
  { value: "pendiente", label: "Pendiente" },
  { value: "confirmada", label: "Confirmada" },
  { value: "cancelada", label: "Cancelada" },
  { value: "completada", label: "Completada" },
];

function getBackendMessage(error: unknown, fallbackMessage: string) {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? fallbackMessage;
  }

  return fallbackMessage;
}

function formatDate(date: string) {
  return date.includes("T") ? date.slice(0, 10) : date;
}

export default function AdminPage() {
  const [appointments, setAppointments] = useState<AdminAppointment[]>([]);
  const [services, setServices] = useState<AdminService[]>([]);
  const [barbers, setBarbers] = useState<AdminBarber[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null);
  const [editingBarberId, setEditingBarberId] = useState<number | null>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const todayAppointmentsCount = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);

    return appointments.filter(
      (appointment) =>
        formatDate(appointment.fecha) === today &&
        appointment.estado !== "cancelada"
    ).length;
  }, [appointments]);

  const loadAdminData = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const [appointmentsResponse, servicesResponse, barbersResponse] =
        await Promise.all([
          api.get<AdminAppointmentsResponse>("/admin/appointments"),
          api.get<AdminServicesResponse>("/admin/services"),
          api.get<AdminBarbersResponse>("/admin/barbers"),
        ]);

      setAppointments(appointmentsResponse.data.appointments);
      setServices(servicesResponse.data.services);
      setBarbers(barbersResponse.data.barbers);
    } catch (error) {
      setErrorMessage(
        getBackendMessage(
          error,
          "No se pudieron cargar los datos de administración."
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleUpdateAppointmentStatus = async (
    event: React.FormEvent<HTMLFormElement>,
    appointmentId: number
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const estado = String(formData.get("estado") ?? "") as AppointmentStatus;

    try {
      setErrorMessage("");
      setSuccessMessage("");

      await api.patch(`/admin/appointments/${appointmentId}/status`, {
        estado,
      });

      setSuccessMessage("Estado de la cita actualizado correctamente.");
      await loadAdminData();
    } catch (error) {
      setErrorMessage(
        getBackendMessage(error, "No se pudo actualizar el estado de la cita.")
      );
    }
  };

  const handleCreateService = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const nombre = String(formData.get("nombre") ?? "").trim();
    const precio = Number(formData.get("precio"));
    const duracion_minutos = Number(formData.get("duracion_minutos"));

    if (!nombre || !precio || !duracion_minutos) {
      setErrorMessage("Nombre, precio y duración son obligatorios.");
      return;
    }

    try {
      setErrorMessage("");
      setSuccessMessage("");

      await api.post("/admin/services", {
        nombre,
        precio,
        duracion_minutos,
      });

      setSuccessMessage("Servicio creado correctamente.");
      form.reset();
      await loadAdminData();
    } catch (error) {
      setErrorMessage(
        getBackendMessage(error, "No se pudo crear el servicio.")
      );
    }
  };

  const handleUpdateService = async (
    event: React.FormEvent<HTMLFormElement>,
    serviceId: number
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const nombre = String(formData.get("nombre") ?? "").trim();
    const precio = Number(formData.get("precio"));
    const duracion_minutos = Number(formData.get("duracion_minutos"));

    if (!nombre || !precio || !duracion_minutos) {
      setErrorMessage("Nombre, precio y duración son obligatorios.");
      return;
    }

    try {
      setErrorMessage("");
      setSuccessMessage("");

      await api.patch(`/admin/services/${serviceId}`, {
        nombre,
        precio,
        duracion_minutos,
      });

      setSuccessMessage("Servicio actualizado correctamente.");
      setEditingServiceId(null);
      await loadAdminData();
    } catch (error) {
      setErrorMessage(
        getBackendMessage(error, "No se pudo actualizar el servicio.")
      );
    }
  };

  const handleCreateBarber = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const nombre = String(formData.get("nombre") ?? "").trim();
    const apellidos = String(formData.get("apellidos") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const movil = String(formData.get("movil") ?? "").trim();

    if (!nombre || !apellidos || !email || !movil) {
      setErrorMessage("Nombre, apellidos, email y móvil son obligatorios.");
      return;
    }

    try {
      setErrorMessage("");
      setSuccessMessage("");

      await api.post("/admin/barbers", {
        nombre,
        apellidos,
        email,
        movil,
      });

      setSuccessMessage("Barbero creado correctamente.");
      form.reset();
      await loadAdminData();
    } catch (error) {
      setErrorMessage(getBackendMessage(error, "No se pudo crear el barbero."));
    }
  };

  const handleUpdateBarber = async (
    event: React.FormEvent<HTMLFormElement>,
    barberId: number
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const nombre = String(formData.get("nombre") ?? "").trim();
    const apellidos = String(formData.get("apellidos") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const movil = String(formData.get("movil") ?? "").trim();

    if (!nombre || !apellidos || !email || !movil) {
      setErrorMessage("Nombre, apellidos, email y móvil son obligatorios.");
      return;
    }

    try {
      setErrorMessage("");
      setSuccessMessage("");

      await api.patch(`/admin/barbers/${barberId}`, {
        nombre,
        apellidos,
        email,
        movil,
      });

      setSuccessMessage("Barbero actualizado correctamente.");
      setEditingBarberId(null);
      await loadAdminData();
    } catch (error) {
      setErrorMessage(
        getBackendMessage(error, "No se pudo actualizar el barbero.")
      );
    }
  };

  const summaryCards = [
    { title: "Citas hoy", value: String(todayAppointmentsCount) },
    { title: "Citas totales", value: String(appointments.length) },
    { title: "Servicios activos", value: String(services.length) },
    { title: "Barberos activos", value: String(barbers.length) },
  ];

  return (
    <Section>
      <Container>
        <div className="space-y-10">
          <div className="space-y-4">
            <span className="text-sm uppercase tracking-[0.2em] text-barber-gray">
              Panel de administración
            </span>

            <h1 className="text-4xl font-bold text-barber-gold md:text-5xl">
              Gestión de la barbería
            </h1>

            <p className="max-w-2xl text-barber-gray">
              Desde aquí el administrador podrá gestionar citas, servicios y
              barberos.
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
              <p className="text-barber-gray">
                Cargando datos de administración...
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {summaryCards.map((card) => (
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

              <section className="rounded-2xl border border-barber-gray bg-zinc-900 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-barber-gold">
                    Citas
                  </h2>
                </div>

                {appointments.length === 0 ? (
                  <p className="text-sm text-barber-gray">
                    No hay citas registradas.
                  </p>
                ) : (
                  <div className="grid gap-4">
                    {appointments.map((appointment) => (
                      <article
                        key={appointment.cita_id}
                        className="rounded-xl border border-barber-gray bg-zinc-950 p-4"
                      >
                        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
                          <div className="space-y-2 text-sm text-barber-gray">
                            <p>
                              <span className="text-barber-gold">
                                Cliente:
                              </span>{" "}
                              {appointment.cliente_nombre}{" "}
                              {appointment.cliente_apellidos} (
                              {appointment.cliente_email})
                            </p>

                            <p>
                              <span className="text-barber-gold">
                                Servicio:
                              </span>{" "}
                              {appointment.servicio} - {appointment.precio}€
                            </p>

                            <p>
                              <span className="text-barber-gold">
                                Barbero:
                              </span>{" "}
                              {appointment.barbero_nombre}{" "}
                              {appointment.barbero_apellidos}
                            </p>

                            <p>
                              <span className="text-barber-gold">Fecha:</span>{" "}
                              {formatDate(appointment.fecha)} -{" "}
                              {appointment.hora}
                            </p>

                            <p>
                              <span className="text-barber-gold">Estado:</span>{" "}
                              {appointment.estado}
                            </p>
                          </div>

                          <form
                            className="flex flex-col gap-3 sm:min-w-52"
                            onSubmit={(event) =>
                              handleUpdateAppointmentStatus(
                                event,
                                appointment.cita_id
                              )
                            }
                          >
                            <Select
                              id={`estado-${appointment.cita_id}`}
                              name="estado"
                              defaultValue={appointment.estado}
                              placeholder="Estado"
                              options={statusOptions}
                            />

                            <Button type="submit" variant="secondary">
                              Actualizar estado
                            </Button>
                          </form>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>

              <div className="grid gap-8 xl:grid-cols-2">
                <section className="rounded-2xl border border-barber-gray bg-zinc-900 p-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-barber-gold">
                      Servicios
                    </h2>
                  </div>

                  <form
                    className="mb-6 grid gap-4 rounded-xl border border-barber-gray bg-zinc-950 p-4 md:grid-cols-3"
                    onSubmit={handleCreateService}
                  >
                    <div>
                      <Label htmlFor="service-nombre">Nombre</Label>
                      <Input
                        id="service-nombre"
                        name="nombre"
                        placeholder="Corte clásico"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="service-precio">Precio</Label>
                      <Input
                        id="service-precio"
                        name="precio"
                        type="number"
                        min="1"
                        step="0.01"
                        placeholder="15"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="service-duracion">Duración</Label>
                      <Input
                        id="service-duracion"
                        name="duracion_minutos"
                        type="number"
                        min="1"
                        placeholder="30"
                        required
                      />
                    </div>

                    <div className="md:col-span-3">
                      <Button type="submit" className="w-full">
                        Crear servicio
                      </Button>
                    </div>
                  </form>

                  <div className="space-y-4">
                    {services.map((service) => {
                      const isEditing = editingServiceId === service.servicio_id;

                      return (
                        <article
                          key={service.servicio_id}
                          className="rounded-xl border border-barber-gray bg-zinc-950 p-4"
                        >
                          {!isEditing ? (
                            <div className="space-y-3">
                              <div className="space-y-2 text-sm text-barber-gray">
                                <p>
                                  <span className="text-barber-gold">
                                    Nombre:
                                  </span>{" "}
                                  {service.nombre}
                                </p>

                                <p>
                                  <span className="text-barber-gold">
                                    Precio:
                                  </span>{" "}
                                  {service.precio}€
                                </p>

                                <p>
                                  <span className="text-barber-gold">
                                    Duración:
                                  </span>{" "}
                                  {service.duracion_minutos} min
                                </p>
                              </div>

                              <Button
                                type="button"
                                variant="secondary"
                                onClick={() =>
                                  setEditingServiceId(service.servicio_id)
                                }
                              >
                                Editar servicio
                              </Button>
                            </div>
                          ) : (
                            <form
                              className="grid gap-4 md:grid-cols-3"
                              onSubmit={(event) =>
                                handleUpdateService(event, service.servicio_id)
                              }
                            >
                              <div>
                                <Label
                                  htmlFor={`service-nombre-${service.servicio_id}`}
                                >
                                  Nombre
                                </Label>
                                <Input
                                  id={`service-nombre-${service.servicio_id}`}
                                  name="nombre"
                                  defaultValue={service.nombre}
                                  required
                                />
                              </div>

                              <div>
                                <Label
                                  htmlFor={`service-precio-${service.servicio_id}`}
                                >
                                  Precio
                                </Label>
                                <Input
                                  id={`service-precio-${service.servicio_id}`}
                                  name="precio"
                                  type="number"
                                  min="1"
                                  step="0.01"
                                  defaultValue={service.precio}
                                  required
                                />
                              </div>

                              <div>
                                <Label
                                  htmlFor={`service-duracion-${service.servicio_id}`}
                                >
                                  Duración
                                </Label>
                                <Input
                                  id={`service-duracion-${service.servicio_id}`}
                                  name="duracion_minutos"
                                  type="number"
                                  min="1"
                                  defaultValue={service.duracion_minutos}
                                  required
                                />
                              </div>

                              <div className="flex gap-3 md:col-span-3">
                                <Button type="submit">Guardar cambios</Button>
                                <Button
                                  type="button"
                                  variant="secondary"
                                  onClick={() => setEditingServiceId(null)}
                                >
                                  Cancelar edición
                                </Button>
                              </div>
                            </form>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </section>

                <section className="rounded-2xl border border-barber-gray bg-zinc-900 p-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-barber-gold">
                      Barberos
                    </h2>
                  </div>

                  <form
                    className="mb-6 grid gap-4 rounded-xl border border-barber-gray bg-zinc-950 p-4 md:grid-cols-2"
                    onSubmit={handleCreateBarber}
                  >
                    <div>
                      <Label htmlFor="barber-nombre">Nombre</Label>
                      <Input
                        id="barber-nombre"
                        name="nombre"
                        placeholder="Andres"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="barber-apellidos">Apellidos</Label>
                      <Input
                        id="barber-apellidos"
                        name="apellidos"
                        placeholder="Acosta"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="barber-email">Email</Label>
                      <Input
                        id="barber-email"
                        name="email"
                        type="email"
                        placeholder="barbero@barberia.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="barber-movil">Móvil</Label>
                      <Input
                        id="barber-movil"
                        name="movil"
                        placeholder="600000000"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Button type="submit" className="w-full">
                        Crear barbero
                      </Button>
                    </div>
                  </form>

                  <div className="space-y-4">
                    {barbers.map((barber) => {
                      const isEditing = editingBarberId === barber.barbero_id;

                      return (
                        <article
                          key={barber.barbero_id}
                          className="rounded-xl border border-barber-gray bg-zinc-950 p-4"
                        >
                          {!isEditing ? (
                            <div className="space-y-3">
                              <h3 className="text-lg font-semibold text-barber-gold">
                                {barber.nombre} {barber.apellidos}
                              </h3>

                              <div className="space-y-2 text-sm text-barber-gray">
                                <p>
                                  <span className="text-barber-gold">
                                    Email:
                                  </span>{" "}
                                  {barber.email}
                                </p>

                                <p>
                                  <span className="text-barber-gold">
                                    Móvil:
                                  </span>{" "}
                                  {barber.movil}
                                </p>
                              </div>

                              <Button
                                type="button"
                                variant="secondary"
                                onClick={() =>
                                  setEditingBarberId(barber.barbero_id)
                                }
                              >
                                Editar barbero
                              </Button>
                            </div>
                          ) : (
                            <form
                              className="grid gap-4 md:grid-cols-2"
                              onSubmit={(event) =>
                                handleUpdateBarber(event, barber.barbero_id)
                              }
                            >
                              <div>
                                <Label
                                  htmlFor={`barber-nombre-${barber.barbero_id}`}
                                >
                                  Nombre
                                </Label>
                                <Input
                                  id={`barber-nombre-${barber.barbero_id}`}
                                  name="nombre"
                                  defaultValue={barber.nombre}
                                  required
                                />
                              </div>

                              <div>
                                <Label
                                  htmlFor={`barber-apellidos-${barber.barbero_id}`}
                                >
                                  Apellidos
                                </Label>
                                <Input
                                  id={`barber-apellidos-${barber.barbero_id}`}
                                  name="apellidos"
                                  defaultValue={barber.apellidos}
                                  required
                                />
                              </div>

                              <div>
                                <Label
                                  htmlFor={`barber-email-${barber.barbero_id}`}
                                >
                                  Email
                                </Label>
                                <Input
                                  id={`barber-email-${barber.barbero_id}`}
                                  name="email"
                                  type="email"
                                  defaultValue={barber.email}
                                  required
                                />
                              </div>

                              <div>
                                <Label
                                  htmlFor={`barber-movil-${barber.barbero_id}`}
                                >
                                  Móvil
                                </Label>
                                <Input
                                  id={`barber-movil-${barber.barbero_id}`}
                                  name="movil"
                                  defaultValue={barber.movil}
                                  required
                                />
                              </div>

                              <div className="flex gap-3 md:col-span-2">
                                <Button type="submit">Guardar cambios</Button>

                                <Button
                                  type="button"
                                  variant="secondary"
                                  onClick={() => setEditingBarberId(null)}
                                >
                                  Cancelar edición
                                </Button>
                              </div>
                            </form>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </section>
              </div>
            </>
          )}
        </div>
      </Container>
    </Section>
  );
}