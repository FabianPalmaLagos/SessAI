"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Brain, 
  Users, 
  Calendar, 
  BarChart3, 
  Shield, 
  Zap, 
  CheckCircle,
  ArrowRight,
  Play,
  Star
} from "lucide-react"

export default function WelcomePage() {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Gestión de Pacientes",
      description: "Organiza y gestiona la información de tus pacientes de forma segura y eficiente."
    },
    {
      icon: <Calendar className="h-8 w-8 text-green-600" />,
      title: "Calendario Inteligente",
      description: "Programa sesiones, gestiona citas y mantén un control completo de tu agenda."
    },
    {
      icon: <Brain className="h-8 w-8 text-purple-600" />,
      title: "Análisis con IA",
      description: "Genera informes automáticos y obtén insights valiosos de las sesiones terapéuticas."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-orange-600" />,
      title: "Reportes Avanzados",
      description: "Visualiza el progreso de tus pacientes con métricas detalladas y gráficos intuitivos."
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: "Seguridad Total",
      description: "Protección de datos de nivel empresarial con cifrado end-to-end."
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-600" />,
      title: "Automatización",
      description: "Automatiza tareas repetitivas y enfócate en lo que realmente importa: tus pacientes."
    }
  ]

  const benefits = [
    "Ahorra hasta 3 horas semanales en documentación",
    "Mejora la calidad de tus informes terapéuticos",
    "Reduce errores administrativos en un 90%",
    "Acceso seguro desde cualquier dispositivo",
    "Cumple con todas las normativas de privacidad",
    "Soporte técnico especializado 24/7"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Image 
                  src="/logo.png" 
                  alt="SessAI Logo" 
                  width={80} 
                  height={80}
                  className="h-20 w-20"
                />
                <div className="absolute -top-2 -right-2">
                  <Badge className="bg-gradient-to-r from-purple-500 to-blue-600 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    IA
                  </Badge>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Potencia tu práctica terapéutica con{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Inteligencia Artificial
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              SessAI combina la experiencia humana con el poder de la IA para revolucionar 
              la gestión terapéutica. Documentación inteligente, análisis profundo y 
              más tiempo para tus pacientes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/register">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3">
                  Comenzar Gratis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link href="/ai-demo">
                <Button size="lg" variant="outline" className="px-8 py-3">
                  <Play className="mr-2 h-5 w-5" />
                  Ver Demo
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Sin compromiso • Configuración en 5 minutos • Soporte incluido</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Todo lo que necesitas para gestionar tu práctica
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Herramientas profesionales diseñadas específicamente para terapeutas y psicólogos modernos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Optimiza tu tiempo y mejora tus resultados
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Únete a cientos de profesionales que ya están transformando su práctica 
                terapéutica con SessAI.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl text-white">
                    ¿Listo para comenzar?
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    Crea tu cuenta gratuita y descubre el futuro de la gestión terapéutica.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-blue-100">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">14 días de prueba gratuita</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-100">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">No se requiere tarjeta de crédito</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-100">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">Soporte personalizado incluido</span>
                    </div>
                  </div>
                  
                  <Link href="/auth/register">
                    <Button size="lg" className="w-full bg-white text-blue-600 hover:bg-gray-100">
                      Crear Cuenta Gratuita
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Únete a la revolución de la terapia digital
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Miles de terapeutas ya confían en SessAI para mejorar sus resultados 
            y optimizar su tiempo. ¿Serás el siguiente?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                Comenzar Ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo.png" alt="SessAI" width={32} height={32} />
                <span className="text-xl font-bold text-white">SessAI</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Potenciamos el arte de la terapia con la precisión de la inteligencia artificial.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Producto</h3>
              <div className="space-y-2">
                <Link href="/auth/register" className="block text-gray-400 hover:text-white">
                  Registrarse
                </Link>
                <Link href="/ai-demo" className="block text-gray-400 hover:text-white">
                  Demo
                </Link>
                <Link href="/pricing" className="block text-gray-400 hover:text-white">
                  Precios
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Soporte</h3>
              <div className="space-y-2">
                <Link href="/help" className="block text-gray-400 hover:text-white">
                  Centro de Ayuda
                </Link>
                <Link href="/contact" className="block text-gray-400 hover:text-white">
                  Contacto
                </Link>
                <Link href="/privacy" className="block text-gray-400 hover:text-white">
                  Privacidad
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 SessAI. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}