import React from "react"
import { useNode } from "@craftjs/core"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export const GioSettings = () => {
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
                            onChange={(e) => setProp((props: any) => props.width = e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Alto (Height)</Label>
                        <Input
                            className="h-8"
                            value={height || "auto"}
                            onChange={(e) => setProp((props: any) => props.height = e.target.value)}
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
                            onChange={(e) => setProp((props: any) => props.marginTop = Number(e.target.value))}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Abajo (Bottom)</Label>
                        <Input
                            type="number"
                            className="h-8"
                            value={marginBottom || 0}
                            onChange={(e) => setProp((props: any) => props.marginBottom = Number(e.target.value))}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Izquierda (Left)</Label>
                        <Input
                            type="number"
                            className="h-8"
                            value={marginLeft || 0}
                            onChange={(e) => setProp((props: any) => props.marginLeft = Number(e.target.value))}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Derecha (Right)</Label>
                        <Input
                            type="number"
                            className="h-8"
                            value={marginRight || 0}
                            onChange={(e) => setProp((props: any) => props.marginRight = Number(e.target.value))}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
