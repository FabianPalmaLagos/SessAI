import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarView } from "@/components/calendar-view";
import { mockSessions, mockTherapists, mockPatients } from "@/lib/mock-data";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function CalendarPage() {
  // In a real app, you would fetch this data
  const sessions = mockSessions;
  const therapists = mockTherapists;
  const patients = mockPatients;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          Calendario de Terapeutas
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Visualiza y gestiona las sesiones de todos los terapeutas en un solo lugar.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Filtros
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="font-semibold">Terapeutas</Label>
                <div className="mt-2 space-y-2">
                  {therapists.map((therapist) => (
                    <div key={therapist.id} className="flex items-center gap-2">
                      <Checkbox id={`therapist-${therapist.id}`} defaultChecked />
                      <div
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: therapist.color }}
                      />
                      <Label htmlFor={`therapist-${therapist.id}`} className="font-normal">
                        {therapist.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <Button className="w-full">Aplicar Filtros</Button>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-3">
          <Card className="h-[900px] p-4">
            <CalendarView 
              sessions={sessions} 
              therapists={therapists} 
              patients={patients} 
            />
          </Card>
        </div>
      </div>
    </div>
  );
} 