"use client"

import { useNode, useEditor } from "@craftjs/core"
import React from "react"
import { HeaderSettings } from "./settings"

export interface HeaderProps {
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
