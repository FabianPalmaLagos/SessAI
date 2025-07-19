export type UserRole = 'admin' | 'therapist' | 'assistant'

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
  role: UserRole
  specialties?: string[]
  licenseNumber?: string
  acceptTerms: boolean
}

export interface ForgotPasswordData {
  email: string
}

export interface ResetPasswordData {
  token: string
  password: string
  confirmPassword: string
}

export interface VerifyEmailData {
  token: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresAt: number
}

export interface AuthResponse {
  user: User
  tokens: AuthTokens
  message?: string
}

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
}

export interface TherapistProfile {
  id: string
  userId: string
  firstName: string
  lastName: string
  photo?: string
  bio?: string
  specialties: string[]
  credentials: string[]
  licenseNumber?: string
  phoneNumber?: string
  address?: {
    street: string
    city: string
    region: string
    zipCode: string
    country: string
  }
  languages: string[]
  yearsOfExperience?: number
  education: Education[]
  certifications: Certification[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate?: string
  description?: string
}

export interface Certification {
  id: string
  name: string
  issuingOrganization: string
  issueDate: string
  expirationDate?: string
  credentialId?: string
  credentialUrl?: string
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: string
  timezone: string
  emailNotifications: {
    appointments: boolean
    reminders: boolean
    reports: boolean
    marketing: boolean
  }
  twoFactorEnabled: boolean
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  tokens: AuthTokens | null
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  forgotPassword: (data: ForgotPasswordData) => Promise<void>
  resetPassword: (data: ResetPasswordData) => Promise<void>
  verifyEmail: (data: VerifyEmailData) => Promise<void>
  updateProfile: (profileData: Partial<TherapistProfile>) => Promise<void>
  refreshAccessToken: () => Promise<void>
  checkAuthStatus: () => Promise<void>
}