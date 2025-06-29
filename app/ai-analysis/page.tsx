"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, FileText, Download, Sparkles, TrendingUp, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function AIAnalysisPage() {
  const [selectedPatient, setSelectedPatient] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedReport, setGeneratedReport] = useState("")

  const handleGenerateReport = () => {
    setIsGenerating(true)
    // Simular generación de informe
    setTimeout(() => {
      setGeneratedReport(`
# Informe de Progreso Terapéutico
**Paciente:** María González  
**Período:** 01/12/2023 - 15/01/2024  
**Total de Sesiones:** 8

## Resumen Ejecutivo
Durante el período analizado, la paciente ha mostrado una evolución positiva significativa en el manejo de sus síntomas de ansiedad. Se observa una mejora del 65% en las técnicas de autorregulación emocional.

## Análisis de Progreso
### Áreas de Mejora Identificadas:
- **Técnicas de Respiración:** Dominio completo alcanzado en sesión 6
- **Reestructuración Cognitiva:** Progreso notable, aplicación autónoma en situaciones cotidianas
- **Exposición Gradual:** Completó 4 de 6 objetivos planteados

### Patrones Identificados:
- Mayor receptividad en sesiones matutinas
- Mejor respuesta a técnicas cognitivo-conductuales
- Resistencia inicial a técnicas de mindfulness, superada en sesión 5

## Recomendaciones
1. Continuar con técnicas de exposición gradual
2. Introducir técnicas avanzadas de mindfulness
3. Planificar sesiones de seguimiento quincenal

## Próximos Objetivos
- Consolidar logros actuales
- Trabajar en prevención de recaídas
- Desarrollar plan de alta terapéutica
      `)
      setIsGenerating(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            Análisis con IA
          </h1>
          <p className="text-muted-foreground">Generación de informes y asistente de documentación inteligente</p>
        </div>

        <Tabs defaultValue="generate-report" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="generate-report">Generar Informe</TabsTrigger>
            <TabsTrigger value="document-assistant">Asistente Documentación</TabsTrigger>
            <TabsTrigger value="insights">Insights IA</TabsTrigger>
          </TabsList>

          <TabsContent value="generate-report">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Configuration Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Configuración del Informe
                  </CardTitle>
                  <CardDescription>Selecciona el período y paciente para generar un informe con IA</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-foreground">Paciente</label>
                    <Input
                      placeholder="Seleccionar paciente..."
                      value={selectedPatient}
                      onChange={(e) => setSelectedPatient(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block text-foreground">Fecha Inicio</label>
                      <Input type="date" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block text-foreground">Fecha Fin</label>
                      <Input type="date" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block text-foreground">Tipo de Informe</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="progress">Informe de Progreso</SelectItem>
                        <SelectItem value="summary">Resumen de Sesiones</SelectItem>
                        <SelectItem value="patterns">Análisis de Patrones</SelectItem>
                        <SelectItem value="recommendations">Recomendaciones Terapéuticas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={handleGenerateReport} disabled={isGenerating} className="w-full">
                    {isGenerating ? (
                      <>
                        <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                        Generando con IA...
                      </>
                    ) : (
                      <>
                        <Brain className="h-4 w-4 mr-2" />
                        Generar Informe
                      </>
                    )}
                  </Button>

                  {isGenerating && (
                    <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-primary mb-2">
                        <Brain className="h-4 w-4" />
                        <span className="font-medium">IA Procesando</span>
                      </div>
                      <div className="space-y-1 text-sm text-primary/80">
                        <p>✓ Analizando sesiones del período</p>
                        <p>✓ Identificando patrones de progreso</p>
                        <p>⏳ Generando recomendaciones...</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Generated Report */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Informe Generado
                  </CardTitle>
                  {generatedReport && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Descargar PDF
                      </Button>
                      <Button size="sm" variant="outline">
                        Compartir
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  {generatedReport ? (
                    <div className="bg-card border p-4 rounded-lg max-h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm">{generatedReport}</pre>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4" />
                      <p>El informe generado aparecerá aquí</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="document-assistant">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Asistente de Documentación
                </CardTitle>
                <CardDescription>Estructura y mejora tus notas de sesión con IA</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block text-foreground">Notas sin estructurar</label>
                  <Textarea placeholder="Pega aquí tus notas de sesión para que la IA las estructure..." rows={8} />
                </div>

                <Button className="w-full">
                  <Brain className="h-4 w-4 mr-2" />
                  Estructurar con IA
                </Button>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-foreground">Resultado Estructurado:</h4>
                  <div className="text-sm text-muted-foreground">
                    <p className="italic">Las notas estructuradas aparecerán aquí...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Patrones Identificados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="default">
                        Positivo
                      </Badge>
                      <span className="text-sm text-foreground">85% de pacientes mejoran en primeras 6 sesiones</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        Insight
                      </Badge>
                      <span className="text-sm text-foreground">Técnicas CBT más efectivas en horario matutino</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive">
                        Atención
                      </Badge>
                      <span className="text-sm text-foreground">3 pacientes requieren seguimiento más frecuente</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    Recomendaciones IA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <p>• Considerar sesiones grupales para pacientes con ansiedad social</p>
                    <p>• Implementar técnicas de mindfulness en casos de estrés laboral</p>
                    <p>• Revisar frecuencia de sesiones para pacientes con progreso lento</p>
                  </div>
                </CardContent>
              </Card>
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
