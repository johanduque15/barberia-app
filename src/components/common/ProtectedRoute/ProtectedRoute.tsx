import { Navigate} from "react-router";
import useAuth from "../../../hooks/useAuth";
import type { ReactNode } from "react";
import type { UserRole } from "../../../types/auth";

interface ProtectedRouteProps{
    children: ReactNode;
    requiredRole?: UserRole;
}

export default function ProtectedRoute({
    children,
    requiredRole,
}: ProtectedRouteProps) {
    const { isAuthenticated, isLoading, user } = useAuth();
    
    if(isLoading){
        return <p className="p-6 text-center">Cargando...</p>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;        
    }

    if(requiredRole && user?.rol !== requiredRole){
        return <Navigate to="/" replace />
    }
    return <>{children}</>
}