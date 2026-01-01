# Documentación del Proyecto: Invoice Builder

Bienvenido a la documentación técnica completa del Generador de Informes.

## Índice de Contenidos

1.  **[Especificación Frontend](01_frontend_technical_spec.md)**
    *   Arquitectura Next.js + Craft.js.
    *   Catálogo de Componentes (Container, Text, Table).
    *   Gestión de Estado y Flujos UX.

2.  **[Especificación Backend](02_backend_technical_spec.md)**
    *   Arquitectura Hexagonal (Symfony).
    *   Servicios Core: Generador, Builders, Factories.
    *   Configuración de PDF (Snappy/wkhtmltopdf).

3.  **[Modelo de Datos y API](03_data_model_and_api.md)**
    *   Diagrama Entidad-Relación (Templates, Versiones, Assets).
    *   Contrato API REST (Endpoints, Payloads).

4.  **[Roadmap y Gestión](04_project_roadmap.md)**
    *   Planificación por Sprints.
    *   Hitos y Entregables.

---

## Cómo empezar (Onboarding)

### Para Desarrolladores Frontend
1.  Leer `01_frontend_technical_spec.md`.
2.  Instalar dependencias: `npm install`.
3.  Revisar `components/editor/nodes` para ver la implementación actual de componentes.

### Para Desarrolladores Backend
1.  Leer `02_backend_technical_spec.md`.
2.  Desplegar entorno Docker (PHP 8.2 + Postgres).
3.  Revisar carpeta `symfony_export/` en la raíz del proyecto para ver el código base simulado.

---
*Generado automáticamente por Antigravity Agent - 01/01/2026*
