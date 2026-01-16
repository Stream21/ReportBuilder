import React from "react"
import { Minus } from "lucide-react"
import { Divider } from "./index"

export const DividerTool = {
    name: "Separador",
    type: "divider",
    group: "structure",
    icon: Minus,
    factory: (connectors: any, ref: HTMLElement) => {
        connectors.create(ref, <Divider />)
    }
}
