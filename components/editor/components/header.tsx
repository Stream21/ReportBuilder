
"use client"

import { useNode, useEditor } from "@craftjs/core"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import React from "react"

interface HeaderProps {
  children?: React.ReactNode
  visible?: boolean
  height?: string
  padding?: number
  gap?: number
  flexDirection?: "row" | "column"
  alignItems?: "flex-start" | "center" | "flex-end"
  justifyContent?: "flex-start" | "center" | "flex-end" | "space-between"
}

export function Header({
  children,
  visible = true,
  height = "auto",
  padding = 24,
  gap = 10,
  flexDirection = "column",
  alignItems = "flex-start",
  justifyContent = "flex-start"
}: HeaderProps) {
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
        className="hidden-header p-2 border border-dashed border-gray-300 bg-gray-50 text-xs text-gray-400 text-center mb-4 select-none"
      >
        Cabecera Oculta (Visible en impresión si se activa)
      </div>
    )
  }

  return (
    <div
      ref={(ref) => { if (ref) connect(drag(ref)) }}
      className="w-full mb-4 relative group"
      style={{
        minHeight: "100px",
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

const HeaderSettings = () => {
  const { visible, height, padding, gap, flexDirection, actions: { setProp } } = useNode((node) => ({
    visible: node.data.props.visible,
    height: node.data.props.height,
    padding: node.data.props.padding,
    gap: node.data.props.gap,
    flexDirection: node.data.props.flexDirection
  }))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="header-visible">Mostrar Cabecera</Label>
        <Switch
          id="header-visible"
          checked={visible}
          onCheckedChange={(v) => setProp((props: HeaderProps) => props.visible = v)}
        />
      </div>

      <div className="space-y-1">
        <Label className="text-xs">Altura (Recomendado %)</Label>
        <Input
          className="h-8"
          placeholder="Ej: 15%"
          value={height || "auto"}
          onChange={(e) => setProp((props: HeaderProps) => props.height = e.target.value)}
        />
        <p className="text-[10px] text-muted-foreground mt-1">
          Header + Body + Footer = 100%
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2 border-t">
        <div className="space-y-1">
          <Label className="text-xs">Espaciado (Gap)</Label>
          <Input
            type="number"
            className="h-8"
            value={gap || 0}
            onChange={(e) => setProp((props: HeaderProps) => props.gap = Number(e.target.value))}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Relleno (Padding)</Label>
          <Input
            type="number"
            className="h-8"
            value={padding || 0}
            onChange={(e) => setProp((props: HeaderProps) => props.padding = Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  )
}

Header.craft = {
  displayName: "Header",
  props: {
    visible: true,
    padding: 24,
    gap: 10,
    flexDirection: "column"
  },
  rules: {
    canDrag: () => false,
    canDelete: () => false,
    canMoveIn: () => true,
  },
  related: {
    settings: HeaderSettings
  }
}
