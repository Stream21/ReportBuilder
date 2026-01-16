"use client"

import { useNode, useEditor } from "@craftjs/core"
import ContentEditable from "react-contenteditable"
import React from "react"
import { TableSettings } from "./settings"

export interface TableProps {
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

  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    setProp((props: TableProps) => {
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
