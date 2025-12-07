import type { Template } from "@/app/page"

export function getMockTemplates(reportType: string): Template[] {
    const isTicket = reportType.toLowerCase().includes("sales") || reportType.toLowerCase().includes("ticket") // Asumiendo 'sales' es ticket por contexto anterior, o ajustamos logica
    // En report-list.tsx 'sales' es Ventas.
    // El codigo original usaba reportType.toLowerCase().includes("ticket").
    // Pero los IDs de reportes son: optometric, audiometric, sales, delivery, etc.
    // Ninguno incluye "ticket" en el ID, pero quizas el nombre?
    // En report-list el id es "sales", name es "Ventas".
    // El codigo original de TemplateList usaba reportType (que es el ID) para checkear includes("ticket").
    // Probablemente era un bug o una logica pendiente. Asumire que 'sales' puede ser ticket.

    // Para simplificar y que funcione consistente con lo que habia:
    const isSmallFormat = reportType === "sales" || reportType === "labels"

    return [
        {
            id: "1",
            name: isSmallFormat ? "Ticket Estándar" : "Factura A4 Estándar",
            reportType,
            paperType: isSmallFormat ? "continuous" : "a4",
            orientation: "portrait",
            margins: isSmallFormat ? { top: 5, right: 5, bottom: 5, left: 5 } : { top: 20, right: 20, bottom: 20, left: 20 },
            padding: isSmallFormat ? { top: 5, right: 5, bottom: 5, left: 5 } : { top: 10, right: 10, bottom: 10, left: 10 },
            fontFamily: "Arial",
            createdAt: new Date(),
        },
        {
            id: "2",
            name: isSmallFormat ? "Ticket Compacto" : "Factura A4 Compacta",
            reportType,
            paperType: isSmallFormat ? "continuous" : "a4",
            orientation: isSmallFormat ? "portrait" : "landscape",
            margins: { top: 10, right: 10, bottom: 10, left: 10 },
            padding: { top: 5, right: 5, bottom: 5, left: 5 },
            fontFamily: "Roboto",
            createdAt: new Date(),
        },
        {
            id: "adrian-1",
            name: "Informe Adrian Salgado",
            reportType,
            paperType: "a4",
            orientation: "portrait",
            margins: { top: 15, right: 15, bottom: 15, left: 15 },
            padding: { top: 10, right: 10, bottom: 10, left: 10 },
            fontFamily: "Arial",
            createdAt: new Date(),
        },
    ]
}
