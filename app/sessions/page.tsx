"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mic, Play, Brain, Calendar, User } from "lucide-react"
import Link from "next/link"

const mockSessions = [
  {
    id: 1,
    patientName: "María González",
    date: "2024-01-15",
    duration: "50 min",
    type: "Individual",
    hasAudio: true,
    hasTranscription: true,
    notes: "Sesión enfocada en técnicas de relajación y manejo de ansiedad..."
  },
  {
    id: 2,
    patientName: "Carlos Rodríguez",
    date: "2024-01-14",
    duration: "45 min",
    type: "Individual",
    hasAudio: false,
    hasTranscription: false,
    notes: "Trabajo en autoestima y establecimiento de metas personales..."
  },
]

export default function SessionsPage() {

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Historial de Sesiones</h1>
            <p className="text-gray-600">Consulta y gestiona todas las sesiones registradas</p>
          </div>
        </div>

        {/* Info Card */}
        <Card className="border-blue-200 bg-blue-50 mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-blue-700 mb-2">
              <User className="h-4 w-4" />
              <span className="font-medium">¿Cómo crear una nueva sesión?</span>
            </div>
            <p className="text-sm text-blue-600">
              Para registrar una nueva sesión, ve a la ficha del paciente y haz clic en "Nueva Sesión". 
              Esto asegura que la sesión esté correctamente vinculada al paciente.
                    </p>
                </CardContent>
              </Card>

        <div className="space-y-6">
            <div className="space-y-4">
              {mockSessions.map((session) => (
                <Card key={session.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <User className="h-5 w-5 text-blue-600" />
                          {session.patientName}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {session.date}
                          </span>
                          <span>{session.duration}</span>
                          <span>{session.type}</span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{session.notes}</p>

                    <div className="flex items-center gap-2 mb-4">
                      {session.hasAudio && (
                        <Badge variant="outline" className="text-green-600">
                          <Mic className="h-3 w-3 mr-1" />
                          Audio
                        </Badge>
                      )}
                      {session.hasTranscription && (
                        <Badge variant="outline" className="text-purple-600">
                          <Brain className="h-3 w-3 mr-1" />
                          Transcripción IA
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Ver Completa
                      </Button>
                      <Button variant="outline" size="sm">
                        <Brain className="h-4 w-4 mr-1" />
                        Generar Informe
                      </Button>
                      {session.hasAudio && (
                        <Button variant="outline" size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          Reproducir
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
        </div>

        {/* Back to Dashboard */}
        <div className="mt-8">
          <Link href="/">
            <Button variant="outline">← Volver al Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
