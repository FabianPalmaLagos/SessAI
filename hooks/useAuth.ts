"use client"

import React, { useState, useEffect, useCallback, createContext, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  AuthState,
  AuthContextType,
  LoginCredentials,
  RegisterData,
  ForgotPasswordData,
  ResetPasswordData,
  VerifyEmailData,
  User,
  TherapistProfile
} from '@/types/auth'
import { authAPI, tokenManager, authHelpers } from '@/lib/auth'

// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Initial state
const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  tokens: null
}

// Auth Provider Component
interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>(initialState)
  const router = useRouter()

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus()
  }, [])

  // Check if user is authenticated
  const checkAuthStatus = useCallback(async () => {
    try {
      const user = tokenManager.getUser()
      const accessToken = tokenManager.getAccessToken()
      const refreshToken = tokenManager.getRefreshToken()
      const expiresAt = tokenManager.getExpiresAt()

      if (!user || !accessToken || !refreshToken || !expiresAt) {
        setState(prev => ({
          ...prev,
          user: null,
          isAuthenticated: false,
          tokens: null,
          isLoading: false
        }))
        return
      }

      // Check if token is expired
      if (tokenManager.isTokenExpired()) {
        try {
          const newTokens = await authAPI.refreshToken()
          tokenManager.setTokens(newTokens, user)
          setState(prev => ({
            ...prev,
            user,
            isAuthenticated: true,
            tokens: newTokens,
            isLoading: false
          }))
        } catch (error) {
          // Refresh failed, clear everything
          tokenManager.clearTokens()
          setState(prev => ({
            ...prev,
            user: null,
            isAuthenticated: false,
            tokens: null,
            isLoading: false
          }))
        }
      } else {
        // Token is still valid
        setState(prev => ({
          ...prev,
          user,
          isAuthenticated: true,
          tokens: { accessToken, refreshToken, expiresAt },
          isLoading: false
        }))
      }
    } catch (error) {
      console.error('Error checking auth status:', error)
      setState(prev => ({
        ...prev,
        user: null,
        isAuthenticated: false,
        tokens: null,
        isLoading: false
      }))
    }
  }, [])

  // Login function
  const login = useCallback(async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true }))
    
    try {
      const response = await authAPI.login(credentials)
      
      // Store tokens and user data
      tokenManager.setTokens(response.tokens, response.user)
      
      setState(prev => ({
        ...prev,
        user: response.user,
        isAuthenticated: true,
        tokens: response.tokens,
        isLoading: false
      }))

      toast.success(response.message || 'Login exitoso')
      
      // Redirect to dashboard
      router.push('/')
      
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }))
      const message = error instanceof Error ? error.message : 'Error en el login'
      toast.error(message)
      throw error
    }
  }, [router])

  // Register function
  const register = useCallback(async (data: RegisterData) => {
    setState(prev => ({ ...prev, isLoading: true }))
    
    try {
      const response = await authAPI.register(data)
      
      // Store tokens and user data
      tokenManager.setTokens(response.tokens, response.user)
      
      setState(prev => ({
        ...prev,
        user: response.user,
        isAuthenticated: true,
        tokens: response.tokens,
        isLoading: false
      }))

      toast.success(response.message || 'Registro exitoso')
      
      // Redirect to dashboard or email verification
      if (!response.user.isEmailVerified) {
        router.push('/auth/verify-email')
      } else {
        router.push('/')
      }
      
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }))
      const message = error instanceof Error ? error.message : 'Error en el registro'
      toast.error(message)
      throw error
    }
  }, [router])

  // Logout function
  const logout = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }))
    
    try {
      await authAPI.logout()
    } catch (error) {
      console.warn('Error during API logout:', error)
    } finally {
      // Clear local storage and state regardless of API response
      tokenManager.clearTokens()
      setState(prev => ({
        ...prev,
        user: null,
        isAuthenticated: false,
        tokens: null,
        isLoading: false
      }))
      
      toast.success('Sesión cerrada')
      router.push('/auth/login')
    }
  }, [router])

  // Forgot password function
  const forgotPassword = useCallback(async (data: ForgotPasswordData) => {
    try {
      const response = await authAPI.forgotPassword(data)
      toast.success(response.message)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al enviar email'
      toast.error(message)
      throw error
    }
  }, [])

  // Reset password function
  const resetPassword = useCallback(async (data: ResetPasswordData) => {
    try {
      const response = await authAPI.resetPassword(data)
      toast.success(response.message)
      router.push('/auth/login')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al restablecer contraseña'
      toast.error(message)
      throw error
    }
  }, [router])

  // Verify email function
  const verifyEmail = useCallback(async (data: VerifyEmailData) => {
    try {
      const response = await authAPI.verifyEmail(data)
      
      // Update user state to show email as verified
      setState(prev => ({
        ...prev,
        user: prev.user ? { ...prev.user, isEmailVerified: true } : null
      }))
      
      toast.success(response.message)
      router.push('/')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al verificar email'
      toast.error(message)
      throw error
    }
  }, [router])

  // Update profile function
  const updateProfile = useCallback(async (profileData: Partial<TherapistProfile>) => {
    if (!state.user) {
      throw new Error('Usuario no autenticado')
    }

    setState(prev => ({ ...prev, isLoading: true }))
    
    try {
      // In development, just update local state
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const updatedUser: User = {
          ...state.user,
          profile: { ...state.user.profile, ...profileData },
          updatedAt: new Date().toISOString()
        }
        
        tokenManager.setTokens(state.tokens!, updatedUser)
        setState(prev => ({
          ...prev,
          user: updatedUser,
          isLoading: false
        }))
        
        toast.success('Perfil actualizado exitosamente')
        return
      }

      // TODO: Implement real API call for profile update
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${tokenManager.getAccessToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      })

      if (!response.ok) {
        throw new Error('Error al actualizar perfil')
      }

      const updatedUser = await response.json()
      tokenManager.setTokens(state.tokens!, updatedUser)
      setState(prev => ({
        ...prev,
        user: updatedUser,
        isLoading: false
      }))
      
      toast.success('Perfil actualizado exitosamente')
      
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }))
      const message = error instanceof Error ? error.message : 'Error al actualizar perfil'
      toast.error(message)
      throw error
    }
  }, [state.user, state.tokens])

  // Refresh access token
  const refreshAccessToken = useCallback(async () => {
    try {
      const newTokens = await authAPI.refreshToken()
      const user = tokenManager.getUser()
      
      if (user) {
        tokenManager.setTokens(newTokens, user)
        setState(prev => ({
          ...prev,
          tokens: newTokens
        }))
      }
    } catch (error) {
      console.error('Error refreshing token:', error)
      logout()
    }
  }, [logout])

  // Context value
  const contextValue: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail,
    updateProfile,
    refreshAccessToken,
    checkAuthStatus
  }

  return React.createElement(
    AuthContext.Provider,
    { value: contextValue },
    children
  )
}

// Hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Hook for protected routes
export function useRequireAuth() {
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      router.push('/auth/login')
    }
  }, [auth.isAuthenticated, auth.isLoading, router])

  return auth
}

// Hook for role-based access
export function useRequireRole(allowedRoles: string | string[]) {
  const auth = useRequireAuth()
  const router = useRouter()

  useEffect(() => {
    if (auth.user && !authHelpers.hasRole(allowedRoles)) {
      router.push('/unauthorized')
    }
  }, [auth.user, allowedRoles, router])

  return auth
}