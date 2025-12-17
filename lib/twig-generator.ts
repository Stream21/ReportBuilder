import { Node } from "@craftjs/core";

export function generateTwig(nodes: Record<string, Node>) {
    const rootNode = nodes["ROOT"];
    if (!rootNode) return "";

    return renderNode(rootNode, nodes);
}

function renderNode(node: Node, nodes: Record<string, Node>, indent = 0): string {
    const { type, props, nodes: childIds, custom } = node.data;
    const spaces = "  ".repeat(indent);

    // Resolve component name
    // Note: serialized nodes usually have type as object with resolvedName
    // Or we check custom.displayName
    const componentName = custom?.displayName || (type as any).resolvedName || "Container";

    const children = childIds
        ? childIds.map((id) => renderNode(nodes[id], nodes, indent + 1)).join("\n")
        : "";

    const styleString = getStyles(props);
    const className = props.className || "";

    switch (componentName) {
        case "Container":
        case "Contenedor":
            // Handle Flex vs Grid
            if (props.layout === "grid") {
                const gridStyle = `display: grid; grid-template-columns: repeat(${props.columns}, 1fr); gap: ${props.gap}px;`;
                return `${spaces}<div style="${gridStyle} ${styleString}">\n${children}\n${spaces}</div>`;
            }
            return `${spaces}<div style="${styleString}">\n${children}\n${spaces}</div>`;

        case "Text":
        case "Texto":
        case "Texto Simple":
            const { text, fontSize, fontWeight, color, textAlign } = props;
            const textStyle = `font-size: ${fontSize}px; font-weight: ${fontWeight}; color: ${color}; text-align: ${textAlign}; ${styleString}`;
            return `${spaces}<div style="${textStyle}">${text}</div>`;

        case "Image":
        case "Imagen":
            return `${spaces}<img src="${props.url}" style="${styleString}" />`;

        case "Divider":
        case "Separador":
            return `${spaces}<hr style="${styleString}" />`;

        case "Table":
        case "Tabla":
        case "Tabla de Ítems":
            return `${spaces}{# Tabla dinámica de ítems #}\n${spaces}{% for item in invoice.items %}\n${spaces}  <div>{{ item.name }} - {{ item.price }}</div>\n${spaces}{% endfor %}`;

        case "Header":
        case "Footer":
            return `${spaces}<header style="${styleString}">\n${children}\n${spaces}</header>`;

        default:
            // Fallback for unknown components, treat as div
            return `${spaces}<div data-component="${componentName}" style="${styleString}">\n${children}\n${spaces}</div>`;
    }
}

function getStyles(props: any): string {
    const styleMap: Record<string, any> = {
        padding: props.padding ? `${props.padding}px` : undefined,
        margin: `${props.marginTop || 0}px ${props.marginRight || 0}px ${props.marginBottom || 0}px ${props.marginLeft || 0}px`,
        backgroundColor: props.backgroundColor,
        border: props.borderWidth ? `${props.borderWidth}px solid ${props.borderColor}` : undefined,
        borderRadius: props.borderRadius ? `${props.borderRadius}px` : undefined,
        width: props.width,
        height: props.height,
        display: props.layout === 'flex' ? 'flex' : undefined,
        flexDirection: props.flexDirection,
        justifyContent: props.justifyContent,
        alignItems: props.alignItems,
        gap: props.gap ? `${props.gap}px` : undefined,
    };

    return Object.entries(styleMap)
        .filter(([_, value]) => value !== undefined && value !== "transparent" && value !== 0 && value !== "0px 0px 0px 0px")
        .map(([key, value]) => `${key.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}: ${value}`)
        .join("; ");
}
