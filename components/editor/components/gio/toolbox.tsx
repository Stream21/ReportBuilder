import React from "react"
import { Layout } from "lucide-react"
import { GioComponent } from "./index"

export const GioTool = {
    name: "Logotipo",
    type: "gio",
    group: "gio",
    icon: Layout,
    factory: (connectors: any, ref: HTMLElement) => {
        connectors.create(ref, <GioComponent />)
    }
}
