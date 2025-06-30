"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Brain, Users, FileText, Calendar, BarChart3, Settings, Sun, Moon } from "lucide-react"

export function Navigation() {
  const { setTheme, resolvedTheme } = useTheme()

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
                Calendario
              </Button>
            </Link>
            <Link href="/reports">
              <Button variant="ghost" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Reportes
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Switch
              id="theme-switch"
              checked={resolvedTheme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              checkedIcon={<Moon className="h-4 w-4 text-white" />}
              uncheckedIcon={<Sun className="h-4 w-4 text-black" />}
            />
            <Button size="sm">Perfil</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
