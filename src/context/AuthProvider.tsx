import { useMemo, useState, type ReactNode } from "react"
import {
    AUTH_STORAGE_KEY,
    AuthContext,
    type AuthUser
} from './AuthContext';


type AuthProviderProps = {
    children: ReactNode
}

function getInitialUser(): AuthUser | null {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY)

    if (!storedUser) {
        return null
    }
    try {
        return JSON.parse(storedUser) as AuthUser
    } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY)
        return null
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<AuthUser | null>(getInitialUser)


    function login(email: string) {
        const nextUser = { email }

        setUser(nextUser)
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser))
    }

    function logout() {
        setUser(null)
        localStorage.removeItem(AUTH_STORAGE_KEY)
    }

    const value = useMemo(
        () => ({
            user,
            isAuthenticated: Boolean(user),
            login,
            logout,
        }),
        [user]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}