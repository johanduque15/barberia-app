import { createContext } from "react"

export type AuthUser = {
    email: string
}

export type AuthContextValue = {
    user: AuthUser | null
    isAuthenticated: boolean
    login: (email: string) => void
    logout: () => void
}

export const AUTH_STORAGE_KEY = "barberia_auth_user"

export const AuthContext = createContext<AuthContextValue | undefined>(
    undefined
)
