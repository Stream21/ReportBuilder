# Modelo de Datos y API REST

**Proyecto**: Invoice Builder Platform
**Versión**: 1.0

---

## 1. Esquema de Base de Datos (ERD)

Diseñado para PostgreSQL (recomendado) o MySQL 8+.

### Tabla `report_type`
Catálogo maestro de tipos de informes.
*   `code` (PK) VARCHAR(50): `invoice`, `payroll`, `delivery_note`.
*   `name` VARCHAR(100): "Factura de Venta".
*   `schema_definition` JSONB: Estructura de variables disponibles para el editor (para autocompletado).

### Tabla `template`
La entidad lógica que agrupa versiones.
*   `id` UUID (PK).
*   `report_type_code` (FK).
*   `name` VARCHAR(255).
*   `current_version_id` UUID (Nullable) -> Apunta a `template_version`.
*   `created_at` TIMESTAMP.

### Tabla `template_version`
Almacena el estado real del diseño. Inmutable una vez publicada.
*   `id` UUID (PK).
*   `template_id` (FK).
*   `version_number` INT.
*   `status` ENUM: `DRAFT`, `PUBLISHED`, `ARCHIVED`.
*   `content_json` JSONB: El árbol de nodos de Craft.js.
*   `config_json` JSONB: { paperSize, orientation, margins }.
*   `commit_message` TEXT.
*   `created_at` TIMESTAMP.

### Tabla `asset`
Imágenes subidas por el usuario.
*   `id` UUID.
*   `filename` VARCHAR.
*   `s3_path` VARCHAR.
*   `public_url` VARCHAR.
*   `mime_type` VARCHAR.

### Tabla `generation_log`
Auditoría.
*   `id` BIGINT.
*   `template_version_id` (FK).
*   `entity_id` VARCHAR: ID del documento externo (ej. ID Factura).
*   `channel` VARCHAR: `pdf`, `email`.
*   `generated_at` TIMESTAMP.

---

## 2. Contrato API REST

### 2.1 Templates (Gestión)

**Listar Plantillas**
`GET /api/v1/templates`
*   Query params: `?report_type=invoice`
*   Response: `[{ id, name, report_type, current_version: { status, updated_at } }]`

**Obtener Detalle (Load)**
`GET /api/v1/templates/{id}`
*   Response:
    ```json
    {
      "id": "uuid",
      "name": "Factura Standard",
      "content": { ...craft_json... }, 
      "config": { "paper": "A4", "margins": {...} },
      "version": 5,
      "status": "DRAFT"
    }
    ```

**Guardar Borrador (Save Draft)**
`PATCH /api/v1/templates/{id}`
*   Body: `{ "content": {...}, "config": {...} }`
*   Acción: Actualiza la fila `template_version` si está en DRAFT, o crea una nueva si la actual es PUBLISHED (Copy-on-Write).

**Publicar Versión**
`POST /api/v1/templates/{id}/publish`
*   Body: `{ "message": "Ajuste de logo" }`
*   Acción: Marca versión actual como PUBLISHED. Incrementa version para el siguiente draft.

### 2.2 Generación (Runtime)

**Vista Previa (Preview)**
`POST /api/v1/print/preview`
*   Body: `{ "content": {...}, "config": {...}, "mock_data": {...} }`
*   Response: PDF Binary (Blob).
*   Nota: No guarda en BD, solo renderiza al vuelo.

**Imprimir Real**
`POST /api/v1/print/{templateId}`
*   Body: `{ "entity_id": "INV-2024-001" }`
*   Acción:
    1.  Carga la versión `PUBLISHED` de la plantilla.
    2.  Busca datos reales de la factura "INV-2024-001".
    3.  Genera y devuelve PDF.
