# 3. Manual de Usuario / Wiki del Proyecto

Bienvenido a la Wiki del Generador de Informes. Esta guía está diseñada para ayudarle a sacar el máximo partido a la herramienta de diseño de plantillas.

## 3.1 Introducción
El Generador de Informes le permite crear diseños profesionales para sus facturas, informes médicos y presupuestos visualmente, arrastrando elementos en la pantalla, tal y como si estuviera haciendo una presentación de diapositivas.

---

## 3.2 Interfaz de Edición

La pantalla del editor se divide en 3 zonas principales:

### 1. Panel Izquierdo (Herramientas)
Aquí encontrará todos los elementos disponibles para añadir a su informe.
*   **Estructura**: `Container` (Cajas), `Columns` (Columnas), `Divider` (Líneas).
*   **Contenido**: `Text` (Texto), `Label: Value` (Datos), `Image` (Logos).
*   **Datos**: `Table` (Tablas automáticas).
*   **Variables**: Lista de datos disponibles (ej. Nombre del Cliente, Fecha) que puede copiar y pegar.

### 2. Lienzo Central (Canvas)
Es su "hoja de papel". Aquí es donde construye el diseño.
*   Puede hacer clic en cualquier elemento para seleccionarlo.
*   Arrastre elementos desde el panel izquierdo y suéltelos aquí.
*   Arrastre elementos dentro del lienzo para reordenarlos.

### 3. Panel Derecho (Propiedades y Capas)
Al seleccionar un elemento en el lienzo, este panel mostrará sus opciones:
*   **Texto y Fuente**: Cambie tamaño, color, negrita.
*   **Diseño**: Ajuste márgenes, rellenos, bordes y colores de fondo.
*   **Configuración Específica**: Columnas de tabla, URL de imagen, etc.

---

## 3.3 Guía Paso a Paso: Creando su Primera Plantilla

### Paso 1: Configurar el Documento Base
1.  Vaya a "Configuración Global" (Icono de engranaje general o al crear plantilla).
2.  Defina el tamaño de papel (A4) y los márgenes (ej. 20mm).
3.  Elija una fuente base para todo el documento.

### Paso 2: Crear el Encabezado
1.  Arrastre un componente **Columnas** (Grid) y configúrelo con 2 columnas.
2.  En la columna izquierda, arrastre un componente **Imagen** para su logo.
3.  En la columna derecha, arrastre un componente **Texto** para los datos de su empresa. Alinee el texto a la derecha.

### Paso 3: Añadir Datos Dinámicos
1.  Arrastre un componente **Etiqueta: Valor**.
2.  En la etiqueta escriba "Cliente:".
3.  En el valor, escriba `{{ cliente.nombre }}`. *Nota: Puede usar el buscador de variables (@) si está disponible.*
4.  La herramienta sustituirá `{{ cliente.nombre }}` por el nombre real al imprimir.

### Paso 4: Listado de Productos (Tabla)
1.  Arrastre el componente **Tabla**.
2.  En propiedades, defina las columnas que necesita (ej. "Concepto", "Cantidad", "Precio").
3.  La tabla se rellenará automáticamente con los ítems de la factura o informe.

### Paso 5: Guardar y Probar
1.  Haga clic en el botón **Guardar** en la barra superior.
2.  Use el botón **Visualizar** (Ojo) para ver una prueba con datos falsos y asegurar que todo encaja.
3.  Use **Simular PDF** para descargar un PDF de prueba real generado por el servidor.

---

## 3.4 Preguntas Frecuentes (FAQ)

**¿Cómo pongo un color de fondo a una sección?**
Seleccione el Contenedor de esa sección, vaya al panel derecho > Estilo > Color de Fondo y elija el color.

**¿Puedo usar mis propias fuentes?**
Por defecto, usamos fuentes estándar (Arial, Roboto) para garantizar que el PDF se vea igual en todos los ordenadores. Consulte con soporte si necesita una fuente corporativa especial.

**¿Qué pasa si el texto es muy largo?**
Los contenedores son flexibles y crecerán hacia abajo para acomodar el texto. Si está usando columnas, el texto saltará de línea automáticamente.

**¿Cómo alineo los precios a la derecha?**
Seleccione el componente de Texto o la columna de la Tabla y cambie la alineación de texto a "Right" (Derecha) en el panel de propiedades.
