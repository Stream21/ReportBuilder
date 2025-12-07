
import { Element } from "@craftjs/core"
import { Container, Text, Header, Footer } from "@/components/editor/components"

export const DefaultInvoiceLayout = () => {
    return (
        <Element
            canvas
            is={Container}
            flexDirection="column"
            padding={0}
            gap={0}
            justifyContent="flex-start"
            alignItems="stretch"
            height="100%"
            custom={{ displayName: "Documento General" }}
        >
            {/* Header */}
            <Element
                canvas
                is={Header}
                custom={{ displayName: "Header (Cabecera)" }}
            >
                <Element
                    is={Container}
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    width="100%"
                    padding={0}
                >
                    <Element is={Container} width="60%" padding={0} gap={5}>
                        <Element is={Text} text="LOGOTIPO" fontSize={32} fontWeight="bold" color="#2563eb" />
                        <Element is={Text} text="Tu Slogan Aquí" fontSize={12} color="#64748b" />
                    </Element>

                    <Element is={Container} width="40%" padding={0} gap={2} alignItems="flex-end">
                        <Element is={Text} text="EMPRESA S.L." fontSize={14} fontWeight="bold" textAlign="right" />
                        <Element is={Text} text="C/ Ejemplo, 123" fontSize={12} textAlign="right" color="#64748b" />
                        <Element is={Text} text="28000 Madrid" fontSize={12} textAlign="right" color="#64748b" />
                        <Element is={Text} text="CIF: B-12345678" fontSize={12} textAlign="right" color="#64748b" />
                    </Element>
                </Element>

                <Element is={Container} marginTop={20} padding={10} backgroundColor="#f8fafc" width="100%">
                    <Element is={Text} text="FACTURA N°: F-2023-001" fontSize={14} fontWeight="bold" />
                    <Element is={Text} text="Fecha: 01/01/2023" fontSize={12} />
                </Element>
            </Element>

            {/* Body */}
            <Element
                canvas
                is={Container}
                flexDirection="column"
                padding={20}
                gap={10}
                flexGrow={1}
                custom={{ displayName: "Body (Cuerpo)" }}
            >
                <Element is={Text} text="Detalles del Cliente" fontSize={14} fontWeight="bold" marginBottom={5} />
                <Element is={Text} text="{{ cliente.nombre }}" fontSize={14} />
                <Element is={Text} text="{{ cliente.direccion }}" fontSize={14} />

                <Element is={Container} marginTop={20}>
                    <Element is={Text} text="Arrastra la tabla de servicios aquí..." fontSize={12} color="#94a3b8" fontStyle="italic" textAlign="center" />
                </Element>
            </Element>

            {/* Footer */}
            <Element
                canvas
                is={Footer}
                custom={{ displayName: "Footer (Pie)" }}
            >
                <Element is={Container} borderTopWidth={1} borderColor="#e2e8f0" paddingTop={10} width="100%">
                    <Element is={Text} text="Términos y Condiciones" fontSize={10} fontWeight="bold" color="#64748b" marginBottom={5} />
                    <Element is={Text} text="El pago debe realizarse dentro de los 30 días posteriores a la fecha de la factura." fontSize={10} color="#94a3b8" />
                    <Element is={Text} text="Información RGPD: Sus datos serán tratados conforme a la ley vigente..." fontSize={8} color="#cbd5e1" marginTop={10} textAlign="justify" />
                </Element>
            </Element>
        </Element>
    )
}
