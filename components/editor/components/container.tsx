"use client"

import type React from "react"
import { useNode } from "@craftjs/core"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ContainerProps {
  children?: React.ReactNode
  flexDirection?: "row" | "column"
  flexWrap?: "nowrap" | "wrap"
  justifyContent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around"
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch"
  flexGrow?: number
  gap?: number
  padding?: number
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
  width?: string
  height?: string
  backgroundColor?: string
  borderColor?: string
  borderWidth?: number
  borderRadius?: number
  boxShadow?: "none" | "sm" | "md" | "lg"
  canvas?: boolean
}

export function Container({
  children,
  flexDirection = "column",
  flexWrap = "nowrap",
  justifyContent = "flex-start",
  alignItems = "flex-start",
  flexGrow = 0,
  gap = 10,
  padding = 10,
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  width = "100%",
  height = "auto",
  backgroundColor = "transparent",
  borderColor = "transparent",
  borderWidth = 0,
  borderRadius = 0,
  boxShadow = "none",
}: ContainerProps) {
  const {
    connectors: { connect, drag },
  } = useNode()

  const getShadow = (shadow: string) => {
    switch (shadow) {
      case "sm": return "0 1px 2px 0 rgb(0 0 0 / 0.05)"
      case "md": return "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
      case "lg": return "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
      default: return "none"
    }
  }

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref))
      }}
      style={{
        display: "flex",
        flexDirection,
        flexWrap,
        justifyContent,
        alignItems,
        flexGrow,
        gap: `${gap}px`,
        padding: `${padding}px`,
        marginTop: `${marginTop}px`,
        marginBottom: `${marginBottom}px`,
        marginLeft: `${marginLeft}px`,
        marginRight: `${marginRight}px`,
        width,
        height,
        backgroundColor,
        border: `${borderWidth}px solid ${borderColor}`,
        borderRadius: `${borderRadius}px`,
        boxShadow: getShadow(boxShadow), // Mapeo simple de sombras
        minHeight: "50px",
        position: "relative",
      }}
    >
      {children}
    </div>
  )
}

