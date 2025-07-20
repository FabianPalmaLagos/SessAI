"use client"

import { useState, useMemo, useEffect } from "react"
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
  ArrowLeft,
  ChevronsUpDown
} from "lucide-react"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { PageHeaderSkeleton, FormSkeleton, ListSkeleton } from "@/components/ui/skeleton-loaders"

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

const calendarDisplayOptions = {
  showPatientName: 'Nombre del Paciente',
  showTherapistName: 'Nombre del Terapeuta',
  showSessionType: 'Tipo de Sesión',
  showDuration: 'Duración',
  showNotes: 'Notas rápidas',
  showStatus: 'Estado (agendada, etc.)'
};

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true)
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
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null)
  const [openTherapistSelector, setOpenTherapistSelector] = useState(false)

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2200)
    return () => clearTimeout(timer)
  }, [])

  const updateTherapistScheduleTime = (therapistId: string, day: string, field: 'start' | 'end', value: string) => {
    setTherapists(therapists.map(t =>
      t.id === therapistId
        ? { ...t, schedule: { ...t.schedule, [day]: { ...t.schedule[day], [field]: value } } }
        : t
    ))
  }

  const updateTherapistScheduleAvailability = (therapistId: string, day: string, available: boolean) => {
    setTherapists(therapists.map(t =>
      t.id === therapistId
        ? { ...t, schedule: { ...t.schedule, [day]: { ...t.schedule[day], available } } }
        : t
    ))
  }

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

  const updateTherapistSchedule = (therapistId: string, day: string, field: string, value: any) => {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PageHeaderSkeleton />
          
          {/* Tabs Skeleton */}
          <div className="space-y-6">
            <div className="flex space-x-1 bg-slate-200 dark:bg-slate-700 p-1 rounded-lg animate-pulse">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-8 w-24 bg-slate-300 dark:bg-slate-600 rounded animate-pulse" />
              ))}
            </div>
            
            {/* Tab Content Skeleton */}
            <div className="space-y-6">
              <FormSkeleton />
              <ListSkeleton count={3} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                <Settings className="h-7 w-7 sm:h-8 sm:w-8 text-orange-600" />
                Centro de Control
              </h1>
              <p className="text-slate-600 dark:text-slate-300">Administración de la plataforma y configuración avanzada</p>
            </div>
            <Link href="/">
              <Button variant="outline" className="w-full sm:w-auto">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Dashboard
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="therapists" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="therapists">Equipo</TabsTrigger>
            <TabsTrigger value="schedules" className="flex items-center gap-2">
              <Clock className="h-4 w-4" /> Horarios
            </TabsTrigger>
            <TabsTrigger value="permissions">Permisos</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          {/* Gestión de Terapeutas */}
          <TabsContent value="therapists">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Gestión de Equipo
                      </CardTitle>
                      <CardDescription>Agregar, editar y eliminar terapeutas del sistema</CardDescription>
                    </div>
                    <Button onClick={() => setIsAddingTherapist(true)} className="flex items-center gap-2 w-full sm:w-auto">
                      <Plus className="h-4 w-4" />
                      Agregar Terapeuta
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isAddingTherapist && (
                    <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 mb-4 bg-slate-50 dark:bg-slate-800/50">
                      <h3 className="font-semibold mb-3">Nuevo Terapeuta</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <div key={therapist.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-white dark:bg-slate-800">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div>
                              <h3 className="font-semibold text-slate-900 dark:text-slate-50">{therapist.name}</h3>
                              <p className="text-sm text-slate-600 dark:text-slate-300">{therapist.email}</p>
                              <p className="text-sm text-slate-600 dark:text-slate-300">{therapist.specialty}</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Badge variant={therapist.status === 'active' ? 'default' : 'secondary'}>
                                {therapist.status === 'active' ? 'Activo' : 'Inactivo'}
                              </Badge>
                              <Badge variant={therapist.role === 'admin' ? 'destructive' : 'outline'}>
                                {therapist.role === 'admin' ? 'Administrador' : 'Terapeuta'}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2 w-full sm:w-auto">
                            <Button size="sm" variant="outline" className="flex items-center gap-1 flex-1 sm:flex-initial">
                              <Edit className="h-3 w-3" />
                              Editar
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              onClick={() => handleDeleteTherapist(therapist.id)}
                              className="flex items-center gap-1 flex-1 sm:flex-initial"
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
            <Card>
              <CardHeader>
                <CardTitle>Horarios Individuales</CardTitle>
                <CardDescription>Configurar disponibilidad específica de cada terapeuta.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="w-full md:w-1/3">
                  <Label>Seleccionar Terapeuta</Label>
                  <Popover open={openTherapistSelector} onOpenChange={setOpenTherapistSelector}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openTherapistSelector}
                        className="w-full justify-between"
                      >
                        {selectedTherapist
                          ? selectedTherapist.name
                          : "Buscar terapeuta..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Buscar por nombre..." />
                        <CommandList>
                          <CommandEmpty>No se encontró el terapeuta.</CommandEmpty>
                          <CommandGroup>
                            {therapists.map((therapist) => (
                              <CommandItem
                                key={therapist.id}
                                value={therapist.name}
                                onSelect={() => {
                                  setSelectedTherapist(therapist)
                                  setOpenTherapistSelector(false)
                                }}
                              >
                                {therapist.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {selectedTherapist && (
                  <Card key={selectedTherapist.id} className="pt-6">
                    <CardContent>
                      <h3 className="text-lg font-semibold mb-4">{selectedTherapist.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {days.map((day, index) => (
                          <div key={day} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor={`${day}-available-${selectedTherapist.id}`}>{dayNames[index]}</Label>
                              <Switch
                                id={`${day}-available-${selectedTherapist.id}`}
                                checked={selectedTherapist.schedule[day]?.available ?? false}
                                onCheckedChange={(checked) => updateTherapistScheduleAvailability(selectedTherapist.id, day, checked)}
                              />
                            </div>
                            {selectedTherapist.schedule[day]?.available && (
                              <div className="flex items-center gap-2">
                                <Input
                                  type="time"
                                  value={selectedTherapist.schedule[day].start}
                                  onChange={(e) => updateTherapistScheduleTime(selectedTherapist.id, day, 'start', e.target.value)}
                                  className="w-full"
                                />
                                <Input
                                  type="time"
                                  value={selectedTherapist.schedule[day].end}
                                  onChange={(e) => updateTherapistScheduleTime(selectedTherapist.id, day, 'end', e.target.value)}
                                  className="w-full"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Bloquear Horarios */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-primary" />
                      Bloquear Horarios
                    </CardTitle>
                    <CardDescription>Marcar períodos no disponibles (almuerzos, reuniones, etc.)</CardDescription>
                  </div>
                  <Button onClick={() => setIsAddingBlockedTime(true)} className="flex items-center gap-2 w-full sm:w-auto">
                    <Plus className="h-4 w-4" />
                    Bloquear Horario
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isAddingBlockedTime && (
                  <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 mb-4 bg-slate-50 dark:bg-slate-800/50">
                    <h3 className="font-semibold mb-3">Nuevo Bloqueo</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        <Label htmlFor="type">Tipo</Label>
                        <Select value={newBlockedTime.type} onValueChange={(value: any) => setNewBlockedTime({ ...newBlockedTime, type: value })}>
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
                      <div className="col-span-1 sm:col-span-2">
                        <Label htmlFor="reason">Motivo</Label>
                        <Input
                          id="reason"
                          value={newBlockedTime.reason}
                          onChange={(e) => setNewBlockedTime({ ...newBlockedTime, reason: e.target.value })}
                          placeholder="Ej. Reunión de equipo"
                        />
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
                      <div className="grid grid-cols-2 gap-2">
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

                <div className="space-y-4">
                  {blockedTimes.map((blocked) => {
                    const therapist = therapists.find(t => t.id === blocked.therapistId);
                    return (
                      <div key={blocked.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-white dark:bg-slate-800">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-slate-50">{blocked.reason}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300">
                              {therapist?.name} - {blocked.date} ({blocked.startTime} - {blocked.endTime})
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteBlockedTime(blocked.id)}
                            className="flex items-center gap-1 self-end sm:self-center"
                          >
                            <Trash2 className="h-3 w-3" />
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Permisos de Usuario */}
          <TabsContent value="permissions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-primary" />
                  Roles y Permisos
                </CardTitle>
                <CardDescription>Asigna roles de administrador o terapeuta a los miembros del equipo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {therapists.map(therapist => (
                    <div key={therapist.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-white dark:bg-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-50">{therapist.name}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{therapist.specialty}</p>
                      </div>
                      <div>
                        <Label htmlFor={`role-${therapist.id}`} className="sr-only">Rol de {therapist.name}</Label>
                        <Select value={therapist.role} onValueChange={(value: 'admin' | 'therapist') => updateTherapistRole(therapist.id, value)}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="therapist">Terapeuta</SelectItem>
                            <SelectItem value="admin">Administrador</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configuración */}
          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BrainCircuit className="h-5 w-5 text-primary" />
                      Gestión de IA
                    </CardTitle>
                    <CardDescription>Configura los modelos de IA y su comportamiento</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="ai-model">Modelo de IA Principal</Label>
                      <Select value={aiSettings.aiModel} onValueChange={(value) => setAiSettings({ ...aiSettings, aiModel: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fast">Rápido (Menor costo, menor precisión)</SelectItem>
                          <SelectItem value="balanced">Equilibrado (Recomendado)</SelectItem>
                          <SelectItem value="advanced">Avanzado (Mayor costo, mayor precisión)</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                        El modelo seleccionado se usará para transcripciones y análisis.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Configuración del Calendario */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-primary" />
                      Visualización del Calendario
                    </CardTitle>
                    <CardDescription>Personaliza qué información se muestra en el calendario global</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                      {(Object.keys(calendarDisplayOptions) as Array<keyof typeof calendarDisplayOptions>).map((key) => (
                        <div key={key} className="flex items-center space-x-3">
                          <Switch
                            id={key}
                            checked={calendarSettings[key]}
                            onCheckedChange={(checked) =>
                              setCalendarSettings((prev) => ({ ...prev, [key]: checked }))
                            }
                          />
                          <Label htmlFor={key} className="cursor-pointer">{calendarDisplayOptions[key]}</Label>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-6" />
                    <div className="space-y-2">
                      <Label htmlFor="defaultView" className="text-base font-semibold">Vista por Defecto</Label>
                       <p className="text-sm text-slate-600 dark:text-slate-300">
                         Elige la vista inicial para el calendario de la plataforma.
                       </p>
                       <Select
                         value={calendarSettings.defaultView}
                         onValueChange={(value) =>
                           setCalendarSettings((prev) => ({ ...prev, defaultView: value }))
                         }
                       >
                         <SelectTrigger id="defaultView" className="w-full sm:w-[240px]">
                           <SelectValue />
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
              </div>

              {/* Consumo y Facturación */}
              <div className="lg:col-span-1">
                <Card className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      Consumo y Facturación
                    </CardTitle>
                    <CardDescription>Monitorea tu uso de créditos de IA.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800">
                      <p className="text-sm text-slate-600 dark:text-slate-300">Créditos restantes</p>
                      <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">1,250</p>
                    </div>
                    <Link href="/admin/billing" className="w-full">
                      <Button className="w-full mt-4">
                        Ver Dashboard de Consumo
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
            <Button className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Guardar Cambios
            </Button>
        </div>
      </div>
    </div>
  )
} 