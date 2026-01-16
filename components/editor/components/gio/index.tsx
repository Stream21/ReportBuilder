"use client"

import { useNode, useEditor } from "@craftjs/core"
import { Badge } from "@/components/ui/badge"
import { Image as ImageIcon } from "lucide-react"
import React from "react"
import { GioSettings } from "./settings"

export interface GioComponentProps {
    width?: string
    height?: string
    marginTop?: number
    marginBottom?: number
    marginLeft?: number
    marginRight?: number
}

export function GioComponent({
    width = "150px",
    height = "auto",
    marginTop = 0,
    marginBottom = 0,
    marginLeft = 0,
    marginRight = 0
}: GioComponentProps) {
    const {
        connectors: { connect, drag },
    } = useNode()

    const { enabled } = useEditor((state) => ({
        enabled: state.options.enabled
    }))

    return (
        <div
            ref={(ref) => { if (ref) connect(drag(ref)) }}
            style={{
                width,
                height,
                marginLeft: `${marginLeft}px`,
                marginRight: `${marginRight}px`,
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "50px", // Prevent collapse
            }}
            className="group"
        >
            {enabled && (
                <div className="absolute -top-3 -left-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Badge variant="secondary" className="text-[10px] h-5 px-1.5 gap-1 border-blue-200 bg-blue-50 text-blue-700 pointer-events-none">
                        <ImageIcon className="w-3 h-3" />
                        Logotipo Empresa
                    </Badge>
                </div>
            )}

            <img
                src="/adrian-logo.png"
                alt="Logotipo Empresa (Mock)"
                style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    opacity: enabled ? 0.9 : 1
                }}
            />

            {enabled && (
                <div className="absolute inset-0 border border-dashed border-blue-300 pointer-events-none opacity-50" />
            )}
        </div>
    )
}

GioComponent.craft = {
    displayName: "Logotipo Empresa",
    props: {
        width: "150px",
        height: "auto",
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0
    },
    rules: {
        canDrag: () => true,
        canMoveIn: () => true, // Puede moverse
        canDrop: () => false, // No acepta hijos
    },
    related: {
        settings: GioSettings
    }
}
