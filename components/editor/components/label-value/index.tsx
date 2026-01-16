"use client"

import { useNode, useEditor, Element } from "@craftjs/core"
import { Text } from "../text"
import React from "react"
import { LabelValueSettings } from "./settings"

export interface LabelValueProps {
    flexDirection?: "row" | "column"
    gap?: number
    alignItems?: "flex-start" | "center" | "flex-end" | "stretch"
    labelWidth?: string
    marginTop?: number
    marginBottom?: number
}

export const LabelValue = ({
    flexDirection = "row",
    gap = 10,
    alignItems = "center",
    labelWidth = "auto",
    marginTop = 0,
    marginBottom = 10,
}: LabelValueProps) => {
    const {
        connectors: { connect, drag },
    } = useNode()

    const { enabled } = useEditor((state) => ({
        enabled: state.options.enabled,
    }))

    return (
        <div
            ref={(ref) => {
                if (ref) connect(drag(ref))
            }}
            className="label-value-container"
            style={{
                display: "flex",
                flexDirection,
                gap: `${gap}px`,
                alignItems,
                marginTop: `${marginTop}px`,
                marginBottom: `${marginBottom}px`,
                width: "100%",
                border: enabled ? "1px dashed #e2e8f0" : "none",
                padding: enabled ? "2px" : "0",
            }}
        >
            {/* Label Area - Fixed or Auto Width */}
            <div style={{ width: labelWidth, flexShrink: 0 }}>
                <Element
                    id="label"
                    is={Text}
                    text="Etiqueta:"
                    fontWeight="bold"
                    color="#374151"
                />
            </div>

            {/* Value Area - Flexible */}
            <div style={{ flexGrow: 1, minWidth: 0 }}>
                <Element
                    id="value"
                    is={Text}
                    text="Valor dinámico"
                    color="#6b7280"
                />
            </div>
        </div>
    )
}

LabelValue.craft = {
    displayName: "Label: Value",
    props: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        labelWidth: "auto",
        marginTop: 0,
        marginBottom: 10,
    },
    related: {
        settings: LabelValueSettings,
    },
}
