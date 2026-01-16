"use client"

import React from "react"
import { useNode } from "@craftjs/core"
import { ImageSettings } from "./settings"

export interface ImageProps {
  src?: string
  width?: number
  height?: number
}

export function Image({ src = "/placeholder.svg", width = 200, height = 100 }: ImageProps) {
  const {
    connectors: { connect, drag },
  } = useNode()

  return (
    <img
      ref={(ref) => { if (ref) connect(drag(ref)) }}
      src={src || "/placeholder.svg"}
      alt="Imagen"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        objectFit: "cover",
        cursor: "move",
      }}
    />
  )
}

Image.craft = {
  displayName: "Image",
  props: {
    src: "/placeholder.svg",
    width: 200,
    height: 100,
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: ImageSettings
  }
}
