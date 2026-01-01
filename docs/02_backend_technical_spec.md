# Especificación Técnica del Backend (Symfony 6/7)

**Proyecto**: Invoice Builder Platform
**Versión**: 1.0 (Definitiva)
**Tecnología**: PHP 8.2, Symfony 6.4+, Twig, KnpSnappyBundle (wkhtmltopdf/Snappy).

---

## 1. Arquitectura del Sistema

El backend sigue estrictamente una **Arquitectura Hexagonal (Ports & Adapters)**.

### 1.1 Mapa de Capas
*   **Infrastructure (Adaptadores)**:
    *   `Controller`: Puntos de entrada HTTP (`PrintController`).
    *   `Repository`: Acceso a BD (`TemplateRepository`).
    *   `Adapter`: Implementaciones externas (`SnappyPdfAdapter`).
*   **Application (Servicios)**:
    *   `DocumentGenerator`: Caso de uso principal (Fachada).
    *   `ChannelFactory`, `DataProviderFactory`.
*   **Domain (Núcleo)**:
    *   `ContentBuilder`: Lógica de renderizado recursivo.
    *   `Renderers`: Lógica visual de componentes.
    *   `Interfaces`: Contratos (`ComponentRendererInterface`, `PdfGeneratorInterface`).

### 1.2 Flujo de Ejecución (Sequence)
1.  **Request**: `POST /print/{id}`
2.  **Validation**: Verificar JSON Schema.
3.  **Data Fetching**: `InvoiceDataProvider` obtiene datos del ERP.
4.  **Builder**: Recorre JSON -> Llama a Renderers -> Genera HTML.
5.  **Conversion**: `PdfChannel` -> `SnappyAdapter` -> PDF Binary.
6.  **Response**: Stream del PDF.

---

## 2. Implementación de Servicios Core

El equipo debe implementar las siguientes clases clave. Ver carpeta `symfony_export/` para código fuente de referencia.

### 2.1 Factory & Renderers
Usa `TaggedIterator` para inyectar automáticamente todos los renderers.

```yaml
# config/services.yaml
_instanceof:
    App\Renderer\ComponentRendererInterface:
        tags: ['app.component_renderer']

App\Service\ComponentFactory:
    arguments:
        $renderers: !tagged_iterator app.component_renderer
```

### 2.2 Estrategia de Datos (Data Providers)
Cada tipo de informe tiene su propia lógica de carga de datos.

```php
interface DataProviderInterface {
    public function getData(string $entityId): array;
    public function supports(string $reportType): bool;
}
```

---

## 3. Catálogo de Renderers (Backend)

Cada componente del Frontend tiene un espejo en el Backend.

| Componente | Clase PHP | Responsabilidad |
| :--- | :--- | :--- |
| **Page** | `PageRenderer` | Configura el `<body>`, fondo y padding global. |
| **Container** | `ContainerRenderer` | Gestiona `display: flex/grid`, márgenes y bordes. **Crítico**: Debe replicar exactamente el comportamiento CSS web. |
| **Text** | `TextRenderer` | Interpola variables Twig (`{{ var }}`) y aplica estilos de fuente. |
| **Table** | `TableRenderer` | Recibe `data` y `columns`. Renderiza `<table>` HTML. Itera sobre el dataset inyectado. |
| **Image** | `ImageRenderer` | Renderiza `<img>`. Nota: Usar rutas absolutas o Base64 para que Snappy las vea. |

---

## 4. Configuración Física (PDF)

La conversión HTML -> PDF requiere configuración precisa.

### 4.1 Configuración Snappy (wkhtmltopdf)
El `SnappyPdfAdapter` debe traducir las opciones del usuario a flags de línea de comandos:

*   **Papel**: `--page-size A4` o `--page-width 80mm` (Tickets).
*   **Márgenes**: `--margin-top 0` (controlados por CSS `@page` o por el flag).
*   **Orientación**: `--orientation Landscape`.
*   **Assets**: `--enable-local-file-access` para cargar imágenes locales.

---

## 5. Pruebas y QA

*   **Unit Tests**: Para cada `Renderer` (comprobar que genera el HTML esperado dado un JSON de props).
*   **Integration Tests**: Generar un PDF real y verificar que el binario no está vacío.
*   **Visual Regression**: Comparar snapshots de PDF generados para detectar cambios no deseados en estilos.
