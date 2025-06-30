"use client"

import React, { useState, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import { DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Session } from '@/types/session';
import { Therapist } from '@/types/therapist';
import { Patient } from '@/types/patient';
import { CalendarEvent } from '@/types/calendar';
import { SessionModal } from './session-modal';

interface CalendarViewProps {
  sessions: Session[];
  therapists: Therapist[];
  patients: Patient[];
}

export function CalendarView({ sessions: initialSessions, therapists, patients }: CalendarViewProps) {
  const [events, setEvents] = useState<CalendarEvent[]>(() => 
    initialSessions.map((session): CalendarEvent => {
      const therapist = therapists.find(t => t.id === session.therapistId);
      const patient = patients.find(p => p.id === session.patientId);
      return {
        id: session.id,
        title: `Sesión con ${patient?.name || '...'}`,
        start: `${session.date}T${session.startTime}`,
        end: `${session.date}T${session.endTime}`,
        backgroundColor: therapist?.color || '#3788d8',
        borderColor: therapist?.color || '#3788d8',
        extendedProps: {
          therapistId: session.therapistId,
          patientId: session.patientId,
          patientName: patient?.name || 'Desconocido',
          therapistName: therapist?.name || 'Desconocido',
          sessionType: session.type,
          status: session.status,
          notes: session.notes,
        }
      };
    })
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Partial<CalendarEvent> | null>(null);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setSelectedEvent({
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay
    });
    setIsModalOpen(true);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedEvent({
        id: clickInfo.event.id,
        title: clickInfo.event.title,
        start: clickInfo.event.startStr,
        end: clickInfo.event.endStr,
        allDay: clickInfo.event.allDay,
        extendedProps: clickInfo.event.extendedProps as CalendarEvent['extendedProps']
    });
    setIsModalOpen(true);
  };

  const handleSaveEvent = (newEventData: Partial<CalendarEvent>) => {
    if (newEventData.id) { // Update existing event
      setEvents(prevEvents => prevEvents.map(event => 
        event.id === newEventData.id ? { ...event, ...newEventData } as CalendarEvent : event
      ));
    } else { // Create new event
      setEvents(prevEvents => [
        ...prevEvents,
        { ...newEventData, id: `session-${Date.now()}` } as CalendarEvent
      ]);
    }
  };

  return (
    <div className="h-full w-full">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        initialView="timeGridWeek"
        events={events}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        locale="es"
        select={handleDateSelect}
        eventClick={handleEventClick}
        buttonText={{
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          list: 'Lista'
        }}
        eventContent={(eventInfo) => (
          <div className="p-1">
            <b>{eventInfo.timeText}</b>
            <p className="text-sm truncate">{eventInfo.event.title}</p>
            <i className="text-xs truncate">{eventInfo.event.extendedProps.therapistName}</i>
          </div>
        )}
      />
      <SessionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        event={selectedEvent}
        patients={patients}
        therapists={therapists}
      />
    </div>
  );
} 