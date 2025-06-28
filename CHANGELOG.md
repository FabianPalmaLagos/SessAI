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
- 🎨 **UI/UX consistente**: Sigue el sistema de diseño de TheraMind
- ⚡ **Componentes reutilizables**: Uso de shadcn/ui (Card, Input, Button, Label, etc.)
- 📱 **Diseño responsive**: Grid adaptativo para móviles y desktop
- 🔄 **Gestión de estado**: useState con TypeScript interfaces
- 🚀 **Navegación integrada**: Botones de navegación y enlaces consistentes

### Modificado
- 🔄 **Validación del formulario**: Simplificada para requerir solo el nombre del paciente
- 📋 **Campos opcionales**: RUT, email y teléfono ya no son obligatorios
- 💬 **Mensajes de validación**: Actualizados para reflejar los nuevos requisitos
- 🧹 **Imports optimizados**: Eliminación de componentes no utilizados

### Estructura de Archivos
```
app/
  patients/
    new/
      page.tsx          # Nueva página de registro de pacientes
    page.tsx            # Página existente de gestión de pacientes
```

### Rutas Agregadas
- `GET /patients/new` - Formulario de registro de nuevo paciente
- Navegación desde `/patients` con botón "Nuevo Paciente"
- Navegación desde dashboard principal con "Acciones Rápidas"

### Próximas Mejoras Planificadas
- [ ] Integración con backend para persistencia de datos
- [ ] Validación avanzada de RUT chileno
- [ ] Carga de imágenes de perfil
- [ ] Exportación de datos de pacientes
- [ ] Búsqueda avanzada y filtros

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