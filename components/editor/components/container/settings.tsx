import React from "react"
import { useNode } from "@craftjs/core"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export const ContainerSettings = () => {
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
        minHeight,
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
        minHeight: node.data.props.minHeight || "50px",
        displayName: node.data.custom?.displayName || "",
    }))

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
                            onValueChange={(value) => setProp((props: any) => (props.flexDirection = value))}
                        >
                            <SelectTrigger className="h-8 max-w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="row">Horizontal</SelectItem>
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
                            onValueChange={(value) => setProp((props: any) => (props.flexWrap = value))}
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
                            onValueChange={(value) => setProp((props: any) => (props.justifyContent = value))}
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
                            onValueChange={(value) => setProp((props: any) => (props.alignItems = value))}
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
                            onChange={(e) => setProp((props: any) => (props.flexGrow = Number(e.target.value)))}
                        />
                        <span className="text-[10px] text-muted-foreground leading-tight truncate">
                            0=Fijo, 1=Ocupar espacio
                        </span>
                    </div>
                </div>

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
                                onChange={(e) => setProp((props: any) => (props.gap = Number(e.target.value)))}
                            />
                        </div>
                        <div className="relative">
                            <Label className="text-[10px] text-muted-foreground absolute -top-4 left-0">Padding</Label>
                            <Input
                                type="number"
                                className="h-8"
                                min={0}
                                value={padding || 0}
                                onChange={(e) => setProp((props: any) => (props.padding = Number(e.target.value)))}
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
                                onChange={(e) => setProp((props: any) => (props.marginTop = Number(e.target.value)))}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] text-muted-foreground">Derecha (Right)</Label>
                            <Input
                                type="number"
                                className="h-8 text-xs"
                                min={0}
                                value={marginRight}
                                onChange={(e) => setProp((props: any) => (props.marginRight = Number(e.target.value)))}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] text-muted-foreground">Abajo (Bottom)</Label>
                            <Input
                                type="number"
                                className="h-8 text-xs"
                                min={0}
                                value={marginBottom}
                                onChange={(e) => setProp((props: any) => (props.marginBottom = Number(e.target.value)))}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] text-muted-foreground">Izquierda (Left)</Label>
                            <Input
                                type="number"
                                className="h-8 text-xs"
                                min={0}
                                value={marginLeft}
                                onChange={(e) => setProp((props: any) => (props.marginLeft = Number(e.target.value)))}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase text-muted-foreground pb-2 border-b">Tamaño (Size)</h4>
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <Label className="text-xs">Ancho (Width)</Label>
                        <Input
                            className="h-8"
                            placeholder="100%, 200px..."
                            value={width || "100%"}
                            onChange={(e) => setProp((props: any) => (props.width = e.target.value))}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Alto (Height)</Label>
                        <Input
                            className="h-8"
                            placeholder="auto, 50px..."
                            value={height || "auto"}
                            onChange={(e) => setProp((props: any) => (props.height = e.target.value))}
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <Label className="text-xs">Altura Mínima (Min Height)</Label>
                    <Input
                        className="h-8"
                        placeholder="50px"
                        value={minHeight || "50px"}
                        onChange={(e) => setProp((props: any) => (props.minHeight = e.target.value))}
                    />
                </div>

                {displayName && displayName.includes("Body") && (
                    <div className="pt-2">
                        <p className="text-[10px] text-blue-500 font-medium bg-blue-50 p-2 rounded border border-blue-100 dark:bg-blue-950/30 dark:border-blue-800">
                            ℹ️ Body: Si usas altura fija, pon "Flex Grow" a 0.
                        </p>
                    </div>
                )}
            </div>

            <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase text-muted-foreground pb-2 border-b">Estilo (Style)</h4>

                <div className="space-y-1">
                    <Label className="text-xs">Color Fondo (Background)</Label>
                    <div className="flex gap-2">
                        <div className="relative w-8 h-8 rounded border overflow-hidden shrink-0">
                            <Input
                                type="color"
                                className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 p-0 border-0 cursor-pointer"
                                value={backgroundColor || "transparent"}
                                onChange={(e) => setProp((props: any) => (props.backgroundColor = e.target.value))}
                            />
                        </div>
                        <Input
                            type="text"
                            className="h-8 text-xs flex-1"
                            placeholder="Transparent"
                            value={backgroundColor || ""}
                            onChange={(e) => setProp((props: any) => (props.backgroundColor = e.target.value))}
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <Label className="text-xs">Sombra (Shadow)</Label>
                    <Select
                        value={boxShadow || "none"}
                        onValueChange={(value) => setProp((props: any) => (props.boxShadow = value))}
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
                                    onChange={(e) => setProp((props: any) => (props.borderColor = e.target.value))}
                                />
                            </div>
                            <Input
                                type="text"
                                className="h-8 text-xs flex-1 min-w-0"
                                placeholder="None"
                                value={borderColor || ""}
                                onChange={(e) => setProp((props: any) => (props.borderColor = e.target.value))}
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Grosor (Width px)</Label>
                        <Input
                            type="number"
                            className="h-8"
                            value={borderWidth || 0}
                            onChange={(e) => setProp((props: any) => (props.borderWidth = Number(e.target.value)))}
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
                        onChange={(e) => setProp((props: any) => (props.borderRadius = Number(e.target.value)))}
                    />
                </div>
            </div>
        </div >
    )
}
