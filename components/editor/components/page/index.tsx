"use client"

import { useNode } from "@craftjs/core"
import React from "react"
import { PageSettings } from "./settings"

export interface PageProps {
    children?: React.ReactNode
    padding?: number
    gap?: number
    marginTop?: number
    marginBottom?: number
    marginLeft?: number
    marginRight?: number
    backgroundColor?: string
}

export function Page({
    children,
    padding = 8,
    gap = 10,
    marginTop = 0,
    marginBottom = 0,
    marginLeft = 0,
    marginRight = 0,
    backgroundColor = "#ffffff"
}: PageProps) {
    const {
        connectors: { connect, drag },
    } = useNode()

    return (
        <div
            ref={(ref) => { if (ref) connect(drag(ref)) }}
            className="w-full h-full relative"
            style={{
                display: "flex",
                flexDirection: "column",
                padding: `${padding}px`,
                gap: `${gap}px`,
                marginTop: `${marginTop}px`,
                marginBottom: `${marginBottom}px`,
                marginLeft: `${marginLeft}px`,
                marginRight: `${marginRight}px`,
                backgroundColor,
            }}
        >
            {children}
        </div>
    )
}

Page.craft = {
    displayName: "Page",
    props: {
        padding: 8,
        gap: 10,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        backgroundColor: "#ffffff"
    },
    rules: {
        canDrag: () => false,
        canDelete: () => false,
        canMoveIn: () => true,
    },
    related: {
        settings: PageSettings
    }
}
