"use client"

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Patient } from '@/types/patient';
import { Therapist } from '@/types/therapist';
import { CalendarEvent } from '@/types/calendar';
import { User, Clock, MapPin, Video, ChevronsUpDown, Check } from 'lucide-react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils';

interface SessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Partial<CalendarEvent>) => void;
  event: Partial<CalendarEvent> | null;
  patients: Patient[];
  therapists: Therapist[];
}

export function SessionModal({ isOpen, onClose, onSave, event, patients, therapists }: SessionModalProps) {
  const [title, setTitle] = useState('');
  const [patientId, setPatientId] = useState('');
  const [therapistId, setTherapistId] = useState('');
  const [sessionType, setSessionType] = useState<'presencial' | 'virtual'>('virtual');
  const [address, setAddress] = useState('');

  const [isPatientComboboxOpen, setIsPatientComboboxOpen] = useState(false);
  const [isTherapistComboboxOpen, setIsTherapistComboboxOpen] = useState(false);

  useEffect(() => {
    if (event) {
      setTitle(event.title || 'Nueva Sesión');
      setPatientId(event.extendedProps?.patientId || '');
      setTherapistId(event.extendedProps?.therapistId || '');
      setSessionType(event.extendedProps?.sessionType === 'presencial' ? 'presencial' : 'virtual');
    } else {
      setTitle('Nueva Sesión');
      setPatientId('');
      setTherapistId('');
      setSessionType('virtual');
    }
  }, [event]);

  const handleSave = () => {
    const selectedTherapist = therapists.find(t => t.id === therapistId);
    const selectedPatient = patients.find(p => p.id === patientId);
    
    const newEvent: Partial<CalendarEvent> = {
      ...event,
      title: title || `Sesión con ${selectedPatient?.name || 'Paciente'}`,
      backgroundColor: selectedTherapist?.color,
      borderColor: selectedTherapist?.color,
      extendedProps: {
        ...event?.extendedProps,
        patientId,
        therapistId,
        sessionType,
        patientName: selectedPatient?.name || '',
        therapistName: selectedTherapist?.name || '',
      }
    };
    onSave(newEvent);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>
            <Input 
              placeholder="Añade un título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl font-bold border-0 border-b-2 rounded-none shadow-none focus-visible:ring-0 focus:border-primary"
            />
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="flex items-center gap-4">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div className="text-sm">
              {event?.start ? format(new Date(event.start as string), "eeee, d 'de' MMMM, h:mm a") : 'N/A'}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <User className="h-5 w-5 text-muted-foreground" />
            <Popover open={isPatientComboboxOpen} onOpenChange={setIsPatientComboboxOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={isPatientComboboxOpen} className="w-full justify-between font-normal">
                  {patientId ? patients.find(p => p.id === patientId)?.name : "Seleccionar paciente"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                  <CommandInput placeholder="Buscar paciente..." />
                  <CommandEmpty>No se encontró paciente.</CommandEmpty>
                  <CommandGroup>
                    {patients.map((p) => (
                      <CommandItem key={p.id} value={p.name} onSelect={() => { setPatientId(p.id); setIsPatientComboboxOpen(false); }}>
                        <Check className={cn("mr-2 h-4 w-4", patientId === p.id ? "opacity-100" : "opacity-0")} />
                        {p.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center gap-4">
            <User className="h-5 w-5 text-muted-foreground" />
            <Popover open={isTherapistComboboxOpen} onOpenChange={setIsTherapistComboboxOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={isTherapistComboboxOpen} className="w-full justify-between font-normal">
                  {therapistId ? therapists.find(t => t.id === therapistId)?.name : "Seleccionar terapeuta"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                  <CommandInput placeholder="Buscar terapeuta..." />
                  <CommandEmpty>No se encontró terapeuta.</CommandEmpty>
                  <CommandGroup>
                    {therapists.map((t) => (
                      <CommandItem key={t.id} value={t.name} onSelect={() => { setTherapistId(t.id); setIsTherapistComboboxOpen(false); }}>
                        <Check className={cn("mr-2 h-4 w-4", therapistId === t.id ? "opacity-100" : "opacity-0")} />
                        {t.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-start gap-4">
             <div className="flex items-center gap-4 pt-2">
                <RadioGroup defaultValue="virtual" value={sessionType} onValueChange={(value: 'presencial' | 'virtual') => setSessionType(value)} className="flex">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="virtual" id="virtual" />
                        <Label htmlFor="virtual" className="flex items-center gap-2"><Video className="h-4 w-4" /> Videollamada</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="presencial" id="presencial" />
                        <Label htmlFor="presencial" className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Presencial</Label>
                    </div>
                </RadioGroup>
            </div>
          </div>
          {sessionType === 'presencial' && (
            <div className="flex items-center gap-4 pl-8">
              <Input placeholder="Añadir ubicación" value={address} onChange={e => setAddress(e.target.value)} />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 