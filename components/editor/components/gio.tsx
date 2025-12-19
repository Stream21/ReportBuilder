"use client"

import { useNode, useEditor } from "@craftjs/core"
import { Container } from "./container"
import { Badge } from "@/components/ui/badge"
import { Image as ImageIcon } from "lucide-react"


interface GioComponentProps {
    width?: string
    height?: string
    marginTop?: number
    marginBottom?: number
    marginLeft?: number
    marginRight?: number
}

export function GioComponent({
    width = "150px",
    height = "auto",
    marginTop = 0,
    marginBottom = 0,
    marginLeft = 0,
    marginRight = 0
}: GioComponentProps) {
    const {
        connectors: { connect, drag },
    } = useNode()

    const { enabled } = useEditor((state) => ({
        enabled: state.options.enabled
    }))

    return (
        <div
            ref={(ref) => { if (ref) connect(drag(ref)) }}
            style={{
                width,
                height,
                marginLeft: `${marginLeft}px`,
                marginRight: `${marginRight}px`,
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "50px", // Prevent collapse
            }}
            className="group"
        >
            {enabled && (
                <div className="absolute -top-3 -left-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Badge variant="secondary" className="text-[10px] h-5 px-1.5 gap-1 border-blue-200 bg-blue-50 text-blue-700 pointer-events-none">
                        <ImageIcon className="w-3 h-3" />
                        Logotipo Empresa
                    </Badge>
                </div>
            )}

            <img
                src="/adrian-logo.png"
                alt="Logotipo Empresa (Mock)"
                style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    opacity: enabled ? 0.9 : 1
                }}
            />

            {enabled && (
                <div className="absolute inset-0 border border-dashed border-blue-300 pointer-events-none opacity-50" />
            )}
        </div>
    )
}

// Reutilizamos ContainerSettings pero limitamos opciones o creamos uno simplificado si es necesario.
// El usuario dijo "que permita modificar el contenedor margenes etc todo lo que es maquetacion"
// Asi que podemos usar ContainerSettings pero OJO, ContainerSettings espera que el nodo tenga datos de 'Container'.
// Mejor creamos GioSettings simplificado importando UI components.

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const GioSettings = () => {
    const {
        actions: { setProp },
        width,
        height,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight
    } = useNode((node) => ({
        width: node.data.props.width,
        height: node.data.props.height,
        marginTop: node.data.props.marginTop,
        marginBottom: node.data.props.marginBottom,
        marginLeft: node.data.props.marginLeft,
        marginRight: node.data.props.marginRight,
    }))

    return (
        <div className="space-y-4">
            <div className="p-3 bg-blue-50 text-blue-800 text-xs rounded-md border border-blue-100 mb-4 flex gap-2">
                <div className="mt-0.5">ℹ️</div>
                <div>
                    <strong>Logotipo de Empresa</strong><br />
                    Este componente renderiza dinámicamente la variable <code>empresa.logotipo</code>.
                </div>
            </div>

            <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase text-muted-foreground pb-2 border-b">Dimensiones (Dimensions)</h4>
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <Label className="text-xs">Ancho (Width)</Label>
                        <Input
                            className="h-8"
                            value={width || "150px"}
                            onChange={(e) => setProp((props: GioComponentProps) => props.width = e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Alto (Height)</Label>
                        <Input
                            className="h-8"
                            value={height || "auto"}
                            onChange={(e) => setProp((props: GioComponentProps) => props.height = e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase text-muted-foreground pb-2 border-b">Márgenes (Margins px)</h4>
                <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                        <Label className="text-xs">Arriba (Top)</Label>
                        <Input
                            type="number"
                            className="h-8"
                            value={marginTop || 0}
                            onChange={(e) => setProp((props: GioComponentProps) => props.marginTop = Number(e.target.value))}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Abajo (Bottom)</Label>
                        <Input
                            type="number"
                            className="h-8"
                            value={marginBottom || 0}
                            onChange={(e) => setProp((props: GioComponentProps) => props.marginBottom = Number(e.target.value))}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Izquierda (Left)</Label>
                        <Input
                            type="number"
                            className="h-8"
                            value={marginLeft || 0}
                            onChange={(e) => setProp((props: GioComponentProps) => props.marginLeft = Number(e.target.value))}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Derecha (Right)</Label>
                        <Input
                            type="number"
                            className="h-8"
                            value={marginRight || 0}
                            onChange={(e) => setProp((props: GioComponentProps) => props.marginRight = Number(e.target.value))}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

GioComponent.craft = {
    displayName: "Logotipo Empresa",
    props: {
        width: "150px",
        height: "auto",
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0
    },
    rules: {
        canDrag: () => true,
        canMoveIn: () => true, // Puede moverse
        canDrop: () => false, // No acepta hijos
    },
    related: {
        settings: GioSettings
    }
}
