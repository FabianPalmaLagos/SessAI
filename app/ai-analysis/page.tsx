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
  const [unstructuredNotes, setUnstructuredNotes] = useState("")
  const [instruction, setInstruction] = useState("")
  const [structuredResult, setStructuredResult] = useState("")
  const [isStructuring, setIsStructuring] = useState(false)

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

  const handleStructureNotes = () => {
    setIsStructuring(true)
    setStructuredResult("")
    // Simular generación de informe
    setTimeout(() => {
      // Ejemplo de respuesta basada en la instrucción
      let result = `## Resultado de IA\n\n**Instrucción:** ${instruction || "Estructurar notas"}\n\n**Notas Originales:**\n${unstructuredNotes}\n\n---\n\n`
      if (instruction.toLowerCase().includes("resumen")) {
        result += `### Resumen de la Sesión\nEl paciente discutió sus dificultades para dormir y la ansiedad relacionada con el trabajo. Se exploraron técnicas de relajación y se acordó practicar la meditación mindfulness diariamente.`
      } else if (instruction.toLowerCase().includes("soap")) {
        result += `### Formato SOAP\n**S (Subjetivo):** Paciente reporta "No he podido dormir bien esta semana, me siento muy ansioso por el trabajo."\n**O (Objetivo):** Se observa inquietud motora y discurso acelerado.\n**A (Análisis):** Ansiedad generalizada exacerbada por estresores laborales. Dificultad para iniciar y mantener el sueño.\n**P (Plan):** Introducir técnicas de higiene del sueño. Practicar ejercicio de respiración diafragmática (5 min, 2 veces al día). Tarea: llevar un registro de pensamientos ansiógenos antes de dormir.`
      } else {
        result += `### Notas Estructuradas\n**Tema Principal:** Ansiedad laboral y problemas de sueño.\n**Puntos Clave:**\n- Dificultad para conciliar el sueño.\n- Preocupación constante por responsabilidades laborales.\n- Interés en aprender técnicas de manejo de estrés.\n**Plan de Acción:**\n1.  Practicar meditación mindfulness (10 min/día).\n2.  Utilizar la técnica de "preocupación programada".\n3.  Revisar avances en la próxima sesión.`
      }
      setStructuredResult(result)
      setIsStructuring(false)
    }, 2500)
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generate-report">Generar Informe</TabsTrigger>
            <TabsTrigger value="document-assistant">Asistente Documentación</TabsTrigger>
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
                <CardDescription>Estructura y mejora tus notas de sesión con IA. Puedes darle una instrucción específica o dejarlo en blanco para una estructuración general.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="instruction" className="text-sm font-medium mb-2 block text-foreground">Instrucción para la IA</label>
                  <Input 
                    id="instruction"
                    placeholder="Ej: 'Genera un resumen en 5 puntos' o 'Convierte a formato SOAP'" 
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="unstructured-notes" className="text-sm font-medium mb-2 block text-foreground">Notas sin estructurar</label>
                  <Textarea
                    id="unstructured-notes"
                    placeholder="Pega aquí tus notas de sesión para que la IA las estructure..."
                    rows={8}
                    value={unstructuredNotes}
                    onChange={(e) => setUnstructuredNotes(e.target.value)}
                  />
                </div>

                <Button onClick={handleStructureNotes} disabled={isStructuring || !unstructuredNotes} className="w-full">
                  {isStructuring ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                      Generando...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Generar con IA
                    </>
                  )}
                </Button>

                <div className="bg-muted p-4 rounded-lg min-h-[100px]">
                  <h4 className="font-medium mb-2 text-foreground">Resultado Generado:</h4>
                  {isStructuring ? (
                     <div className="space-y-2">
                        <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                        <div className="h-4 bg-slate-200 rounded animate-pulse w-5/6"></div>
                        <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4"></div>
                     </div>
                  ) : structuredResult ? (
                    <pre className="whitespace-pre-wrap text-sm font-sans">{structuredResult}</pre>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      <p className="italic">El resultado generado por la IA aparecerá aquí...</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
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
