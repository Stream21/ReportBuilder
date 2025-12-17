"use client"

import { useNode, useEditor } from "@craftjs/core"
import { Container } from "./container"

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
                marginTop: `${marginTop}px`,
                marginBottom: `${marginBottom}px`,
                marginLeft: `${marginLeft}px`,
                marginRight: `${marginRight}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "40px",
                position: "relative",
            }}
        >
            {enabled ? (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f3f4f6',
                        border: '1px dashed #d1d5db',
                        borderRadius: '4px',
                        color: '#6b7280',
                        fontSize: '12px',
                        gap: '4px'
                    }}
                >
                    <span style={{ fontSize: '20px' }}>🖼️</span>
                    <span style={{ fontWeight: 500 }}>{"{{ empresa.logotipo }}"}</span>
                </div>
            ) : (
                <img
                    src="https://via.placeholder.com/150x50?text=LOGO+EMPRESA"
                    alt="Logotipo Mock"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
            )}
            {/* Visual indicator for software property in editor */}
            <div className="absolute top-0 right-0 p-1 opacity-0 hover:opacity-100 transition-opacity bg-blue-100 text-[10px] text-blue-600 rounded-bl cursor-help" title="Propiedad del Software - No editable">
                Gio
            </div>
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
            <div className="p-2 bg-blue-50 text-blue-700 text-xs rounded border border-blue-100 mb-4">
                <strong>Componente Protegido</strong><br />
                Este es el logotipo oficial gestionado por el software. Solo puedes ajustar su posición y dimensiones.
            </div>

            <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase text-muted-foreground pb-2 border-b">Dimensiones</h4>
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <Label className="text-xs">Ancho</Label>
                        <Input
                            className="h-8"
                            value={width || "150px"}
                            onChange={(e) => setProp((props: GioComponentProps) => props.width = e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Alto</Label>
                        <Input
                            className="h-8"
                            value={height || "auto"}
                            onChange={(e) => setProp((props: GioComponentProps) => props.height = e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase text-muted-foreground pb-2 border-b">Márgenes (px)</h4>
                <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                        <Label className="text-xs">Arriba</Label>
                        <Input
                            type="number"
                            className="h-8"
                            value={marginTop || 0}
                            onChange={(e) => setProp((props: GioComponentProps) => props.marginTop = Number(e.target.value))}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Abajo</Label>
                        <Input
                            type="number"
                            className="h-8"
                            value={marginBottom || 0}
                            onChange={(e) => setProp((props: GioComponentProps) => props.marginBottom = Number(e.target.value))}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Izquierda</Label>
                        <Input
                            type="number"
                            className="h-8"
                            value={marginLeft || 0}
                            onChange={(e) => setProp((props: GioComponentProps) => props.marginLeft = Number(e.target.value))}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Derecha</Label>
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
    displayName: "Componente Gio",
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
