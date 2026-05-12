export type UserRole = "cliente" | "barbero" | "admin";

export interface User {
    usuario_id: number;
    nombre: string;
    apellidos: string;
    email: string;
    rol: UserRole;
    movil: string;
    fecha_creacion?: string;
}

export interface LoginResponse {
    message: string;
    token: string;
    user: User;
}

export interface RegisterPayload {
    nombre: string;
    apellidos: string;
    email: string;
    password: string;
    movil: string;
}