# 1. Visión General del Negocio: Generador de Informes Dinámicos

## 1.1 Resumen Ejecutivo
El **Generador de Informes Dinámicos** es una solución tecnológica diseñada para empoderar a los usuarios finales, permitiéndoles diseñar, personalizar y generar documentos corporativos (facturas, informes clínicos, presupuestos) sin depender del equipo de desarrollo para cada cambio visual.

La herramienta desacopla la **capa de presentación** (Diseño) de la **capa de datos** (Backend), utilizando una interfaz visual "Drag & Drop" intuitiva que genera plantillas almacenables y reutilizables.

## 1.2 Problemática Actual
*   **Dependencia Tecnológica**: Cada cambio en el diseño de una factura (ej. mover el logo, cambiar un color) requiere un ticket a IT, desarrollo, despliegue y pruebas.
*   **Rigidez**: Los informes son estáticos y hardcodeados en el backend.
*   **Time-to-Market elevado**: La creación de un nuevo tipo de informe puede tomar días o semanas.

## 1.3 Solución Propuesta
Una plataforma web que permite:
1.  **Diseño Visual**: Un editor WYSIWYG (Lo que ves es lo que obtienes) para construir informes arrastrando componentes.
2.  **Datos Dinámicos**: Inserción de variables (ej. `{{ cliente.nombre }}`) que se rellenan automáticamente al momento de imprimir.
3.  **Motor de Renderizado Híbrido**:
    *   **Frontend**: React/Next.js para la experiencia de edición fluida.
    *   **Backend**: Symfony/PHP para la generación robusta de PDFs masivos en alta fidelidad.

## 1.4 Funcionalidades Clave
*   **Editor de Arrastrar y Soltar**: Interfaz amigable para nómadas digitales y personal administrativo.
*   **Catálogo de Componentes**: Contenedores, Textos, Tablas automáticas, Imágenes, Separadores, Etiquetas/Valor.
*   **Gestión de Plantillas**: Guardado, versionado y activación de diferentes diseños para un mismo tipo de informe.
*   **Previsualización en Tiempo Real**: Ver cómo quedará el documento con datos de prueba antes de publicarlo.
*   **Exportación Multiformato**: Salida nativa en PDF optimizada para impresión (A4, Letter) o digital.

## 1.5 Valor Agregado
*   **Reducción de Costes Operativos**: Elimina horas de desarrollo dedicadas a tareas cosméticas.
*   **Agilidad Comercial**: El equipo de negocio puede adaptar sus presupuestos y facturas en minutos para campañas específicas.
*   **Consistencia de Marca**: Plantillas maestras aseguran que todos los documentos sigan la línea gráfica corporativa.

---
**Estado del Proyecto**: Fase de Implementación Técnica (MVP completado).
