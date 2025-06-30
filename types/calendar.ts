import { EventInput } from '@fullcalendar/core';

export interface CalendarEvent extends EventInput {
  extendedProps: {
    therapistId: string;
    patientId: string;
    patientName: string;
    therapistName: string;
    sessionType: 'presencial' | 'virtual' | 'telefonica';
    status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  };
} 