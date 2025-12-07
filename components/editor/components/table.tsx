"use client"

import { useNode, useEditor } from "@craftjs/core"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash, Columns, Rows } from "lucide-react"
import ContentEditable from "react-contenteditable"
import React, { useState, useEffect } from "react"

interface TableProps {
  data?: string[][]
  headerBgColor?: string
  headerTextColor?: string
  borderColor?: string
  fontSize?: number
  padding?: number
  fontFamily?: string
  rowBgColor?: string
  alternateRowColor?: string
}

export function Table({
  data = [
    ["Concepto", "Cantidad", "Precio", "Total"],
    ["Servicios", "1", "0.00 €", "0.00 €"],
  ],
  headerBgColor = "#e2e8f0",
  headerTextColor = "#1e293b",
  borderColor = "#cbd5e1",
  fontSize = 12,
  padding = 8,
  fontFamily = "Arial",
  rowBgColor = "#ffffff",
  alternateRowColor = "#f8fafc",
}: TableProps) {
  // ... (hooks) ...
  const {
    connectors: { connect, drag },
    actions: { setProp },
    isActive
  } = useNode((node) => ({
    isActive: node.events.selected
  }))

  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled
  }))

  // Handle cell change
  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    setProp((props: TableProps) => {
      // Deep copy to avoid mutation issues
      const newData = props.data ? [...props.data.map(row => [...row])] : []
      if (newData[rowIndex]) {
        newData[rowIndex][colIndex] = value
      }
      props.data = newData
    }, 500)
  }

  const handleDrop = (e: React.DragEvent, rowIndex: number, colIndex: number) => {
    e.preventDefault()
    e.stopPropagation()
    const variable = e.dataTransfer.getData("variable")
    if (variable) {
      setProp((props: TableProps) => {
        const newData = props.data ? [...props.data.map(row => [...row])] : []
        if (newData[rowIndex]) {
          const currentContent = newData[rowIndex][colIndex] || ""
          newData[rowIndex][colIndex] = currentContent + ` {{ ${variable} }}`
        }
        props.data = newData
      })
    }
  }

  return (
    <div
      ref={(ref) => { if (ref) connect(drag(ref)) }}
      className="w-full overflow-x-auto"
    >
      <table
        className="w-full border-collapse"
        style={{
          cursor: enabled ? "pointer" : "default",
          fontFamily,
          fontSize: `${fontSize}px`,
        }}
      >
        <thead>
          <tr>
            {data[0].map((cell, colIndex) => (
              <th
                key={`header-${colIndex}`}
                style={{
                  border: `1px solid ${borderColor}`,
                  padding: `${padding}px`,
                  textAlign: "left",
                  backgroundColor: headerBgColor,
                  color: headerTextColor,
                  fontWeight: "bold",
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, 0, colIndex)}
              >
                <ContentEditable
                  html={cell}
                  disabled={!enabled}
                  onChange={(e) => handleCellChange(0, colIndex, e.target.value)}
                  tagName="span"
                  className="outline-none block w-full h-full"
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`} style={{ backgroundColor: rowIndex % 2 === 0 ? rowBgColor : alternateRowColor }}>
              {row.map((cell, colIndex) => (
                <td
                  key={`cell-${rowIndex}-${colIndex}`}
                  style={{
                    border: `1px solid ${borderColor}`,
                    padding: `${padding}px`,
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, rowIndex + 1, colIndex)}
                >
                  <ContentEditable
                    html={cell}
                    disabled={!enabled}
                    onChange={(e) => handleCellChange(rowIndex + 1, colIndex, e.target.value)}
                    tagName="div"
                    className="outline-none min-h-[1.5em] w-full"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const TableSettings = () => {
  // ... hooks ...
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
    setProp((props: TableProps) => {
      const cols = props.data ? props.data[0].length : 4
      const newRow = Array(cols).fill("...")
      props.data = [...(props.data || []), newRow]
    })
  }

  const removeRow = () => {
    setProp((props: TableProps) => {
      if (props.data && props.data.length > 2) {
        props.data = props.data.slice(0, -1)
      }
    })
  }

  const addColumn = () => {
    setProp((props: TableProps) => {
      if (props.data) {
        props.data = props.data.map(row => [...row, "..."])
      }
    })
  }

  const removeColumn = () => {
    setProp((props: TableProps) => {
      if (props.data && props.data[0].length > 1) {
        props.data = props.data.map(row => row.slice(0, -1))
      }
    })
  }

  return (
    <div className="space-y-4">
      {/* Botones de Estructura (Ya existen) */}
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
            onChange={(e) => setProp((props: TableProps) => props.fontSize = Number(e.target.value))}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Padding Celda</Label>
          <Input
            type="number"
            value={padding || 8}
            onChange={(e) => setProp((props: TableProps) => props.padding = Number(e.target.value))}
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label className="text-xs">Fondo Cabecera</Label>
        <div className="flex gap-2">
          <Input type="color" className="w-8 h-8 p-0 border-0" value={headerBgColor} onChange={(e) => setProp((props: TableProps) => props.headerBgColor = e.target.value)} />
          <Input className="flex-1" value={headerBgColor} onChange={(e) => setProp((props: TableProps) => props.headerBgColor = e.target.value)} />
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Texto Cabecera</Label>
        <div className="flex gap-2">
          <Input type="color" className="w-8 h-8 p-0 border-0" value={headerTextColor} onChange={(e) => setProp((props: TableProps) => props.headerTextColor = e.target.value)} />
          <Input className="flex-1" value={headerTextColor} onChange={(e) => setProp((props: TableProps) => props.headerTextColor = e.target.value)} />
        </div>
      </div>

      <div className="space-y-1">
        <Label className="text-xs">Fondo Fila (Impar)</Label>
        <div className="flex gap-2">
          <Input type="color" className="w-8 h-8 p-0 border-0" value={rowBgColor} onChange={(e) => setProp((props: TableProps) => props.rowBgColor = e.target.value)} />
          <Input className="flex-1" value={rowBgColor} onChange={(e) => setProp((props: TableProps) => props.rowBgColor = e.target.value)} />
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Fondo Fila (Par)</Label>
        <div className="flex gap-2">
          <Input type="color" className="w-8 h-8 p-0 border-0" value={alternateRowColor} onChange={(e) => setProp((props: TableProps) => props.alternateRowColor = e.target.value)} />
          <Input className="flex-1" value={alternateRowColor} onChange={(e) => setProp((props: TableProps) => props.alternateRowColor = e.target.value)} />
        </div>
      </div>

      <div className="space-y-1">
        <Label className="text-xs">Color Bordes</Label>
        <div className="flex gap-2">
          <Input type="color" className="w-8 h-8 p-0 border-0" value={borderColor} onChange={(e) => setProp((props: TableProps) => props.borderColor = e.target.value)} />
          <Input className="flex-1" value={borderColor} onChange={(e) => setProp((props: TableProps) => props.borderColor = e.target.value)} />
        </div>
      </div>

    </div>
  )
}

Table.craft = {
  displayName: "Table",
  props: {
    data: [
      ["Concepto", "Cantidad", "Precio", "Total"],
      ["Servicios", "1", "0.00 €", "0.00 €"],
    ],
    headerBgColor: "#e2e8f0",
    headerTextColor: "#1e293b",
    borderColor: "#cbd5e1",
    fontSize: 12,
    padding: 8,
    fontFamily: "Arial",
    rowBgColor: "#ffffff",
    alternateRowColor: "#f8fafc",
  },
  related: {
    settings: TableSettings
  }
}
