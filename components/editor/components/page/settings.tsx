import React from "react"
import { useNode } from "@craftjs/core"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export const PageSettings = () => {
    const { padding, gap, marginTop, marginBottom, marginLeft, marginRight, backgroundColor, actions: { setProp } } = useNode((node) => ({
        padding: node.data.props.padding,
        gap: node.data.props.gap,
        marginTop: node.data.props.marginTop,
        marginBottom: node.data.props.marginBottom,
        marginLeft: node.data.props.marginLeft,
        marginRight: node.data.props.marginRight,
        backgroundColor: node.data.props.backgroundColor
    }))

    return (
        <div className="space-y-4">
            <h4 className="text-sm font-semibold">Configuración de Página</h4>

            <div className="space-y-1">
                <Label className="text-xs">Padding del Documento (px)</Label>
                <Input
                    type="number"
                    className="h-8"
                    min={0}
                    value={padding || 0}
                    onChange={(e) => setProp((props: any) => props.padding = Number(e.target.value))}
                />
                <p className="text-[10px] text-muted-foreground">
                    Espacio interno desde los bordes del papel
                </p>
            </div>

            <div className="space-y-2 pt-2 border-t">
                <Label className="text-xs font-semibold">Márgenes del Documento (px)</Label>
                <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                        <Label className="text-[10px] text-muted-foreground">Arriba</Label>
                        <Input
                            type="number"
                            className="h-8 text-xs"
                            min={0}
                            value={marginTop || 0}
                            onChange={(e) => setProp((props: any) => props.marginTop = Number(e.target.value))}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-[10px] text-muted-foreground">Abajo</Label>
                        <Input
                            type="number"
                            className="h-8 text-xs"
                            min={0}
                            value={marginBottom || 0}
                            onChange={(e) => setProp((props: any) => props.marginBottom = Number(e.target.value))}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-[10px] text-muted-foreground">Izquierda</Label>
                        <Input
                            type="number"
                            className="h-8 text-xs"
                            min={0}
                            value={marginLeft || 0}
                            onChange={(e) => setProp((props: any) => props.marginLeft = Number(e.target.value))}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-[10px] text-muted-foreground">Derecha</Label>
                        <Input
                            type="number"
                            className="h-8 text-xs"
                            min={0}
                            value={marginRight || 0}
                            onChange={(e) => setProp((props: any) => props.marginRight = Number(e.target.value))}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-1 pt-2 border-t">
                <Label className="text-xs">Espacio entre secciones (Gap px)</Label>
                <Input
                    type="number"
                    className="h-8"
                    min={0}
                    value={gap || 0}
                    onChange={(e) => setProp((props: any) => props.gap = Number(e.target.value))}
                />
                <p className="text-[10px] text-muted-foreground">
                    Separación entre Header, Body y Footer
                </p>
            </div>

            <div className="space-y-1 pt-2 border-t">
                <Label className="text-xs">Color de Fondo</Label>
                <div className="flex gap-2">
                    <div className="relative w-8 h-8 rounded border overflow-hidden shrink-0">
                        <Input
                            type="color"
                            className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 p-0 border-0 cursor-pointer"
                            value={backgroundColor || "#ffffff"}
                            onChange={(e) => setProp((props: any) => props.backgroundColor = e.target.value)}
                        />
                    </div>
                    <Input
                        type="text"
                        className="h-8 text-xs flex-1"
                        value={backgroundColor || "#ffffff"}
                        onChange={(e) => setProp((props: any) => props.backgroundColor = e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}
