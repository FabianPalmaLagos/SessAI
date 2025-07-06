"use client"

import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Users, Calendar, Settings, Sun, Moon, Menu, BotMessageSquare, ClipboardList } from "lucide-react"

export function Navigation() {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <nav className="bg-card shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
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
                  <span className="text-2xl font-bold">SessAI</span>
                </Link>
                <nav className="flex flex-col gap-1">
                  <SheetClose asChild>
                    <Link href="/patients" passHref>
                      <Button variant="ghost" className="w-full flex items-center gap-3 justify-start text-base">
                        <Users className="h-5 w-5" />
                        Pacientes
                      </Button>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/sessions/new" passHref>
                      <Button variant="ghost" className="w-full flex items-center gap-3 justify-start text-base">
                        <ClipboardList className="h-5 w-5" />
                        Sesiónes
                      </Button>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/calendar" passHref>
                      <Button variant="ghost" className="w-full flex items-center gap-3 justify-start text-base">
                        <Calendar className="h-5 w-5" />
                        Calendario
                      </Button>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/ai-analysis" passHref>
                      <Button variant="ghost" className="w-full flex items-center gap-3 justify-start text-base">
                        <BotMessageSquare className="h-5 w-5" />
                        Análisis IA
                      </Button>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/admin" passHref>
                      <Button variant="ghost" className="w-full flex items-center gap-3 justify-start text-base">
                        <Settings className="h-5 w-5" />
                        Centro de Control
                      </Button>
                    </Link>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="SessAI Logo" width={40} height={40} className="h-7 w-7 md:h-8 md:w-8" />
              <span className="text-xl md:text-2xl font-bold">SessAI</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <Link href="/patients">
              <Button variant="ghost" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Pacientes
              </Button>
            </Link>
            <Link href="/sessions/new">
              <Button variant="ghost" className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4" />
                Nueva Sesión
              </Button>
            </Link>
            <Link href="/calendar">
              <Button variant="ghost" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Calendario
              </Button>
            </Link>
            <Link href="/ai-analysis">
              <Button variant="ghost" className="flex items-center gap-2">
                <BotMessageSquare className="h-4 w-4" />
                Análisis IA
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="ghost" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Centro de Control
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Switch
              id="theme-switch"
              checked={resolvedTheme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              checkedIcon={<Moon className="h-3 w-3 text-white" />}
              uncheckedIcon={<Sun className="h-3 w-3 text-black" />}
            />
            <Button size="sm">Perfil</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
