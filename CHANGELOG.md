# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto se adhiere al [Versionado Semántico](https://semver.org/lang/es/).

## [Sin Versionar] - 2024-01-XX

### Agregado
- ✨ **Página de registro de pacientes** (`/patients/new`)
  - Formulario completo para crear nuevos pacientes
  - Validación en tiempo real con TypeScript
  - Diseño responsive con shadcn/ui components
  - Integración con el sistema de navegación existente
  - Estados de carga y feedback visual
  - Redirección automática después del registro exitoso

- 🎯 **Página de nueva sesión terapéutica** (`/sessions/new`)
  - Formulario estructurado para registro de sesiones clínicas
  - Pre-población automática del paciente desde enlaces directos
  - Panel de grabación de audio con timer funcional
  - Campos especializados para contenido terapéutico:
    - Objetivos de la sesión
    - Notas y observaciones clínicas
    - Técnicas terapéuticas utilizadas
    - Tareas asignadas al paciente
    - Planificación de próximos pasos
  - Simulación de transcripción automática con IA
  - Validación de campos obligatorios
  - Estados de carga y confirmación de guardado

- 📋 **Página de detalle del paciente** (`/patients/[id]`)
  - Vista completa de información del paciente
  - Pestañas organizadas por categorías:
    - **Información General**: Datos personales, contacto de emergencia, resumen clínico
    - **Historial de Sesiones**: Lista cronológica optimizada con campos específicos
    - **Informes**: Documentos generados y reportes (preparado para funcionalidad futura)
  - Cálculo automático de edad basado en fecha de nacimiento
  - Enlaces directos para crear nueva sesión
  - Funcionalidad de edición de registros de sesión

- ✏️ **Página de edición de registro de sesión** (`/sessions/[id]/edit`)
  - Editor dedicado para modificar contenido de registros terapéuticos
  - Información de sesión no modificable (fecha, terapeuta, paciente)
  - Área de texto amplia para edición de contenido clínico
  - Validación de contenido obligatorio
  - Estados de carga y confirmación de guardado
  - Navegación de regreso al paciente

### Funcionalidades del Formulario de Registro
- 📝 **Sección de Datos Personales**:
  - Nombre completo (obligatorio)
  - RUT (opcional)
  - Email (opcional)
  - Teléfono (opcional)
  - Fecha de nacimiento (opcional)
  - Dirección (opcional)
  - Contacto de emergencia y teléfono (opcional)

### Características Técnicas
- 🔧 **Validación simplificada**: Solo el nombre es obligatorio
- 🎨 **UI/UX consistente**: Sigue el sistema de diseño de SessAI
- ⚡ **Componentes reutilizables**: Uso de shadcn/ui (Card, Input, Button, Label, etc.)
- 📱 **Diseño responsive**: Grid adaptativo para móviles y desktop
- 🔄 **Gestión de estado**: useState con TypeScript interfaces
- 🚀 **Navegación integrada**: Botones de navegación y enlaces consistentes

### Modificado
- 🔄 **UI de Nueva Sesión**: Se eliminó la selección explícita del paciente y se integró en una tarjeta de "Resumen del Paciente" más limpia y unificada.
- 🔄 **Validación del formulario**: Simplificada para requerir solo el nombre del paciente
- 📋 **Campos opcionales**: RUT, email y teléfono ya no son obligatorios
- 💬 **Mensajes de validación**: Actualizados para reflejar los nuevos requisitos
- 🧹 **Imports optimizados**: Eliminación de componentes no utilizados

### Optimizaciones del Historial de Sesiones
- ❌ **Eliminación de pestaña "Progreso"**: Simplificación de la interfaz de paciente
- 🔄 **Reestructuración de campos de sesión**:
  - ✅ **Fecha de sesión**: Información temporal principal
  - ✅ **Terapeuta**: Profesional que creó el registro
  - ✅ **Contenido**: Registro clínico completo y detallado
  - ❌ **Eliminados**: Objetivos, notas separadas, duración, tipo
- ✏️ **Funcionalidad de edición**: Botón directo para editar cada registro
- 📝 **Contenido expandido**: Registros más detallados y específicos

### Estructura de Archivos
```
app/
  patients/
    [id]/
      page.tsx          # Nueva página de detalle del paciente
    new/
      page.tsx          # Nueva página de registro de pacientes
    page.tsx            # Página existente de gestión de pacientes
  sessions/
    [id]/
      edit/
        page.tsx        # Nueva página de edición de registros
    new/
      page.tsx          # Nueva página de registro de sesiones
    page.tsx            # Página existente de historial de sesiones
```

### Rutas Agregadas
- `GET /patients/new` - Formulario de registro de nuevo paciente
- `GET /patients/[id]` - Vista detallada de paciente individual
- `GET /sessions/new` - Formulario de registro de nueva sesión terapéutica
- `GET /sessions/new?patientId=[id]` - Nueva sesión con paciente pre-seleccionado
- `GET /sessions/[id]/edit` - Editor de registro de sesión existente
- Navegación integrada desde múltiples puntos de entrada

### Próximas Mejoras Planificadas
- [ ] Integración con backend para persistencia de datos
- [ ] Validación avanzada de RUT chileno
- [ ] Carga de imágenes de perfil
- [ ] Exportación de datos de pacientes
- [ ] Búsqueda avanzada y filtros
- [ ] Grabación real de audio en sesiones
- [ ] Transcripción automática con APIs de IA
- [ ] Análisis de sentimientos en transcripciones
- [ ] Generación automática de informes clínicos
- [ ] Sistema de recordatorios y citas
- [ ] Métricas de progreso del paciente en tiempo real
- [ ] Integración con calendarios externos

---

## Notas de Desarrollo

### Tecnologías Utilizadas
- **Framework**: Next.js 15.2.4 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Componentes**: shadcn/ui + Radix UI
- **Iconos**: Lucide React
- **Gestión de Estado**: React useState (local)

### Patrones de Código
- Componentes funcionales con hooks
- TypeScript interfaces para type safety
- Composición de componentes shadcn/ui
- Manejo de formularios controlados
- Navegación declarativa con Next.js Link

### Comandos de Desarrollo
```bash
pnpm dev          # Servidor de desarrollo
pnpm build        # Build de producción
pnpm start        # Servidor de producción
pnpm lint         # Verificación de código
``` 