const ContainerSettings = () => {
  const {
    actions: { setProp },
    flexDirection,
    justifyContent,
    alignItems,
    flexWrap,
    flexGrow,
    gap,
    padding,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    width,
    height,
    backgroundColor,
    borderColor,
    borderWidth,
    borderRadius,
    boxShadow,
    displayName,
  } = useNode((node) => ({
    flexDirection: node.data.props.flexDirection || "column",
    justifyContent: node.data.props.justifyContent || "flex-start",
    alignItems: node.data.props.alignItems || "flex-start",
    flexWrap: node.data.props.flexWrap || "nowrap",
    flexGrow: node.data.props.flexGrow || 0,
    gap: node.data.props.gap || 0,
    padding: node.data.props.padding || 0,
    marginTop: node.data.props.marginTop || 0,
    marginBottom: node.data.props.marginBottom || 0,
    marginLeft: node.data.props.marginLeft || 0,
    marginRight: node.data.props.marginRight || 0,
    width: node.data.props.width || "100%",
    height: node.data.props.height || "auto",
    backgroundColor: node.data.props.backgroundColor || "transparent",
    borderColor: node.data.props.borderColor || "transparent",
    borderWidth: node.data.props.borderWidth || 0,
    borderRadius: node.data.props.borderRadius || 0,
    boxShadow: node.data.props.boxShadow || "none",
    displayName: node.data.custom?.displayName || "",
  }))

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase text-muted-foreground pb-2 border-b">Layout</h4>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs">Dirección</Label>
            <Select
              value={flexDirection || "column"}
              onValueChange={(value) => setProp((props: ContainerProps) => (props.flexDirection = value as any))}
            >
              <SelectTrigger className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="row">Horizontal (Row)</SelectItem>
                <SelectItem value="column">Vertical (Col)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Wrap</Label>
            <Select
              value={flexWrap || "nowrap"}
              onValueChange={(value) => setProp((props: ContainerProps) => (props.flexWrap = value as any))}
            >
              <SelectTrigger className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nowrap">No Wrap</SelectItem>
                <SelectItem value="wrap">Wrap</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs">Justify Content</Label>
            <Select
              value={justifyContent || "flex-start"}
              onValueChange={(value) => setProp((props: ContainerProps) => (props.justifyContent = value as any))}
            >
              <SelectTrigger className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flex-start">Inicio (Start)</SelectItem>
                <SelectItem value="center">Centro (Center)</SelectItem>
                <SelectItem value="flex-end">Final (End)</SelectItem>
                <SelectItem value="space-between">Espacio Entre</SelectItem>
                <SelectItem value="space-around">Espacio Alrededor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Align Items</Label>
            <Select
              value={alignItems || "flex-start"}
              onValueChange={(value) => setProp((props: ContainerProps) => (props.alignItems = value as any))}
            >
              <SelectTrigger className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flex-start">Inicio (Start)</SelectItem>
                <SelectItem value="center">Centro (Center)</SelectItem>
                <SelectItem value="flex-end">Final (End)</SelectItem>
                <SelectItem value="stretch">Estirar (Stretch)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-1">
          <Label className="text-xs">Flex Grow (Expansión)</Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              className="h-8 w-24"
              min={0}
              max={10}
              value={flexGrow || 0}
              onChange={(e) => setProp((props: ContainerProps) => (props.flexGrow = Number(e.target.value)))}
            />
            <span className="text-[10px] text-muted-foreground leading-tight">
              0=Fijo, 1=Auto
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <Label className="text-xs">Padding (px)</Label>
          <Input
            type="number"
            className="h-8"
            min={0}
            value={padding || 0}
            onChange={(e) => setProp((props: ContainerProps) => (props.padding = Number(e.target.value)))}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold">Márgenes (px)</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground">Arriba</Label>
              <Input
                type="number"
                className="h-8 text-xs"
                min={0}
                value={marginTop}
                onChange={(e) => setProp((props: ContainerProps) => (props.marginTop = Number(e.target.value)))}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground">Derecha</Label>
              <Input
                type="number"
                className="h-8 text-xs"
                min={0}
                value={marginRight}
                onChange={(e) => setProp((props: ContainerProps) => (props.marginRight = Number(e.target.value)))}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground">Abajo</Label>
              <Input
                type="number"
                className="h-8 text-xs"
                min={0}
                value={marginBottom}
                onChange={(e) => setProp((props: ContainerProps) => (props.marginBottom = Number(e.target.value)))}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground">Izquierda</Label>
              <Input
                type="number"
                className="h-8 text-xs"
                min={0}
                value={marginLeft}
                onChange={(e) => setProp((props: ContainerProps) => (props.marginLeft = Number(e.target.value)))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase text-muted-foreground pb-2 border-b">Dimensiones</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs">Ancho</Label>
            <Input
              className="h-8"
              placeholder="100%, 200px..."
              value={width || "100%"}
              onChange={(e) => setProp((props: ContainerProps) => (props.width = e.target.value))}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Alto</Label>
            <Input
              className="h-8"
              placeholder="auto, 50px..."
              value={height || "auto"}
              onChange={(e) => setProp((props: ContainerProps) => (props.height = e.target.value))}
            />
          </div>
        </div>
        {/* Mensaje especial para el Body */}
        {displayName && displayName.includes("Body") && (
          <div className="pt-2">
            <p className="text-[10px] text-blue-500 font-medium bg-blue-50 p-2 rounded border border-blue-100 dark:bg-blue-950/30 dark:border-blue-800">
              ℹ️ Si estableces una altura fija (ej: 70%), recuerda ajustar "Flex Grow" a 0.
              <br />
              Header + Body + Footer = 100%.
            </p>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase text-muted-foreground pb-2 border-b">Apariencia</h4>

        <div className="space-y-1">
          <Label className="text-xs">Color Fondo</Label>
          <div className="flex gap-2">
            <div className="relative w-8 h-8 rounded border overflow-hidden shrink-0">
              <Input
                type="color"
                className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 p-0 border-0 cursor-pointer"
                value={backgroundColor || "transparent"}
                onChange={(e) => setProp((props: ContainerProps) => (props.backgroundColor = e.target.value))}
              />
            </div>
            <Input
              type="text"
              className="h-8 text-xs flex-1"
              placeholder="Transparent"
              value={backgroundColor || ""}
              onChange={(e) => setProp((props: ContainerProps) => (props.backgroundColor = e.target.value))}
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label className="text-xs">Sombra</Label>
          <Select
            value={boxShadow || "none"}
            onValueChange={(value) => setProp((props: ContainerProps) => (props.boxShadow = value as any))}
          >
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Ninguna</SelectItem>
              <SelectItem value="sm">Pequeña</SelectItem>
              <SelectItem value="md">Media</SelectItem>
              <SelectItem value="lg">Grande</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs">Color Borde</Label>
            <div className="flex gap-2">
              <div className="relative w-8 h-8 rounded border overflow-hidden shrink-0">
                <Input
                  type="color"
                  className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 p-0 border-0 cursor-pointer"
                  value={borderColor || "transparent"}
                  onChange={(e) => setProp((props: ContainerProps) => (props.borderColor = e.target.value))}
                />
              </div>
              {/* Ocultamos el hex del borde para ahorrar espacio si es muy estrecho, o usamos flex-1 */}
              <Input
                type="text"
                className="h-8 text-xs flex-1 min-w-0"
                placeholder="None"
                value={borderColor || ""}
                onChange={(e) => setProp((props: ContainerProps) => (props.borderColor = e.target.value))}
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Grosor (px)</Label>
            <Input
              type="number"
              className="h-8"
              value={borderWidth || 0}
              onChange={(e) => setProp((props: ContainerProps) => (props.borderWidth = Number(e.target.value)))}
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label className="text-xs">Radio (Border Radius px)</Label>
          <Input
            type="number"
            className="h-8"
            min={0}
            value={borderRadius || 0}
            onChange={(e) => setProp((props: ContainerProps) => (props.borderRadius = Number(e.target.value)))}
          />
        </div>
      </div>
    </div>
  )
}

Container.craft = {
  displayName: "Container",
  props: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 10,
    padding: 10,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: "transparent",
    boxShadow: "none"
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => true,
    canDelete: (node) => {
      const name = node.data.custom?.displayName
      return name !== "Body (Cuerpo)" && name !== "Documento General"
    }
  },
  related: {
    settings: ContainerSettings,
  },
}
