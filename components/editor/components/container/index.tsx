"use client"

import type React from "react"
import { useNode, useEditor } from "@craftjs/core"
import { ContainerSettings } from "./settings"

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
    border: `${borderWidth}px solid ${borderColor}`,
    borderRadius: `${borderRadius}px`,
    boxShadow: getShadow(boxShadow),
    minHeight,
    position: "relative",
    // Visual cues for editor - ONLY when enabled
    outline: enabled && borderWidth === 0 ? "1px dashed #94a3b8" : "none", // Slate-400
    backgroundColor: (enabled && backgroundColor === "transparent") ? "#ffffff00" : backgroundColor,
    overflow: "hidden", // Asegura que el contenido respete los bordes redondeados
  }

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref))
      }}
      style={baseStyles}
    >
      {children}
    </div>
  )
}

Container.craft = {
  displayName: "Container",
  props: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "nowrap",
    flexGrow: 0,
    gap: 10,
    padding: 10,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    width: "100%",
    height: "auto",
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 0,
    boxShadow: "none",
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
