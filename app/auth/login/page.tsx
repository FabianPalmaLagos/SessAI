"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { Eye, EyeOff, LogIn, Mail } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/hooks/useAuth"
import { LoginCredentials } from "@/types/auth"

// Validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("Formato de email inválido"),
  password: z
    .string()
    .min(1, "La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  rememberMe: z.boolean().optional()
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { login, isAuthenticated, isLoading } = useAuth()

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  })

  const rememberMe = watch("rememberMe")

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/"
    }
  }, [isAuthenticated])

  // Handle form submission
  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const credentials: LoginCredentials = {
        email: data.email.trim().toLowerCase(),
        password: data.password,
        rememberMe: data.rememberMe
      }

      await login(credentials)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error en el login'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
              <LogIn className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Iniciar Sesión</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Accede a tu cuenta de SessAI
          </p>
        </div>

        {/* Demo Credentials Card */}
        <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-blue-800 dark:text-blue-300">
              🚀 Credenciales de Demo
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
              <p><strong>Email:</strong> admin@sessai.com</p>
              <p><strong>Contraseña:</strong> admin123</p>
            </div>
          </CardContent>
        </Card>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl dark:text-gray-100">Bienvenido de vuelta</CardTitle>
            <CardDescription className="dark:text-gray-400">
              Ingresa tus credenciales para acceder
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-gray-200">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                    {...register("email")}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="dark:text-gray-200">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Tu contraseña"
                    className="pr-10 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                    {...register("password")}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setValue("rememberMe", checked as boolean)}
                    disabled={isSubmitting}
                  />
                  <Label 
                    htmlFor="rememberMe" 
                    className="text-sm font-normal cursor-pointer dark:text-gray-300"
                  >
                    Recordarme
                  </Label>
                </div>
                <Link 
                  href="/auth/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              {/* Error Message */}
              {error && (
                <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/50">
                  <AlertDescription className="text-red-700 dark:text-red-400">
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
                    Iniciando sesión...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    Iniciar Sesión
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ¿No tienes una cuenta?{" "}
            <Link 
              href="/auth/register"
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          <p>© 2024 SessAI. Todos los derechos reservados.</p>
          <div className="mt-1 space-x-2">
            <Link href="/privacy" className="hover:text-gray-700 dark:hover:text-gray-300">
              Privacidad
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-gray-700 dark:hover:text-gray-300">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}