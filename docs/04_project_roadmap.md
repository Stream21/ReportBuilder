# Roadmap del Proyecto y Planificación

**Metodología**: Scrum / Agile (Sprints de 2 semanas)
**Equipo Sugerido**: 1 Tech Lead, 1 Frontend Sr, 1 Backend Sr, 1 QA.

---

## Fase 1: Cimientos (Sprints 1-2)

**Objetivo**: Tener la infraestructura lista y un "Hola Mundo" end-to-end.

### Sprint 1: Setup & Backend Core
*   [Infra] Configuración Docker (Symfony, Postgres, MinIO, RabbitMQ).
*   [Back] Creación de Entidades `Template`, `ReportType` y Migraciones.
*   [Back] Setup de `knp-snappy-bundle` y prueba de generación PDF simple.
*   [Front] Inicialización Next.js + Shadcn/UI. Setup de rutas base.

### Sprint 2: Editor Básico & API
*   [Back] Endpoints CRUD básicos: `GET /templates`, `POST /templates`.
*   [Front] Integración de Craft.js. Renderizado de un Canvas vacío.
*   [Front] Componentes primitivos: `Container` (solo estilo visual) y `Text` (estático).
*   [Integ] Conectar Front con Back (Guardar JSON simple).

---

## Fase 2: Motor de Renderizado (Sprints 3-4)

**Objetivo**: Paridad visual total. Lo que veo en pantalla es lo que sale en PDF.

### Sprint 3: Componentes Avanzados
*   [Front] Componente `Container` con Flexbox y Grid visual.
*   [Back] `ContainerRenderer` en PHP replicando Flexbox/Grid CSS.
*   [Front] Componente `Text` con variables (`{{ }}`).
*   [Back] `TextRenderer` con interpolación Twig.

### Sprint 4: Tablas y Datos Dinámicos
*   [Front] Componente `Table` complejo (columnas dinámicas).
*   [Back] `TableRenderer` con bucles Twig.
*   [Back] Implementar `InvoiceDataProvider` con datos Mock.
*   [Integ] Generar PDF de una factura con items reales.

---

## Fase 3: Producto Enterprise (Sprint 5-6)

**Objetivo**: Ciclo de vida profesional y UX pulida.

### Sprint 5: Versionado y Assets
*   [Back] Sistema de Publish/Draft (Copy-on-write).
*   [Front] UI para gestionar versiones (Historial, Restore).
*   [Front] Gestor de Archivos (Subir logos -> S3).
*   [Back] Soporte para imágenes remotas en PDF (`enable-local-file-access`).

### Sprint 6: Configuración Física y Optimización
*   [Front] Wizard de Configuración (Papel A4/Ticket, Márgenes).
*   [Back] Mapeo de `TemplateConfig` a opciones de Snappy.
*   [Ops] Pipeline CI/CD. Tests de carga.

---

## Definición de Hecho (DoD)

Para cada Card de JIRA:
1.  Código commiteado y mergeado en `develop`.
2.  Tests unitarios pasando (Coverage > 80%).
3.  Despliegue en entorno Staging verificado.
4.  Documentation actualizada si aplica.
