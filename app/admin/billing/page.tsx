"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, PlusCircle, Download } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Progress } from "@/components/ui/progress"
import { es } from 'date-fns/locale';
import { format } from "date-fns"


// --- Mock Data ---

const planDetails = {
  name: "Plan Profesional",
  creditsPerMonth: 4900, // $49 * 100 créditos
  price: 49,
  renewalDate: "2024-08-15",
};

const creditUsage = {
  used: 1875,
  total: 4900,
};

const usageHistory = [
  { id: 'txn_1', date: "2024-07-28T10:30:00Z", type: "Resumen de Sesión", model: "Equilibrado", credits: 25.5, patientId: "P001" },
  { id: 'txn_2', date: "2024-07-28T09:00:00Z", type: "Análisis de Sentimiento", model: "Rápido", credits: 5.2, patientId: "P002" },
  { id: 'txn_3', date: "2024-07-27T15:00:00Z", type: "Transcripción de Audio", model: "Avanzado", credits: 150.0, patientId: "P003" },
  { id: 'txn_4', date: "2024-07-27T11:00:00Z", type: "Resumen de Sesión", model: "Equilibrado", credits: 30.1, patientId: "P004" },
  { id: 'txn_5', date: "2024-07-26T14:20:00Z", type: "Extracción de Palabras Clave", model: "Rápido", credits: 2.5, patientId: "P005" },
];

const dailyConsumptionData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toISOString().split('T')[0],
    credits: Math.floor(Math.random() * (250 - 50 + 1) + 50), // Rango más realista para un total de 4900/mes
  };
});


export default function BillingPage() {
  const usedPercentage = (creditUsage.used / creditUsage.total) * 100;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="mb-6">
          <Link href="/admin">
            <Button variant="outline" className="flex items-center gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Volver al Centro de Control
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">
            Control de Gastos y Consumo de IA
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Monitoriza el uso de créditos, revisa tu historial y gestiona tu plan.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle>Plan Actual: {planDetails.name}</CardTitle>
                <CardDescription>
                   Se renueva el {format(new Date(planDetails.renewalDate), "d 'de' MMMM, yyyy", { locale: es })}.
                </CardDescription>
              </div>
              <Button size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Añadir Créditos
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>Créditos Usados</span>
                  <span>{creditUsage.used.toLocaleString()} / {creditUsage.total.toLocaleString()}</span>
                </div>
                <Progress value={usedPercentage} aria-label={`${usedPercentage}% de créditos usados`} />
                 <p className="text-xs text-slate-600 dark:text-slate-300 pt-1">
                  Has utilizado el {usedPercentage.toFixed(1)}% de tus créditos mensuales.
                </p>
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Uso este Mes</CardTitle>
               <CardDescription>Últimos 30 días</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{creditUsage.used.toLocaleString()}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">créditos consumidos</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Costo Promedio</CardTitle>
              <CardDescription>Por cada sesión registrada</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">~42.7</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">créditos por sesión</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
           <Card className="lg:col-span-3">
             <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Consumo de Créditos</CardTitle>
                  <CardDescription>Actividad de los últimos 30 días.</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
             </CardHeader>
             <CardContent className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailyConsumptionData}>
                        <XAxis
                            dataKey="date"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => format(new Date(value), 'd MMM', { locale: es })}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value.toLocaleString()}`}
                        />
                        <Tooltip
                            cursor={{ fill: 'hsl(var(--muted))' }}
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                return (
                                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="flex flex-col">
                                            <span className="text-[0.70rem] uppercase text-slate-600 dark:text-slate-300">
                                                Fecha
                                            </span>
                                            <span className="font-bold text-slate-600 dark:text-slate-300">
                                                {format(new Date(label), "d 'de' MMMM, yyyy", { locale: es })}
                                            </span>
                                            </div>
                                            <div className="flex flex-col">
                                            <span className="text-[0.70rem] uppercase text-slate-600 dark:text-slate-300">
                                                Créditos
                                            </span>
                                            <span className="font-bold text-foreground">
                                                {payload[0].value.toLocaleString()}
                                            </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                                }
                                return null
                            }}
                        />
                        <Bar dataKey="credits" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
             </CardContent>
           </Card>

           <Card className="lg:col-span-2">
             <CardHeader>
                <CardTitle>Historial de Consumo Reciente</CardTitle>
             </CardHeader>
             <CardContent>
               <Table>
                 <TableHeader>
                   <TableRow>
                     <TableHead>Tipo de Tarea</TableHead>
                     <TableHead className="text-right">Créditos</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   {usageHistory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="font-medium">{item.type}</div>
                          <div className="text-xs text-slate-600 dark:text-slate-300">
                             {format(new Date(item.date), "dd/MM/yyyy HH:mm")}
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-mono">{item.credits.toFixed(1)}</TableCell>
                      </TableRow>
                   ))}
                 </TableBody>
               </Table>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  )
} 