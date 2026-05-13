export type AppointmentStatus =
  | "pendiente"
  | "confirmada"
  | "cancelada"
  | "completada";

export interface AdminAppointment {
  cita_id: number;
  fecha: string;
  hora: string;
  estado: AppointmentStatus;
  duracion?: {
    minutes?: number;
  };
  servicio: string;
  precio: string;
  cliente_id: number;
  cliente_nombre: string;
  cliente_apellidos: string;
  cliente_email: string;
  barbero_id: number;
  barbero_nombre: string;
  barbero_apellidos: string;
}

export interface AdminAppointmentsResponse {
  appointments: AdminAppointment[];
}

export interface AdminService {
  servicio_id: number;
  nombre: string;
  precio: string;
  duracion_minutos: number;
}

export interface AdminServicesResponse {
  services: AdminService[];
}

export interface AdminBarber {
  barbero_id: number;
  nombre: string;
  apellidos: string;
  email: string;
  movil: string;
}

export interface AdminBarbersResponse {
  barbers: AdminBarber[];
}