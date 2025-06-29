"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Brain, Users, FileText, Calendar, BarChart3, Settings, Sun, Moon } from "lucide-react"

export function Navigation() {
  const { setTheme } = useTheme()

  return (
    <nav className="bg-card shadow-sm border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold">SessAI</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/patients">
              <Button variant="ghost" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Pacientes
              </Button>
            </Link>
            <Link href="/ai-analysis">
              <Button variant="ghost" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                IA
              </Button>
            </Link>
            <Link href="/calendar">
              <Button variant="ghost" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Agenda
              </Button>
            </Link>
            <Link href="/reports">
              <Button variant="ghost" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Reportes
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Claro
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Oscuro
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  Sistema
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm">Perfil</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
