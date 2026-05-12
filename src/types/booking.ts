export interface Service {
  servicio_id: number;
  nombre: string;
  precio: string;
  duracion_minutos: number;
}

export interface Barber {
  barbero_id: number;
  nombre: string;
  apellidos: string;
}

export interface ServicesResponse {
  services: Service[];
}

export interface BarbersResponse {
  barbers: Barber[];
}

export interface CreateAppointmentResponse {
  message: string;
  appointment: {
    cita_id: number;
    fecha: string;
    hora: string;
    estado: string;
    barbero_id: number;
    cliente_id: number;
    servicio_id: number;
  };
}