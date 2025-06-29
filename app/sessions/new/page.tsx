"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RichTextEditor } from "@/components/ui/rich-text-editor"
import { ArrowLeft, Mic, Upload, Pause, Brain, User, Save, AlertCircle, FileText, Mail, Phone, Sparkles, Undo2 } from "lucide-react"
import Link from "next/link"

// Mock data para pacientes (igual que en la ficha del paciente)
const mockPatients = [
  {
    id: 1,
    name: "María González",
    rut: "12.345.678-9",
    email: "maria.gonzalez@email.com",
    phone: "+56 9 8765 4321",
    status: "Activo",
    totalSessions: 12,
    birthDate: "1985-03-15",
    address: "Av. Providencia 1234, Santiago",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    rut: "98.765.432-1",
    email: "carlos.rodriguez@email.com",
    phone: "+56 9 1234 5678",
    status: "Activo",
    totalSessions: 8,
    birthDate: "1990-07-22",
    address: "Los Leones 987, Providencia",
  },
]

interface SessionFormData {
  patientId: string
  sessionDate: string
  sessionTime: string
  sessionContent: string
}

export default function NewSessionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const patientIdParam = searchParams.get('patientId')

  const [selectedPatient, setSelectedPatient] = useState<typeof mockPatients[0] | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  const [isStructuring, setIsStructuring] = useState(false)
  const [showAIModal, setShowAIModal] = useState(false)
  const [originalContent, setOriginalContent] = useState("")
  const [structuredContent, setStructuredContent] = useState("")
  const [contentWasReplaced, setContentWasReplaced] = useState(false)

  const [formData, setFormData] = useState<SessionFormData>({
    patientId: patientIdParam || "",
    sessionDate: new Date().toISOString().split('T')[0],
    sessionTime: new Date().toTimeString().slice(0, 5),
    sessionContent: ""
  })

  useEffect(() => {
    if (patientIdParam) {
      const patient = mockPatients.find(p => p.id === parseInt(patientIdParam))
      if (patient) {
        setSelectedPatient(patient)
        setFormData(prev => ({ ...prev, patientId: patientIdParam }))
      }
    }
  }, [patientIdParam])

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>
    if (isRecording) {
      interval = setInterval(() => setRecordingTime(prev => prev + 1), 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return ''
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const handleStructureWithAI = () => {
    if (!formData.sessionContent.trim()) return
    
    setOriginalContent(formData.sessionContent)
    setIsStructuring(true)

    // Simular llamada a API de IA
    setTimeout(() => {
      const structuredText = `<h3>Temas Tratados</h3>
<ul>
  <li><p>El paciente expresó sentimientos de <strong>ansiedad</strong> relacionados con su trabajo.</p></li>
  <li><p>Se discutió la dificultad para establecer <strong>límites</strong> con familiares.</p></li>
  <li><p>Exploración de patrones de <strong>sueño</strong> y su impacto en el estado de ánimo.</p></li>
</ul>
<h3>Técnicas Utilizadas</h3>
<ul>
  <li><p>Se aplicó la técnica de <em>reestructuración cognitiva</em> para abordar pensamientos negativos.</p></li>
  <li><p>Ejercicio de <em>respiración diafragmática</em> para manejo de la ansiedad en el momento.</p></li>
</ul>
<h3>Observaciones del Terapeuta</h3>
<ul>
  <li><p>El paciente muestra alta motivación para el cambio, pero lucha con la <strong>autocrítica</strong>.</p></li>
  <li><p>Se observa una tendencia a <em>minimizar sus logros</em>.</p></li>
</ul>
<h3>Plan para la Próxima Sesión</h3>
<ul>
  <li><p>Revisar el registro de pensamientos automáticos (tarea asignada).</p></li>
  <li><p>Profundizar en técnicas de comunicación asertiva.</p></li>
</ul>`
      
      setStructuredContent(structuredText)
      setIsStructuring(false)
      setShowAIModal(true)
    }, 1500)
  }

  const handleAcceptAIContent = () => {
    handleInputChange('sessionContent', structuredContent)
    setContentWasReplaced(true)
    setShowAIModal(false)
  }
  
  const handleUndoReplace = () => {
    handleInputChange('sessionContent', originalContent)
    setContentWasReplaced(false)
  }

  const handleInputChange = <K extends keyof SessionFormData>(field: K, value: SessionFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      console.log("Datos de la sesión:", formData)
      setIsSubmitting(false)
      setShowSuccess(true)
      setTimeout(() => router.push(`/patients/${formData.patientId}`), 2000)
    }, 1500)
  }

  const isFormValid = formData.patientId && formData.sessionContent.trim() !== ""

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Nueva Sesión Terapéutica</h1>
            <p className="text-muted-foreground">Registra una nueva sesión con grabación y transcripción automática</p>
          </div>
        </div>

        {showSuccess && (
          <Card className="border-green-200 bg-green-50 mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-green-700">
                <Save className="h-4 w-4" />
                <span className="font-medium">¡Sesión guardada exitosamente!</span>
              </div>
              <p className="text-sm text-green-600 mt-1">Redirigiendo a la ficha del paciente...</p>
            </CardContent>
          </Card>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {selectedPatient && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-blue-600" />Resumen del Paciente</CardTitle>
                <CardDescription>Información del paciente seleccionado para esta sesión.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 text-sm">
                  <div>
                    <Label className="text-muted-foreground">Nombre</Label>
                    <p className="font-medium text-foreground">{selectedPatient.name}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">RUT</Label>
                    <p className="font-medium text-foreground">{selectedPatient.rut}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Nacimiento</Label>
                    <p className="font-medium text-foreground">{selectedPatient.birthDate} ({calculateAge(selectedPatient.birthDate)} años)</p>
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-muted-foreground">Contacto</Label>
                    <div className="flex items-center gap-6 mt-1">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">{selectedPatient.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">{selectedPatient.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-3">
                    <Label className="text-muted-foreground">Dirección</Label>
                    <p className="font-medium text-foreground">{selectedPatient.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-purple-600" />Detalles de la Sesión</CardTitle>
              <CardDescription>Configura los parámetros básicos de la sesión</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="sessionDate">Fecha *</Label>
                <Input id="sessionDate" type="date" value={formData.sessionDate} onChange={e => handleInputChange('sessionDate', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sessionTime">Hora *</Label>
                <Input id="sessionTime" type="time" value={formData.sessionTime} onChange={e => handleInputChange('sessionTime', e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Mic className="h-5 w-5 text-red-600" />Grabación de Audio (Opcional)</CardTitle>
              <CardDescription>Graba la sesión para transcripción y análisis con IA</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center ${isRecording ? "bg-red-100 dark:bg-red-900/20" : "bg-muted"}`}>
                <Mic className={`h-8 w-8 ${isRecording ? "text-red-600 dark:text-red-400" : "text-muted-foreground"}`} />
              </div>
              {isRecording && <div className="text-2xl font-mono text-red-600 dark:text-red-400 mb-4">{new Date(recordingTime * 1000).toISOString().substr(14, 5)}</div>}
              <div className="flex gap-4 justify-center">
                <Button type="button" onClick={() => setIsRecording(prev => !prev)} variant={isRecording ? "destructive" : "secondary"}>
                  {isRecording ? <><Pause className="h-4 w-4 mr-2" />Detener</> : <><Mic className="h-4 w-4 mr-2" />Iniciar Grabación</>}
                </Button>
                <Button type="button" variant="outline"><Upload className="h-4 w-4 mr-2" />Subir Audio</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2"><Brain className="h-5 w-5 text-green-600" />Contenido de la Sesión</CardTitle>
                  <CardDescription>Registra los aspectos clínicos y terapéuticos de la sesión</CardDescription>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button type="button" variant="outline" size="icon" onClick={handleStructureWithAI} disabled={isStructuring}>
                        {isStructuring ? <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" /> : <Sparkles className="h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Estructurar con IA</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="sessionContent">Registro Clínico *</Label>
                  {contentWasReplaced && (
                    <Button type="button" variant="ghost" size="sm" onClick={handleUndoReplace} className="text-xs">
                      <Undo2 className="h-3 w-3 mr-1" />
                      Deshacer reemplazo
                    </Button>
                  )}
                </div>
                <RichTextEditor
                  value={formData.sessionContent}
                  onChange={(content) => handleInputChange('sessionContent', content)}
                />
              </div>
            </CardContent>
          </Card>

          {!isFormValid && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Campos Incompletos</AlertTitle>
              <AlertDescription>
                Debes seleccionar un paciente y completar el registro clínico para poder guardar.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
            <Button type="submit" disabled={!isFormValid || isSubmitting}>
              {isSubmitting ? (
                <><div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />Guardando...</>
              ) : (
                <><Save className="h-4 w-4 mr-2" />Guardar Sesión</>
              )}
            </Button>
          </div>
        </form>

        <Dialog open={showAIModal} onOpenChange={setShowAIModal}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                Asistente de Documentación IA
              </DialogTitle>
              <DialogDescription>
                La IA ha estructurado tus notas. Puedes editar el resultado antes de aceptarlo.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
              <div className="space-y-2">
                <Label>Resultado Estructurado:</Label>
                <RichTextEditor 
                  value={structuredContent}
                  onChange={setStructuredContent}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setShowAIModal(false)}>Cancelar</Button>
              <Button onClick={handleAcceptAIContent}>Aceptar y Reemplazar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
} 