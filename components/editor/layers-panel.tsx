"use client"

import { useEditor } from "@craftjs/core"
import { Layers } from "@craftjs/layers"

export function LayersPanel() {
    const { enabled } = useEditor((state) => ({
        enabled: state.options.enabled,
    }))

    return (
        <div className="w-64 bg-card border-r border-border h-full flex flex-col">
            <div className="p-4 border-b bg-background">
                <h3 className="text-sm font-semibold text-foreground">Capas</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
                <Layers expandRootOnLoad={true} />
            </div>
        </div>
    )
}
