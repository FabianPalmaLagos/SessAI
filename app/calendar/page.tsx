"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarView } from "@/components/calendar-view";
import { mockSessions, mockTherapists, mockPatients } from "@/lib/mock-data";
import { Calendar as CalendarIcon, Filter, Users, Clock, Settings, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { CalendarSkeleton, DashboardCardSkeleton, PageHeaderSkeleton } from "@/components/ui/skeleton-loaders";

export default function CalendarPage() {
  const [selectedTherapists, setSelectedTherapists] = useState<string[]>(
    mockTherapists.map(t => t.id)
  );
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    'scheduled', 'completed', 'cancelled', 'no-show'
  ]);
  const [therapistSearchTerm, setTherapistSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1800)
    return () => clearTimeout(timer)
  }, [])

  // Filtrar terapeutas basado en el término de búsqueda
  const filteredTherapists = mockTherapists.filter(therapist =>
    therapist.name.toLowerCase().includes(therapistSearchTerm.toLowerCase())
  );

  // Filtrar sesiones basado en los filtros seleccionados
  const filteredSessions = mockSessions.filter(session => 
    selectedTherapists.includes(session.therapistId) &&
    selectedStatuses.includes(session.status)
  );

  const handleTherapistToggle = (therapistId: string) => {
    setSelectedTherapists(prev =>
      prev.includes(therapistId)
        ? prev.filter(id => id !== therapistId)
        : [...prev, therapistId]
    );
  };

  const handleStatusToggle = (status: string) => {
    setSelectedStatuses(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const handleSelectAllTherapists = () => {
    // Seleccionar todos los terapeutas filtrados
    const filteredIds = filteredTherapists.map(t => t.id);
    setSelectedTherapists(prev => {
      const newSelection = [...new Set([...prev, ...filteredIds])];
      return newSelection;
    });
  };

  const handleDeselectAllTherapists = () => {
    // Deseleccionar todos los terapeutas filtrados
    const filteredIds = filteredTherapists.map(t => t.id);
    setSelectedTherapists(prev => prev.filter(id => !filteredIds.includes(id)));
  };

  const clearTherapistSearch = () => {
    setTherapistSearchTerm("");
  };

  const statusOptions = [
    { value: 'scheduled', label: 'Programada', color: 'bg-blue-100 text-blue-800' },
    { value: 'completed', label: 'Completada', color: 'bg-green-100 text-green-800' },
    { value: 'cancelled', label: 'Cancelada', color: 'bg-red-100 text-red-800' },
    { value: 'no-show', label: 'No Asistió', color: 'bg-orange-100 text-orange-800' }
  ];

  const stats = {
    totalSessions: filteredSessions.length,
    todaySessions: filteredSessions.filter(s => s.date === new Date().toISOString().split('T')[0]).length,
    activeTherapists: selectedTherapists.length,
    completedToday: filteredSessions.filter(s => 
      s.date === new Date().toISOString().split('T')[0] && s.status === 'completed'
    ).length
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PageHeaderSkeleton />
          
          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <DashboardCardSkeleton key={i} />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 mt-6">
            {/* Filters Panel Skeleton */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                    <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                    <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                    <div className="space-y-2">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Calendar Skeleton */}
            <div className="lg:col-span-3">
              <Card>
                <CardContent className="p-6">
                  <CalendarSkeleton />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Calendario de Terapeutas
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Gestiona y visualiza todas las sesiones terapéuticas en tiempo real
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver al Dashboard
                </Button>
            </Link>
          </div>
          </div>
        </div>
        
        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <Card className="dark:bg-slate-800/50 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Sesiones</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">{stats.totalSessions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Hoy</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">{stats.todaySessions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Terapeutas</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">{stats.activeTherapists}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <p className="text-sm font-medium">Completadas Hoy</p>
                  <p className="text-xl font-bold ml-2">{stats.completedToday}</p>
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 mt-6">
          {/* Panel de filtros */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Filtro de Terapeutas */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="font-semibold">Terapeutas</Label>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSelectAllTherapists}
                        className="h-6 px-2 text-xs"
                      >
                        Todos
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDeselectAllTherapists}
                        className="h-6 px-2 text-xs"
                      >
                        Ninguno
                      </Button>
                    </div>
                  </div>
                  
                  {/* Barra de búsqueda de terapeutas */}
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Buscar terapeuta..."
                      value={therapistSearchTerm}
                      onChange={(e) => setTherapistSearchTerm(e.target.value)}
                      className="pl-9 pr-4 h-8 text-sm"
                    />
                    {therapistSearchTerm && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearTherapistSearch}
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        ×
                      </Button>
                    )}
                  </div>

                  {/* Lista de terapeutas con scroll */}
                  <ScrollArea className="h-[200px] w-full rounded-md border border-slate-200 dark:border-slate-700">
                    <div className="p-3 space-y-3">
                      {filteredTherapists.length > 0 ? (
                        filteredTherapists.map((therapist) => (
                          <div key={therapist.id} className="flex items-center gap-3">
                            <Checkbox
                              id={`therapist-${therapist.id}`}
                              checked={selectedTherapists.includes(therapist.id)}
                              onCheckedChange={() => handleTherapistToggle(therapist.id)}
                            />
                            <div
                              className="h-3 w-3 rounded-full border border-slate-300 dark:border-slate-600 flex-shrink-0"
                              style={{ backgroundColor: therapist.color }}
                            />
                            <Label
                              htmlFor={`therapist-${therapist.id}`}
                              className="font-normal text-sm cursor-pointer flex-1 leading-tight"
                            >
                              {therapist.name}
                            </Label>
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-gray-500 dark:text-slate-400 text-center py-4">
                          No se encontraron terapeutas
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                  
                  {/* Información de filtro */}
                  {therapistSearchTerm && (
                    <div className="mt-2 text-xs text-gray-500 dark:text-slate-400">
                      Mostrando {filteredTherapists.length} de {mockTherapists.length} terapeutas
                    </div>
                  )}
                </div>

                <Separator />

                {/* Filtro de Estados */}
                <div>
                  <Label className="font-semibold mb-3 block">Estados de Sesión</Label>
                  <div className="space-y-3">
                    {statusOptions.map((status) => (
                      <div key={status.value} className="flex items-center gap-3">
                        <Checkbox
                          id={`status-${status.value}`}
                          checked={selectedStatuses.includes(status.value)}
                          onCheckedChange={() => handleStatusToggle(status.value)}
                        />
                        <Label
                          htmlFor={`status-${status.value}`}
                          className="font-normal text-sm cursor-pointer flex-1"
                        >
                          <Badge variant="secondary" className={status.color}>
                            {status.label}
                          </Badge>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Resumen de filtros */}
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  <p>
                    Mostrando <strong>{filteredSessions.length}</strong> de{" "}
                    <strong>{mockSessions.length}</strong> sesiones
                  </p>
                  <p className="mt-1">
                    <strong>{selectedTherapists.length}</strong> terapeutas seleccionados
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calendario principal */}
          <div className="lg:col-span-3">
            <Card className="h-[900px]">
              <CardContent className="p-6 h-full">
                <CalendarView 
                  sessions={filteredSessions} 
                  therapists={mockTherapists} 
                  patients={mockPatients} 
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 