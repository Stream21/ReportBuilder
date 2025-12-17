import { useEditor } from "@craftjs/core"
import React, { useEffect, useState } from "react"
import { Move, LayoutGrid, Type, Square, Table as TableIcon } from "lucide-react"
import { useDrag } from "@/components/editor/drag-context"

const PreviewComponent = ({ type }: { type: string | null }) => {
    if (!type) {
        return (
            <div className="bg-white/95 backdrop-blur shadow-xl border border-primary/50 text-primary rounded-lg p-3 w-40 flex items-center gap-3">
                <Move className="w-4 h-4" />
                <span className="font-semibold text-xs">Arrastrando...</span>
            </div>
        )
    }

    switch (type) {
        case "grid":
            return (
                <div className="bg-white/90 backdrop-blur shadow-2xl border-2 border-primary rounded-lg w-64 h-32 flex flex-col p-2 gap-2">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="text-xs font-bold text-primary flex items-center gap-1"><LayoutGrid className="w-3 h-3" /> Cuadrícula</span>
                        <span className="text-[10px] text-muted-foreground">Arrastra al lienzo</span>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-2 opacity-50">
                        <div className="border border-dashed border-primary/50 bg-primary/5 rounded flex items-center justify-center text-[10px] text-primary">Col 1</div>
                        <div className="border border-dashed border-primary/50 bg-primary/5 rounded flex items-center justify-center text-[10px] text-primary">Col 2</div>
                    </div>
                </div>
            )
        case "container":
            return (
                <div className="bg-white/90 backdrop-blur shadow-2xl border-2 border-primary rounded-lg w-64 h-24 flex flex-col p-2">
                    <span className="text-xs font-bold text-primary mb-2 flex items-center gap-1"><Square className="w-3 h-3" /> Contenedor</span>
                    <div className="flex-1 border border-dashed border-primary/50 bg-primary/5 rounded"></div>
                </div>
            )
        case "text":
            return (
                <div className="bg-white/90 backdrop-blur shadow-xl border-2 border-primary rounded-lg p-4 w-48">
                    <span className="text-xs font-bold text-primary mb-1 flex items-center gap-1"><Type className="w-3 h-3" /> Texto</span>
                    <div className="h-2 w-3/4 bg-gray-200 rounded mb-1"></div>
                    <div className="h-2 w-1/2 bg-gray-200 rounded"></div>
                </div>
            )
        case "table":
            return (
                <div className="bg-white/90 backdrop-blur shadow-xl border-2 border-primary rounded-lg w-64 p-2">
                    <span className="text-xs font-bold text-primary mb-2 flex items-center gap-1"><TableIcon className="w-3 h-3" /> Tabla</span>
                    <div className="space-y-1 opacity-50">
                        <div className="flex gap-1"><div className="w-1/3 h-4 bg-gray-100 rounded"></div><div className="w-1/3 h-4 bg-gray-100 rounded"></div><div className="w-1/3 h-4 bg-gray-100 rounded"></div></div>
                        <div className="flex gap-1"><div className="w-1/3 h-4 bg-gray-50 rounded"></div><div className="w-1/3 h-4 bg-gray-50 rounded"></div><div className="w-1/3 h-4 bg-gray-50 rounded"></div></div>
                    </div>
                </div>
            )
        default:
            return (
                <div className="bg-white/95 backdrop-blur shadow-xl border border-primary/50 text-primary rounded-lg p-3 w-40 flex items-center gap-3">
                    <Move className="w-4 h-4" />
                    <span className="font-semibold text-xs">Arrastrando...</span>
                </div>
            )
    }
}

export const CustomDragLayer = () => {
    const { isDragging, indicator } = useEditor((state) => ({
        // Compatibility fix: check dragged size directly or state related
        isDragging: state.events.dragged.size > 0,
        indicator: (state.events as any).indicator,
    }))
    const { dragType, setDragType } = useDrag()

    const [domIndicator, setDomIndicator] = useState<{ top: number, left: number, width: number } | null>(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    useEffect(() => {
        // Active if either dragType is set or internal craft dragging is active
        const isActive = !!dragType || isDragging

        if (!isActive) {
            return
        }

        let rafId: number
        const loop = () => {
            const el = document.querySelector(".craftjs-indicator")
            if (el) {
                const rect = el.getBoundingClientRect()
                // Only update if changed significantly to avoid re-renders? 
                // Actually React state update will throttle if values are same usually, but object ref changes.
                // Optimally we would store ref, but let's try this first.
                setDomIndicator({ top: rect.top, left: rect.left, width: rect.width })
            } else {
                setDomIndicator(null)
            }

            // Also update mouse if needed here? No, mouse listener is fine.
            rafId = requestAnimationFrame(loop)
        }

        loop()

        const updateMouse = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY })
        }

        const handleMouseUp = () => {
            setDragType(null)
            setDomIndicator(null)
        }

        window.addEventListener("mousemove", updateMouse)
        window.addEventListener("mouseup", handleMouseUp)

        return () => {
            window.removeEventListener("mousemove", updateMouse)
            window.removeEventListener("mouseup", handleMouseUp)
            cancelAnimationFrame(rafId)
        }
    }, [isDragging, dragType, setDragType])

    // If we have a dragType (from sidebar) OR we are dragging a node (from canvas), show the layer
    const isActive = !!dragType || isDragging

    if (!isActive) {
        return null
    }

    const isSnapped = !!domIndicator
    const { top, left, width } = domIndicator || {}

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
                // Snap to indicator position if available, otherwise follow mouse
                transform: isSnapped
                    ? `translate(${left}px, ${top}px)`
                    : `translate(${mousePos.x + 10}px, ${mousePos.y + 10}px)`,
                width: isSnapped ? `${width}px` : undefined, // Match container width if snapped
                transition: "transform 0.08s cubic-bezier(0.2, 0, 0, 1), width 0.1s ease", // Smooth snap
            }}>
                <div style={{
                    // If snapped, we want to fill the width. If following mouse, keep generic size.
                    width: isSnapped ? '100%' : undefined
                }}>
                    <PreviewComponent type={dragType || (isDragging ? "container" : null)} />
                </div>
            </div>
        </div>
    )
}
