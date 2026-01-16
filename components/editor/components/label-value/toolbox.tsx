import React from "react"
import { Element } from "@craftjs/core"
import { Type } from "lucide-react"
import { LabelValue } from "./index"

export const LabelValueTool = {
    name: "Etiqueta: Valor",
    type: "label-value",
    group: "content",
    icon: Type,
    factory: (connectors: any, ref: HTMLElement) => {
        connectors.create(ref, <Element canvas is={LabelValue} />)
    }
}
