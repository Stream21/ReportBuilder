# Especificación Técnica del Frontend (React / Next.js)

**Proyecto**: Invoice Builder Platform
**Versión**: 1.0 (Definitiva)
**Tecnología**: Next.js 14 (App Router), React 18, TypeScript, Craft.js, Shadcn/UI, TailwindCSS.

---

## 1. Arquitectura de Aplicación

La aplicación es una SPA (Single Page Application) construida con **Next.js App Router**.

### 1.1 Estructura de Directorios Clave
El equipo debe replicar organizar el código así:

```text
/app
  /api              # BFF (Backend for Frontend) - Proxy hacia Symfony
  /editor/[id]      # Página principal del editor (Layout + Canvas)
  /dashboard        # Gestión de plantillas (Listados, Filtros)
  layout.tsx        # Providers globales (Theme, Toast, Auth)
/components
  /editor           # Componentes específicos del Editor Visual
    /nodes          # Componentes DE USUARIO (User Components: Container, Text...)
    /toolbar        # Barras de herramientas (Top, Side)
    /viewport       # Wrapper del Canvas de Craft.js
  /ui               # Componentes Shadcn (Button, Input, Dialog...)
  /dashboard        # Componentes de gestión (Cards, Tables)
/lib
  /craft-utils      # Helpers para serialización/deserialización de nodos
  /api-client       # Cliente Axios configurado
/store              # Estado Global (Zustand) - Si aplica fuera de Craft
/types              # Definiciones TypeScript compartidas
```

### 1.2 Motor de Edición (Craft.js)
El núcleo es `Craft.js`. No es un simple drag & drop, gestiona un árbol de nodos serializable.

**Configuración del Editor (`<Editor />`)**:
*   **Resolver**: Mapa de componentes permitidos (`Container`, `Text`, `Image`, `Table`).
*   **Enabled**: `true` en modo edición, `false` en modo preview.
*   **OnNodesChange**: Callback para detectar cambios (Dirty State) y activar "Guardar".

---

## 2. Catálogo de Componentes Visuales (User Nodes)

Cada componente debe tener dos partes: el **Componente React** (lo que se ve) y la **Configuración Craft** (reglas y panel de propiedades).

### 2.1 Componente: `Container` (Contenedor / Grid)
Es el bloque constructivo fundamental. Soporta Flexbox y Grid CSS.

**Props (TypeScript Interface):**
```typescript
interface ContainerProps {
    // Layout Flex
    flexDirection: 'row' | 'column';
    justifyContent: 'start' | 'center' | 'end' | 'between';
    alignItems: 'start' | 'center' | 'end';
    flexWrap: 'nowrap' | 'wrap';
    gap: number; // px
    
    // Layout Grid (Avanzado)
    display: 'flex' | 'grid';
    gridColumns: number; // 1-12
    
    // Estilo Visual
    backgroundColor: string; // Hex o rgba
    padding: { t: number, r: number, b: number, l: number };
    margin: { t: number, r: number, b: number, l: number };
    border: { width: number, style: 'solid'|'dashed', color: string, radius: number };
    boxShadow: 'none' | 'sm' | 'md' | 'lg';
    
    // Dimensiones
    width: string; // "100%", "50%", "200px"
    minHeight: string;
}
```

**Settings Panel (Sidebar):**
*   **General**: Sliders para Padding/Margin, Color Picker para Background.
*   **Layout**: Botones toggle para Flex/Grid. Input numérico para Grid Columns.
*   **Borde**: Controles agrupados (Width, Radius, Color).

### 2.2 Componente: `Text` (Texto Rico)
Permite edición inline y variables dinámicas.

**Props:**
```typescript
interface TextProps {
    text: string; // Contenido HTML o String
    fontFamily: string; // Enum: "Roboto", "Open Sans", "Courier"
    fontSize: number;
    fontWeight: '400' | '500' | '700';
    fontStyle: 'normal' | 'italic';
    textDecoration: 'none' | 'underline';
    color: string;
    textAlign: 'left' | 'center' | 'right' | 'justify';
}
```
**Comportamiento Especial**:
*   Usa `ContentEditable` para escribir directamente en el canvas.
*   Detecta `{{` para mostrar un dropdown de variables disponibles (`invoice.id`, `client.name`).

### 2.3 Componente: `Table` (Tabla Iterativa)
Complejo. Renderiza una tabla HTML basada en una estructura de datos.

**Props:**
```typescript
interface TableProps {
    // Datos
    dataKey: string; // Clave del array en el JSON de datos (ej: "items")
    
    // Estilos
    headerBgColor: string;
    headerTextColor: string;
    rowBgColorOdd: string;
    rowBgColorEven: string;
    borderColor: string;
    
    // Columnas (Array de objetos)
    columns: Array<{
        title: string;
        dataField: string; // Propiedad del objeto item (ej: "price")
        width: string; // "20%"
        align: 'left' | 'center' | 'right';
        format?: 'currency' | 'date' | 'text';
    }>;
}
```
**UX del Editor**:
*   No se editan las filas individuales (porque son dinámicas).
*   Se edita la **Cabecera** y el **Modelo de Fila**.
*   Permite arrastrar columnas para reordenar.

---

## 3. Gestión del Estado (State Management)

### 3.1 Estado de la Plantilla (Store: `useTemplateStore`)
Gestiona los metadatos globales que NO son parte del árbol visual de Craft.js.
*   `title` (string)
*   `status` (DRAFT, PUBLISHED)
*   `paperConfig`:
    *   `size`: 'A4' | 'Letter' | 'Custom'
    *   `orientation`: 'portrait' | 'landscape'
    *   `mediaBox`: { w: number, h: number } (mm)
*   `isSaving` (boolean)
*   `lastSavedAt` (Date)

### 3.2 Comunicación con Backend (API Client)
El frontend debe usar un cliente HTTP robusto (Axios/TanStack Query) para:
1.  **Load**: `GET /api/templates/{id}` -> Recibe JSON -> `editor.actions.deserialize(json)`.
2.  **Save**: `POST /api/templates/{id}/draft` -> `editor.query.serialize()`.
3.  **Preview**: `POST /api/print/preview` -> Envía JSON actual -> Recibe Blob PDF.

---

## 4. UI/UX: Flujos Críticos

### 4.1 Flujo de "Arrastrar y Soltar"
1.  Usuario abre panel izquierdo "Componentes".
2.  Arrastra "Contenedor" al Canvas.
3.  Craft.js detecta el `drop target`.
4.  Si es válido, renderiza el componente con `defaultProps`.
5.  El usuario selecciona el componente -> Se activa el Panel Derecho "Propiedades".

### 4.2 Flujo de "Configuración de Página"
1.  Usuario clica en el fondo (Page).
2.  Panel derecho muestra "Configuración de Documento".
3.  Cambia "A4" a "A5".
4.  Editor actualiza visualmente el ancho del Canvas (ej. de 210mm a 148mm) usando escala CSS (`transform: scale()`) para que quepa en pantalla.

### 4.3 Flujo de "Variables"
1.  Usuario edita un texto.
2.  Escribe `{{`.
3.  Aparece un `Popover` con la lista de variables del `Schema` del reporte seleccionado (ej: Factura).
4.  Selecciona `cliente.nombre`.
5.  Se inserta un "Chip" o etiqueta en el texto `{{cliente.nombre}}` no editable parcialmente.
