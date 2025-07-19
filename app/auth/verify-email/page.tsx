"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Mail, CheckCircle, XCircle, ArrowLeft, Send, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/hooks/useAuth"
import { VerifyEmailData } from "@/types/auth"

type VerificationState = 'pending' | 'verifying' | 'success' | 'error' | 'expired'

export default function VerifyEmailPage() {
  const [verificationState, setVerificationState] = useState<VerificationState>('pending')
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const searchParams = useSearchParams()
  const router = useRouter()
  const { verifyEmail, user, isAuthenticated, isLoading } = useAuth()

  const token = searchParams.get('token')
  const email = searchParams.get('email') || user?.email

  // Auto-verify if token is present
  useEffect(() => {
    if (token) {
      handleVerification(token)
    }
  }, [token])

  // Handle email verification
  const handleVerification = async (verificationToken: string) => {
    setVerificationState('verifying')
    setError(null)

    try {
      const verifyData: VerifyEmailData = {
        token: verificationToken
      }

      await verifyEmail(verifyData)
      setVerificationState('success')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al verificar email'
      setError(message)
      
      // Check if token is expired
      if (message.toLowerCase().includes('expired') || message.toLowerCase().includes('expirado')) {
        setVerificationState('expired')
      } else {
        setVerificationState('error')
      }
    }
  }

  // Handle resend verification email
  const handleResendVerification = async () => {
    if (!email) {
      setError('No se encontró el email para reenviar la verificación')
      return
    }

    setIsResending(true)
    setError(null)

    try {
      // In a real app, this would call an API to resend verification email
      await new Promise(resolve => setTimeout(resolve, 1000))
      // For demo purposes, we'll simulate success
      alert('Email de verificación reenviado. Revisa tu bandeja de entrada.')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al reenviar email'
      setError(message)
    } finally {
      setIsResending(false)
    }
  }

  // Redirect to dashboard if already verified
  useEffect(() => {
    if (isAuthenticated && user?.isEmailVerified && verificationState !== 'success') {
      router.push('/')
    }
  }, [isAuthenticated, user?.isEmailVerified, verificationState, router])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Verifying state
  if (verificationState === 'verifying') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Verificando Email...
                </h3>
                <p className="text-sm text-gray-600">
                  Por favor espera mientras verificamos tu email
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Success state
  if (verificationState === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 bg-green-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">¡Email Verificado!</h1>
            <p className="text-gray-600 mt-2">
              Tu cuenta ha sido verificada exitosamente
            </p>
          </div>

          {/* Success Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-center text-green-700">
                Verificación Exitosa
              </CardTitle>
              <CardDescription className="text-center">
                Ya puedes acceder a todas las funcionalidades de SessAI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    Tu email <strong>{email}</strong> ha sido verificado correctamente.
                  </p>
                </div>

                {/* Continue Button */}
                <Button asChild className="w-full">
                  <Link href="/">
                    Continuar al Dashboard
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Error or expired state
  if (verificationState === 'error' || verificationState === 'expired') {
    const isExpired = verificationState === 'expired'
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className={`h-12 w-12 ${isExpired ? 'bg-yellow-600' : 'bg-red-600'} rounded-lg flex items-center justify-center`}>
                {isExpired ? (
                  <AlertTriangle className="h-6 w-6 text-white" />
                ) : (
                  <XCircle className="h-6 w-6 text-white" />
                )}
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isExpired ? 'Enlace Expirado' : 'Error de Verificación'}
            </h1>
            <p className="text-gray-600 mt-2">
              {isExpired 
                ? 'El enlace de verificación ha caducado'
                : 'No pudimos verificar tu email'
              }
            </p>
          </div>

          {/* Error Card */}
          <Card>
            <CardHeader>
              <CardTitle className={`text-xl text-center ${isExpired ? 'text-yellow-700' : 'text-red-700'}`}>
                {isExpired ? 'Enlace Caducado' : 'Verificación Fallida'}
              </CardTitle>
              <CardDescription className="text-center">
                {isExpired 
                  ? 'Necesitas solicitar un nuevo enlace de verificación'
                  : 'Hubo un problema al verificar tu email'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Error message */}
              {error && (
                <Alert className={`border-${isExpired ? 'yellow' : 'red'}-200 bg-${isExpired ? 'yellow' : 'red'}-50`}>
                  <AlertDescription className={`text-${isExpired ? 'yellow' : 'red'}-700`}>
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="text-center space-y-4">
                {isExpired && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      Los enlaces de verificación son válidos por 24 horas por seguridad.
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-3">
                  {email && (
                    <Button
                      onClick={handleResendVerification}
                      className="w-full"
                      disabled={isResending}
                    >
                      {isResending ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Reenviar Email de Verificación
                        </>
                      )}
                    </Button>
                  )}

                  <Button asChild variant="outline" className="w-full">
                    <Link href="/auth/login">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Volver al Login
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Pending state (no token, user needs to check email)
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
              <Mail className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Verifica tu Email</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Revisa tu bandeja de entrada y haz clic en el enlace de verificación
          </p>
        </div>

        {/* Instructions Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-center">¡Ya casi terminamos!</CardTitle>
            <CardDescription className="text-center">
              Te hemos enviado un email de verificación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-4">
              {email && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Email enviado a:</strong>
                  </p>
                  <p className="text-sm font-medium text-blue-900 mt-1">
                    {email}
                  </p>
                </div>
              )}

              <div className="text-sm text-gray-600 space-y-2">
                <p className="font-medium">Instrucciones:</p>
                <ul className="text-left space-y-1 text-xs">
                  <li>1. Revisa tu bandeja de entrada</li>
                  <li>2. Busca el email de verificación de SessAI</li>
                  <li>3. Haz clic en el enlace de verificación</li>
                  <li>4. Regresa aquí una vez verificado</li>
                </ul>
              </div>

              <div className="text-xs text-gray-500">
                <p>¿No encuentras el email? Revisa tu carpeta de spam</p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                {email && (
                  <Button
                    onClick={handleResendVerification}
                    variant="outline"
                    className="w-full"
                    disabled={isResending}
                  >
                    {isResending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2" />
                        Reenviando...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Reenviar Email
                      </>
                    )}
                  </Button>
                )}

                <Button asChild variant="ghost" className="w-full">
                  <Link href="/">
                    Continuar sin verificar (limitado)
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>¿Problemas con la verificación? Contacta a soporte</p>
        </div>
      </div>
    </div>
  )
}