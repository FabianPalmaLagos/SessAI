"use client"

import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Settings, Sun, Moon, Menu, BotMessageSquare, ClipboardList, User, LogOut, Shield, Mail } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { AuthenticatedOnly, UnauthenticatedOnly, RoleBasedRender } from "@/components/auth-guard"

export function Navigation() {
  const { setTheme, resolvedTheme } = useTheme()
  const { user, logout, isAuthenticated, isLoading } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Helper function to get user initials
  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <nav className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            {/* Mobile Menu */}
            <AuthenticatedOnly>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Abrir menú</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] p-4">
                  <SheetHeader className="sr-only">
                    <SheetTitle>Menú Principal</SheetTitle>
                    <SheetDescription>Navegación principal de SessAI</SheetDescription>
                  </SheetHeader>
                  <Link href="/" className="flex items-center gap-2 mb-6">
                    <Image src="/logo.png" alt="SessAI Logo" width={40} height={40} />
                    <span className="text-2xl font-bold text-slate-900 dark:text-slate-50">SessAI</span>
                  </Link>
                  
                  {/* User info in mobile menu */}
                  {user && (
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.profile.photo} alt={user.name} />
                          <AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-50 truncate">
                            {user.profile.firstName} {user.profile.lastName}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <nav className="flex flex-col gap-1">
                    <SheetClose asChild>
                      <Link href="/patients" passHref>
                        <Button variant="ghost" className="w-full flex items-center gap-3 justify-start text-base text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20">
                          <Users className="h-5 w-5" />
                          Pacientes
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/sessions/new" passHref>
                        <Button variant="ghost" className="w-full flex items-center gap-3 justify-start text-base text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20">
                          <ClipboardList className="h-5 w-5" />
                          Sesiones
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/calendar" passHref>
                        <Button variant="ghost" className="w-full flex items-center gap-3 justify-start text-base text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20">
                          <Calendar className="h-5 w-5" />
                          Calendario
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/ai-analysis" passHref>
                        <Button variant="ghost" className="w-full flex items-center gap-3 justify-start text-base text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20">
                          <BotMessageSquare className="h-5 w-5" />
                          Análisis IA
                        </Button>
                      </Link>
                    </SheetClose>
                    <RoleBasedRender allowedRoles={['admin']}>
                      <SheetClose asChild>
                        <Link href="/admin" passHref>
                          <Button variant="ghost" className="w-full flex items-center gap-3 justify-start text-base text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20">
                            <Settings className="h-5 w-5" />
                            Centro de Control
                          </Button>
                        </Link>
                      </SheetClose>
                    </RoleBasedRender>
                  </nav>
                </SheetContent>
              </Sheet>
            </AuthenticatedOnly>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="SessAI Logo" width={40} height={40} className="h-7 w-7 md:h-8 md:w-8" />
              <span className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-50">SessAI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <AuthenticatedOnly>
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/patients">
                <Button variant="ghost" className="flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors">
                  <Users className="h-4 w-4" />
                  Pacientes
                </Button>
              </Link>
              <Link href="/sessions/new">
                <Button variant="ghost" className="flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors">
                  <ClipboardList className="h-4 w-4" />
                  Nueva Sesión
                </Button>
              </Link>
              <Link href="/calendar">
                <Button variant="ghost" className="flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors">
                  <Calendar className="h-4 w-4" />
                  Calendario
                </Button>
              </Link>
              <Link href="/ai-analysis">
                <Button variant="ghost" className="flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors">
                  <BotMessageSquare className="h-4 w-4" />
                  Análisis IA
                </Button>
              </Link>
              <RoleBasedRender allowedRoles={['admin']}>
                <Link href="/admin">
                  <Button variant="ghost" className="flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors">
                    <Settings className="h-4 w-4" />
                    Centro de Control
                  </Button>
                </Link>
              </RoleBasedRender>
            </div>
          </AuthenticatedOnly>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Theme Switch */}
            {mounted && (
              <Switch
                id="theme-switch"
                checked={resolvedTheme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                checkedIcon={<Moon className="h-3 w-3 text-white" />}
                uncheckedIcon={<Sun className="h-3 w-3 text-black" />}
              />
            )}

            {/* Authentication Actions */}
            <UnauthenticatedOnly>
              <div className="flex items-center gap-2">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">
                    Registrarse
                  </Button>
                </Link>
              </div>
            </UnauthenticatedOnly>

            <AuthenticatedOnly>
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.profile.photo} alt={user?.name} />
                      <AvatarFallback className="text-xs">
                        {user?.name ? getUserInitials(user.name) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                        {user?.profile.firstName || user?.name}
                      </p>
                      <div className="flex items-center gap-1">
                        <Badge variant={user?.role === 'admin' ? 'default' : 'secondary'} className="text-xs">
                          {user?.role === 'admin' ? 'Admin' : 
                           user?.role === 'therapist' ? 'Terapeuta' : 'Asistente'}
                        </Badge>
                        {!user?.isEmailVerified && (
                          <Badge variant="destructive" className="text-xs">
                            <Mail className="h-3 w-3 mr-1" />
                            Sin verificar
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-slate-900 dark:text-slate-50">
                        {user?.profile.firstName} {user?.profile.lastName}
                      </p>
                      <p className="text-xs leading-none text-slate-500 dark:text-slate-400">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {!user?.isEmailVerified && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/auth/verify-email" className="flex items-center cursor-pointer">
                          <Mail className="h-4 w-4 mr-2 text-red-500" />
                          <span>Verificar Email</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      <span>Mi Perfil</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  <RoleBasedRender allowedRoles={['admin']}>
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center cursor-pointer">
                        <Shield className="h-4 w-4 mr-2" />
                        <span>Centro de Control</span>
                      </Link>
                    </DropdownMenuItem>
                  </RoleBasedRender>
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={logout}
                    className="flex items-center cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Cerrar Sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </AuthenticatedOnly>
          </div>
        </div>
      </div>
    </nav>
  )
}
