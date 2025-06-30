import { Assessment } from './assessment'; // Assuming assessment type exists or will be created

interface Attachment {
  id: string;
  url: string;
  fileName: string;
  fileType: string;
}

export interface Session {
  id: string;
  patientId: string;
  therapistId: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // en minutos
  type: 'presencial' | 'virtual' | 'telefonica';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes: string;
  goals?: string[];
  assessments?: Assessment[];
  attachments?: Attachment[];
  createdAt: string;
  updatedAt: string;
} 