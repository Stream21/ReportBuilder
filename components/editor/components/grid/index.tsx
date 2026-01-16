"use client"

import React, { useEffect } from "react"
import { useNode, useEditor, Element } from "@craftjs/core"
import { GridSettings } from "./settings"
import { Container } from "../container"

interface GridProps {
    children?: React.ReactNode
    columns?: number
    rows?: number
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

export function Grid({
    children,
    columns = 1,
    rows = 1,
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
}: GridProps) {
    const {
        connectors: { connect, drag },
        nodeId,
        childNodes,
        actions: { add }
    } = useNode((node) => ({
        nodeId: node.id,
        childNodes: node.data.nodes,
    }))

    const { query, actions } = useEditor((state) => ({
        enabled: state.options.enabled,
    }))

    const { enabled } = useEditor((state) => ({
        enabled: state.options.enabled,
    }))

    // Auto-generate cells if needed
    useEffect(() => {
        if (!enabled) return;

        const totalCells = columns * rows;
        const currentCells = childNodes.length;

        if (currentCells < totalCells) {
            const needed = totalCells - currentCells;

            // Warning: calling actions.add inside useEffect directly might loop if not careful.
            // But here we rely on childNodes.length check.
            // However, in Craft.js, adding nodes is async/state update, so we should be careful.
            // Ideally this logic should be triggered by the settings panel, but for initial drop or easy management,
            // we can try to do it here, OR we rely on the settings panel to do it (like in the original code).

            // In the original code, `handleAutoGenerateCells` was called in `ContainerSettings`.
            // Let's migrate that logic to GridSettings or keep it there.
            // BUT, to make the "Cuadrícula" tool button work (which creates a Grid with empty children?), 
            // we might want to pre-populate it from the tool definition.
            // The tool definition in component-panel.tsx creates the structure upfront.

            // So for now, let's NOT auto-generate here to avoid side-effects during render.
            // We will rely on the user or the drag-drop action to populate.
            // However, if the user changes columns/rows in settings, we want cells to appear.
            // So we will add that logic to GridSettings.
        }
    }, [columns, rows, childNodes.length, enabled])


    const getShadow = (shadow: string) => {
        switch (shadow) {
            case "sm": return "0 1px 2px 0 rgb(0 0 0 / 0.05)"
            case "md": return "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
            case "lg": return "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
            default: return "none"
        }
    }

    const style: React.CSSProperties = {
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
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
        outline: enabled && borderWidth === 0 ? "1px dashed #94a3b8" : "none",
        backgroundColor: (enabled && backgroundColor === "transparent") ? "#f1f5f9" : backgroundColor,
        overflow: "hidden",
    }

    return (
        <div
            ref={(ref) => {
                if (ref) connect(drag(ref))
            }}
            style={style}
        >
            {children}
        </div>
    )
}

Grid.craft = {
    displayName: "Grid",
    props: {
        columns: 1,
        rows: 1,
        gap: 10,
        padding: 10,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        backgroundColor: "transparent",
        boxShadow: "none",
        minHeight: "50px"
    },
    related: {
        settings: GridSettings,
    },
}
