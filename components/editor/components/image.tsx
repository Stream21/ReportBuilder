"use client"

import { useNode } from "@craftjs/core"

interface ImageProps {
  src?: string
  width?: number
  height?: number
}

export function Image({ src = "/placeholder.svg", width = 200, height = 100 }: ImageProps) {
  const {
    connectors: { connect, drag },
  } = useNode()

  return (
    <img
      ref={(ref) => ref && connect(drag(ref))}
      src={src || "/placeholder.svg"}
      alt="Imagen"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        objectFit: "cover",
        cursor: "move",
      }}
    />
  )
}

// ... (imports)
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

// ... (Image component) ...

const ImageSettings = () => {
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
          onChange={(e) => setProp((props: ImageProps) => props.src = e.target.value)}
          placeholder="https://..."
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label className="text-xs">Ancho (px)</Label>
          <Input
            type="number"
            value={width || ""}
            onChange={(e) => setProp((props: ImageProps) => props.width = parseInt(e.target.value))}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Alto (px)</Label>
          <Input
            type="number"
            value={height || ""}
            onChange={(e) => setProp((props: ImageProps) => props.height = parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
  )
}

Image.craft = {
  displayName: "Image",
  props: {
    src: "/placeholder.svg",
    width: 200,
    height: 100,
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: ImageSettings
  }
}
