import { useEditor } from "@craftjs/core"
import React, { useEffect, useState } from "react"
import { LayoutGrid, Type, Square, Table as TableIcon } from "lucide-react"
import { useDrag } from "@/components/editor/drag-context"

const PreviewComponent = ({ type, isSnapped }: { type: string | null, isSnapped?: boolean }) => {
    if (!type || !isSnapped) {
        return null
    }

    // When snapped to drop zone, show placeholder style
    return (
        <div className="w-full h-16 border-2 border-dashed border-primary bg-primary/20 rounded-md flex items-center justify-center gap-2 px-4 py-3 animate-in fade-in duration-200">
            {type === "grid" && <LayoutGrid className="w-5 h-5 text-primary" />}
            {type === "container" && <Square className="w-5 h-5 text-primary" />}
            {type === "text" && <Type className="w-5 h-5 text-primary" />}
            {type === "table" && <TableIcon className="w-5 h-5 text-primary" />}
            <span className="text-sm font-semibold text-primary capitalize">{type}</span>
        </div>
    )
}

export const CustomDragLayer = () => {
    const { isDragging, indicator } = useEditor((state) => ({
        isDragging: state.events.dragged.size > 0,
        indicator: (state.events as any).indicator,
    }))
    const { dragType } = useDrag()

    const [domIndicator, setDomIndicator] = useState<{ top: number, left: number, width: number } | null>(null)

    const isActive = !!dragType || isDragging

    useEffect(() => {
        if (!isActive) {
            setDomIndicator(null)
            return
        }

        let rafId: number
        const loop = () => {
            const el = document.querySelector(".craftjs-indicator") as HTMLElement;
            if (el) {
                const rect = el.getBoundingClientRect()
                // Only update if we have a valid indicator with width > 0
                if (rect.width > 0) {
                    setDomIndicator({ top: rect.top, left: rect.left, width: rect.width })
                }
            } else {
                setDomIndicator(null)
            }
            rafId = requestAnimationFrame(loop)
        }

        loop()

        return () => {
            cancelAnimationFrame(rafId)
        }
    }, [isActive])

    if (!isActive || !domIndicator) {
        return null
    }

    const { top, left, width } = domIndicator

    return (
        <div style={{
            position: "fixed",
            pointerEvents: "none",
            zIndex: 9999,
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
        }}>
            <div style={{
                position: 'absolute',
                top: top,
                left: left,
                width: width,
                transition: "top 0.1s cubic-bezier(0.2, 0, 0, 1), left 0.1s cubic-bezier(0.2, 0, 0, 1), width 0.1s ease",
            }}>
                <PreviewComponent
                    type={dragType || (isDragging ? "container" : null)}
                    isSnapped={true}
                />
            </div>
        </div>
    )
}
