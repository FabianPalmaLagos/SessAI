"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, User, Phone, Mail, Calendar, FileText, Plus, Edit, Brain } from "lucide-react"
import Link from "next/link"

// Mock data para pacientes (mismo que en otras páginas)
const mockPatients = [
  {
    id: 1,
    name: "María González",
    rut: "12.345.678-9",
    email: "maria.gonzalez@email.com",
    phone: "+56 9 8765 4321",
    birthDate: "1985-03-15",
    lastSession: "2024-01-15",
    status: "Activo",
    totalSessions: 12,
    address: "Av. Providencia 1234, Santiago",
    emergencyContact: {
      name: "Pedro González",
      phone: "+56 9 8765 4322",
      relationship: "Esposo"
    },
    notes: "Paciente con trastorno de ansiedad generalizada. Responde bien a técnicas de mindfulness y CBT."
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    rut: "98.765.432-1",
    email: "carlos.rodriguez@email.com",
    phone: "+56 9 1234 5678",
    birthDate: "1990-07-22",
    lastSession: "2024-01-10",
    status: "Activo",
    totalSessions: 8,
    address: "Los Leones 987, Providencia",
    emergencyContact: {
      name: "Ana Rodríguez",
      phone: "+56 9 1234 5679",
      relationship: "Madre"
    },
    notes: "Trabajo en autoestima y habilidades sociales. Progreso constante en sesiones grupales."
  },
  {
    id: 3,
    name: "Ana Martínez",
    rut: "11.222.333-4",
    email: "ana.martinez@email.com",
    phone: "+56 9 9876 5432",
    birthDate: "1978-11-08",
    lastSession: "2023-12-20",
    status: "Inactivo",
    totalSessions: 25,
    address: "Santa Magdalena 456, Ñuñoa",
    emergencyContact: {
      name: "Luis Martínez",
      phone: "+56 9 9876 5433",
      relationship: "Hermano"
    },
    notes: "Paciente con depresión mayor. Completó tratamiento de 6 meses con buenos resultados."
  },
]

// Mock data para sesiones del paciente
const mockSessions = [
  {
    id: 1,
    date: "2024-01-15",
    therapist: "Dr. Ana García",
    content: "Sesión enfocada en técnicas de relajación y manejo de ansiedad. Paciente muestra progreso significativo en aplicación de técnicas de respiración. Se trabajó con ejercicios de mindfulness y reestructuración cognitiva. Paciente reporta disminución en episodios de ansiedad."
  },
  {
    id: 2,
    date: "2024-01-08", 
    therapist: "Dr. Ana García",
    content: "Psicoeducación sobre trastornos de ansiedad. Se explicaron los mecanismos neurobiológicos de la ansiedad y su función adaptativa. Paciente muy receptiva a la información. Se asignaron ejercicios de registro de pensamientos automáticos."
  },
  {
    id: 3,
    date: "2024-01-01",
    therapist: "Dr. Ana García", 
    content: "Evaluación inicial y establecimiento de rapport. Se realizó anamnesis completa y se establecieron objetivos terapéuticos. Paciente presenta sintomatología compatible con trastorno de ansiedad generalizada. Se explicó el proceso terapéutico y se estableció frecuencia de sesiones."
  }
]

export default function PatientDetailPage() {
  const params = useParams()
  const router = useRouter()
  const patientId = params.id as string

  const [patient, setPatient] = useState<typeof mockPatients[0] | null>(null)
  const [sessions] = useState(mockSessions)

  useEffect(() => {
    if (patientId) {
      const foundPatient = mockPatients.find(p => p.id === parseInt(patientId))
      if (foundPatient) {
        setPatient(foundPatient)
      } else {
        router.push('/patients')
      }
    }
  }, [patientId, router])

  if (!patient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Cargando información del paciente...</p>
        </div>
      </div>
    )
  }

  const calculateAge = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/patients">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Pacientes
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <User className="h-8 w-8 text-primary" />
              {patient.name}
              <Badge variant={patient.status === "Activo" ? "default" : "secondary"}>
                {patient.status}
              </Badge>
            </h1>
            <p className="text-muted-foreground">Ficha completa del paciente y historial clínico</p>
          </div>
          <div className="flex gap-2">
            <Link href={`/sessions/new?patientId=${patient.id}`}>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nueva Sesión
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">Información General</TabsTrigger>
            <TabsTrigger value="sessions">Historial de Sesiones ({sessions.length})</TabsTrigger>
            <TabsTrigger value="reports">Informes</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Información Personal */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Datos Personales
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">RUT</label>
                      <p className="text-foreground">{patient.rut}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Fecha de Nacimiento</label>
                      <p className="text-foreground">{patient.birthDate} ({calculateAge(patient.birthDate)} años)</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{patient.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{patient.phone}</span>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Dirección</label>
                    <p className="text-foreground">{patient.address}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Contacto de Emergencia */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-destructive" />
                    Contacto de Emergencia
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Nombre</label>
                    <p className="text-foreground">{patient.emergencyContact.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Relación</label>
                    <p className="text-foreground">{patient.emergencyContact.relationship}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Teléfono</label>
                    <p className="text-foreground">{patient.emergencyContact.phone}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Resumen Clínico */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Resumen Clínico
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{patient.totalSessions}</div>
                      <div className="text-sm text-muted-foreground">Sesiones Totales</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{patient.lastSession}</div>
                      <div className="text-sm text-muted-foreground">Última Sesión</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">6 meses</div>
                      <div className="text-sm text-muted-foreground">Tiempo en Tratamiento</div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Notas Clínicas</label>
                    <p className="text-foreground leading-relaxed">{patient.notes}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sessions">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-foreground">Historial de Sesiones</h3>
                <Link href={`/sessions/new?patientId=${patient.id}`}>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Sesión
                  </Button>
                </Link>
              </div>

              {sessions.map((session) => (
                <Card key={session.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-green-600" />
                          Sesión del {session.date}
                        </CardTitle>
                        <CardDescription>
                          Terapeuta: {session.therapist}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link href={`/sessions/${session.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-foreground">Contenido del Registro</label>
                        <p className="text-foreground leading-relaxed">{session.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {sessions.length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No hay sesiones registradas</h3>
                    <p className="text-muted-foreground mb-4">Comienza registrando la primera sesión con este paciente</p>
                    <Link href={`/sessions/new?patientId=${patient.id}`}>
                      <Button>Registrar Primera Sesión</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  Informes y Reportes
                </CardTitle>
                <CardDescription>Documentos generados y análisis del paciente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No hay informes generados</h3>
                  <p className="text-muted-foreground mb-4">Los informes aparecerán aquí cuando se generen con IA</p>
                  <Button variant="outline">
                    <Brain className="h-4 w-4 mr-2" />
                    Generar Informe IA
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 