"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Award, 
  Camera,
  Save,
  Plus,
  X,
  Settings,
  Shield,
  Bell,
  Palette,
  Globe
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/hooks/useAuth"
import AuthGuard from "@/components/auth-guard"
import { TherapistProfile, UserPreferences } from "@/types/auth"

// Validation schemas
const personalInfoSchema = z.object({
  firstName: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido es requerido"),
  bio: z.string().max(500, "La biografía no puede exceder 500 caracteres").optional(),
  phoneNumber: z.string().optional(),
  licenseNumber: z.string().optional(),
  yearsOfExperience: z.number().min(0).max(50).optional()
})

const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  region: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional()
})

const preferencesSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
  language: z.string(),
  timezone: z.string(),
  emailNotifications: z.object({
    appointments: z.boolean(),
    reminders: z.boolean(),
    reports: z.boolean(),
    marketing: z.boolean()
  })
})

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>
type AddressFormData = z.infer<typeof addressSchema>
type PreferencesFormData = z.infer<typeof preferencesSchema>

function ProfilePage() {
  const { user, updateProfile, isLoading } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(user?.profile.specialties || [])
  const [selectedCredentials, setSelectedCredentials] = useState<string[]>(user?.profile.credentials || [])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(user?.profile.languages || [])
  const [newSpecialty, setNewSpecialty] = useState("")
  const [newCredential, setNewCredential] = useState("")
  const [newLanguage, setNewLanguage] = useState("")

  // Form setups
  const personalInfoForm = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: user?.profile.firstName || "",
      lastName: user?.profile.lastName || "",
      bio: user?.profile.bio || "",
      phoneNumber: user?.profile.phoneNumber || "",
      licenseNumber: user?.profile.licenseNumber || "",
      yearsOfExperience: user?.profile.yearsOfExperience || undefined
    }
  })

  const addressForm = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: user?.profile.address?.street || "",
      city: user?.profile.address?.city || "",
      region: user?.profile.address?.region || "",
      zipCode: user?.profile.address?.zipCode || "",
      country: user?.profile.address?.country || "Chile"
    }
  })

  const preferencesForm = useForm<PreferencesFormData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      theme: user?.preferences.theme || 'system',
      language: user?.preferences.language || 'es',
      timezone: user?.preferences.timezone || 'America/Santiago',
      emailNotifications: {
        appointments: user?.preferences.emailNotifications.appointments ?? true,
        reminders: user?.preferences.emailNotifications.reminders ?? true,
        reports: user?.preferences.emailNotifications.reports ?? false,
        marketing: user?.preferences.emailNotifications.marketing ?? false
      }
    }
  })

  if (!user) return null

  // Helper functions for lists
  const addToList = (item: string, list: string[], setList: (list: string[]) => void) => {
    if (item && !list.includes(item)) {
      setList([...list, item])
    }
  }

  const removeFromList = (item: string, list: string[], setList: (list: string[]) => void) => {
    setList(list.filter(i => i !== item))
  }

  // Handle form submissions
  const handlePersonalInfoSubmit = async (data: PersonalInfoFormData) => {
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      const updatedProfile: Partial<TherapistProfile> = {
        firstName: data.firstName,
        lastName: data.lastName,
        bio: data.bio,
        phoneNumber: data.phoneNumber,
        licenseNumber: data.licenseNumber,
        yearsOfExperience: data.yearsOfExperience,
        specialties: selectedSpecialties,
        credentials: selectedCredentials,
        languages: selectedLanguages
      }

      await updateProfile(updatedProfile)
      setSuccess("Información personal actualizada exitosamente")
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar perfil'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddressSubmit = async (data: AddressFormData) => {
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      const updatedProfile: Partial<TherapistProfile> = {
        address: {
          street: data.street || "",
          city: data.city || "",
          region: data.region || "",
          zipCode: data.zipCode || "",
          country: data.country || "Chile"
        }
      }

      await updateProfile(updatedProfile)
      setSuccess("Dirección actualizada exitosamente")
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar dirección'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePreferencesSubmit = async (data: PreferencesFormData) => {
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      // In a real app, this would update user preferences via API
      console.log("Updating preferences:", data)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSuccess("Preferencias actualizadas exitosamente")
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar preferencias'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
            <p className="text-gray-600">Gestiona tu información personal y preferencias</p>
          </div>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Dashboard
            </Button>
          </Link>
        </div>

        {/* Profile Header Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.profile.photo} alt={user.name} />
                  <AvatarFallback className="text-lg">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {user.profile.firstName} {user.profile.lastName}
                </h2>
                <p className="text-gray-600">{user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                    {user.role === 'admin' ? 'Administrador' : 
                     user.role === 'therapist' ? 'Terapeuta' : 'Asistente'}
                  </Badge>
                  <Badge variant={user.isEmailVerified ? 'default' : 'destructive'}>
                    {user.isEmailVerified ? 'Email verificado' : 'Email sin verificar'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Messages */}
        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-700">
              {success}
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Profile Tabs */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="address" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Dirección
            </TabsTrigger>
            <TabsTrigger value="professional" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Profesional
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Preferencias
            </TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Información Personal
                </CardTitle>
                <CardDescription>
                  Actualiza tu información personal básica
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={personalInfoForm.handleSubmit(handlePersonalInfoSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre *</Label>
                      <Input
                        id="firstName"
                        {...personalInfoForm.register("firstName")}
                        disabled={isSubmitting}
                      />
                      {personalInfoForm.formState.errors.firstName && (
                        <p className="text-sm text-red-600">
                          {personalInfoForm.formState.errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellido *</Label>
                      <Input
                        id="lastName"
                        {...personalInfoForm.register("lastName")}
                        disabled={isSubmitting}
                      />
                      {personalInfoForm.formState.errors.lastName && (
                        <p className="text-sm text-red-600">
                          {personalInfoForm.formState.errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Biografía</Label>
                    <Textarea
                      id="bio"
                      placeholder="Describe tu experiencia y especialidades..."
                      rows={4}
                      {...personalInfoForm.register("bio")}
                      disabled={isSubmitting}
                    />
                    {personalInfoForm.formState.errors.bio && (
                      <p className="text-sm text-red-600">
                        {personalInfoForm.formState.errors.bio.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Teléfono</Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="+56 9 xxxx xxxx"
                        {...personalInfoForm.register("phoneNumber")}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="yearsOfExperience">Años de experiencia</Label>
                      <Input
                        id="yearsOfExperience"
                        type="number"
                        min="0"
                        max="50"
                        {...personalInfoForm.register("yearsOfExperience", { valueAsNumber: true })}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {user.role !== 'assistant' && (
                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">Número de licencia</Label>
                      <Input
                        id="licenseNumber"
                        placeholder="Ej: PSI-12345"
                        {...personalInfoForm.register("licenseNumber")}
                        disabled={isSubmitting}
                      />
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !personalInfoForm.formState.isValid}
                    className="w-full md:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Guardar Cambios
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Address Tab */}
          <TabsContent value="address">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Dirección
                </CardTitle>
                <CardDescription>
                  Información de contacto y ubicación
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={addressForm.handleSubmit(handleAddressSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="street">Dirección</Label>
                    <Input
                      id="street"
                      placeholder="Calle y número"
                      {...addressForm.register("street")}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ciudad</Label>
                      <Input
                        id="city"
                        placeholder="Santiago"
                        {...addressForm.register("city")}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="region">Región</Label>
                      <Input
                        id="region"
                        placeholder="Región Metropolitana"
                        {...addressForm.register("region")}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Código postal</Label>
                      <Input
                        id="zipCode"
                        placeholder="8320000"
                        {...addressForm.register("zipCode")}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">País</Label>
                      <Select
                        value={addressForm.watch("country")}
                        onValueChange={(value) => addressForm.setValue("country", value)}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un país" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Chile">Chile</SelectItem>
                          <SelectItem value="Argentina">Argentina</SelectItem>
                          <SelectItem value="Peru">Perú</SelectItem>
                          <SelectItem value="Colombia">Colombia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full md:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Guardar Dirección
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Professional Information Tab */}
          <TabsContent value="professional">
            <div className="space-y-6">
              {/* Specialties */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Especialidades
                  </CardTitle>
                  <CardDescription>
                    Áreas de especialización terapéutica
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Nueva especialidad"
                      value={newSpecialty}
                      onChange={(e) => setNewSpecialty(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addToList(newSpecialty, selectedSpecialties, setSelectedSpecialties)
                          setNewSpecialty("")
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        addToList(newSpecialty, selectedSpecialties, setSelectedSpecialties)
                        setNewSpecialty("")
                      }}
                      disabled={!newSpecialty.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedSpecialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="flex items-center gap-1">
                        {specialty}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 hover:bg-transparent"
                          onClick={() => removeFromList(specialty, selectedSpecialties, setSelectedSpecialties)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Credentials */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Credenciales
                  </CardTitle>
                  <CardDescription>
                    Títulos y certificaciones profesionales
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Nueva credencial"
                      value={newCredential}
                      onChange={(e) => setNewCredential(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addToList(newCredential, selectedCredentials, setSelectedCredentials)
                          setNewCredential("")
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        addToList(newCredential, selectedCredentials, setSelectedCredentials)
                        setNewCredential("")
                      }}
                      disabled={!newCredential.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedCredentials.map((credential) => (
                      <Badge key={credential} variant="secondary" className="flex items-center gap-1">
                        {credential}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 hover:bg-transparent"
                          onClick={() => removeFromList(credential, selectedCredentials, setSelectedCredentials)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Languages */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Idiomas
                  </CardTitle>
                  <CardDescription>
                    Idiomas en los que puedes brindar terapia
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Nuevo idioma"
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addToList(newLanguage, selectedLanguages, setSelectedLanguages)
                          setNewLanguage("")
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        addToList(newLanguage, selectedLanguages, setSelectedLanguages)
                        setNewLanguage("")
                      }}
                      disabled={!newLanguage.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedLanguages.map((language) => (
                      <Badge key={language} variant="secondary" className="flex items-center gap-1">
                        {language}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 hover:bg-transparent"
                          onClick={() => removeFromList(language, selectedLanguages, setSelectedLanguages)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Preferencias
                </CardTitle>
                <CardDescription>
                  Configura tu experiencia en la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={preferencesForm.handleSubmit(handlePreferencesSubmit)} className="space-y-6">
                  {/* Theme */}
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      Tema de la aplicación
                    </Label>
                    <Select
                      value={preferencesForm.watch("theme")}
                      onValueChange={(value: 'light' | 'dark' | 'system') => 
                        preferencesForm.setValue("theme", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Oscuro</SelectItem>
                        <SelectItem value="system">Sistema</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Email Notifications */}
                  <div className="space-y-4">
                    <Label className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      Notificaciones por email
                    </Label>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="font-normal">Citas y sesiones</Label>
                          <p className="text-sm text-gray-500">Recordatorios y confirmaciones</p>
                        </div>
                        <Switch
                          checked={preferencesForm.watch("emailNotifications.appointments")}
                          onCheckedChange={(checked) => 
                            preferencesForm.setValue("emailNotifications.appointments", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="font-normal">Recordatorios</Label>
                          <p className="text-sm text-gray-500">Tareas pendientes y seguimientos</p>
                        </div>
                        <Switch
                          checked={preferencesForm.watch("emailNotifications.reminders")}
                          onCheckedChange={(checked) => 
                            preferencesForm.setValue("emailNotifications.reminders", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="font-normal">Informes de IA</Label>
                          <p className="text-sm text-gray-500">Cuando se generen nuevos informes</p>
                        </div>
                        <Switch
                          checked={preferencesForm.watch("emailNotifications.reports")}
                          onCheckedChange={(checked) => 
                            preferencesForm.setValue("emailNotifications.reports", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="font-normal">Noticias y actualizaciones</Label>
                          <p className="text-sm text-gray-500">Nuevas funcionalidades y promociones</p>
                        </div>
                        <Switch
                          checked={preferencesForm.watch("emailNotifications.marketing")}
                          onCheckedChange={(checked) => 
                            preferencesForm.setValue("emailNotifications.marketing", checked)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full md:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Guardar Preferencias
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function ProtectedProfilePage() {
  return (
    <AuthGuard>
      <ProfilePage />
    </AuthGuard>
  )
}