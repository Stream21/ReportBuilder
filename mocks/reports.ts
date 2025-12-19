import { FileText, Eye, ShoppingCart, Package, Tag, Mail, MessageSquare } from "lucide-react"

export const reports = [
    {
        id: "optometric",
        name: "Optometrico",
        icon: Eye,
        description: "Graduación y exámenes visuales",
        color: "bg-blue-500/10 text-blue-500",
    },
    {
        id: "contactology",
        name: "Contactologico",
        icon: Eye,
        description: "Adaptación de lentes de contacto",
        color: "bg-cyan-500/10 text-cyan-500",
    },
    {
        id: "audiometric",
        name: "Audiologico",
        icon: FileText, // Usando FileText temporalmente
        description: "Pruebas auditivas y audiometrías",
        color: "bg-purple-500/10 text-purple-500",
    },
    {
        id: "sales",
        name: "Ventas",
        icon: ShoppingCart,
        description: "Facturas y tickets de venta",
        color: "bg-green-500/10 text-green-500",
    },
]
