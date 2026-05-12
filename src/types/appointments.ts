export interface MyAppointment {
    cita_id: number;
    fecha: string;
    hora: string;
    estado: "pendiente" | "confirmada" | "cancelada" | "completada";
    duracion: {
        minutes?: number;
    };
    servicio_id: number;
    servicio: string;
    precio: string;
    barbero_id: number;
    barbero_nombre: string;
    barbero_apellidos: string;
}

export interface MyAppointmentsResponse {
    appointments: MyAppointment[];
}