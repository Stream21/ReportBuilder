import React from "react"
import { useNode } from "@craftjs/core"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash, Columns, Rows } from "lucide-react"

export const TableSettings = () => {
    const {
        actions: { setProp },
        headerBgColor,
        headerTextColor,
        borderColor,
        fontSize,
        padding,
        rowBgColor,
        alternateRowColor
    } = useNode((node) => ({
        headerBgColor: node.data.props.headerBgColor,
        headerTextColor: node.data.props.headerTextColor,
        borderColor: node.data.props.borderColor,
        fontSize: node.data.props.fontSize,
        padding: node.data.props.padding,
        rowBgColor: node.data.props.rowBgColor,
        alternateRowColor: node.data.props.alternateRowColor,
    }))

    const addRow = () => {
        setProp((props: any) => {
            const cols = props.data ? props.data[0].length : 4
            const newRow = Array(cols).fill("...")
            props.data = [...(props.data || []), newRow]
        })
    }

    const removeRow = () => {
        setProp((props: any) => {
            if (props.data && props.data.length > 2) {
                props.data = props.data.slice(0, -1)
            }
        })
    }

    const addColumn = () => {
        setProp((props: any) => {
            if (props.data) {
                props.data = props.data.map((row: string[]) => [...row, "..."])
            }
        })
    }

    const removeColumn = () => {
        setProp((props: any) => {
            if (props.data && props.data[0].length > 1) {
                props.data = props.data.map((row: string[]) => row.slice(0, -1))
            }
        })
    }

    return (
        <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase text-muted-foreground pb-2 border-b">Estructura</h4>
            <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={addRow} className="justify-start">
                    <Plus className="w-4 h-4 mr-2" /> Fila
                </Button>
                <Button variant="outline" size="sm" onClick={removeRow} className="justify-start text-destructive hover:text-destructive">
                    <Trash className="w-4 h-4 mr-2" /> Fila
                </Button>
                <Button variant="outline" size="sm" onClick={addColumn} className="justify-start">
                    <Columns className="w-4 h-4 mr-2" /> Columna
                </Button>
                <Button variant="outline" size="sm" onClick={removeColumn} className="justify-start text-destructive hover:text-destructive">
                    <Trash className="w-4 h-4 mr-2" /> Columna
                </Button>
            </div>

            <h4 className="text-xs font-semibold uppercase text-muted-foreground pb-2 border-b mt-4">Estilos</h4>

            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <Label className="text-xs">Tamaño Fuente</Label>
                    <Input
                        type="number"
                        value={fontSize || 12}
                        onChange={(e) => setProp((props: any) => props.fontSize = Number(e.target.value))}
                    />
                </div>
                <div className="space-y-1">
                    <Label className="text-xs">Padding Celda</Label>
                    <Input
                        type="number"
                        value={padding || 8}
                        onChange={(e) => setProp((props: any) => props.padding = Number(e.target.value))}
                    />
                </div>
            </div>

            <div className="space-y-1">
                <Label className="text-xs">Fondo Cabecera</Label>
                <div className="flex gap-2">
                    <Input type="color" className="w-8 h-8 p-0 border-0" value={headerBgColor} onChange={(e) => setProp((props: any) => props.headerBgColor = e.target.value)} />
                    <Input className="flex-1" value={headerBgColor} onChange={(e) => setProp((props: any) => props.headerBgColor = e.target.value)} />
                </div>
            </div>
            <div className="space-y-1">
                <Label className="text-xs">Texto Cabecera</Label>
                <div className="flex gap-2">
                    <Input type="color" className="w-8 h-8 p-0 border-0" value={headerTextColor} onChange={(e) => setProp((props: any) => props.headerTextColor = e.target.value)} />
                    <Input className="flex-1" value={headerTextColor} onChange={(e) => setProp((props: any) => props.headerTextColor = e.target.value)} />
                </div>
            </div>

            <div className="space-y-1">
                <Label className="text-xs">Fondo Fila (Impar)</Label>
                <div className="flex gap-2">
                    <Input type="color" className="w-8 h-8 p-0 border-0" value={rowBgColor} onChange={(e) => setProp((props: any) => props.rowBgColor = e.target.value)} />
                    <Input className="flex-1" value={rowBgColor} onChange={(e) => setProp((props: any) => props.rowBgColor = e.target.value)} />
                </div>
            </div>
            <div className="space-y-1">
                <Label className="text-xs">Fondo Fila (Par)</Label>
                <div className="flex gap-2">
                    <Input type="color" className="w-8 h-8 p-0 border-0" value={alternateRowColor} onChange={(e) => setProp((props: any) => props.alternateRowColor = e.target.value)} />
                    <Input className="flex-1" value={alternateRowColor} onChange={(e) => setProp((props: any) => props.alternateRowColor = e.target.value)} />
                </div>
            </div>

            <div className="space-y-1">
                <Label className="text-xs">Color Bordes</Label>
                <div className="flex gap-2">
                    <Input type="color" className="w-8 h-8 p-0 border-0" value={borderColor} onChange={(e) => setProp((props: any) => props.borderColor = e.target.value)} />
                    <Input className="flex-1" value={borderColor} onChange={(e) => setProp((props: any) => props.borderColor = e.target.value)} />
                </div>
            </div>

        </div>
    )
}
