import React from "react"
import { Table as TableIcon } from "lucide-react"
import { Table } from "./index"

export const TableTool = {
    name: "Tabla de Ítems",
    type: "table",
    group: "content",
    icon: TableIcon,
    factory: (connectors: any, ref: HTMLElement) => {
        connectors.create(ref, <Table />)
    }
}
