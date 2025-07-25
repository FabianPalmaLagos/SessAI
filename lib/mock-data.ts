import { Therapist } from '@/types/therapist';
import { Session } from '@/types/session'; // Assuming session type exists as per rules
import { Patient } from '@/types/patient'; // Assuming patient type exists as per rules
import { addDays, format, parseISO } from 'date-fns';

export const mockTherapists: Therapist[] = [
  { id: '1', name: 'Dr. Ana Silva', email: 'ana.silva@example.com', color: '#3174ad' },
  { id: '2', name: 'Dr. Carlos Rojas', email: 'carlos.rojas@example.com', color: '#4caf50' },
  { id: '3', name: 'Dra. Lucia Gomez', email: 'lucia.gomez@example.com', color: '#f44336' },
  { id: '4', name: 'Dr. Miguel Torres', email: 'miguel.torres@example.com', color: '#9c27b0' },
  { id: '5', name: 'Dra. Carmen Vega', email: 'carmen.vega@example.com', color: '#06b6d4' },
];

export const mockPatients: Patient[] = [
  {
    id: 'p1',
    name: 'Juan Perez',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    totalSessions: 5,
  },
  {
    id: 'p2',
    name: 'Maria Rodriguez',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    totalSessions: 10,
  },
  {
    id: 'p3',
    name: 'Pedro Martinez',
    status: 'inactive',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    totalSessions: 2,
  },
    {
    id: 'p4',
    name: 'Sofia Lopez',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    totalSessions: 8,
  },
  {
    id: 'p5',
    name: 'Andrea Morales',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    totalSessions: 3,
  },
  {
    id: 'p6',
    name: 'Roberto Silva',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    totalSessions: 6,
  },
];


const today = new Date();

export const mockSessions: Session[] = [
  // Dr. Ana Silva's sessions
  {
    id: 's1',
    patientId: 'p1',
    therapistId: '1',
    date: format(today, 'yyyy-MM-dd'),
    startTime: '09:00',
    endTime: '10:00',
    duration: 60,
    type: 'virtual',
    status: 'scheduled',
    notes: 'Sesión inicial.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 's2',
    patientId: 'p2',
    therapistId: '1',
    date: format(today, 'yyyy-MM-dd'),
    startTime: '11:00',
    endTime: '12:00',
    duration: 60,
    type: 'presencial',
    status: 'completed',
    notes: 'Seguimiento de progreso.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // Dr. Carlos Rojas's sessions
  {
    id: 's3',
    patientId: 'p3',
    therapistId: '2',
    date: format(addDays(today, 1), 'yyyy-MM-dd'),
    startTime: '14:00',
    endTime: '15:00',
    duration: 60,
    type: 'presencial',
    status: 'scheduled',
    notes: 'Discusión sobre ansiedad.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // Dra. Lucia Gomez's sessions
  {
    id: 's4',
    patientId: 'p4',
    therapistId: '3',
    date: format(addDays(today, -1), 'yyyy-MM-dd'),
    startTime: '10:00',
    endTime: '11:00',
    duration: 60,
    type: 'virtual',
    status: 'completed',
    notes: 'Técnicas de mindfulness.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 's5',
    patientId: 'p1',
    therapistId: '2',
    date: format(addDays(today, 2), 'yyyy-MM-dd'),
    startTime: '16:00',
    endTime: '17:00',
    duration: 60,
    type: 'telefonica',
    status: 'scheduled',
    notes: 'Check-in rápido.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // Sesiones adicionales para demostrar filtros
  {
    id: 's6',
    patientId: 'p5',
    therapistId: '4',
    date: format(today, 'yyyy-MM-dd'),
    startTime: '15:00',
    endTime: '16:00',
    duration: 60,
    type: 'presencial',
    status: 'cancelled',
    notes: 'Cancelada por el paciente.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 's7',
    patientId: 'p6',
    therapistId: '5',
    date: format(addDays(today, -1), 'yyyy-MM-dd'),
    startTime: '13:00',
    endTime: '14:00',
    duration: 60,
    type: 'virtual',
    status: 'no-show',
    notes: 'El paciente no se presentó.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 's8',
    patientId: 'p2',
    therapistId: '4',
    date: format(today, 'yyyy-MM-dd'),
    startTime: '08:00',
    endTime: '09:00',
    duration: 60,
    type: 'presencial',
    status: 'completed',
    notes: 'Sesión de seguimiento exitosa.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 's9',
    patientId: 'p3',
    therapistId: '5',
    date: format(addDays(today, 1), 'yyyy-MM-dd'),
    startTime: '10:00',
    endTime: '11:00',
    duration: 60,
    type: 'telefonica',
    status: 'scheduled',
    notes: 'Consulta telefónica programada.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 's10',
    patientId: 'p4',
    therapistId: '1',
    date: format(addDays(today, -2), 'yyyy-MM-dd'),
    startTime: '14:00',
    endTime: '15:00',
    duration: 60,
    type: 'virtual',
    status: 'completed',
    notes: 'Revisión de objetivos terapéuticos.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]; 