import React from "react"
import { Element } from "@craftjs/core"
import { Square } from "lucide-react"
import { Container } from "./index"

export const ContainerTool = {
    name: "Contenedor",
    type: "container",
    group: "structure",
    icon: Square,
    factory: (connectors: any, ref: HTMLElement) => {
        connectors.create(ref, <Element canvas is={Container} flexDirection="column" padding={20} />)
    }
}
