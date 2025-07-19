import { UserRole, TherapistProfile, UserPreferences } from './auth'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  isEmailVerified: boolean
  profile: TherapistProfile
  preferences: UserPreferences
  createdAt: string
  updatedAt: string
  lastLoginAt?: string
  isActive: boolean
}

export interface CreateUserData {
  email: string
  password: string
  name: string
  role: UserRole
}

export interface UpdateUserData {
  name?: string
  email?: string
  role?: UserRole
  isActive?: boolean
  preferences?: Partial<UserPreferences>
}

export interface UserSession {
  id: string
  userId: string
  deviceId: string
  deviceInfo: string
  ipAddress: string
  userAgent: string
  isActive: boolean
  createdAt: string
  expiresAt: string
  lastActiveAt: string
}

export interface UserActivity {
  id: string
  userId: string
  action: string
  resource: string
  resourceId?: string
  metadata?: Record<string, any>
  ipAddress: string
  userAgent: string
  createdAt: string
}

// API Response types
export interface UserListResponse {
  users: User[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface UserResponse {
  user: User
  message?: string
}

// Form data types
export interface UserFormData {
  name: string
  email: string
  role: UserRole
  isActive: boolean
}

export interface UserProfileFormData {
  firstName: string
  lastName: string
  bio?: string
  phoneNumber?: string
  specialties: string[]
  credentials: string[]
  licenseNumber?: string
  languages: string[]
  yearsOfExperience?: number
}

export interface UserPreferencesFormData {
  theme: 'light' | 'dark' | 'system'
  language: string
  timezone: string
  emailNotifications: {
    appointments: boolean
    reminders: boolean
    reports: boolean
    marketing: boolean
  }
}

// Filter and search types
export interface UserFilters {
  role?: UserRole
  isActive?: boolean
  isEmailVerified?: boolean
  search?: string
  sortBy?: 'name' | 'email' | 'createdAt' | 'lastLoginAt'
  sortOrder?: 'asc' | 'desc'
}

export interface UserStats {
  total: number
  active: number
  inactive: number
  byRole: {
    admin: number
    therapist: number
    assistant: number
  }
  emailVerified: number
  emailUnverified: number
}