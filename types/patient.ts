export interface Patient {
  id: string; // UUID en producción
  name: string;
  rut?: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  address?: {
    street?: string;
    city?: string;
    region?: string;
    zipCode?: string;
  };
  status: 'active' | 'inactive' | 'archived';
  createdAt: string;
  updatedAt: string;
  lastSessionDate?: string;
  totalSessions: number;
  notes?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
} 