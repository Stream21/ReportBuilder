"use client"

import { useNode, useEditor, Element } from "@craftjs/core"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Text } from "./text"
import { Settings, AlignHorizontalJustifyStart, AlignVerticalJustifyCenter } from "lucide-react"
import React from "react"
import { Separator } from "@/components/ui/separator"

interface LabelValueProps {
    flexDirection?: "row" | "column"
    gap?: number
    alignItems?: "flex-start" | "center" | "flex-end" | "stretch"
    labelWidth?: string
    marginTop?: number
    marginBottom?: number
}

export const LabelValue = ({
    flexDirection = "row",
    gap = 10,
    alignItems = "center",
    labelWidth = "auto",
    marginTop = 0,
    marginBottom = 10,
}: LabelValueProps) => {
    const {
        connectors: { connect, drag },
        actions: { setProp }
    } = useNode()

    const { enabled } = useEditor((state) => ({
        enabled: state.options.enabled,
    }))

    return (
        <div
            ref={(ref) => {
                if (ref) connect(drag(ref))
            }}
            className="label-value-container"
            style={{
                display: "flex",
                flexDirection,
                gap: `${gap}px`,
                alignItems,
                marginTop: `${marginTop}px`,
                marginBottom: `${marginBottom}px`,
                width: "100%",
                border: enabled ? "1px dashed #e2e8f0" : "none",
                padding: enabled ? "2px" : "0",
            }}
        >
            {/* Label Area - Fixed or Auto Width */}
            <div style={{ width: labelWidth, flexShrink: 0 }}>
                <Element
                    id="label"
                    is={Text}
                    text="Etiqueta:"
                    fontWeight="bold"
                    color="#374151"
                />
            </div>

            {/* Value Area - Flexible */}
            <div style={{ flexGrow: 1, minWidth: 0 }}>
                <Element
                    id="value"
                    is={Text}
                    text="Valor dinámico"
                    color="#6b7280"
                />
            </div>
        </div>
    )
}

const LabelValueSettings = () => {
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
                            onValueChange={(value) => setProp((props: LabelValueProps) => (props.flexDirection = value as any))}
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
                            onValueChange={(value) => setProp((props: LabelValueProps) => (props.alignItems = value as any))}
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
                        onChange={(e) => setProp((props: LabelValueProps) => (props.gap = Number(e.target.value)))}
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
                            onChange={(e) => setProp((props: LabelValueProps) => (props.labelWidth = e.target.value))}
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
                                onChange={(e) => setProp((props: LabelValueProps) => (props.marginTop = Number(e.target.value)))}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] text-muted-foreground">Abajo</Label>
                            <Input
                                type="number"
                                className="h-8 text-xs"
                                value={marginBottom || 0}
                                onChange={(e) => setProp((props: LabelValueProps) => (props.marginBottom = Number(e.target.value)))}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

LabelValue.craft = {
    displayName: "Label: Value",
    props: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        labelWidth: "auto",
        marginTop: 0,
        marginBottom: 10,
    },
    related: {
        settings: LabelValueSettings,
    },
}
