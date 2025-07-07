# Prompts de Desarrollo para SessAI

## 1. Vista de Edición de Equipo

**Objetivo**: Crear una nueva página para editar los detalles de un miembro del equipo de terapeutas, manteniendo la consistencia visual y funcional con el resto de la aplicación.

**Requisitos Funcionales**:
- Crear una nueva ruta y página en `app/admin/team/[id]/edit/page.tsx`.
- La página debe obtener los datos del miembro del equipo basándose en el `id` de la URL.
- El formulario permitirá la edición de los siguientes campos:
    - Nombre completo (`Input`).
    - Rol (ej. "Psicólogo Clínico", "Terapeuta Ocupacional") (`Select`).
    - Especializaciones (podría ser un campo de `Tags` o un `Textarea`).
    - Correo electrónico (`Input` tipo `email`).
    - Teléfono (`Input` tipo `tel`).
    - Foto de perfil (subida de archivo o URL) (`Input`).
- El formulario debe utilizar `react-hook-form` y `zod` para la gestión de estado y validación, siguiendo el patrón existente en `app/patients/new/page.tsx`.
- Incluir un botón "Guardar Cambios" que estará deshabilitado hasta que el formulario sea válido y se haya modificado algún dato.
- Al guardar, se debe simular una llamada a la API y mostrar una notificación (`toast`) de "Éxito" o "Error".
- Incluir un botón "Cancelar" o un enlace de "Volver" que redirija a la página del equipo (`/admin/team`).

**Diseño y UX**:
- La estructura de la página debe usar un componente `Card` principal con `CardHeader` y `CardContent`.
- El título del `CardHeader` será "Editar Miembro del Equipo".
- Los campos del formulario deben estar organizados de manera lógica y usar los componentes de `ui/label` e `ui/input` de `shadcn/ui`.
- Implementar un estado de carga (`loading`) mientras se envían los datos, mostrando un spinner en el botón "Guardar Cambios".



---

## 3. Gestión de Estado de Sesiones en el Calendario

**Objetivo**: Ampliar la funcionalidad del calendario para permitir a los terapeutas gestionar el estado de las sesiones (completada/cancelada) y añadir notas, reflejando estos cambios en las métricas del dashboard.

**Requisitos Funcionales**:
- En el modal o `popover` que se abre al hacer clic en un evento de sesión en el calendario:
    - Añadir un `Textarea` para "Notas de la sesión".
    - Añadir dos botones de acción: "Confirmar Sesión" y "Cancelar Sesión".
    - El tipo `Session` en `types/session.ts` debe ser actualizado para incluir un campo `status` con los valores `'scheduled' | 'completed' | 'cancelled' | 'no-show'`.
- Al hacer clic en "Confirmar Sesión", el estado de la sesión debe cambiar a `completed`.
- Al hacer clic en "Cancelar Sesión", el estado debe cambiar a `cancelled`.
- En el dashboard o vista principal del calendario, modificar las tarjetas de métricas:
    - Renombrar la tarjeta "Completadas Hoy" a simplemente "Completadas".
    - Añadir una nueva tarjeta para "Canceladas".
    - El contador de ambas tarjetas debe reflejar el número de sesiones con ese estado para el día o rango de fechas seleccionado.

**Diseño y UX**:
- El evento en el calendario debería cambiar visualmente según su estado (ej. color más tenue para canceladas, un check para completadas).
- Las acciones en el modal deben ser claras y proporcionar feedback inmediato (ej. cerrar modal y actualizar calendario, mostrar un `toast`).

---

## 4. Implementación de Lazy Loading entre Pantallas

**Objetivo**: Mejorar la experiencia de usuario y el rendimiento percibido de la aplicación implementando esqueletos de carga (skeletons) durante la navegación entre páginas.

**Requisitos Funcionales**:
- Utilizar la convención de archivos `loading.tsx` de Next.js App Router para crear estados de carga.
- Crear un archivo `loading.tsx` para las rutas principales que puedan tener un tiempo de carga perceptible. Focos principales:
    - `app/patients/loading.tsx`
    - `app/calendar/loading.tsx`
    - `app/sessions/loading.tsx`
    - `app/admin/billing/loading.tsx`
- El contenido de cada `loading.tsx` debe ser una versión esquelética de la interfaz de la página correspondiente.
- Utilizar el componente `Skeleton` de `shadcn/ui` para construir los layouts de carga. Por ejemplo, en `patients/loading.tsx`, mostrar una versión esquelética de la barra de búsqueda, botones y varias `PatientCard` esqueléticas.
- El esqueleto de carga debe imitar la estructura y el layout de la página real para evitar saltos de contenido (CLS).

---

## 5. Redirección Inteligente para Generación de Informes de IA

**Objetivo**: Optimizar el flujo de usuario para generar informes, redirigiendo desde la ficha del paciente a la página de análisis de IA con el paciente ya seleccionado.

**Requisitos Funcionales**:
- En la vista de detalle del paciente (`app/patients/[id]/page.tsx`), en la sección "Informes y Reportes":
    - Implementar una lógica que verifique si el paciente tiene informes generados.
    - Si no hay informes, mostrar un botón con el texto "Generar Informe IA".
- Este botón debe ser un componente `<Link>` de Next.js que redirija a la página de análisis de IA, pasando el ID del paciente y una indicación para abrir el tab correcto como parámetros de búsqueda. Ejemplo: `/ai-analysis?patientId=123&tab=generateReport`.
- En la página `app/ai-analysis/page.tsx`:
    - Utilizar el hook `useSearchParams` para leer los parámetros `patientId` y `tab`.
    - Si el parámetro `tab` es `generateReport`, la página debe cargar con la pestaña "Generar Informe" activa por defecto.
    - El `patientId` recibido debe usarse para preseleccionar automáticamente al paciente en el campo de selección de paciente del formulario de generación de informes.

---

## 6. Opciones Avanzadas para Configuración de Informes

**Objetivo**: Ofrecer mayor flexibilidad en la generación de informes permitiendo al usuario seleccionar rangos de sesiones basados en cantidad o períodos de tiempo predefinidos, además de las fechas manuales.

**Requisitos Funcionales**:
- En el formulario de "Generar Informe" en la página `app/ai-analysis/page.tsx`, modificar la sección de "Configuración del Informe".
- Añadir un componente `RadioGroup` o `Select` para que el usuario elija el "Tipo de Rango":
    - "Rango de Fechas" (opción por defecto, muestra los `DatePicker` existentes).
    - "Últimas Sesiones" (oculta los `DatePicker` y muestra un `Input` numérico).
    - "Período Fijo" (oculta los `DatePicker` y muestra un `Select` con opciones como "Último mes", "Últimos 3 meses", "Último año").
- La lógica del formulario (`react-hook-form`) debe actualizarse para gestionar estos nuevos campos y su visibilidad condicional.
- La validación con `zod` debe adaptarse para requerir los campos correctos según el "Tipo de Rango" seleccionado.
- Al enviar el formulario, la lógica de backend (o la simulación de la misma) debe ser capaz de interpretar estas nuevas opciones para filtrar las sesiones correspondientes y generar el informe. 