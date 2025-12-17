
"use client"

// ... imports ...
import React from "react"
import { useNode, useEditor } from "@craftjs/core"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface FooterProps {
  children?: React.ReactNode
  visible?: boolean
  height?: string
  padding?: number
  gap?: number
  flexDirection?: "row" | "column"
  alignItems?: "flex-start" | "center" | "flex-end"
  justifyContent?: "flex-start" | "center" | "flex-end" | "space-between"
}

export function Footer({
  children,
  visible = true,
  height = "auto",
  padding = 24,
  gap = 10,
  flexDirection = "column",
  alignItems = "flex-start",
  justifyContent = "flex-start"
}: FooterProps) {
  const {
    connectors: { connect, drag },
  } = useNode()

  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }))

  if (!visible) {
    return (
      <div
        ref={(ref) => { if (ref) connect(drag(ref)) }}
        className="hidden-footer p-2 border border-dashed border-gray-300 bg-gray-50 text-xs text-gray-400 text-center mt-4 select-none"
      >
        Pie de Página Oculto
      </div>
    )
  }

  return (
    <div
      ref={(ref) => { if (ref) connect(drag(ref)) }}
      className="w-full mt-4 relative group"
      style={{
        minHeight: "80px",
        height: height,
        display: "flex",
        flexDirection,
        alignItems,
        justifyContent,
        padding: `${padding}px`,
        gap: `${gap}px`
      }}
    >
      <div className={`h-full w-full ${enabled ? "empty:p-4 empty:border-2 empty:border-dashed empty:border-gray-200 empty:rounded-lg empty:text-center empty:before:content-['Arrastra_elementos_aquí'] empty:before:text-gray-400" : ""}`}>
        {children}
      </div>
    </div>
  )
}

const FooterSettings = () => {
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
            onCheckedChange={(v) => setProp((props: FooterProps) => props.visible = v)}
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label className="text-xs">Altura (Recomendado %)</Label>
        <Input
          className="h-8"
          placeholder="Ej: 10%"
          value={height || "auto"}
          onChange={(e) => setProp((props: FooterProps) => props.height = e.target.value)}
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
            onChange={(e) => setProp((props: FooterProps) => props.gap = Number(e.target.value))}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Relleno (Padding)</Label>
          <Input
            type="number"
            className="h-8"
            value={padding || 0}
            onChange={(e) => setProp((props: FooterProps) => props.padding = Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  )
}

Footer.craft = {
  displayName: "Footer",
  props: {
    visible: true,
    height: "auto",
    padding: 24,
    gap: 10
  },
  rules: {
    canDrag: () => false,
    canDelete: () => false,
    canMoveIn: () => true,
  },
  related: {
    settings: FooterSettings
  }
}
