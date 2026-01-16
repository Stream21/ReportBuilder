"use client"

import { useNode, useEditor } from "@craftjs/core"
import ContentEditable from "react-contenteditable"
import React, { useEffect, useState } from "react"
import { MOCK_DATA } from "@/lib/mock-data"
import { TextSettings } from "./settings"

export interface TextProps {
  text?: string
  fontSize?: number
  fontWeight?: string
  color?: string
  textAlign?: "left" | "center" | "right" | "justify"
  fontStyle?: "normal" | "italic"
  textDecoration?: "none" | "underline" | "line-through"
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
}

export function Text({
  text = "Texto de ejemplo",
  fontSize = 14,
  fontWeight = "normal",
  color = "#000000",
  textAlign = "left",
  fontStyle = "normal",
  textDecoration = "none",
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
}: TextProps) {
  const {
    connectors: { connect, drag },
    actions: { setProp },
    isActive,
    isHovered
  } = useNode((node) => ({
    isActive: node.events.selected,
    isHovered: node.events.hovered
  }))

  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }))

  const [editable, setEditable] = useState(false)

  useEffect(() => {
    if (!isActive) {
      setEditable(false)
    }
  }, [isActive])

  // Interpolate text for Preview Mode
  const getInterpolatedText = () => {
    if (enabled) return text

    return text.replace(/\{\{\s*([\w_.]+)\s*\}\}/g, (match, key) => {
      // Intenta encontrar la clave exacta, o busca una aproximada si es necesario
      const val = MOCK_DATA[key] || MOCK_DATA[key.replace('.', '_')]
      return val || match
    })
  }

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (enabled) {
      setEditable(true)
    }
  }

  return (
    <div
      ref={(ref) => {
        if (ref) {
          connect(drag(ref))
        }
      }}
      className="relative min-w-[50px] min-h-[1em]"
      style={{
        width: "100%",
        marginTop: `${marginTop}px`,
        marginBottom: `${marginBottom}px`,
        marginLeft: `${marginLeft}px`,
        marginRight: `${marginRight}px`,
      }}
      onDoubleClick={handleDoubleClick}
      onDrop={(e) => {
        e.preventDefault()
        const variable = e.dataTransfer.getData("variable")
        if (variable) {
          setProp((props: TextProps) => {
            props.text = `${props.text} {{ ${variable} }}`
          })
        }
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      <ContentEditable
        disabled={!enabled || !editable}
        html={getInterpolatedText()}
        onChange={(e) => {
          setProp((props: TextProps) => (props.text = e.target.value), 500)
        }}
        tagName="div"
        style={{
          fontSize: `${fontSize}px`,
          fontWeight,
          fontStyle,
          textDecoration,
          textAlign,
          color,
          cursor: enabled ? "text" : "default",
          whiteSpace: "pre-wrap",
          outline: "none",
          lineHeight: 1.5,
        }}
        className={`${!editable ? "pointer-events-none" : ""}`}
      />
    </div>
  )
}

Text.craft = {
  displayName: "Text",
  props: {
    text: "Texto de ejemplo",
    fontSize: 14,
    fontWeight: "normal",
    color: "#000000",
    textAlign: "left",
    fontStyle: "normal",
    textDecoration: "none",
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  related: {
    settings: TextSettings,
  },
}
