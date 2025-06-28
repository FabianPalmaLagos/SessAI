"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { User, Save, ArrowLeft, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface PatientFormData {
  // Datos Personales
  name: string
  rut: string
  email: string
  phone: string
  birthDate: string
  address: string
  emergencyContact: string
  emergencyPhone: string
}

export default function NewPatientPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<PatientFormData>({
    name: "",
    rut: "",
    email: "",
    phone: "",
    birthDate: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: ""
  })

  const handleInputChange = (field: keyof PatientFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulamos el envío del formulario
    setTimeout(() => {
      console.log("Datos del nuevo paciente:", formData)
      setIsSubmitting(false)
      // Redirigir a la lista de pacientes después del registro exitoso
      router.push("/patients")
    }, 2000)
  }

  const isFormValid = formData.name.trim() !== ""

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/patients">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Registro de Nuevo Paciente</h1>
            <p className="text-gray-600">Completa la información del paciente para crear su ficha</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Datos Personales */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Datos Personales
              </CardTitle>
              <CardDescription>Información básica del paciente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo *</Label>
                  <Input
                    id="name"
                    placeholder="Ingresa el nombre completo"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rut">RUT</Label>
                  <Input
                    id="rut"
                    placeholder="12.345.678-9"
                    value={formData.rut}
                    onChange={(e) => handleInputChange("rut", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="paciente@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    placeholder="+56 9 8765 4321"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    placeholder="Calle, número, comuna"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Contacto de Emergencia</Label>
                  <Input
                    id="emergencyContact"
                    placeholder="Nombre del contacto"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Teléfono de Emergencia</Label>
                  <Input
                    id="emergencyPhone"
                    placeholder="+56 9 1234 5678"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>



          {/* Validación y Botones */}
          {!isFormValid && (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="pt-6">
                              <div className="flex items-center gap-2 text-orange-700">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">Por favor ingresa el nombre del paciente</span>
              </div>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-4 justify-end">
            <Link href="/patients">
              <Button variant="outline" type="button">
                Cancelar
              </Button>
            </Link>
            <Button 
              type="submit" 
              disabled={!isFormValid || isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Registrar Paciente
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 