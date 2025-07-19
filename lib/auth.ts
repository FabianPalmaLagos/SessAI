import { 
  LoginCredentials, 
  RegisterData, 
  ForgotPasswordData, 
  ResetPasswordData, 
  VerifyEmailData,
  AuthResponse,
  AuthTokens,
  User 
} from '@/types/auth'

// Mock API base URL - replace with real API endpoint
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

// Local storage keys
const AUTH_STORAGE_KEYS = {
  ACCESS_TOKEN: 'sessai_access_token',
  REFRESH_TOKEN: 'sessai_refresh_token',
  USER: 'sessai_user',
  EXPIRES_AT: 'sessai_expires_at'
} as const

// Token management
export const tokenManager = {
  getAccessToken: (): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN)
  },

  getRefreshToken: (): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN)
  },

  getUser: (): User | null => {
    if (typeof window === 'undefined') return null
    const userString = localStorage.getItem(AUTH_STORAGE_KEYS.USER)
    return userString ? JSON.parse(userString) : null
  },

  getExpiresAt: (): number | null => {
    if (typeof window === 'undefined') return null
    const expiresAt = localStorage.getItem(AUTH_STORAGE_KEYS.EXPIRES_AT)
    return expiresAt ? parseInt(expiresAt) : null
  },

  setTokens: (tokens: AuthTokens, user: User): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken)
    localStorage.setItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken)
    localStorage.setItem(AUTH_STORAGE_KEYS.EXPIRES_AT, tokens.expiresAt.toString())
    localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(user))
  },

  clearTokens: (): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN)
    localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN)
    localStorage.removeItem(AUTH_STORAGE_KEYS.USER)
    localStorage.removeItem(AUTH_STORAGE_KEYS.EXPIRES_AT)
  },

  isTokenExpired: (): boolean => {
    const expiresAt = tokenManager.getExpiresAt()
    if (!expiresAt) return true
    return Date.now() >= expiresAt
  }
}

// API client with auth headers
const createAuthHeaders = (includeAuth = true): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (includeAuth) {
    const token = tokenManager.getAccessToken()
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }

  return headers
}

