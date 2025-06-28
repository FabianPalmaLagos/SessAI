"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic, Upload, FileText, Play, Pause, Brain, Calendar, User } from "lucide-react"
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
    notes: "Sesión enfocada en técnicas de relajación y manejo de ansiedad...",
    status: "Completada",
  },
  {
    id: 2,
    patientName: "Carlos Rodríguez",
    date: "2024-01-14",
    duration: "45 min",
    type: "Individual",
    hasAudio: false,
    hasTranscription: false,
    notes: "Trabajo en autoestima y establecimiento de metas personales...",
    status: "Completada",
  },
]

export default function SessionsPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [sessionNotes, setSessionNotes] = useState("")
  const [selectedPatient, setSelectedPatient] = useState("")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Registro de Sesiones</h1>
            <p className="text-gray-600">Grabación, transcripción automática y registro multimodal</p>
          </div>
          <Link href="/sessions/new">
            <Button className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Nueva Sesión
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="new-session" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new-session">Nueva Sesión</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="new-session">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recording Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mic className="h-5 w-5 text-red-600" />
                    Grabación de Audio
                  </CardTitle>
                  <CardDescription>Graba la sesión para transcripción automática con IA</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div
                      className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center ${
                        isRecording ? "bg-red-100 animate-pulse" : "bg-gray-100"
                      }`}
                    >
                      <Mic className={`h-8 w-8 ${isRecording ? "text-red-600" : "text-gray-400"}`} />
                    </div>

                    {isRecording && (
                      <div className="text-2xl font-mono text-red-600 mb-4">
                        {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, "0")}
                      </div>
                    )}

                    <Button
                      onClick={() => setIsRecording(!isRecording)}
                      variant={isRecording ? "destructive" : "default"}
                      className="w-full mb-2"
                    >
                      {isRecording ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Detener Grabación
                        </>
                      ) : (
                        <>
                          <Mic className="h-4 w-4 mr-2" />
                          Iniciar Grabación
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">O subir archivo de audio</h4>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Upload className="h-4 w-4 mr-2" />
                      Subir Audio
                    </Button>
                  </div>

                  {isRecording && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-blue-700">
                        <Brain className="h-4 w-4" />
                        <span className="font-medium">IA Activa</span>
                      </div>
                      <p className="text-sm text-blue-600 mt-1">
                        La transcripción automática se iniciará al finalizar la grabación
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Session Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    Notas de Sesión
                  </CardTitle>
                  <CardDescription>Registro manual complementario</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Paciente</label>
                    <Input placeholder="Seleccionar paciente..." />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Fecha y Hora</label>
                    <Input type="datetime-local" />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Notas de la Sesión</label>
                    <Textarea
                      placeholder="Escribe tus observaciones, técnicas utilizadas, progreso del paciente..."
                      value={sessionNotes}
                      onChange={(e) => setSessionNotes(e.target.value)}
                      rows={8}
                    />
                  </div>

                  <Button className="w-full">
                    <Brain className="h-4 w-4 mr-2" />
                    Estructurar con IA
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* AI Transcription Preview */}
            {isRecording && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    Transcripción en Tiempo Real (IA)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg min-h-[100px]">
                    <p className="text-gray-600 italic">
                      La transcripción aparecerá aquí automáticamente mientras grabas...
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history">
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
                      <Badge>{session.status}</Badge>
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
          </TabsContent>
        </Tabs>

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
