"use client"

import { useNode } from "@craftjs/core"
import React from "react"
import { DividerSettings } from "./settings"

export interface DividerProps {
    height?: number
    color?: string
    margin?: number
    width?: string
    style?: "solid" | "dashed" | "dotted"
}

export function Divider({
    height = 1,
    color = "#e5e7eb",
    margin = 20,
    width = "100%",
    style = "solid"
}: DividerProps) {
    const { connectors: { connect, drag } } = useNode()

    return (
        <div
            ref={(ref) => { if (ref) connect(drag(ref)) }}
            className="w-full flex justify-center py-2"
        >
            <div
                style={{
                    height: `${height}px`,
                    backgroundColor: style === "solid" ? color : "transparent",
                    borderTop: style !== "solid" ? `${height}px ${style} ${color}` : "none",
                    width: width,
                    margin: `${margin}px 0`
                }}
            />
        </div>
    )
}

Divider.craft = {
    displayName: "Separador",
    props: {
        height: 1,
        color: "#e5e7eb",
        margin: 20,
        width: "100%",
        style: "solid"
    },
    related: {
        settings: DividerSettings
    }
}
