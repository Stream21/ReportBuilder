import React from "react"
import { useNode } from "@craftjs/core"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export const GridSettings = () => {
    const {
        actions: { setProp },
        columns,
        rows,
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
    } = useNode((node) => ({
        columns: node.data.props.columns || 1,
        rows: node.data.props.rows || 1,
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
    }))

    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase text-muted-foreground pb-2 border-b">
                    <TooltipProvider delayDuration={0}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="cursor-help decoration-dashed underline-offset-4 decoration-muted-foreground/30 hover:underline">Cuadrícula (Grid)</span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Grid Layout</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </h4>

                <div className="space-y-3 pt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                    {/* Columnas */}
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
                                setProp((props: any) => (props.columns = val))
                            }}
                        />
                        <div className="flex justify-between gap-1 pt-1">
                            {[1, 2, 3, 4, 6, 12].map(num => (
                                <button
                                    key={num}
                                    className={`h-6 w-6 rounded text-[10px] font-medium border transition-colors ${columns === num ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-accent border-input"}`}
                                    onClick={() => {
                                        setProp((props: any) => props.columns = num)
                                    }}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Filas */}
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
                                setProp((props: any) => (props.rows = val))
                            }}
                        />
                        <div className="flex justify-between gap-1 pt-1">
                            {[1, 2, 3, 4].map(num => (
                                <button
                                    key={num}
                                    className={`h-6 w-6 rounded text-[10px] font-medium border transition-colors ${rows === num ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-accent border-input"}`}
                                    onClick={() => {
                                        setProp((props: any) => props.rows = num)
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
                            Ajusta filas y columnas para definir la estructura.
                        </p>
                    </div>
                </div>

                {/* Spacing */}
                <div className="space-y-1">
                    <Label className="text-xs">Espaciado (Spacing)</Label>
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

                {/* Margins */}
                <div className="space-y-2 pt-2">
                    <Label className="text-xs font-semibold">Márgenes (Margins)</Label>
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
        </div >
    )
}
