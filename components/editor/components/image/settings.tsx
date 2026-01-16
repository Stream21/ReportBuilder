import React from "react"
import { useNode } from "@craftjs/core"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

// Ideally export ImageProps from index
// For now duplicating or using any if needed, but best practice is export/import.
// Let's rely on loose typing here for speed without circularity issues if index imports settings.

export const ImageSettings = () => {
    const { src, width, height, actions: { setProp } } = useNode((node) => ({
        src: node.data.props.src,
        width: node.data.props.width,
        height: node.data.props.height,
    }))

    return (
        <div className="space-y-4">
            <div className="space-y-1">
                <Label className="text-xs">URL Imagen</Label>
                <Input
                    value={src || ""}
                    onChange={(e) => setProp((props: any) => props.src = e.target.value)}
                    placeholder="https://..."
                />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                    <Label className="text-xs">Ancho (px)</Label>
                    <Input
                        type="number"
                        value={width || ""}
                        onChange={(e) => setProp((props: any) => props.width = parseInt(e.target.value))}
                    />
                </div>
                <div className="space-y-1">
                    <Label className="text-xs">Alto (px)</Label>
                    <Input
                        type="number"
                        value={height || ""}
                        onChange={(e) => setProp((props: any) => props.height = parseInt(e.target.value))}
                    />
                </div>
            </div>
        </div>
    )
}
