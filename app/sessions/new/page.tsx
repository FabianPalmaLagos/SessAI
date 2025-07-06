"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RichTextEditor } from "@/components/ui/rich-text-editor"
import { ArrowLeft, Mic, Upload, Pause, Brain, User, Save, AlertCircle, FileText, Mail, Phone, Sparkles, Undo2, Search } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data para pacientes
const mockPatients = [
  {
    id: 1,
    name: "María González",
    rut: "12.345.678-9",
    email: "maria.gonzalez@email.com",
    phone: "+56 9 8765 4321",
    status: "Activo" as const,
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
    status: "Activo" as const,
    totalSessions: 8,
    birthDate: "1990-07-22",
    address: "Los Leones 987, Providencia",
  },
  {
    id: 3,
    name: "Ana López",
    rut: "15.987.654-3",
    email: "ana.lopez@email.com",
    phone: "+56 9 5555 4444",
    status: "Inactivo" as const,
    totalSessions: 25,
    birthDate: "1992-11-30",
    address: "Calle Falsa 123, Ñuñoa",
  },
]

interface Patient {
  id: number;
  name: string;
  rut?: string;
  email?: string;
  phone?: string;
  status: 'Activo' | 'Inactivo';
  totalSessions: number;
  birthDate?: string;
  address?: string;
}

interface SessionFormData {
  patientId: string
  sessionDate: string
  sessionTime: string
  sessionContent: string
}

export default function NewSessionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialPatientId = searchParams.get('patientId')
  const initialPatient = initialPatientId
    ? mockPatients.find(p => p.id === parseInt(initialPatientId, 10)) || null
    : null;

  const [patients] = useState<Patient[]>(mockPatients)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(initialPatient)
  
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
    patientId: initialPatientId || "",
    sessionDate: new Date().toISOString().split('T')[0],
    sessionTime: new Date().toTimeString().slice(0, 5),
    sessionContent: ""
  })
  
  const filteredPatients = useMemo(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    if (!lowercasedSearchTerm) {
      return patients;
    }
    return patients.filter(patient => {
      const nameMatch = patient.name.toLowerCase().includes(lowercasedSearchTerm);
      const rutMatch = !!patient.rut && patient.rut.toLowerCase().includes(lowercasedSearchTerm);
      return nameMatch || rutMatch;
    });
  }, [searchTerm, patients])

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient)
    setFormData(prev => ({ ...prev, patientId: patient.id.toString() }))
    router.push(`/sessions/new?patientId=${patient.id}`, { scroll: false });
  }

  const handleDeselectPatient = () => {
    setSelectedPatient(null)
    setFormData(prev => ({ 
      ...prev, 
      patientId: "", 
      sessionContent: "" 
    }))
    router.push('/sessions/new', { scroll: false });
  }

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
          <Button variant="outline" size="sm" onClick={() => selectedPatient ? handleDeselectPatient() : router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {selectedPatient ? "Cambiar Paciente" : "Volver"}
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Nueva Sesión Terapéutica</h1>
            <p className="text-muted-foreground">
              {selectedPatient ? `Registrando sesión para ${selectedPatient.name}` : "Busca y selecciona un paciente para comenzar"}
            </p>
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

        {!selectedPatient ? (
          <>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar por nombre o RUT del paciente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="border rounded-lg">
              <div className="max-h-[60vh] overflow-y-auto">
                {filteredPatients.map((patient, index) => (
                  <div 
                    key={patient.id} 
                    onClick={() => handleSelectPatient(patient)}
                    className={`p-4 cursor-pointer hover:bg-muted flex justify-between items-center ${index > 0 ? 'border-t' : ''}`}
                  >
                    <div>
                      <p className="font-semibold">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">{patient.rut}</p>
                    </div>
                    <Button variant="outline" size="sm">Seleccionar</Button>
                  </div>
                ))}
              </div>
              {filteredPatients.length === 0 && (
                <div className="text-center p-8">
                  <p className="text-muted-foreground">No se encontraron pacientes.</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
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
                    <CardDescription>Escribe el contenido de la sesión. Puedes grabarlo o transcribirlo.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {contentWasReplaced && (
                  <Alert variant="default" className="mb-4 bg-blue-50 border-blue-200">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                    <AlertTitle className="text-blue-800">Contenido mejorado con IA</AlertTitle>
                    <AlertDescription className="text-blue-700">
                      El contenido ha sido re-estructurado.
                      <Button variant="link" size="sm" onClick={handleUndoReplace} className="p-0 h-auto ml-2 text-blue-700">
                        <Undo2 className="h-3 w-3 mr-1"/>
                        Deshacer
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}
                <RichTextEditor
                  value={formData.sessionContent}
                  onChange={(value) => handleInputChange('sessionContent', value)}
                />
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

            <div className="flex justify-end items-center gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button type="button" variant="outline" onClick={handleStructureWithAI} disabled={!formData.sessionContent.trim() || isStructuring}>
                      {isStructuring ? (
                        <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                      ) : (
                        <Sparkles className="h-4 w-4 mr-2" />
                      )}
                      Estructurar con IA
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Organiza y formatea tus notas usando IA.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button type="submit" disabled={!isFormValid || isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Save className="h-4 w-4 mr-2 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Sesión
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>

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
  )
} 