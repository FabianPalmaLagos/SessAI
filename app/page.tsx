"use client"

import { useState } from "react"
import {
  Users,
  Calendar,
  FileText,
  Clock,
  Brain,
  Settings,
  TrendingUp,
  Activity,
  Zap,
  ChevronRight,
  BarChart3,
  UserPlus,
  CalendarPlus,
  FileBarChart,
  Play,
  Search,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import AuthGuard from "@/components/auth-guard"
import { useAuth } from "@/hooks/useAuth"

function DashboardContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const { user } = useAuth()

  const metrics = [
    {
      title: "Pacientes Activos",
      value: "24",
      change: "+3 desde el mes pasado",
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/50",
      trend: "up",
    },
    {
      title: "Sesiones Esta Semana",
      value: "18",
      change: "+12% vs semana anterior",
      icon: Calendar,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950/50",
      trend: "up",
    },
    {
      title: "Informes Generados",
      value: "7",
      change: "Este mes",
      icon: FileText,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950/50",
      trend: "neutral",
    },
    {
      title: "Tiempo Ahorrado",
      value: "12h",
      change: "Con IA esta semana",
      icon: Clock,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-950/50",
      trend: "up",
    },
  ]

  const modules = [
    {
      title: "Gestión de Pacientes",
      description: "Administra fichas, historiales y búsqueda avanzada",
      icon: Users,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
      stats: "24 activos",
      href: "/patients",
    },
    {
      title: "Registro de Sesiones",
      description: "Grabación, transcripción y registro multimodal",
      icon: Activity,
      color: "bg-gradient-to-br from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700",
      stats: "18 esta semana",
      href: "/sessions",
    },
    {
      title: "Análisis con IA",
      description: "Informes automáticos y asistente de documentación",
      icon: Brain,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700",
      stats: "7 informes",
      href: "/ai-analysis",
      featured: true,
    },
    {
      title: "Agenda y Citas",
      description: "Calendario integrado y gestión de citas",
      icon: Calendar,
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      hoverColor: "hover:from-orange-600 hover:to-orange-700",
      stats: "5 próximas",
      href: "/calendar",
    },
    {
      title: "Centro de Control",
      description: "Configuración avanzada de la plataforma",
      icon: Settings,
      color: "bg-gradient-to-br from-gray-500 to-gray-600",
      hoverColor: "hover:from-gray-600 hover:to-gray-700",
      stats: "Configurar",
      href: "/admin",
    },
    {
      title: "Analytics & Reportes",
      description: "Métricas de progreso y análisis de tendencias",
      icon: BarChart3,
      color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
      hoverColor: "hover:from-indigo-600 hover:to-indigo-700",
      stats: "Ver métricas",
      href: "/analytics",
    },
  ]

  const quickActions = [
    {
      title: "Nuevo Paciente",
      description: "Registrar un nuevo paciente",
      icon: UserPlus,
      color: "bg-blue-500 hover:bg-blue-600",
      href: "/patients/new",
    },
    {
      title: "Nueva Sesión",
      description: "Iniciar sesión terapéutica",
      icon: CalendarPlus,
      color: "bg-green-500 hover:bg-green-600",
      href: "/sessions/new",
    },
    {
      title: "Generar Informe IA",
      description: "Crear informe con IA",
      icon: FileBarChart,
      color: "bg-purple-500 hover:bg-purple-600",
      href: "/ai-analysis",
    },
    {
      title: "Demo IA en Vivo",
      description: "Probar capacidades de IA",
      icon: Play,
      color: "bg-orange-500 hover:bg-orange-600",
      href: "/ai-demo",
    },
  ]

  const recentActivity = [
    {
      patient: "María González",
      action: "Sesión completada",
      time: "Hace 2 horas",
      type: "session",
    },
    {
      patient: "Carlos Ruiz",
      action: "Informe IA generado",
      time: "Hace 4 horas",
      type: "report",
    },
    {
      patient: "Ana López",
      action: "Cita programada",
      time: "Hace 1 día",
      type: "appointment",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-display-md text-slate-900 dark:text-slate-50 mb-2">
                Bienvenido de vuelta, {user?.profile.firstName || 'Dr.'} {user?.profile.lastName || 'Rodriguez'}
              </h1>
              <p className="text-body-lg text-text-secondary">
                Potenciando el arte de la terapia con la precisión de la inteligencia artificial
              </p>
            </div>
            <div className="w-full lg:w-auto">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
                <Input
                  placeholder="Buscar pacientes, sesiones..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full lg:w-64 bg-white/80 dark:bg-slate-800/50 border-border-primary focus-ring"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-caption-lg text-text-secondary mb-1">{metric.title}</p>
                    <p className="text-display-sm text-text-primary">{metric.value}</p>
                    <p className="text-body-sm text-text-muted mt-1">{metric.change}</p>
                  </div>
                  <div className={`p-3 rounded-full ${metric.bgColor}`}>
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                </div>
                {metric.trend === "up" && (
                  <div className="absolute top-4 right-4">
                    <TrendingUp className="w-4 h-4 text-green-500 dark:text-green-400" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Modules */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-heading-xl text-text-primary">Módulos Principales</h2>
              <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                <Zap className="w-3 h-3 mr-1" />
                IA Activada
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules.map((module, index) => (
                <Link key={index} href={module.href}>
                  <Card
                    className={`group cursor-pointer transition-smooth hover-lift ${
                      module.featured ? "ring-2 ring-purple-200 dark:ring-purple-800" : ""
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`p-3 rounded-xl ${module.color} ${module.hoverColor} transition-colors duration-200`}
                        >
                          <module.icon className="w-6 h-6 text-white" />
                        </div>
                        {module.featured && (
                          <Badge className="bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700">
                            <Zap className="w-3 h-3 mr-1" />
                            IA
                          </Badge>
                        )}
                      </div>

                      <h3 className="text-heading-lg text-slate-900 dark:text-slate-50 mb-2 group-hover:text-blue-primary transition-colors">
                        {module.title}
                      </h3>
                      <p className="text-body-sm text-text-secondary mb-4">{module.description}</p>

                      <div className="flex items-center justify-between">
                        <span className="text-caption-md text-text-muted">{module.stats}</span>
                        <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-blue-primary group-hover:translate-x-1 transition-smooth" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span>Acciones Rápidas</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href}>
                    <Button variant="ghost" className="w-full justify-start h-auto p-3">
                      <div className={`p-2 rounded-lg ${action.color} mr-3 transition-smooth`}>
                        <action.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="text-body-sm font-medium text-text-primary">{action.title}</div>
                        <div className="text-caption-sm text-text-muted">{action.description}</div>
                      </div>
                    </Button>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span>Actividad Reciente</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === "session"
                          ? "bg-green-500 dark:bg-green-400"
                          : activity.type === "report"
                            ? "bg-purple-500 dark:bg-purple-400"
                            : "bg-blue-500 dark:bg-blue-400"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-body-sm font-medium text-text-primary">{activity.patient}</p>
                      <p className="text-body-sm text-text-secondary">{activity.action}</p>
                      <p className="text-caption-sm text-text-muted">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Demo Card */}
            <Card className="bg-gradient-card-hover border-purple-200 dark:border-purple-800">
              <CardContent className="p-card text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-blue">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-heading-md text-text-primary mb-2">Demo IA en Vivo</h3>
                <p className="text-body-sm text-text-secondary mb-4">
                  Experimenta las capacidades de IA de SessAI en tiempo real
                </p>
                <Link href="/ai-demo">
                  <Button variant="gradient" className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Probar Ahora
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function Dashboard() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  )
}
