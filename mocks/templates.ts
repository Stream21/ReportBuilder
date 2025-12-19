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
            name: "Informe A4 (Portrait)",
            reportType,
            paperType: "a4",
            orientation: "portrait",
            margins: { top: 20, right: 20, bottom: 20, left: 20 },
            padding: { top: 10, right: 10, bottom: 10, left: 10 },
            fontFamily: "Arial",
            version: "1.0",
            status: "published",
            createdAt: new Date(),
            isActive: true,
        },
        {
            id: "2",
            name: "Informe A4 (Landscape)",
            reportType,
            paperType: "a4",
            orientation: "landscape",
            margins: { top: 15, right: 15, bottom: 15, left: 15 },
            padding: { top: 10, right: 10, bottom: 10, left: 10 },
            fontFamily: "Roboto",
            version: "1.0",
            status: "draft",
            createdAt: new Date(),
            isActive: true,
        },
        {
            id: "3",
            name: "Receta A5 (Portrait)",
            reportType,
            paperType: "a5",
            orientation: "portrait",
            margins: { top: 10, right: 10, bottom: 10, left: 10 },
            padding: { top: 5, right: 5, bottom: 5, left: 5 },
            fontFamily: "Open Sans",
            version: "1.0",
            status: "published",
            createdAt: new Date(),
            isActive: true,
        },
        {
            id: "4",
            name: "Receta A5 (Landscape)",
            reportType,
            paperType: "a5",
            orientation: "landscape",
            margins: { top: 10, right: 10, bottom: 10, left: 10 },
            padding: { top: 5, right: 5, bottom: 5, left: 5 },
            fontFamily: "Open Sans",
            version: "1.0",
            status: "draft",
            createdAt: new Date(),
            isActive: true,
        },
        {
            id: "5",
            name: "Ticket (Continuous)",
            reportType,
            paperType: "continuous",
            paperWidth: 80,
            orientation: "portrait",
            margins: { top: 0, right: 2, bottom: 0, left: 2 },
            padding: { top: 5, right: 5, bottom: 5, left: 5 },
            fontFamily: "Monospace",
            version: "1.0",
            status: "published",
            createdAt: new Date(),
            isActive: true,
        },
    ]
}
