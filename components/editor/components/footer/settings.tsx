import React from "react"
import { useNode } from "@craftjs/core"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

// We can export interface from index later or define it here if needed, 
// for now using any to avoid circular dependency complex if interface is not exported.
// But ideally we should export/import interfaces properly. Let's assume standard usage.

export const FooterSettings = () => {
    const { visible, height, padding, gap, actions: { setProp } } = useNode((node) => ({
        visible: node.data.props.visible,
        height: node.data.props.height,
        padding: node.data.props.padding,
        gap: node.data.props.gap
    }))

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor="footer-visible">Mostrar Pie</Label>
                    <Switch
                        id="footer-visible"
                        checked={visible}
                        onCheckedChange={(v) => setProp((props: any) => props.visible = v)}
                    />
                </div>
            </div>

            <div className="space-y-1">
                <Label className="text-xs">Altura (Recomendado %)</Label>
                <Input
                    className="h-8"
                    placeholder="Ej: 10%"
                    value={height || "auto"}
                    onChange={(e) => setProp((props: any) => props.height = e.target.value)}
                />
                <p className="text-[10px] text-muted-foreground mt-1">
                    Header + Body + Footer = 100%.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                <div className="space-y-1">
                    <Label className="text-xs">Espaciado (Gap)</Label>
                    <Input
                        type="number"
                        className="h-8"
                        value={gap || 0}
                        onChange={(e) => setProp((props: any) => props.gap = Number(e.target.value))}
                    />
                </div>
                <div className="space-y-1">
                    <Label className="text-xs">Relleno (Padding)</Label>
                    <Input
                        type="number"
                        className="h-8"
                        value={padding || 0}
                        onChange={(e) => setProp((props: any) => props.padding = Number(e.target.value))}
                    />
                </div>
            </div>
        </div>
    )
}
