"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { Eye, EyeOff, UserPlus, Mail, User, Shield, Plus, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/hooks/useAuth"
import { RegisterData, UserRole } from "@/types/auth"

// Validation schema
const registerSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("Formato de email inválido"),
  password: z
    .string()
    .min(1, "La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/(?=.*[a-z])/, "La contraseña debe contener al menos una letra minúscula")
    .regex(/(?=.*[A-Z])/, "La contraseña debe contener al menos una letra mayúscula")
    .regex(/(?=.*\d)/, "La contraseña debe contener al menos un número"),
  confirmPassword: z
    .string()
    .min(1, "Confirma tu contraseña"),
  role: z.enum(["admin", "therapist", "assistant"] as const, {
    required_error: "Selecciona un rol"
  }),
  licenseNumber: z.string().optional(),
  acceptTerms: z
    .boolean()
    .refine(val => val === true, "Debes aceptar los términos y condiciones")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"]
})

type RegisterFormData = z.infer<typeof registerSchema>

// Default specialties for therapists
const defaultSpecialties = [
  "Psicología Clínica",
  "Terapia Cognitivo-Conductual",
  "Psicoanálisis",
  "Terapia Familiar",
  "Terapia de Pareja",
  "Psicología Infantil",
  "Neuropsicología",
  "Psicología Forense",
  "Terapia Gestalt",
  "Mindfulness y Meditación"
]

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [newSpecialty, setNewSpecialty] = useState("")
  
  const { register: registerUser, isAuthenticated, isLoading } = useAuth()

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    trigger
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "therapist",
      licenseNumber: "",
      acceptTerms: false
    }
  })

  const watchedRole = watch("role")
  const watchedPassword = watch("password")

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/"
    }
  }, [isAuthenticated])

  // Add specialty
  const addSpecialty = (specialty: string) => {
    if (specialty && !selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties([...selectedSpecialties, specialty])
    }
    setNewSpecialty("")
  }

  // Remove specialty
  const removeSpecialty = (specialty: string) => {
    setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty))
  }

  // Get password strength
  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return { strength: "weak", color: "red" }
    if (password.length < 10) return { strength: "medium", color: "yellow" }
    return { strength: "strong", color: "green" }
  }

  const passwordStrength = getPasswordStrength(watchedPassword || "")

  // Handle form submission
  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const registerData: RegisterData = {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: data.role,
        specialties: selectedSpecialties.length > 0 ? selectedSpecialties : undefined,
        licenseNumber: data.licenseNumber?.trim() || undefined,
        acceptTerms: data.acceptTerms
      }

      await registerUser(registerData)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error en el registro'
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
      <div className="w-full max-w-2xl space-y-6">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
              <UserPlus className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Crear Cuenta</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Únete a SessAI y comienza a gestionar tus sesiones terapéuticas
          </p>
        </div>

        {/* Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl dark:text-gray-100">Información de Registro</CardTitle>
            <CardDescription className="dark:text-gray-400">
              Completa los siguientes datos para crear tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Tu nombre completo"
                      className="pl-10"
                      {...register("name")}
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
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
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role">Rol en la plataforma *</Label>
                <Select
                  value={watchedRole}
                  onValueChange={(value: UserRole) => setValue("role", value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona tu rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="therapist">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>Terapeuta</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span>Administrador</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="assistant">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>Asistente</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-sm text-red-600">{errors.role.message}</p>
                )}
              </div>

              {/* License Number (conditional) */}
              {(watchedRole === "therapist" || watchedRole === "admin") && (
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">
                    Número de licencia profesional {watchedRole === "therapist" && "*"}
                  </Label>
                  <Input
                    id="licenseNumber"
                    type="text"
                    placeholder="Ej: PSI-12345"
                    {...register("licenseNumber")}
                    disabled={isSubmitting}
                  />
                  {errors.licenseNumber && (
                    <p className="text-sm text-red-600">{errors.licenseNumber.message}</p>
                  )}
                </div>
              )}

              {/* Specialties (for therapists) */}
              {watchedRole === "therapist" && (
                <div className="space-y-2">
                  <Label>Especialidades</Label>
                  <div className="space-y-3">
                    {/* Add new specialty */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Agregar especialidad personalizada"
                        value={newSpecialty}
                        onChange={(e) => setNewSpecialty(e.target.value)}
                        disabled={isSubmitting}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            addSpecialty(newSpecialty)
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addSpecialty(newSpecialty)}
                        disabled={!newSpecialty.trim() || isSubmitting}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Default specialties */}
                    <div className="flex flex-wrap gap-2">
                      {defaultSpecialties.map((specialty) => (
                        <Button
                          key={specialty}
                          type="button"
                          variant={selectedSpecialties.includes(specialty) ? "default" : "outline"}
                          size="sm"
                          onClick={() => 
                            selectedSpecialties.includes(specialty)
                              ? removeSpecialty(specialty)
                              : addSpecialty(specialty)
                          }
                          disabled={isSubmitting}
                        >
                          {specialty}
                        </Button>
                      ))}
                    </div>

                    {/* Selected specialties */}
                    {selectedSpecialties.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm">Especialidades seleccionadas:</Label>
                        <div className="flex flex-wrap gap-2">
                          {selectedSpecialties.map((specialty) => (
                            <Badge key={specialty} variant="secondary" className="flex items-center gap-1">
                              {specialty}
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-auto p-0 hover:bg-transparent"
                                onClick={() => removeSpecialty(specialty)}
                                disabled={isSubmitting}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Tu contraseña"
                      className="pr-10"
                      {...register("password")}
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
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
                  {/* Password strength indicator */}
                  {watchedPassword && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-full rounded-full bg-gray-200`}>
                          <div
                            className={`h-2 rounded-full ${
                              passwordStrength.color === "red" ? "bg-red-500 w-1/3" :
                              passwordStrength.color === "yellow" ? "bg-yellow-500 w-2/3" :
                              "bg-green-500 w-full"
                            }`}
                          />
                        </div>
                        <span className={`text-xs font-medium ${
                          passwordStrength.color === "red" ? "text-red-600" :
                          passwordStrength.color === "yellow" ? "text-yellow-600" :
                          "text-green-600"
                        }`}>
                          {passwordStrength.strength === "weak" ? "Débil" :
                           passwordStrength.strength === "medium" ? "Media" : "Fuerte"}
                        </span>
                      </div>
                    </div>
                  )}
                  {errors.password && (
                    <p className="text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar contraseña *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirma tu contraseña"
                      className="pr-10"
                      {...register("confirmPassword")}
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isSubmitting}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="acceptTerms"
                  {...register("acceptTerms")}
                  disabled={isSubmitting}
                />
                <Label htmlFor="acceptTerms" className="text-sm leading-relaxed cursor-pointer">
                  Acepto los{" "}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                    términos y condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                    política de privacidad
                  </Link>
                </Label>
              </div>
              {errors.acceptTerms && (
                <p className="text-sm text-red-600">{errors.acceptTerms.message}</p>
              )}

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
                    Creando cuenta...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Crear Cuenta
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ¿Ya tienes una cuenta?{" "}
            <Link 
              href="/auth/login"
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          <p>© 2024 SessAI. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  )
}