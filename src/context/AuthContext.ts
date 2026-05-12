import { createContext } from "react"
import type { LoginResponse, RegisterPayload, User } from "../types/auth";



export type AuthContextValue = {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (payload: RegisterPayload) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export type {LoginResponse, RegisterPayload, User};
