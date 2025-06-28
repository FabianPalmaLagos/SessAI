"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Brain, Mic, FileText, Sparkles, Play } from "lucide-react"
import Link from "next/link"

export default function AIDemoPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [demoText, setDemoText] = useState("")
  const [result, setResult] = useState("")

  const handleDemo = (type: string) => {
    setIsProcessing(true)

    setTimeout(() => {
      if (type === "transcription") {
        setResult(`
**Transcripción Automática:**

"Buenos días María, ¿cómo te has sentido desde nuestra última sesión? He notado que has estado trabajando en las técnicas de respiración que practicamos. Me gustaría que me cuentes sobre alguna situación específica donde las hayas aplicado y cómo te resultó."

**Análisis de Sentimientos:** Positivo (85%)
**Temas Identificados:** Técnicas de respiración, seguimiento de progreso, aplicación práctica
**Duración:** 2:34 minutos
        `)
      } else if (type === "structure") {
        setResult(`
**Notas Estructuradas:**

## Información de la Sesión
- **Fecha:** 15 de enero, 2024
- **Duración:** 50 minutos
- **Modalidad:** Presencial

## Objetivos de la Sesión
- Evaluar progreso en técnicas de respiración
- Trabajar en situaciones de ansiedad social
- Planificar exposición gradual

## Desarrollo de la Sesión
### Revisión de Tareas
- Paciente practicó respiración diafragmática 3 veces por semana
- Aplicó técnicas en situación laboral estresante con éxito

### Intervenciones Realizadas
- Técnica de reestructuración cognitiva
- Práctica de exposición imaginaria
- Asignación de nueva tarea para casa

## Observaciones Clínicas
- Mayor confianza en aplicación de técnicas
- Reducción notable en síntomas de ansiedad
- Buena adherencia al tratamiento

## Plan para Próxima Sesión
- Continuar con exposición gradual
- Introducir técnicas de mindfulness
- Evaluar posibilidad de espaciar sesiones
        `)
      } else if (type === "report") {
        setResult(`
**Informe de Progreso Generado por IA:**

# Resumen Ejecutivo
María González ha mostrado una evolución excepcional durante las últimas 8 sesiones. Los indicadores de progreso muestran una mejora del 70% en el manejo de ansiedad.

## Métricas de Progreso
- **Adherencia al tratamiento:** 95%
- **Aplicación de técnicas:** 85%
- **Reducción de síntomas:** 70%
- **Satisfacción del paciente:** 9/10

## Análisis Predictivo
Basado en el patrón actual, se estima que la paciente alcanzará los objetivos terapéuticos en 4-6 sesiones adicionales.

## Recomendaciones
1. Mantener frecuencia actual de sesiones
2. Introducir técnicas avanzadas de autorregulación
3. Planificar estrategias de prevención de recaídas
        `)
      }
      setIsProcessing(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
            <Brain className="h-10 w-10 text-purple-600" />
            Demo IA de TheraMind
          </h1>
          <p className="text-lg text-gray-600">Experimenta el poder de la inteligencia artificial en terapia</p>
        </div>

        {/* Demo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Mic className="h-5 w-5" />
                Transcripción Automática
              </CardTitle>
              <CardDescription>Convierte audio de sesiones en texto estructurado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-purple-50 p-3 rounded-lg text-center">
                  <Play className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-purple-700">Audio de muestra: 2:34 min</p>
                </div>
                <Button
                  onClick={() => handleDemo("transcription")}
                  disabled={isProcessing}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isProcessing ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                      Transcribiendo...
                    </>
                  ) : (
                    "Probar Transcripción"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <FileText className="h-5 w-5" />
                Estructuración de Notas
              </CardTitle>
              <CardDescription>Organiza notas desestructuradas automáticamente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Escribe notas desestructuradas aquí..."
                  value={demoText}
                  onChange={(e) => setDemoText(e.target.value)}
                  rows={3}
                />
                <Button
                  onClick={() => handleDemo("structure")}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isProcessing ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                      Estructurando...
                    </>
                  ) : (
                    "Estructurar Notas"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-2 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Brain className="h-5 w-5" />
                Generación de Informes
              </CardTitle>
              <CardDescription>Crea informes de progreso inteligentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-700">
                    <strong>Período:</strong> 8 sesiones
                    <br />
                    <strong>Paciente:</strong> María González
                  </p>
                </div>
                <Button
                  onClick={() => handleDemo("report")}
                  disabled={isProcessing}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {isProcessing ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                      Generando...
                    </>
                  ) : (
                    "Generar Informe"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        {result && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                Resultado de IA
              </CardTitle>
              <div className="flex gap-2">
                <Badge className="bg-green-100 text-green-700">Procesado con éxito</Badge>
                <Badge variant="outline">Tiempo: 2.1s</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-4 rounded-lg border">
                <pre className="whitespace-pre-wrap text-sm">{result}</pre>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features Highlight */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="text-center">¿Por qué TheraMind es Revolucionario?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <Brain className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">IA Especializada</h3>
                <p className="text-sm text-gray-600">Entrenada específicamente para el contexto terapéutico</p>
              </div>
              <div>
                <Sparkles className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Ahorro de Tiempo</h3>
                <p className="text-sm text-gray-600">Reduce el trabajo administrativo en un 70%</p>
              </div>
              <div>
                <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Calidad Profesional</h3>
                <p className="text-sm text-gray-600">Informes y documentación de nivel clínico</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="text-center space-x-4">
          <Link href="/">
            <Button variant="outline">← Volver al Dashboard</Button>
          </Link>
          <Link href="/ai-analysis">
            <Button>Explorar Módulo IA Completo</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
