"use client"

import { useNode } from "@craftjs/core"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import React from "react"

interface DividerProps {
    height?: number
    color?: string
    margin?: number
    width?: string
    style?: "solid" | "dashed" | "dotted"
}

export function Divider({
    height = 1,
    color = "#e5e7eb",
    margin = 20,
    width = "100%",
    style = "solid"
}: DividerProps) {
    const { connectors: { connect, drag } } = useNode()

    return (
        <div
            ref={(ref) => { if (ref) connect(drag(ref)) }}
            className="w-full flex justify-center py-2"
        >
            <div
                style={{
                    height: `${height}px`,
                    backgroundColor: style === "solid" ? color : "transparent",
                    borderTop: style !== "solid" ? `${height}px ${style} ${color}` : "none",
                    width: width,
                    margin: `${margin}px 0`
                }}
            />
        </div>
    )
}

const DividerSettings = () => {
    const { height, color, margin, width, style, actions: { setProp } } = useNode((node) => ({
        height: node.data.props.height,
        color: node.data.props.color,
        margin: node.data.props.margin,
        width: node.data.props.width,
        style: node.data.props.style,
    }))

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                    <Label className="text-xs">Grosor (px)</Label>
                    <Input
                        type="number"
                        value={height || 0}
                        onChange={(e) => setProp((props: DividerProps) => props.height = Number(e.target.value))}
                    />
                </div>
                <div className="space-y-1">
                    <Label className="text-xs">Margen Y</Label>
                    <Input
                        type="number"
                        value={margin || 0}
                        onChange={(e) => setProp((props: DividerProps) => props.margin = Number(e.target.value))}
                    />
                </div>
            </div>

            <div className="space-y-1">
                <Label className="text-xs">Ancho</Label>
                <Input
                    value={width || "100%"}
                    onChange={(e) => setProp((props: DividerProps) => props.width = e.target.value)}
                    placeholder="100%, 50px..."
                />
            </div>

            <div className="space-y-1">
                <Label className="text-xs">Color</Label>
                <div className="flex gap-2">
                    <Input
                        type="color"
                        className="w-8 h-8 p-0 border-0"
                        value={color || "#e5e7eb"}
                        onChange={(e) => setProp((props: DividerProps) => props.color = e.target.value)}
                    />
                    <Input
                        className="flex-1"
                        value={color || "#e5e7eb"}
                        onChange={(e) => setProp((props: DividerProps) => props.color = e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-1">
                <Label className="text-xs">Estilo</Label>
                <Select value={style || "solid"} onValueChange={(v) => setProp((props: DividerProps) => props.style = v as any)}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="solid">Sólido</SelectItem>
                        <SelectItem value="dashed">Guiones (Dashed)</SelectItem>
                        <SelectItem value="dotted">Puntos (Dotted)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

Divider.craft = {
    displayName: "Separador",
    props: {
        height: 1,
        color: "#e5e7eb",
        margin: 20,
        width: "100%",
        style: "solid"
    },
    related: {
        settings: DividerSettings
    }
}
