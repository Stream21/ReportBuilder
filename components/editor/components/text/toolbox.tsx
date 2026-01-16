import React from "react"
import { Element } from "@craftjs/core"
import { Type } from "lucide-react"
import { Text } from "./index"

export const TextTool = {
    name: "Texto Simple",
    type: "text",
    group: "content",
    icon: Type,
    factory: (connectors: any, ref: HTMLElement) => {
        connectors.create(ref, <Text text="Texto de ejemplo" />)
    }
}
