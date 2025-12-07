"use client"

import { useNode } from "@craftjs/core"

export function Logo() {
  const {
    connectors: { connect, drag },
  } = useNode()

  return (
    <div
      ref={(ref) => ref && connect(drag(ref))}
      style={{
        width: "150px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px dashed #ccc",
        cursor: "move",
        color: "#000",
      }}
    >
      {"{{ empresa.logo }}"}
    </div>
  )
}

Logo.craft = {
  displayName: "Logo",
  rules: {
    canDrag: () => true,
  },
}
