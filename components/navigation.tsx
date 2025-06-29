import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Brain, Users, FileText, Calendar, BarChart3, Settings } from "lucide-react"

export function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-900">SessAI</span>
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
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button size="sm">Perfil</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
