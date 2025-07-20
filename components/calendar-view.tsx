"use client"

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Session } from '@/types/session';
import { Therapist } from '@/types/therapist';
import { Patient } from '@/types/patient';
import { CalendarEvent } from '@/types/calendar';
import { SessionModal } from './session-modal';
import { useTheme } from 'next-themes';
import { useIsMobile } from '@/hooks/use-mobile';

interface CalendarViewProps {
  sessions: Session[];
  therapists: Therapist[];
  patients: Patient[];
}

export function CalendarView({ sessions: initialSessions, therapists, patients }: CalendarViewProps) {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  
  const [events, setEvents] = useState<CalendarEvent[]>(() => 
    initialSessions.map((session): CalendarEvent => {
      const therapist = therapists.find(t => t.id === session.therapistId);
      const patient = patients.find(p => p.id === session.patientId);
      return {
        id: session.id,
        title: `${patient?.name || 'Paciente'} - Dr. ${therapist?.name || 'Desconocido'}`,
        start: `${session.date}T${session.startTime}`,
        end: `${session.date}T${session.endTime}`,
        backgroundColor: therapist?.color || '#3788d8',
        borderColor: therapist?.color || '#3788d8',
        textColor: '#ffffff',
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
    if (newEventData.id) {
      setEvents(prevEvents => prevEvents.map(event => 
        event.id === newEventData.id ? { ...event, ...newEventData } as CalendarEvent : event
      ));
    } else {
      setEvents(prevEvents => [
        ...prevEvents,
        { ...newEventData, id: `session-${Date.now()}` } as CalendarEvent
      ]);
    }
  };

  const calendarOptions = isMobile 
  ? { // Mobile options
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'listWeek,timeGridDay'
      },
      initialView: 'listWeek',
      views: {
        listWeek: {
          buttonText: 'Lista',
        },
        timeGridDay: {
          buttonText: 'Día'
        }
      }
    }
  : { // Desktop options
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialView: 'timeGridWeek',
      views: {}
    };

  return (
    <div className="h-full w-full">
      <style jsx global>{`
        /* Estilos base para FullCalendar */
        .fc {
          font-family: inherit;
        }
        
        .fc .fc-toolbar {
          background: transparent;
          margin-bottom: 1rem;
        }
        
        .fc .fc-toolbar-title {
          color: ${theme === 'dark' ? 'rgb(248 250 252)' : 'rgb(15 23 42)'};
          font-size: 1.25rem;
          font-weight: 600;
        }
        
        .fc .fc-button-primary {
          background-color: ${theme === 'dark' ? 'rgb(51 65 85)' : 'rgb(248 250 252)'};
          border-color: ${theme === 'dark' ? 'rgb(71 85 105)' : 'rgb(226 232 240)'};
          color: ${theme === 'dark' ? 'rgb(248 250 252)' : 'rgb(15 23 42)'};
          padding: 0.375rem 0.75rem;
          font-size: 0.875rem;
          border-radius: 0.375rem;
          transition: all 0.2s ease;
        }
        
        .fc .fc-button-primary:hover {
          background-color: ${theme === 'dark' ? 'rgb(71 85 105)' : 'rgb(241 245 249)'};
          border-color: ${theme === 'dark' ? 'rgb(100 116 139)' : 'rgb(203 213 225)'};
        }
        
        .fc .fc-button-primary:focus {
          outline: none;
          box-shadow: 0 0 0 2px ${theme === 'dark' ? 'rgb(59 130 246)' : 'rgb(59 130 246)'};
        }
        
        .fc .fc-button-active {
          background-color: ${theme === 'dark' ? 'rgb(59 130 246)' : 'rgb(59 130 246)'} !important;
          border-color: ${theme === 'dark' ? 'rgb(59 130 246)' : 'rgb(59 130 246)'} !important;
          color: white !important;
        }
        
        /* Grid y celdas */
        .fc .fc-scrollgrid {
          border-color: ${theme === 'dark' ? 'rgb(51 65 85)' : 'rgb(226 232 240)'};
          border-radius: 0.5rem;
          overflow: hidden;
        }
        
        .fc .fc-scrollgrid-section > * {
          border-color: ${theme === 'dark' ? 'rgb(51 65 85)' : 'rgb(226 232 240)'};
        }
        
        .fc .fc-col-header-cell {
          background-color: ${theme === 'dark' ? 'rgb(30 41 59)' : 'rgb(248 250 252)'};
          border-color: ${theme === 'dark' ? 'rgb(51 65 85)' : 'rgb(226 232 240)'};
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
        }
        
        .fc .fc-col-header-cell-cushion {
          color: ${theme === 'dark' ? 'rgb(203 213 225)' : 'rgb(71 85 105)'};
          padding: 8px 4px;
        }
        
        .fc .fc-timegrid-slot {
          border-color: ${theme === 'dark' ? 'rgb(51 65 85)' : 'rgb(226 232 240)'};
        }
        
        .fc .fc-timegrid-slot-label {
          color: ${theme === 'dark' ? 'rgb(148 163 184)' : 'rgb(100 116 139)'};
          font-size: 0.75rem;
          font-weight: 500;
        }
        
        .fc .fc-timegrid-axis {
          border-color: ${theme === 'dark' ? 'rgb(51 65 85)' : 'rgb(226 232 240)'};
        }
        
        .fc .fc-daygrid-day {
          background-color: ${theme === 'dark' ? 'rgb(15 23 42)' : 'white'};
        }
        
        .fc .fc-daygrid-day:hover {
          background-color: ${theme === 'dark' ? 'rgb(30 41 59)' : 'rgb(248 250 252)'};
        }
        
        .fc .fc-day-today {
          background-color: ${theme === 'dark' ? 'rgb(30 58 138)' : 'rgb(219 234 254)'} !important;
        }
        
        /* Eventos */
        .fc .fc-event {
          border-radius: 4px;
          border-width: 1px;
          margin: 1px;
          font-size: 0.75rem;
          line-height: 1.3;
          cursor: pointer;
          transition: all 0.2s ease;
          overflow: hidden;
        }
        
        .fc .fc-event:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          z-index: 10;
        }
        
        .fc .fc-event .fc-event-main {
          padding: 4px 6px;
        }
        
        .fc .fc-event-title {
          font-weight: 500;
          font-size: 0.75rem;
          line-height: 1.2;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .fc .fc-event-time {
          font-size: 0.7rem;
          font-weight: 600;
          opacity: 0.9;
        }
        
        /* Estados de eventos */
        .event-status-scheduled {
          border-left: 3px solid #3b82f6;
        }
        
        .event-status-completed {
          border-left: 3px solid #10b981;
        }
        
        .event-status-cancelled {
          border-left: 3px solid #ef4444;
          opacity: 0.7;
        }
        
        .event-status-no-show {
          border-left: 3px solid #ea580c;
          opacity: 0.8;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .fc .fc-toolbar {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .fc .fc-toolbar-title {
            font-size: 1.25rem;
          }
          
          .fc .fc-button {
            padding: 0.25rem 0.5rem;
            font-size: 0.75rem;
          }
          
          .fc .fc-event-title {
            font-size: 0.7rem;
          }
          
          .fc .fc-event-time {
            font-size: 0.65rem;
          }
        }
        
        /* Selección de tiempo */
        .fc .fc-highlight {
          background-color: ${theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'};
        }
        
        /* Lista de eventos */
        .fc .fc-list-event {
          background-color: ${theme === 'dark' ? 'rgb(30 41 59)' : 'white'};
          border-color: ${theme === 'dark' ? 'rgb(51 65 85)' : 'rgb(226 232 240)'};
        }
        
        .fc .fc-list-event:hover {
          background-color: ${theme === 'dark' ? 'rgb(51 65 85)' : 'rgb(248 250 252)'};
        }
        
        .fc .fc-list-event-title {
          color: ${theme === 'dark' ? 'rgb(248 250 252)' : 'rgb(15 23 42)'};
        }
        
        .fc .fc-list-event-time {
          color: ${theme === 'dark' ? 'rgb(148 163 184)' : 'rgb(100 116 139)'};
        }
      `}</style>
      
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        {...calendarOptions}
        events={events}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        locale="es"
        height="100%"
        slotMinTime="07:00:00"
        slotMaxTime="21:00:00"
        slotDuration="00:30:00"
        slotLabelInterval="01:00:00"
        select={handleDateSelect}
        eventClick={handleEventClick}
        buttonText={{
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          list: 'Lista'
        }}
        eventClassNames={(eventInfo) => {
          const status = eventInfo.event.extendedProps.status;
          return [`event-status-${status}`];
        }}
        dayHeaderFormat={{ weekday: 'short', day: 'numeric' }}
        slotLabelFormat={{
          hour: 'numeric',
          minute: '2-digit',
          hour12: false
        }}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          hour12: false
        }}
        eventDisplay="block"
        displayEventTime={true}
        displayEventEnd={false}
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