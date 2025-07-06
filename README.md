# SessAI - Plataforma de Gestión Terapéutica con IA

![SessAI](https://raw.githubusercontent.com/FabianVarela/SessAI/main/public/logo.png)

SessAI es una aplicación web moderna y completa, diseñada para potenciar el trabajo de terapeutas y psicólogos. La plataforma facilita la gestión de pacientes, sesiones y notas clínicas, integrando herramientas de inteligencia artificial para optimizar el flujo de trabajo y mejorar la calidad de la atención.

## ✨ Funcionalidades Principales

- **Dashboard Centralizado**: Una vista de inicio que ofrece métricas clave, resúmenes de actividad y accesos directos a las funcionalidades más importantes.
- **Gestión Integral de Pacientes**: Permite crear, buscar y visualizar fichas detalladas de pacientes, incluyendo su historial de sesiones y notas.
- **Registro de Sesiones**: Una interfaz intuitiva para documentar cada sesión terapéutica, especificando tipo, duración y objetivos.
- **Calendario Interactivo**: Sistema de calendario para agendar y visualizar citas de forma clara y organizada.
- **Análisis con IA**: Herramientas inteligentes para generar resúmenes automáticos de progreso, procesar notas no estructuradas y obtener insights valiosos de las sesiones.
- **Centro de Control**: Un panel de administración para configurar aspectos globales de la plataforma, como los modelos de IA a utilizar, y monitorear el consumo a través de un dashboard de facturación basado en un sistema de créditos.

## 🚀 Stack Tecnológico

- **Framework**: [Next.js](https://nextjs.org/) (con App Router)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI**: [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/) y [Recharts](https://recharts.org/) para gráficos.
- **Iconos**: [Lucide React](https://lucide.dev/)
- **Gestor de Paquetes**: [pnpm](https://pnpm.io/)

## 🛠️ Cómo Empezar

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [pnpm](https://pnpm.io/installation)

### Instalación y Ejecución

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/FabianVarela/SessAI.git
    cd SessAI
    ```

2.  **Instala las dependencias:**
    ```bash
    pnpm install
    ```

3.  **Inicia el servidor de desarrollo:**
    ```bash
    pnpm dev
    ```

4.  **Abre la aplicación:**
    Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación en funcionamiento.

## 📁 Estructura del Proyecto

El proyecto sigue una estructura organizada para facilitar la escalabilidad y el mantenimiento:

- `app/`: Contiene todas las rutas y páginas de la aplicación, utilizando el App Router de Next.js.
- `components/`: Almacena componentes de React reutilizables, incluyendo los componentes base de `shadcn/ui`.
- `lib/`: Incluye funciones de utilidad (`utils.ts`) y datos simulados (`mock-data.ts`).
- `hooks/`: Contiene hooks personalizados de React.
- `types/`: Define todas las interfaces y tipos de TypeScript utilizados en el proyecto.
- `public/`: Almacena los assets estáticos como imágenes y logos.

## 📜 Scripts Disponibles

En el archivo `package.json`, encontrarás los siguientes scripts:

- `pnpm dev`: Inicia la aplicación en modo de desarrollo con hot-reloading.
- `pnpm build`: Compila la aplicación para producción.
- `pnpm start`: Inicia un servidor de producción después de compilar.
- `pnpm lint`: Ejecuta ESLint para analizar el código en busca de errores y problemas de estilo. 