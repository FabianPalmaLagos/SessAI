# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm install` - Install dependencies
- `pnpm dev` - Start development server (http://localhost:3000)
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint code analysis

## Technology Stack

- **Framework**: Next.js 15.2.4 with App Router
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: shadcn/ui + Radix UI primitives (40+ components available)
- **Forms**: React Hook Form 7.54.1 + Zod 3.24.1 validation
- **Icons**: Lucide React 0.454.0
- **Package Manager**: pnpm (required - do not use npm or yarn)
- **Theming**: next-themes for dark/light mode support
- **Calendar**: FullCalendar for appointment scheduling
- **Date Handling**: date-fns for date manipulation

## Architecture Overview

SessAI is a therapeutic management platform with AI integration for therapists and psychologists. The app follows Next.js App Router patterns with a component-based architecture.

### Key Application Areas

- **Dashboard** (`app/page.tsx`) - Main metrics and quick actions
- **Patient Management** (`app/patients/`) - Patient CRUD operations and profiles
- **Session Management** (`app/sessions/`) - Session recording and tracking
- **Calendar** (`app/calendar/page.tsx`) - Appointment scheduling
- **AI Analysis** (`app/ai-analysis/page.tsx`) - AI-powered insights
- **Administration** (`app/admin/`) - Platform configuration and billing

### Core File Structure

- `app/` - Next.js App Router pages and layouts
- `components/ui/` - Reusable shadcn/ui components
- `components/` - Custom application components
- `types/` - TypeScript interfaces (patient.ts, session.ts, etc.)
- `lib/` - Utilities and mock data
- `hooks/` - Custom React hooks

## Development Patterns

### Page Component Structure
```tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icon } from "lucide-react"

interface PageData {
  // Define types here
}

export default function PageName() {
  const [data, setData] = useState<PageData>({})
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        {/* Content */}
      </div>
    </div>
  )
}
```

### Form Handling Pattern
```tsx
const [formData, setFormData] = useState<FormInterface>({})
const [isSubmitting, setIsSubmitting] = useState(false)

const handleInputChange = (field: keyof FormInterface, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }))
}

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)
  // Form logic
  setIsSubmitting(false)
}
```

### Import Organization
1. React and Next.js imports
2. External libraries
3. UI components (`@/components/ui/`)
4. Icons (lucide-react)
5. Custom hooks and utilities
6. Type definitions

## Key TypeScript Types

Located in `types/` directory:
- `Patient` - Patient data structure
- `Session` - Therapy session information
- `Therapist` - Therapist profile data
- `Assessment` - Assessment and evaluation types
- `CalendarEvent` - Calendar appointment structure

## UI Component Guidelines

- Use shadcn/ui components from `components/ui/`
- Consistent styling with Tailwind classes
- Cards for content sections
- Buttons with proper states (loading, disabled)
- Form validation with visual feedback
- Responsive design patterns

### Common UI Patterns
```tsx
// Navigation with back button
<div className="flex justify-between items-center mb-6">
  <div>
    <h1 className="text-3xl font-bold text-gray-900">Title</h1>
    <p className="text-gray-600">Description</p>
  </div>
  <Button asChild>
    <Link href="/back-path">Actions</Link>
  </Button>
</div>

// Loading states
{isLoading ? <Skeleton /> : <Content />}

// Form validation
<Button disabled={!isFormValid || isSubmitting}>
  {isSubmitting ? "Saving..." : "Save"}
</Button>
```

## State Management

Currently uses React useState for local state. The codebase is structured to easily migrate to Context API or Zustand for global state when needed.

## Styling Conventions

- Use Tailwind utility classes
- Consistent spacing with container patterns
- Gray-50 background for pages
- Blue-600 accent color for primary actions
- Responsive design with mobile-first approach

## Mock Data

Mock data is stored in `lib/mock-data.ts` for development. Real API integration points are identified throughout the codebase with TODO comments.

## Authentication System

**Status**: ✅ **PRODUCTION-READY** (Complete Implementation)

The application features a comprehensive authentication system with JWT tokens, role-based access control, and complete user management flow.

### Core Authentication Architecture
- **Central Hook**: `hooks/useAuth.ts` - React Context provider with authentication state
- **Auth Logic**: `lib/auth.ts` - API calls, token management, and utilities
- **Route Protection**: `components/auth-guard.tsx` - HOC for protected routes with role checks
- **Type Definitions**: `types/auth.ts` and `types/user.ts` - Complete TypeScript interfaces

### Authentication Features
- Email/password authentication with persistent sessions
- Multi-role registration (Admin, Therapist, Assistant) with specialty selection
- Password recovery with secure token-based reset flow
- Email verification system with resend functionality
- Refresh token management for session persistence
- Role-based access control (RBAC) throughout the application

### User Management Flow
- **Registration**: `/auth/register` - Role selection, professional details, email verification
- **Login**: `/auth/login` - Demo credentials: admin@sessai.com / admin123
- **Password Recovery**: `/auth/forgot-password` - Token-based reset flow
- **Email Verification**: `/auth/verify-email` - Account activation with resend options
- **Profile Management**: `/profile` - Comprehensive user settings with tabs

### Route Protection Pattern
All protected routes use the AuthGuard component:
```tsx
export default function ProtectedPage() {
  return (
    <AuthGuard requiredRole="admin"> {/* Optional role requirement */}
      <PageContent />
    </AuthGuard>
  )
}
```

### Role-Based Access Control
- **Admin**: Full platform access including user management and billing
- **Therapist**: Patient and session management, calendar access
- **Assistant**: Limited access to scheduling and basic patient info

## Application Architecture

### Page Structure & Routing
The application follows Next.js App Router patterns with protected routes:

- **Dashboard** (`app/page.tsx`) - Metrics, quick actions, and recent activity
- **Patient Management** (`app/patients/`) - Complete CRUD operations with search and filtering
- **Session Management** (`app/sessions/`) - Session recording, documentation, and tracking
- **Calendar** (`app/calendar/page.tsx`) - FullCalendar integration with therapist filtering
- **AI Analysis** (`app/ai-analysis/page.tsx`) - AI-powered insights and report generation
- **Administration** (`app/admin/`) - User management, billing, and platform configuration
- **Authentication** (`app/auth/`) - Complete authentication flow pages
- **Profile** (`app/profile/`) - User profile management with tabbed interface

### Component Architecture

**UI Components** (`components/ui/`):
- Built on shadcn/ui + Radix UI primitives
- 40+ accessible components with consistent design system
- Dark/light theme support throughout
- Responsive design patterns

**Custom Components**:
- `components/auth-guard.tsx` - Route protection with role-based access
- `components/navigation.tsx` - Main navigation with user dropdown
- `components/calendar-view.tsx` - Calendar integration component

### Data Management

**TypeScript Types** (`types/`):
```typescript
// Core entities with comprehensive interfaces
types/auth.ts       - Authentication and user types
types/patient.ts    - Patient data structures  
types/session.ts    - Session management types
types/user.ts       - User profile interfaces
types/therapist.ts  - Therapist-specific data
```

**Mock Data System** (`lib/mock-data.ts`):
- Realistic development data with proper relationships
- Therapist, patient, and session mock data
- Easy transition path to real API integration

**Custom Hooks** (`hooks/`):
- `useAuth.ts` - Central authentication state management
- Additional hooks for data fetching and state management

### Form Handling Patterns

**Standard Form Pattern**:
```tsx
const [formData, setFormData] = useState<FormInterface>({})
const [isSubmitting, setIsSubmitting] = useState(false)

const handleInputChange = (field: keyof FormInterface, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }))
}

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)
  // Form logic with error handling
  setIsSubmitting(false)
}
```

**Validation Pattern**:
```tsx
const isFormValid = useMemo(() => {
  return formData.requiredField.trim() !== "" && 
         formData.email.includes('@')
}, [formData])

<Button disabled={!isFormValid || isSubmitting}>
  {isSubmitting ? "Saving..." : "Save"}
</Button>
```

## Current Development Status

- ✅ **Authentication System** (Production-ready with RBAC)
- ✅ **Dashboard with comprehensive metrics display**
- ✅ **Patient management** (Full CRUD with search and filtering)
- ✅ **Navigation and layout structure** (Complete with responsive design)
- ✅ **Calendar integration** (FullCalendar with therapist filtering)
- 🚧 **Session recording functionality** (Core features implemented)
- 🚧 **AI analysis features** (Framework in place, UI components ready)
- 📋 **Backend API integration** (Mock data currently, API endpoints defined)