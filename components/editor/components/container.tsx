"use client"

import type React from "react"
import { useNode, useEditor, Element } from "@craftjs/core"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
  layout?: "flex" | "grid"
  columns?: number
  rows?: number
  minHeight?: string
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
  layout = "flex",
  columns = 1,
  rows = 1,
  minHeight = "50px",
}: ContainerProps) {
  const {
    connectors: { connect, drag },
  } = useNode()

  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }))

  const getShadow = (shadow: string) => {
    switch (shadow) {
      case "sm": return "0 1px 2px 0 rgb(0 0 0 / 0.05)"
      case "md": return "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
      case "lg": return "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
      default: return "none"
    }
  }

  // Estilos base comunes
  const baseStyles: React.CSSProperties = {
    gap: `${gap}px`,
    padding: `${padding}px`,
    marginTop: `${marginTop}px`,
    marginBottom: `${marginBottom}px`,
    marginLeft: `${marginLeft}px`,
    marginRight: `${marginRight}px`,
    width,
    height,
    border: `${borderWidth}px solid ${borderColor}`,
    borderRadius: `${borderRadius}px`,
    boxShadow: getShadow(boxShadow),
    minHeight,
    position: "relative",
    // Visual cues for editor - ONLY when enabled
    outline: enabled && (borderWidth === 0 || layout === "grid") ? "1px dashed #94a3b8" : "none", // Slate-400
    backgroundColor: (enabled && backgroundColor === "transparent" && layout === "grid") ? "#f1f5f9" : backgroundColor, // Slate-100
    overflow: "hidden", // Asegura que el contenido respete los bordes redondeados
  }

  // Estilos específicos para Flex vs Grid
  const layoutStyles: React.CSSProperties = layout === "grid"
    ? {
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
    }
    : {
      display: "flex",
      flexDirection,
      flexWrap,
      justifyContent,
      alignItems,
      flexGrow,
    }

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref))
      }}
      style={{
        ...baseStyles,
        ...layoutStyles,
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
    layout,
    columns,
    rows,
    minHeight,

    displayName,
    nodeId,
    childNodes,
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
    layout: node.data.props.layout || "flex",
    columns: node.data.props.columns || 1,
    rows: node.data.props.rows || 1,
    minHeight: node.data.props.minHeight || "50px",
    displayName: node.data.custom?.displayName || "",
    nodeId: node.id,
    childNodes: node.data.nodes,
  }))

  const { actions, query } = useEditor()

  const handleAutoGenerateCells = (newCols: number = 1, newRows: number = 1) => {
    const totalCells = newCols * newRows
    const currentCells = childNodes.length

    if (currentCells < totalCells) {
      const needed = totalCells - currentCells

      // Create generic container elements
      // We need to parse a React Element into a Node Tree for Craft.js to add it properly
      for (let i = 0; i < needed; i++) {
        const nodeTree = query.parseReactElement(
          <Element
            canvas
            is={Container}
            padding={10}
            minHeight="80px"
            backgroundColor="#ffffff"
            borderColor="#e2e8f0"
            borderWidth={1}
            borderRadius={4}
          />
        ).toNodeTree()

        const rootNode = nodeTree.nodes[nodeTree.rootNodeId]
        if (rootNode) {
          rootNode.data.parent = nodeId // Ensure parent is set
          actions.add(rootNode, nodeId)
        }
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase text-muted-foreground pb-2 border-b">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-help decoration-dashed underline-offset-4 decoration-muted-foreground/30 hover:underline">Distribución (Layout)</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Layout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h4>



        {layout === "grid" ? (
          <div className="space-y-3 pt-2 animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Columnas (Columns)</Label>
                <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-0.5 rounded">{columns}</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                step="1"
                className="w-full"
                value={columns || 1}
                onChange={(e) => {
                  const val = Number(e.target.value)
                  setProp((props: ContainerProps) => (props.columns = val))
                  handleAutoGenerateCells(val, rows)
                }}
              />
              <div className="flex justify-between gap-1 pt-1">
                {[1, 2, 3, 4, 6, 12].map(num => (
                  <button
                    key={num}
                    className={`h-6 w-6 rounded text-[10px] font-medium border transition-colors ${columns === num ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-accent border-input"}`}
                    onClick={() => {
                      setProp((props: ContainerProps) => props.columns = num)
                      handleAutoGenerateCells(num, rows)
                    }}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Filas (Rows)</Label>
                <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-0.5 rounded">{rows}</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                step="1"
                className="w-full"
                value={rows || 1}
                onChange={(e) => {
                  const val = Number(e.target.value)
                  setProp((props: ContainerProps) => (props.rows = val))
                  handleAutoGenerateCells(columns, val)
                }}
              />
              <div className="flex justify-between gap-1 pt-1">
                {[1, 2, 3, 4].map(num => (
                  <button
                    key={num}
                    className={`h-6 w-6 rounded text-[10px] font-medium border transition-colors ${rows === num ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-accent border-input"}`}
                    onClick={() => {
                      setProp((props: ContainerProps) => props.rows = num)
                      handleAutoGenerateCells(columns, num)
                    }}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 pb-1">
              <p className="text-[10px] text-muted-foreground bg-muted/50 p-2 rounded border border-border/50">
                <span className="font-semibold block mb-1">💡 Info:</span>
                Al ajustar filas o columnas, se crearán automáticamente los contenedores necesarios para rellenar la cuadrícula.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs truncate block" title="Dirección">
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help hover:underline decoration-dashed underline-offset-2">Dirección (Direction)</span>
                      </TooltipTrigger>
                      <TooltipContent><p>Direction</p></TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Select
                  value={flexDirection || "column"}
                  onValueChange={(value) => setProp((props: ContainerProps) => (props.flexDirection = value as any))}
                >
                  <SelectTrigger className="h-8 max-w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="row">Horizontal</SelectItem> // Shortened labels
                    <SelectItem value="column">Vertical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="text-xs truncate block" title="Salto de Línea">
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help hover:underline decoration-dashed underline-offset-2">Salto de Línea (Wrap)</span>
                      </TooltipTrigger>
                      <TooltipContent><p>Wrap</p></TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Select
                  value={flexWrap || "nowrap"}
                  onValueChange={(value) => setProp((props: ContainerProps) => (props.flexWrap = value as any))}
                >
                  <SelectTrigger className="h-8 max-w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nowrap">No permitir</SelectItem>
                    <SelectItem value="wrap">Permitir</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs truncate block" title="Alineación Horizontal">
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help hover:underline decoration-dashed underline-offset-2">Alin. Horiz. (Justify)</span>
                      </TooltipTrigger>
                      <TooltipContent><p>Justify Content</p></TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Select
                  value={justifyContent || "flex-start"}
                  onValueChange={(value) => setProp((props: ContainerProps) => (props.justifyContent = value as any))}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flex-start">Inicio</SelectItem>
                    <SelectItem value="center">Centro</SelectItem>
                    <SelectItem value="flex-end">Final</SelectItem>
                    <SelectItem value="space-between">Separados</SelectItem>
                    <SelectItem value="space-around">Alrededor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="text-xs truncate block" title="Alineación Vertical">
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help hover:underline decoration-dashed underline-offset-2">Alin. Vert. (Align)</span>
                      </TooltipTrigger>
                      <TooltipContent><p>Align Items</p></TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Select
                  value={alignItems || "flex-start"}
                  onValueChange={(value) => setProp((props: ContainerProps) => (props.alignItems = value as any))}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flex-start">Inicio</SelectItem>
                    <SelectItem value="center">Centro</SelectItem>
                    <SelectItem value="flex-end">Final</SelectItem>
                    <SelectItem value="stretch">Estirar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}

        {layout === "flex" && (
          <div className="space-y-1">
            <Label className="text-xs">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-help hover:underline decoration-dashed underline-offset-2">Expandir (Flex Grow)</span>
                  </TooltipTrigger>
                  <TooltipContent><p>Flex Grow</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                className="h-8 w-20"
                min={0}
                max={10}
                value={flexGrow || 0}
                onChange={(e) => setProp((props: ContainerProps) => (props.flexGrow = Number(e.target.value)))}
              />
              <span className="text-[10px] text-muted-foreground leading-tight truncate">
                0=Fijo, 1=Ocupar espacio
              </span>
            </div>
          </div>
        )}

        <div className="space-y-1">
          <Label className="text-xs">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-help hover:underline decoration-dashed underline-offset-2">Separación / Espacio (Gap/Padding)</span>
                </TooltipTrigger>
                <TooltipContent><p>Gap / Padding</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <Label className="text-[10px] text-muted-foreground absolute -top-4 left-0">Gap</Label>
              <Input
                type="number"
                className="h-8"
                min={0}
                value={gap || 0}
                onChange={(e) => setProp((props: ContainerProps) => (props.gap = Number(e.target.value)))}
              />
            </div>
            <div className="relative">
              <Label className="text-[10px] text-muted-foreground absolute -top-4 left-0">Padding</Label>
              <Input
                type="number"
                className="h-8"
                min={0}
                value={padding || 0}
                onChange={(e) => setProp((props: ContainerProps) => (props.padding = Number(e.target.value)))}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <Label className="text-xs font-semibold">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-help hover:underline decoration-dashed underline-offset-2">Márgenes Externos (Margins)</span>
                </TooltipTrigger>
                <TooltipContent><p>Margin</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground">Arriba (Top)</Label>
              <Input
                type="number"
                className="h-8 text-xs"
                min={0}
                value={marginTop}
                onChange={(e) => setProp((props: ContainerProps) => (props.marginTop = Number(e.target.value)))}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground">Derecha (Right)</Label>
              <Input
                type="number"
                className="h-8 text-xs"
                min={0}
                value={marginRight}
                onChange={(e) => setProp((props: ContainerProps) => (props.marginRight = Number(e.target.value)))}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground">Abajo (Bottom)</Label>
              <Input
                type="number"
                className="h-8 text-xs"
                min={0}
                value={marginBottom}
                onChange={(e) => setProp((props: ContainerProps) => (props.marginBottom = Number(e.target.value)))}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground">Izquierda (Left)</Label>
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
        {layout !== "grid" && (
          <h4 className="text-xs font-semibold uppercase text-muted-foreground pb-2 border-b">Tamaño (Size)</h4>
        )}
        {layout !== "grid" && (
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Ancho (Width)</Label>
              <Input
                className="h-8"
                placeholder="100%, 200px..."
                value={width || "100%"}
                onChange={(e) => setProp((props: ContainerProps) => (props.width = e.target.value))}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Alto (Height)</Label>
              <Input
                className="h-8"
                placeholder="auto, 50px..."
                value={height || "auto"}
                onChange={(e) => setProp((props: ContainerProps) => (props.height = e.target.value))}
              />
            </div>
          </div>


        )}

        {/* Solo mostrar Min Height si no es Grid, o si es grid quizás no haga falta si se generan celdas auto */}
        {layout !== "grid" && (
          <div className="space-y-1">
            <Label className="text-xs">Altura Mínima (Min Height)</Label>
            <Input
              className="h-8"
              placeholder="50px"
              value={minHeight || "50px"}
              onChange={(e) => setProp((props: ContainerProps) => (props.minHeight = e.target.value))}
            />
          </div>
        )}

        {/* Mensaje especial para el Body */}
        {displayName && displayName.includes("Body") && (
          <div className="pt-2">
            <p className="text-[10px] text-blue-500 font-medium bg-blue-50 p-2 rounded border border-blue-100 dark:bg-blue-950/30 dark:border-blue-800">
              ℹ️ Body: Si usas altura fija, pon "Flex Grow" a 0.
            </p>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {layout !== "grid" && (
          <>
            <h4 className="text-xs font-semibold uppercase text-muted-foreground pb-2 border-b">Estilo (Style)</h4>

            <div className="space-y-1">
              <Label className="text-xs">Color Fondo (Background)</Label>
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
              <Label className="text-xs">Sombra (Shadow)</Label>
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

            <div className="grid grid-cols-2 gap-3 items-end">
              <div className="space-y-1">
                <Label className="text-xs">Color Borde (Border)</Label>
                <div className="flex gap-2">
                  <div className="relative w-8 h-8 rounded border overflow-hidden shrink-0">
                    <Input
                      type="color"
                      className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 p-0 border-0 cursor-pointer"
                      value={borderColor || "transparent"}
                      onChange={(e) => setProp((props: ContainerProps) => (props.borderColor = e.target.value))}
                    />
                  </div>
                  {/* Min width 0 essential for flex items to truncate in grid */}
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
                <Label className="text-xs">Grosor (Width px)</Label>
                <Input
                  type="number"
                  className="h-8"
                  value={borderWidth || 0}
                  onChange={(e) => setProp((props: ContainerProps) => (props.borderWidth = Number(e.target.value)))}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Radio (Radius px)</Label>
              <Input
                type="number"
                className="h-8"
                min={0}
                value={borderRadius || 0}
                onChange={(e) => setProp((props: ContainerProps) => (props.borderRadius = Number(e.target.value)))}
              />
            </div>
          </>
        )}
      </div>
    </div >
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
    boxShadow: "none",
    layout: "flex",
    columns: 1,
    rows: 1,
    minHeight: "50px"
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => true,
    canDelete: (node: any) => {
      const name = node.data.custom?.displayName
      return name !== "Body (Cuerpo)" && name !== "Documento General"
    }
  },
  related: {
    settings: ContainerSettings,
  },
}
