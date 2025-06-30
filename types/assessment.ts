export interface Assessment {
  id: string;
  sessionId: string;
  type: 'mood' | 'anxiety' | 'progress' | 'custom';
  scale: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  notes?: string;
  createdAt: string;
} 