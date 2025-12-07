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
        icon: FileText, // Usando FileText temporalmente para evitar crash
        description: "Pruebas auditivas y audiometrías",
        color: "bg-purple-500/10 text-purple-500",
    },
    {
        id: "anamnesis",
        name: "Anamnesis",
        icon: FileText,
        description: "Historia clínica del paciente",
        color: "bg-pink-500/10 text-pink-500",
    },
    {
        id: "sales",
        name: "Ventas",
        icon: ShoppingCart,
        description: "Facturas y tickets de venta",
        color: "bg-green-500/10 text-green-500",
    },
    {
        id: "delivery",
        name: "Albaranes",
        icon: Package,
        description: "Documentos de entrega",
        color: "bg-orange-500/10 text-orange-500",
    },
    {
        id: "labels",
        name: "Etiquetas",
        icon: Tag,
        description: "Etiquetas de productos y envíos",
        color: "bg-yellow-500/10 text-yellow-500",
    },
    {
        id: "email",
        name: "Plantillas Email",
        icon: Mail,
        description: "Correos electrónicos automatizados",
        color: "bg-indigo-500/10 text-indigo-500",
    },
    {
        id: "sms",
        name: "Mensajes SMS",
        icon: MessageSquare,
        description: "Mensajes de texto para clientes",
        color: "bg-red-500/10 text-red-500",
    },
]
