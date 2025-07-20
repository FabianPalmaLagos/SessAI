"use client"

import { useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { UserRole } from "@/types/auth"
import { authHelpers } from "@/lib/auth"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Lock, AlertTriangle } from "lucide-react"

interface AuthGuardProps {
  children: ReactNode
  requireAuth?: boolean
  requiredRoles?: UserRole[]
  fallback?: ReactNode
  redirectTo?: string
  showLoading?: boolean
}

interface AuthLoadingProps {
  message?: string
}

interface UnauthorizedProps {
  message?: string
  redirectTo?: string
  requiredRoles?: UserRole[]
}

// Loading component for auth checks
function AuthLoading({ message = "Verificando autenticación..." }: AuthLoadingProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {message}
              </h3>
              <p className="text-sm text-gray-600">
                Por favor espera mientras verificamos tu sesión...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Unauthorized access component
function Unauthorized({ 
  message = "No tienes permisos para acceder a esta página",
  redirectTo = "/auth/login",
  requiredRoles 
}: UnauthorizedProps) {
  const router = useRouter()

  const handleRedirect = () => {
    router.push(redirectTo)
  }

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
                <Lock className="h-8 w-8 text-red-600" />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">
                Acceso Denegado
              </h3>
              <p className="text-sm text-gray-600">
                {message}
              </p>
              
              {/* Show required roles if specified */}
              {requiredRoles && requiredRoles.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-800">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">Roles requeridos:</span>
                  </div>
                  <div className="mt-1">
                    <div className="flex flex-wrap gap-1">
                      {requiredRoles.map((role) => (
                        <span 
                          key={role}
                          className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                        >
                          {role === 'admin' ? 'Administrador' : 
                           role === 'therapist' ? 'Terapeuta' : 'Asistente'}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button onClick={handleRedirect} className="w-full">
                {redirectTo === "/auth/login" ? "Iniciar Sesión" : "Ir al Inicio"}
              </Button>
              <Button variant="outline" onClick={handleGoBack} className="w-full">
                Volver Atrás
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Main AuthGuard component
export default function AuthGuard({
  children,
  requireAuth = true,
  requiredRoles,
  fallback,
  redirectTo = "/auth/login",
  showLoading = true
}: AuthGuardProps) {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Only redirect if not loading and authentication is required
    if (!isLoading && requireAuth && !isAuthenticated) {
      router.push(redirectTo)
    }
  }, [isLoading, isAuthenticated, requireAuth, redirectTo, router])

  // Show loading state
  if (isLoading && showLoading) {
    return <AuthLoading message="Verificando autenticación..." />
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>
    }
    return <AuthLoading message="Redirigiendo al login..." />
  }

  // If authentication is required and user is authenticated, check roles
  if (requireAuth && isAuthenticated && requiredRoles && requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some(role => 
      user?.role === role
    )

    if (!hasRequiredRole) {
      if (fallback) {
        return <>{fallback}</>
      }
      return (
        <Unauthorized 
          message="No tienes los permisos necesarios para acceder a esta página"
          redirectTo="/"
          requiredRoles={requiredRoles}
        />
      )
    }
  }

  // All checks passed, render children
  return <>{children}</>
}

// Higher-order component for protecting pages
export function withAuthGuard<P extends object>(
  Component: React.ComponentType<P>,
  options: Omit<AuthGuardProps, 'children'> = {}
) {
  const AuthGuardedComponent = (props: P) => {
    return (
      <AuthGuard {...options}>
        <Component {...props} />
      </AuthGuard>
    )
  }

  AuthGuardedComponent.displayName = `withAuthGuard(${Component.displayName || Component.name})`
  
  return AuthGuardedComponent
}

// Specific guard components for common use cases
export function AdminGuard({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <AuthGuard requiredRoles={['admin']} fallback={fallback}>
      {children}
    </AuthGuard>
  )
}

export function TherapistGuard({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <AuthGuard requiredRoles={['admin', 'therapist']} fallback={fallback}>
      {children}
    </AuthGuard>
  )
}

export function StaffGuard({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <AuthGuard requiredRoles={['admin', 'therapist', 'assistant']} fallback={fallback}>
      {children}
    </AuthGuard>
  )
}

// Component to show content only when authenticated
export function AuthenticatedOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return null
  }

  if (!isAuthenticated) {
    return fallback ? <>{fallback}</> : null
  }

  return <>{children}</>
}

// Component to show content only when NOT authenticated
export function UnauthenticatedOnly({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return null
  }

  if (isAuthenticated) {
    return null
  }

  return <>{children}</>
}

// Component for role-based rendering
export function RoleBasedRender({ 
  allowedRoles, 
  children, 
  fallback 
}: { 
  allowedRoles: UserRole[]; 
  children: ReactNode; 
  fallback?: ReactNode 
}) {
  const { user, isAuthenticated, isLoading } = useAuth()

  if (isLoading || !isAuthenticated || !user) {
    return fallback ? <>{fallback}</> : null
  }

  const hasRole = allowedRoles.includes(user.role)
  
  if (!hasRole) {
    return fallback ? <>{fallback}</> : null
  }

  return <>{children}</>
}