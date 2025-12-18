import { Calendar, Phone, Mail, Image, Hash, FileText, Type } from "lucide-react"

export const getVariableIcon = (variable: string) => {
    const v = variable.toLowerCase()
    if (v.includes("fecha") || v.includes("date")) return Calendar
    if (v.includes("telef") || v.includes("phone")) return Phone
    if (v.includes("email") || v.includes("mail")) return Mail
    if (v.includes("logo") || v.includes("imagen") || v.includes("image")) return Image
    if (v.includes("esfera") || v.includes("cilindro") || v.includes("eje") || v.includes("total") || v.includes("precio") || v.includes("cantidad") || v.includes("ojo")) return Hash
    if (v.includes("dni") || v.includes("cif") || v.includes("id")) return FileText
    return Type // Default for text
}

export const APP_VARIABLES = [
    {
        category: "Paciente",
        items: [
            "paciente.nombre",
            "paciente.apellidos",
            "paciente.dni",
            "paciente.fecha_nacimiento",
            "paciente.telefono",
            "paciente.email",
        ],
    },
    {
        category: "Optometría",
        items: [
            "graduacion.ojo_derecho_esfera",
            "graduacion.ojo_derecho_cilindro",
            "graduacion.ojo_derecho_eje",
            "graduacion.ojo_izquierdo_esfera",
            "agudeza_visual.ojo_derecho",
            "agudeza_visual.ojo_izquierdo",
        ],
    },
    {
        category: "Audiometría",
        items: [
            "audiometria.ojo_derecho_500hz",
            "audiometria.ojo_derecho_1000hz",
            "audiometria.ojo_derecho_2000hz",
            "audiometria.resultado",
        ],
    },
    {
        category: "Contactología",
        items: ["lentilla.marca", "lentilla.modelo", "lentilla.radio", "lentilla.diametro", "lentilla.potencia"],
    },
    {
        category: "Venta",
        items: ["venta.numero_factura", "venta.fecha", "venta.total", "venta.items", "venta.forma_pago"],
    },
    {
        category: "Empresa",
        items: [
            "empresa.nombre",
            "empresa.direccion",
            "empresa.telefono",
            "empresa.email",
            "empresa.cif",
            "empresa.logo",
        ],
    },
]
