import React from "react"
import { Element } from "@craftjs/core"
import { Layout } from "lucide-react"
import { Grid } from "./index"
import { Container } from "../container"

export const GridTool = {
    name: "Cuadrícula",
    type: "grid",
    group: "structure",
    icon: Layout,
    factory: (connectors: any, ref: HTMLElement) => {
        connectors.create(
            ref,
            <Element
                canvas
                is={Grid}
                columns={2}
                rows={1}
                gap={20}
                padding={10}
                minHeight="100px"
            >
                <Element canvas is={Container} minHeight="80px" backgroundColor="#f8fafc" borderColor="#e2e8f0" borderWidth={1} borderRadius={4} />
                <Element canvas is={Container} minHeight="80px" backgroundColor="#f8fafc" borderColor="#e2e8f0" borderWidth={1} borderRadius={4} />
            </Element>
        )
    }
}
