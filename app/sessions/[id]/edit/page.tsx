"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import { ArrowLeft, Save, Calendar, User, AlertCircle } from "lucide-react"
import Link from "next/link"

// Mock data para sesiones (mismo que en la página de detalle del paciente)
const mockSessions = [
  {
    id: 1,
    patientId: 1,
    patientName: "María González",
    date: "2024-01-15",
    therapist: "Dr. Ana García",
    content: "Sesión enfocada en técnicas de relajación y manejo de ansiedad. Paciente muestra progreso significativo en aplicación de técnicas de respiración. Se trabajó con ejercicios de mindfulness y reestructuración cognitiva. Paciente reporta disminución en episodios de ansiedad."
  },
  {
    id: 2,
    patientId: 1,
    patientName: "María González",
    date: "2024-01-08", 
    therapist: "Dr. Ana García",
    content: "Psicoeducación sobre trastornos de ansiedad. Se explicaron los mecanismos neurobiológicos de la ansiedad y su función adaptativa. Paciente muy receptiva a la información. Se asignaron ejercicios de registro de pensamientos automáticos."
  },
  {
    id: 3,
    patientId: 1,
    patientName: "María González",
    date: "2024-01-01",
    therapist: "Dr. Ana García", 
    content: "Evaluación inicial y establecimiento de rapport. Se realizó anamnesis completa y se establecieron objetivos terapéuticos. Paciente presenta sintomatología compatible con trastorno de ansiedad generalizada. Se explicó el proceso terapéutico y se estableció frecuencia de sesiones."
  }
]

export default function EditSessionPage() {
  const params = useParams()
  const router = useRouter()
  const sessionId = params.id as string

  const [session, setSession] = useState<typeof mockSessions[0] | null>(null)
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (sessionId) {
      const foundSession = mockSessions.find(s => s.id === parseInt(sessionId))
      if (foundSession) {
        setSession(foundSession)
        setContent(foundSession.content)
      } else {
        router.push('/patients')
      }
    }
  }, [sessionId, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulación de guardado
    setTimeout(() => {
      console.log("Contenido actualizado:", content)
      setIsSubmitting(false)
      setShowSuccess(true)
      
      // Redireccionar después de mostrar éxito
      setTimeout(() => {
        router.push(`/patients/${session?.patientId}`)
      }, 2000)
    }, 1500)
  }

  const isFormValid = content.trim() !== ""

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Cargando registro de sesión...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href={`/patients/${session.patientId}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Paciente
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Editar Registro de Sesión</h1>
            <p className="text-gray-600">Modifica el contenido del registro terapéutico</p>
          </div>
        </div>

        {showSuccess && (
          <Card className="border-green-200 bg-green-50 mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-green-700">
                <Save className="h-4 w-4" />
                <span className="font-medium">¡Registro actualizado exitosamente!</span>
              </div>
              <p className="text-sm text-green-600 mt-1">Redirigiendo a la ficha del paciente...</p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Información de la Sesión */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Información de la Sesión
              </CardTitle>
              <CardDescription>Datos no modificables de la sesión</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Paciente</label>
                <p className="text-gray-900 font-medium">{session.patientName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Fecha de Sesión</label>
                <p className="text-gray-900">{session.date}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Terapeuta</label>
                <p className="text-gray-900">{session.therapist}</p>
              </div>
            </CardContent>
          </Card>

          {/* Editor de Contenido */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-purple-600" />
                Contenido del Registro
              </CardTitle>
              <CardDescription>Edita el contenido clínico de la sesión</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="content">Contenido del Registro *</Label>
                  <Textarea
                    id="content"
                    placeholder="Escribe el contenido del registro de la sesión..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={15}
                    className="resize-none"
                  />
                  <p className="text-sm text-gray-500">
                    Incluye observaciones clínicas, técnicas utilizadas, evolución del paciente, etc.
                  </p>
                </div>

                {/* Validación */}
                {!isFormValid && (
                  <Card className="border-orange-200 bg-orange-50">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 text-orange-700">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">
                          El contenido del registro no puede estar vacío
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Botones de Acción */}
                <div className="flex gap-4 pt-4">
                  <Link href={`/patients/${session.patientId}`} className="flex-1">
                    <Button type="button" variant="outline" className="w-full">
                      Cancelar
                    </Button>
                  </Link>
                  <Button 
                    type="submit" 
                    disabled={!isFormValid || isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Guardar Cambios
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 