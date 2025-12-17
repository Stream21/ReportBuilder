"use client"

import React, { createContext, useContext, useState } from "react"

type DragType = "container" | "grid" | "text" | "image" | "table" | "divider" | "gio" | null

interface DragContextType {
    dragType: DragType
    setDragType: (type: DragType) => void
}

const DragContext = createContext<DragContextType>({
    dragType: null,
    setDragType: () => { },
})

export function DragProvider({ children }: { children: React.ReactNode }) {
    const [dragType, setDragType] = useState<DragType>(null)

    return (
        <DragContext.Provider value={{ dragType, setDragType }}>
            {children}
        </DragContext.Provider>
    )
}

export const useDrag = () => useContext(DragContext)
