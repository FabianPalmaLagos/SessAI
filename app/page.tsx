import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Calendar, FileText, Brain, TrendingUp, Clock } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">SessAI</h1>
          <p className="text-lg text-gray-600">
            Potenciando el arte de la terapia con la precisión de la inteligencia artificial
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pacientes Activos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+2 desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sesiones Esta Semana</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">+12% vs semana anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Informes Generados</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">Este mes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tiempo Ahorrado</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12h</div>
              <p className="text-xs text-muted-foreground">Con IA esta semana</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Gestión de Pacientes
              </CardTitle>
              <CardDescription>Administra fichas, historiales y búsqueda avanzada de pacientes</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/patients">
                <Button className="w-full">Acceder al Módulo</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                Registro de Sesiones
              </CardTitle>
              <CardDescription>Grabación, transcripción automática y registro multimodal</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/sessions">
                <Button className="w-full">Acceder al Módulo</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Análisis con IA
              </CardTitle>
              <CardDescription>Generación de informes y asistente de documentación inteligente</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/ai-analysis">
                <Button className="w-full">Acceder al Módulo</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-600" />
                Agenda y Citas
              </CardTitle>
              <CardDescription>Calendario integrado y gestión de citas</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/calendar">
                <Button className="w-full">Acceder al Módulo</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-red-600" />
                Reportes y Analytics
              </CardTitle>
              <CardDescription>Análisis de tendencias y métricas de progreso</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/reports">
                <Button className="w-full">Acceder al Módulo</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Brain className="h-5 w-5" />
                Demo IA en Vivo
              </CardTitle>
              <CardDescription>Prueba las capacidades de IA de SessAI</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/ai-demo">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Probar IA</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Acciones Rápidas</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/patients/new">
              <Button variant="outline">+ Nuevo Paciente</Button>
            </Link>
            <Link href="/sessions/new">
              <Button variant="outline">+ Nueva Sesión</Button>
            </Link>
            <Link href="/ai-analysis/generate-report">
              <Button variant="outline">+ Generar Informe IA</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
