import { EventInput } from '@fullcalendar/core';

export interface CalendarEvent extends EventInput {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  allDay?: boolean;
  extendedProps: {
    therapistId: string;
    patientId: string;
    patientName: string;
    therapistName: string;
    sessionType: 'presencial' | 'virtual' | 'telefonica';
    status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
    notes?: string;
  };
} 