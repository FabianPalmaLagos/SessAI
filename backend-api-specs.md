# Especificaciones de API para Backend - Módulo de Análisis con IA

Este documento detalla los requerimientos para el desarrollo del backend que dará soporte a la sección "Análisis con IA" de la aplicación SessAI.

## 1. Funcionalidad: Generación de Informes

Permite al terapeuta generar informes estructurados sobre un paciente en un período determinado.

### Endpoint Principal
- **Ruta:** `POST /api/ai/reports/generate`
- **Descripción:** Genera un informe de IA basado en los datos de un paciente.

### Lógica de Negocio
1.  Recibir `patientId`, `startDate` y `endDate`.
2.  Consultar en la base de datos todas las sesiones, notas y evaluaciones del paciente dentro del rango de fechas.
3.  Consolidar la información y enviarla a un servicio de IA (ej. GPT-4) con un prompt para generar un informe de progreso completo.
4.  Recibir la respuesta de la IA y devolverla como una cadena de texto en formato Markdown.

### Request Body (Payload)
```json
{
  "patientId": "string",
  "startDate": "string (ISO 8601)",
  "endDate": "string (ISO 8601)"
}
```

### Response Body
```json
{
  "reportContent": "string"
}
```

---

### Endpoint para Descarga de Informes
- **Ruta:** `POST /api/reports/download`
- **Descripción:** Convierte el contenido de un informe a un archivo PDF para su descarga.

### Lógica de Negocio
1.  Recibir `reportContent` y `patientName`.
2.  Utilizar una librería para convertir el texto (Markdown) a un archivo PDF.
3.  Devolver el archivo PDF binario para su descarga en el cliente.

### Request Body (Payload)
```json
{
  "reportContent": "string",
  "patientName": "string"
}
```

## 2. Funcionalidad: Asistente de Documentación

Ayuda al terapeuta a procesar y estructurar notas de sesión de forma rápida.

### Endpoint Principal
- **Ruta:** `POST /api/ai/documentation/process`
- **Descripción:** Procesa notas no estructuradas con una instrucción opcional.

### Lógica de Negocio
1.  Recibir `unstructuredNotes` y una `instruction` opcional.
2.  Enviar la información al servicio de IA. El prompt debe ser dinámico:
    -   Si existe una instrucción, se debe priorizar (ej: "Genera un resumen de este texto: ...").
    -   Si no hay instrucción, usar un prompt por defecto (ej: "Estructura estas notas de sesión en temas clave y plan de acción: ...").
3.  Devolver el texto procesado por la IA.

### Request Body (Payload)
```json
{
  "unstructuredNotes": "string",
  "instruction": "string | null"
}
```

### Response Body
```json
{
  "structuredResult": "string"
}
```

## 3. Funcionalidad: Insights de IA

Muestra patrones y tendencias a nivel general (no para un solo paciente).

### Endpoint Principal
- **Ruta:** `GET /api/ai/insights`
- **Descripción:** Obtiene los insights de IA pre-calculados más recientes.

### Lógica de Negocio
1.  **Proceso Asíncrono (Recomendado):** Implementar un proceso en segundo plano (ej. un cron job semanal) que analice de forma anónima los datos de todos los pacientes para identificar tendencias y patrones.
2.  Los resultados de este análisis se deben almacenar en una tabla o colección en la base de datos.
3.  Este endpoint consultará y devolverá los insights pre-calculados de dicha tabla.

### Response Body
```json
{
  "insights": [
    {
      "id": "string",
      "type": "'positive' | 'insight' | 'attention'",
      "description": "string",
      "generatedAt": "string (ISO 8601)"
    }
  ]
}
```

## 4. Funcionalidades de Soporte

Endpoints necesarios para el correcto funcionamiento de la interfaz.

### Endpoint para Búsqueda de Pacientes
- **Ruta:** `GET /api/patients?search={query}`
- **Descripción:** Devuelve una lista de pacientes que coincidan con un término de búsqueda.

### Response Body
```json
[
  { "id": "string", "name": "string" },
  ...
]
```

---

## Consideraciones Generales

### Autenticación y Autorización
-   Toda la API debe estar protegida.
-   El backend debe identificar al terapeuta que realiza la solicitud para asegurar que solo acceda a los datos de sus propios pacientes.
-   Se recomienda el uso de tokens JWT o un sistema de sesión seguro. 