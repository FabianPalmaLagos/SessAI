"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { Mail, ArrowLeft, Send, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/hooks/useAuth"
import { ForgotPasswordData } from "@/types/auth"

// Validation schema
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("Formato de email inválido")
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submittedEmail, setSubmittedEmail] = useState("")
  
  const { forgotPassword, isAuthenticated, isLoading } = useAuth()

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
    defaultValues: {
      email: ""
    }
  })

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/"
    }
  }, [isAuthenticated])

  // Handle form submission
  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const forgotPasswordData: ForgotPasswordData = {
        email: data.email.trim().toLowerCase()
      }

      await forgotPassword(forgotPasswordData)
      setSubmittedEmail(data.email)
      setIsSuccess(true)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al enviar email de recuperación'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle resend email
  const handleResend = async () => {
    if (!submittedEmail) return

    setIsSubmitting(true)
    setError(null)

    try {
      await forgotPassword({ email: submittedEmail })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al reenviar email'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Success state
  if (isSuccess) {
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
            <h1 className="text-2xl font-bold text-gray-900">Email Enviado</h1>
            <p className="text-gray-600 mt-2">
              Revisa tu bandeja de entrada
            </p>
          </div>

          {/* Success Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-center">¡Revisa tu email!</CardTitle>
              <CardDescription className="text-center">
                Te hemos enviado las instrucciones para restablecer tu contraseña
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Email enviado a:</strong>
                  </p>
                  <p className="text-sm font-medium text-green-900 mt-1">
                    {submittedEmail}
                  </p>
                </div>

                <div className="text-sm text-gray-600 space-y-2">
                  <p>
                    Si no recibes el email en los próximos minutos:
                  </p>
                  <ul className="text-left space-y-1 text-xs">
                    <li>• Revisa tu carpeta de spam o correo no deseado</li>
                    <li>• Verifica que el email sea correcto</li>
                    <li>• Intenta reenviar el mensaje</li>
                  </ul>
                </div>

                {/* Error message for resend */}
                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Actions */}
                <div className="space-y-3">
                  <Button
                    onClick={handleResend}
                    variant="outline"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
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

                  <Button asChild variant="ghost" className="w-full">
                    <Link href="/auth/login">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Volver al Login
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500">
            <p>¿Necesitas ayuda? Contacta a soporte técnico</p>
          </div>
        </div>
      </div>
    )
  }

  // Form state
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
              <Mail className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Recuperar Contraseña</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Te enviaremos un enlace para restablecer tu contraseña
          </p>
        </div>

        {/* Forgot Password Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">¿Olvidaste tu contraseña?</CardTitle>
            <CardDescription>
              Ingresa tu email para recibir las instrucciones de recuperación
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="pl-10"
                    {...register("email")}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Instructions */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Instrucciones:</strong>
                </p>
                <ul className="text-xs text-blue-700 mt-1 space-y-1">
                  <li>• Ingresa el email asociado a tu cuenta</li>
                  <li>• Recibirás un enlace de recuperación por email</li>
                  <li>• El enlace será válido por 24 horas</li>
                  <li>• Revisa tu carpeta de spam si no lo encuentras</li>
                </ul>
              </div>

              {/* Error Message */}
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Enlace de Recuperación
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Back to Login */}
        <div className="text-center">
          <Button asChild variant="ghost" className="text-sm">
            <Link href="/auth/login">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Login
            </Link>
          </Button>
        </div>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link 
              href="/auth/register"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>© 2024 SessAI. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  )
}