// Mock API responses for development
const mockAuthResponses = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock validation
    if (credentials.email === 'admin@sessai.com' && credentials.password === 'admin123') {
      const mockUser: User = {
        id: 'user_1',
        email: credentials.email,
        name: 'Dr. Ana Silva',
        role: 'admin',
        isEmailVerified: true,
        profile: {
          id: 'profile_1',
          userId: 'user_1',
          firstName: 'Ana',
          lastName: 'Silva',
          photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
          bio: 'Psicóloga clínica especializada en terapia cognitivo-conductual',
          specialties: ['Terapia Cognitivo-Conductual', 'Ansiedad', 'Depresión'],
          credentials: ['Psicóloga Clínica', 'Máster en Psicoterapia'],
          licenseNumber: 'PSI-12345',
          phoneNumber: '+56 9 8765 4321',
          languages: ['Español', 'Inglés'],
          yearsOfExperience: 8,
          education: [],
          certifications: [],
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        preferences: {
          theme: 'system',
          language: 'es',
          timezone: 'America/Santiago',
          emailNotifications: {
            appointments: true,
            reminders: true,
            reports: false,
            marketing: false
          },
          twoFactorEnabled: false
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true
      }

      const mockTokens: AuthTokens = {
        accessToken: 'mock_access_token_' + Date.now(),
        refreshToken: 'mock_refresh_token_' + Date.now(),
        expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      }

      return {
        user: mockUser,
        tokens: mockTokens,
        message: 'Login exitoso'
      }
    }

    throw new Error('Credenciales inválidas')
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Mock email validation
    if (data.email === 'existing@example.com') {
      throw new Error('Este email ya está registrado')
    }

    const mockUser: User = {
      id: 'user_' + Date.now(),
      email: data.email,
      name: data.name,
      role: data.role,
      isEmailVerified: false,
      profile: {
        id: 'profile_' + Date.now(),
        userId: 'user_' + Date.now(),
        firstName: data.name.split(' ')[0] || data.name,
        lastName: data.name.split(' ').slice(1).join(' ') || '',
        specialties: data.specialties || [],
        credentials: [],
        licenseNumber: data.licenseNumber,
        languages: ['Español'],
        education: [],
        certifications: [],
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      preferences: {
        theme: 'system',
        language: 'es',
        timezone: 'America/Santiago',
        emailNotifications: {
          appointments: true,
          reminders: true,
          reports: true,
          marketing: false
        },
        twoFactorEnabled: false
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true
    }

    const mockTokens: AuthTokens = {
      accessToken: 'mock_access_token_' + Date.now(),
      refreshToken: 'mock_refresh_token_' + Date.now(),
      expiresAt: Date.now() + (24 * 60 * 60 * 1000)
    }

    return {
      user: mockUser,
      tokens: mockTokens,
      message: 'Registro exitoso. Por favor verifica tu email.'
    }
  }
}

// Auth API functions
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Use mock in development, replace with real API call in production
    if (process.env.NODE_ENV === 'development') {
      return mockAuthResponses.login(credentials)
    }

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: createAuthHeaders(false),
      body: JSON.stringify(credentials)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Error en el login')
    }

    return response.json()
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    if (process.env.NODE_ENV === 'development') {
      return mockAuthResponses.register(data)
    }

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: createAuthHeaders(false),
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Error en el registro')
    }

    return response.json()
  },

  logout: async (): Promise<void> => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 500))
      return
    }

    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: createAuthHeaders(true)
    })

    if (!response.ok) {
      console.warn('Error during logout, but proceeding with local cleanup')
    }
  },

  forgotPassword: async (data: ForgotPasswordData): Promise<{ message: string }> => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return { message: 'Se ha enviado un enlace de recuperación a tu email' }
    }

    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: createAuthHeaders(false),
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Error al enviar email de recuperación')
    }

    return response.json()
  },

  resetPassword: async (data: ResetPasswordData): Promise<{ message: string }> => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return { message: 'Contraseña actualizada exitosamente' }
    }

    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: createAuthHeaders(false),
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Error al restablecer contraseña')
    }

    return response.json()
  },

  verifyEmail: async (data: VerifyEmailData): Promise<{ message: string }> => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return { message: 'Email verificado exitosamente' }
    }

    const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
      method: 'POST',
      headers: createAuthHeaders(false),
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Error al verificar email')
    }

    return response.json()
  },

  refreshToken: async (): Promise<AuthTokens> => {
    const refreshToken = tokenManager.getRefreshToken()
    if (!refreshToken) {
      throw new Error('No refresh token available')
    }

    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 500))
      return {
        accessToken: 'new_mock_access_token_' + Date.now(),
        refreshToken: refreshToken,
        expiresAt: Date.now() + (24 * 60 * 60 * 1000)
      }
    }

    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: createAuthHeaders(false),
      body: JSON.stringify({ refreshToken })
    })

    if (!response.ok) {
      throw new Error('Failed to refresh token')
    }

    return response.json()
  },

  getProfile: async (): Promise<User> => {
    if (process.env.NODE_ENV === 'development') {
      const user = tokenManager.getUser()
      if (!user) throw new Error('Usuario no encontrado')
      return user
    }

    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: createAuthHeaders(true)
    })

    if (!response.ok) {
      throw new Error('Failed to fetch profile')
    }

    return response.json()
  }
}

// Auth validation helpers
export const authValidation = {
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  isValidPassword: (password: string): boolean => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
  },

  getPasswordStrength: (password: string): 'weak' | 'medium' | 'strong' => {
    if (password.length < 6) return 'weak'
    if (password.length < 10) return 'medium'
    return 'strong'
  }
}

// Auth state helpers
export const authHelpers = {
  isAuthenticated: (): boolean => {
    const token = tokenManager.getAccessToken()
    const user = tokenManager.getUser()
    return !!(token && user && !tokenManager.isTokenExpired())
  },

  requireAuth: (): User => {
    const user = tokenManager.getUser()
    if (!user || !authHelpers.isAuthenticated()) {
      throw new Error('Authentication required')
    }
    return user
  },

  hasRole: (requiredRole: string | string[]): boolean => {
    const user = tokenManager.getUser()
    if (!user) return false
    
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
    return roles.includes(user.role)
  },

  canAccess: (resource: string, action: string): boolean => {
    const user = tokenManager.getUser()
    if (!user) return false

    // Simple role-based access control
    switch (user.role) {
      case 'admin':
        return true // Admin has access to everything
      case 'therapist':
        return !resource.includes('admin') // Therapist can't access admin resources
      case 'assistant':
        return ['patients', 'sessions', 'calendar'].some(r => resource.includes(r))
      default:
        return false
    }
  }
}