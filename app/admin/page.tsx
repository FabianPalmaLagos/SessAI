"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Settings, 
  Users, 
  Clock, 
  Shield, 
  Eye, 
  Plus, 
  Trash2, 
  Edit, 
  Save,
  Calendar,
  Lock,
  UserCheck,
  AlertTriangle,
  BrainCircuit,
  CreditCard,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"

interface Therapist {
  id: string
  name: string
  email: string
  specialty: string
  status: 'active' | 'inactive'
  role: 'admin' | 'therapist'
  schedule: {
    [key: string]: { start: string; end: string; available: boolean }
  }
  type: 'lunch' | 'meeting' | 'break' | 'other'
}

interface BlockedTime {
  id: string
  therapistId: string
  date: string
  startTime: string
  endTime: string
  reason: string
  type: 'lunch' | 'meeting' | 'break' | 'other'
}

export default function AdminPage() {
  const [therapists, setTherapists] = useState<Therapist[]>([
    {
      id: '1',
      name: 'Dr. Ana Silva',
      email: 'ana.silva@clinica.com',
      specialty: 'Psicología Clínica',
      status: 'active',
      role: 'admin',
      schedule: {
        monday: { start: '09:00', end: '18:00', available: true },
        tuesday: { start: '09:00', end: '18:00', available: true },
        wednesday: { start: '09:00', end: '18:00', available: true },
        thursday: { start: '09:00', end: '18:00', available: true },
        friday: { start: '09:00', end: '17:00', available: true },
        saturday: { start: '09:00', end: '13:00', available: false },
        sunday: { start: '09:00', end: '13:00', available: false }
      },
      type: 'lunch'
    },
    {
      id: '2',
      name: 'Dr. Carlos Rojas',
      email: 'carlos.rojas@clinica.com',
      specialty: 'Terapia Familiar',
      status: 'active',
      role: 'therapist',
      schedule: {
        monday: { start: '10:00', end: '19:00', available: true },
        tuesday: { start: '10:00', end: '19:00', available: true },
        wednesday: { start: '10:00', end: '19:00', available: true },
        thursday: { start: '10:00', end: '19:00', available: true },
        friday: { start: '10:00', end: '18:00', available: true },
        saturday: { start: '09:00', end: '14:00', available: true },
        sunday: { start: '09:00', end: '13:00', available: false }
      },
      type: 'lunch'
    }
  ])

  const [blockedTimes, setBlockedTimes] = useState<BlockedTime[]>([
    {
      id: '1',
      therapistId: '1',
      date: '2024-01-25',
      startTime: '13:00',
      endTime: '14:00',
      reason: 'Almuerzo',
      type: 'lunch'
    },
    {
      id: '2',
      therapistId: '2',
      date: '2024-01-25',
      startTime: '15:00',
      endTime: '16:00',
      reason: 'Reunión de equipo',
      type: 'meeting'
    }
  ])

  const [calendarSettings, setCalendarSettings] = useState({
    showPatientName: true,
    showTherapistName: true,
    showSessionType: true,
    showDuration: true,
    showNotes: false,
    showStatus: true,
    defaultView: 'week'
  })

  const [aiSettings, setAiSettings] = useState({
    aiModel: 'balanced',
  });

  const [newTherapist, setNewTherapist] = useState({
    name: '',
    email: '',
    specialty: '',
    role: 'therapist' as 'admin' | 'therapist'
  })

  const [newBlockedTime, setNewBlockedTime] = useState({
    therapistId: '',
    date: '',
    startTime: '',
    endTime: '',
    reason: '',
    type: 'lunch' as 'lunch' | 'meeting' | 'break' | 'other'
  })

  const [editingTherapist, setEditingTherapist] = useState<string | null>(null)
  const [isAddingTherapist, setIsAddingTherapist] = useState(false)
  const [isAddingBlockedTime, setIsAddingBlockedTime] = useState(false)

  const handleAddTherapist = () => {
    if (newTherapist.name && newTherapist.email) {
      const therapist: Therapist = {
        id: Date.now().toString(),
        ...newTherapist,
        status: 'active',
        schedule: {
          monday: { start: '09:00', end: '18:00', available: true },
          tuesday: { start: '09:00', end: '18:00', available: true },
          wednesday: { start: '09:00', end: '18:00', available: true },
          thursday: { start: '09:00', end: '18:00', available: true },
          friday: { start: '09:00', end: '17:00', available: true },
          saturday: { start: '09:00', end: '13:00', available: false },
          sunday: { start: '09:00', end: '13:00', available: false }
        },
        type: 'lunch'
      }
      setTherapists([...therapists, therapist])
      setNewTherapist({ name: '', email: '', specialty: '', role: 'therapist' })
      setIsAddingTherapist(false)
    }
  }

  const handleDeleteTherapist = (id: string) => {
    setTherapists(therapists.filter(t => t.id !== id))
  }

  const handleAddBlockedTime = () => {
    if (newBlockedTime.therapistId && newBlockedTime.date && newBlockedTime.startTime && newBlockedTime.endTime) {
      const blocked: BlockedTime = {
        id: Date.now().toString(),
        ...newBlockedTime
      }
      setBlockedTimes([...blockedTimes, blocked])
      setNewBlockedTime({
        therapistId: '',
        date: '',
        startTime: '',
        endTime: '',
        reason: '',
        type: 'lunch'
      })
      setIsAddingBlockedTime(false)
    }
  }

  const handleDeleteBlockedTime = (id: string) => {
    setBlockedTimes(blockedTimes.filter(b => b.id !== id))
  }

  const updateTherapistSchedule = (therapistId: string, day: string, field: string, value: string | boolean) => {
    setTherapists(therapists.map(t => 
      t.id === therapistId 
        ? { ...t, schedule: { ...t.schedule, [day]: { ...t.schedule[day], [field]: value } } }
        : t
    ))
  }

  const updateTherapistRole = (therapistId: string, role: 'admin' | 'therapist') => {
    setTherapists(therapists.map(t => 
      t.id === therapistId ? { ...t, role } : t
    ))
  }

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                <Settings className="h-8 w-8 text-orange-600" />
                Centro de Control
              </h1>
              <p className="text-muted-foreground">Administración de la plataforma y configuración avanzada</p>
            </div>
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Dashboard
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="therapists" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="therapists">Equipo Terapéutico</TabsTrigger>
            <TabsTrigger value="schedules">Horarios</TabsTrigger>
            <TabsTrigger value="permissions">Permisos</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          {/* Gestión de Terapeutas */}
          <TabsContent value="therapists">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Gestión de Equipo
                      </CardTitle>
                      <CardDescription>Agregar, editar y eliminar terapeutas del sistema</CardDescription>
                    </div>
                    <Button onClick={() => setIsAddingTherapist(true)} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Agregar Terapeuta
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isAddingTherapist && (
                    <div className="border rounded-lg p-4 mb-4 bg-muted/50">
                      <h3 className="font-semibold mb-3">Nuevo Terapeuta</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Nombre Completo</Label>
                          <Input
                            id="name"
                            value={newTherapist.name}
                            onChange={(e) => setNewTherapist({ ...newTherapist, name: e.target.value })}
                            placeholder="Dr. Juan Pérez"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newTherapist.email}
                            onChange={(e) => setNewTherapist({ ...newTherapist, email: e.target.value })}
                            placeholder="juan.perez@clinica.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="specialty">Especialidad</Label>
                          <Input
                            id="specialty"
                            value={newTherapist.specialty}
                            onChange={(e) => setNewTherapist({ ...newTherapist, specialty: e.target.value })}
                            placeholder="Psicología Clínica"
                          />
                        </div>
                        <div>
                          <Label htmlFor="role">Rol</Label>
                          <Select value={newTherapist.role} onValueChange={(value: 'admin' | 'therapist') => setNewTherapist({ ...newTherapist, role: value })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="therapist">Terapeuta</SelectItem>
                              <SelectItem value="admin">Administrador</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button onClick={handleAddTherapist} className="flex items-center gap-2">
                          <Save className="h-4 w-4" />
                          Guardar
                        </Button>
                        <Button variant="outline" onClick={() => setIsAddingTherapist(false)}>
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    {therapists.map((therapist) => (
                      <div key={therapist.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div>
                              <h3 className="font-semibold">{therapist.name}</h3>
                              <p className="text-sm text-muted-foreground">{therapist.email}</p>
                              <p className="text-sm text-muted-foreground">{therapist.specialty}</p>
                            </div>
                            <div className="flex gap-2">
                              <Badge variant={therapist.status === 'active' ? 'default' : 'secondary'}>
                                {therapist.status === 'active' ? 'Activo' : 'Inactivo'}
                              </Badge>
                              <Badge variant={therapist.role === 'admin' ? 'destructive' : 'outline'}>
                                {therapist.role === 'admin' ? 'Administrador' : 'Terapeuta'}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex items-center gap-1">
                              <Edit className="h-3 w-3" />
                              Editar
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              onClick={() => handleDeleteTherapist(therapist.id)}
                              className="flex items-center gap-1"
                            >
                              <Trash2 className="h-3 w-3" />
                              Eliminar
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Horarios Individuales */}
          <TabsContent value="schedules">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Horarios Individuales
                  </CardTitle>
                  <CardDescription>Configurar disponibilidad específica de cada terapeuta</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {therapists.map((therapist) => (
                      <div key={therapist.id} className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-4">{therapist.name}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {days.map((day, index) => (
                            <div key={day} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label className="font-medium">{dayNames[index]}</Label>
                                <Switch
                                  checked={therapist.schedule[day].available}
                                  onCheckedChange={(checked) => updateTherapistSchedule(therapist.id, day, 'available', checked)}
                                />
                              </div>
                              {therapist.schedule[day].available && (
                                <div className="flex gap-2">
                                  <Input
                                    type="time"
                                    value={therapist.schedule[day].start}
                                    onChange={(e) => updateTherapistSchedule(therapist.id, day, 'start', e.target.value)}
                                    className="text-sm"
                                  />
                                  <Input
                                    type="time"
                                    value={therapist.schedule[day].end}
                                    onChange={(e) => updateTherapistSchedule(therapist.id, day, 'end', e.target.value)}
                                    className="text-sm"
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Bloquear Horarios */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Lock className="h-5 w-5 text-primary" />
                        Bloquear Horarios
                      </CardTitle>
                      <CardDescription>Marcar períodos no disponibles (almuerzos, reuniones, etc.)</CardDescription>
                    </div>
                    <Button onClick={() => setIsAddingBlockedTime(true)} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Bloquear Horario
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isAddingBlockedTime && (
                    <div className="border rounded-lg p-4 mb-4 bg-muted/50">
                      <h3 className="font-semibold mb-3">Nuevo Bloqueo</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="therapist">Terapeuta</Label>
                          <Select value={newBlockedTime.therapistId} onValueChange={(value) => setNewBlockedTime({ ...newBlockedTime, therapistId: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar terapeuta" />
                            </SelectTrigger>
                            <SelectContent>
                              {therapists.map((therapist) => (
                                <SelectItem key={therapist.id} value={therapist.id}>
                                  {therapist.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="date">Fecha</Label>
                          <Input
                            id="date"
                            type="date"
                            value={newBlockedTime.date}
                            onChange={(e) => setNewBlockedTime({ ...newBlockedTime, date: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="startTime">Hora Inicio</Label>
                          <Input
                            id="startTime"
                            type="time"
                            value={newBlockedTime.startTime}
                            onChange={(e) => setNewBlockedTime({ ...newBlockedTime, startTime: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="endTime">Hora Fin</Label>
                          <Input
                            id="endTime"
                            type="time"
                            value={newBlockedTime.endTime}
                            onChange={(e) => setNewBlockedTime({ ...newBlockedTime, endTime: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="type">Tipo</Label>
                          <Select value={newBlockedTime.type} onValueChange={(value: 'lunch' | 'meeting' | 'break' | 'other') => setNewBlockedTime({ ...newBlockedTime, type: value })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="lunch">Almuerzo</SelectItem>
                              <SelectItem value="meeting">Reunión</SelectItem>
                              <SelectItem value="break">Descanso</SelectItem>
                              <SelectItem value="other">Otro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="reason">Motivo</Label>
                          <Input
                            id="reason"
                            value={newBlockedTime.reason}
                            onChange={(e) => setNewBlockedTime({ ...newBlockedTime, reason: e.target.value })}
                            placeholder="Descripción del bloqueo"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button onClick={handleAddBlockedTime} className="flex items-center gap-2">
                          <Save className="h-4 w-4" />
                          Guardar
                        </Button>
                        <Button variant="outline" onClick={() => setIsAddingBlockedTime(false)}>
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {blockedTimes.map((blocked) => {
                      const therapist = therapists.find(t => t.id === blocked.therapistId)
                      return (
                        <div key={blocked.id} className="border rounded-lg p-3 flex items-center justify-between">
                          <div>
                            <div className="font-medium">{therapist?.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {blocked.date} • {blocked.startTime} - {blocked.endTime}
                            </div>
                            <div className="text-sm text-muted-foreground">{blocked.reason}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {blocked.type === 'lunch' ? 'Almuerzo' : 
                               blocked.type === 'meeting' ? 'Reunión' : 
                               blocked.type === 'break' ? 'Descanso' : 'Otro'}
                            </Badge>
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              onClick={() => handleDeleteBlockedTime(blocked.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Permisos de Usuario */}
          <TabsContent value="permissions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Permisos de Usuario
                </CardTitle>
                <CardDescription>Definir niveles de acceso del equipo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {therapists.map((therapist) => (
                    <div key={therapist.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold">{therapist.name}</h3>
                          <p className="text-sm text-muted-foreground">{therapist.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`role-${therapist.id}`}>Rol:</Label>
                          <Select 
                            value={therapist.role} 
                            onValueChange={(value: 'admin' | 'therapist') => updateTherapistRole(therapist.id, value)}
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="therapist">Terapeuta</SelectItem>
                              <SelectItem value="admin">Administrador</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm">Permisos de Pacientes</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Ver pacientes</span>
                              <Switch checked={true} />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Editar pacientes</span>
                              <Switch checked={therapist.role === 'admin'} />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Eliminar pacientes</span>
                              <Switch checked={therapist.role === 'admin'} />
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm">Permisos de Sistema</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Acceso a IA</span>
                              <Switch checked={true} />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Generar reportes</span>
                              <Switch checked={true} />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Centro de Control</span>
                              <Switch checked={therapist.role === 'admin'} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configuración */}
          <TabsContent value="settings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Configuración del Calendario
                  </CardTitle>
                  <CardDescription>
                    Definir qué información mostrar en cada slot del calendario
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="font-semibold">Columnas Visibles</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-patient" className="text-sm font-normal">Nombre del Paciente</Label>
                        <Switch id="show-patient" checked={calendarSettings.showPatientName} onCheckedChange={(value) => setCalendarSettings(prev => ({...prev, showPatientName: value}))} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-duration" className="text-sm font-normal">Duración</Label>
                        <Switch id="show-duration" checked={calendarSettings.showDuration} onCheckedChange={(value) => setCalendarSettings(prev => ({...prev, showDuration: value}))} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-therapist" className="text-sm font-normal">Nombre del Terapeuta</Label>
                        <Switch id="show-therapist" checked={calendarSettings.showTherapistName} onCheckedChange={(value) => setCalendarSettings(prev => ({...prev, showTherapistName: value}))} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-notes" className="text-sm font-normal">Notas</Label>
                        <Switch id="show-notes" checked={calendarSettings.showNotes} onCheckedChange={(value) => setCalendarSettings(prev => ({...prev, showNotes: value}))} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-type" className="text-sm font-normal">Tipo de Sesión</Label>
                        <Switch id="show-type" checked={calendarSettings.showSessionType} onCheckedChange={(value) => setCalendarSettings(prev => ({...prev, showSessionType: value}))} />
                      </div>
                       <div className="flex items-center justify-between">
                        <Label htmlFor="show-status" className="text-sm font-normal">Estado</Label>
                        <Switch id="show-status" checked={calendarSettings.showStatus} onCheckedChange={(value) => setCalendarSettings(prev => ({...prev, showStatus: value}))} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="default-view" className="font-semibold">Vista Predeterminada</Label>
                    <Select value={calendarSettings.defaultView} onValueChange={(value) => setCalendarSettings(prev => ({...prev, defaultView: value as 'week' | 'day' | 'month'}))}>
                      <SelectTrigger id="default-view" className="w-full mt-2">
                        <SelectValue placeholder="Seleccionar vista" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="week">Semana</SelectItem>
                        <SelectItem value="day">Día</SelectItem>
                        <SelectItem value="month">Mes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BrainCircuit className="h-5 w-5 text-primary" />
                    Gestión de IA
                  </CardTitle>
                  <CardDescription>
                    Configura el comportamiento de los modelos de IA y monitorea su consumo.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="ai-model" className="font-semibold">Modelo de IA Principal</Label>
                    <Select value={aiSettings.aiModel} onValueChange={(value) => setAiSettings(prev => ({...prev, aiModel: value as 'balanced' | 'fast' | 'advanced'}))}>
                      <SelectTrigger id="ai-model" className="w-full">
                        <SelectValue placeholder="Seleccionar modelo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fast">Rápido y Económico</SelectItem>
                        <SelectItem value="balanced">Equilibrado (Recomendado)</SelectItem>
                        <SelectItem value="advanced">Avanzado y Preciso</SelectItem>
                      </SelectContent>
                    </Select>
                     <p className="text-sm text-muted-foreground">
                      Elige el balance entre velocidad, costo y precisión para las tareas de IA.
                    </p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-semibold">Control de Gastos</h4>
                     <p className="text-sm text-muted-foreground pb-2">
                      Revisa el consumo de créditos de IA y gestiona tu plan. Todos los datos son anonimizados para proteger la privacidad.
                    </p>
                    <Link href="/admin/billing">
                      <Button variant="outline" className="w-full md:w-auto">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Ir al Dashboard de Consumo
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Guardar Configuración
              </Button>
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