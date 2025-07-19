"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, User, Phone, Mail, Calendar, FileText, ArrowLeft } from "lucide-react"
import Link from "next/link"

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
  },
]

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [patients] = useState(mockPatients)

  const filteredPatients = patients.filter(
    (patient) => patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || patient.rut.includes(searchTerm),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-gray-100">Gestión de Pacientes</h1>
            <p className="text-slate-600 dark:text-gray-400">Administra fichas, historiales y búsqueda avanzada</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Dashboard
            </Button>
          </Link>
        </div>

        {/* Search Bar and Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="relative w-full sm:flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-gray-500" />
            <Input
              placeholder="Buscar por nombre o RUT..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
            />
          </div>
          <Link href="/patients/new" className="w-full sm:w-auto">
            <Button className="flex items-center gap-2 whitespace-nowrap w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              Nuevo Paciente
            </Button>
          </Link>
        </div>

        {/* Patients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="hover:shadow-lg dark:hover:shadow-xl transition-shadow duration-200 dark:bg-gray-800/50 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-gray-100">
                    <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    {patient.name}
                  </CardTitle>
                  <Badge variant={patient.status === "Activo" ? "default" : "secondary"}>{patient.status}</Badge>
                </div>
                <CardDescription className="text-slate-600 dark:text-gray-400">RUT: {patient.rut}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-slate-600 dark:text-gray-300">
                  <div className="flex items-start gap-3">
                    <Mail className="h-4 w-4 mt-0.5" />
                    <span className="break-all">{patient.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4" />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4" />
                    <span>Última sesión: {patient.lastSession}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4" />
                    <span>{patient.totalSessions} sesiones totales</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <Link href={`/patients/${patient.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      Ver Ficha
                    </Button>
                  </Link>
                  <Link href={`/sessions/new?patientId=${patient.id}`} className="flex-1">
                    <Button className="w-full">Nueva Sesión</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <Card className="text-center py-12 dark:bg-gray-800/50 dark:border-gray-700">
            <CardContent>
              <User className="h-12 w-12 text-slate-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-gray-100 mb-2">No se encontraron pacientes</h3>
              <p className="text-slate-600 dark:text-gray-400 mb-4">Intenta con otros términos de búsqueda o agrega un nuevo paciente</p>
              <Link href="/patients/new">
                <Button>Agregar Primer Paciente</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
