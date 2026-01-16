import React from "react"
import { useNode } from "@craftjs/core"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export const LabelValueSettings = () => {
    const {
        actions: { setProp },
        flexDirection,
        gap,
        alignItems,
        labelWidth,
        marginTop,
        marginBottom,
    } = useNode((node) => ({
        flexDirection: node.data.props.flexDirection,
        gap: node.data.props.gap,
        alignItems: node.data.props.alignItems,
        labelWidth: node.data.props.labelWidth,
        marginTop: node.data.props.marginTop,
        marginBottom: node.data.props.marginBottom,
    }))

    return (
        <div className="space-y-4">
            <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase text-muted-foreground pb-2 border-b">
                    Disposición
                </h4>

                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <Label className="text-[10px] text-muted-foreground">Dirección</Label>
                        <Select
                            value={flexDirection || "row"}
                            onValueChange={(value) => setProp((props: any) => (props.flexDirection = value as any))}
                        >
                            <SelectTrigger className="h-8">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="row">Horizontal (Fila)</SelectItem>
                                <SelectItem value="column">Vertical (Columna)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-[10px] text-muted-foreground">Alineación Vert.</Label>
                        <Select
                            value={alignItems || "center"}
                            onValueChange={(value) => setProp((props: any) => (props.alignItems = value as any))}
                        >
                            <SelectTrigger className="h-8">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="flex-start">Arriba</SelectItem>
                                <SelectItem value="center">Centro</SelectItem>
                                <SelectItem value="flex-end">Abajo</SelectItem>
                                <SelectItem value="stretch">Estirar</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-1">
                    <Label className="text-xs">Espacio entre (Gap)</Label>
                    <Input
                        type="number"
                        className="h-8"
                        value={gap || 0}
                        onChange={(e) => setProp((props: any) => (props.gap = Number(e.target.value)))}
                    />
                </div>

                <Separator />

                <div className="space-y-1">
                    <Label className="text-xs">Ancho de Etiqueta</Label>
                    <div className="flex gap-2">
                        <Input
                            className="h-8"
                            placeholder="auto, 100px, 30%..."
                            value={labelWidth || "auto"}
                            onChange={(e) => setProp((props: any) => (props.labelWidth = e.target.value))}
                        />
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                        Usa <code>auto</code> para ajuste automático, o un valor fijo (ej. <code>120px</code>) para alinear múltiples filas.
                    </p>
                </div>

                <Separator />

                <div className="space-y-2 pt-1">
                    <Label className="text-xs font-semibold">Márgenes (px)</Label>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                            <Label className="text-[10px] text-muted-foreground">Arriba</Label>
                            <Input
                                type="number"
                                className="h-8 text-xs"
                                value={marginTop || 0}
                                onChange={(e) => setProp((props: any) => (props.marginTop = Number(e.target.value)))}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] text-muted-foreground">Abajo</Label>
                            <Input
                                type="number"
                                className="h-8 text-xs"
                                value={marginBottom || 0}
                                onChange={(e) => setProp((props: any) => (props.marginBottom = Number(e.target.value)))}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
