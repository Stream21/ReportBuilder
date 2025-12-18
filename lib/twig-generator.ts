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
    const componentName = custom?.displayName || (type as any).resolvedName || "Container";

    const children = childIds
        ? childIds.map((id) => renderNode(nodes[id], nodes, indent + 1)).join("\n")
        : "";

    const styleString = getStyles(props);

    switch (componentName) {
        case "Container":
        case "Contenedor":
            const { flexDirection, alignItems, justifyContent, flexWrap, layout, columns, gap } = props;

            // Base styles
            let styles = styleString;

            // Explicit Flex/Grid styles because our simplified getStyles might assume too much
            if (layout === "grid") {
                styles += ` display: grid; grid-template-columns: repeat(${columns}, 1fr); gap: ${gap}px;`;
            } else {
                styles += ` display: flex; flex-direction: ${flexDirection}; align-items: ${alignItems}; justify-content: ${justifyContent}; flex-wrap: ${flexWrap};`;
            }

            return `${spaces}<div style="${styles}">\n${children}\n${spaces}</div>`;

        case "Text":
        case "Texto":
        case "Texto Simple":
            // Render text content. Just output the text prop directly inside a div/span.
            // We assume 'text' contains the Twig variable {{ ... }} if applicable.
            const { text, fontSize, fontWeight, color, textAlign, lineHeight } = props;
            const textStyle = `font-size: ${fontSize}px; font-weight: ${fontWeight}; color: ${color}; text-align: ${textAlign}; line-height: ${lineHeight}; ${styleString}`;

            // If the text seems to be just a variable like {{ foo }}, we might want to let it be raw text if no styles?
            // But usually we wrap it to ensure positioning.
            return `${spaces}<div style="${textStyle}">${text}</div>`;

        case "Image":
        case "Imagen":
            return `${spaces}<img src="${props.url}" style="${styleString}" />`;

        case "Componente Gio":
        case "GioComponent":
            // Render the special Gio logo component
            // If it's a software property, we should output the backend variable for the logo
            // using the dimensions provided in props
            return `${spaces}<img src="{{ empresa.logo }}" style="${styleString}; object-fit: contain;" />`;

        case "Divider":
        case "Separador":
            return `${spaces}<hr style="${styleString}; border-top: 1px solid #ccc;" />`;

        case "Table":
        case "Tabla":
        case "Tabla de Ítems":
            // This is complex. We need to match the backend looping structure.
            // Assuming standard invoice items loop
            return `${spaces}
<table style="width: 100%; border-collapse: collapse; ${styleString}">
    <thead>
        <tr>
            <th style="text-align: left; border-bottom: 2px solid #ccc; padding: 4px;">Concepto</th>
            <th style="text-align: right; border-bottom: 2px solid #ccc; padding: 4px;">Precio</th>
            <th style="text-align: right; border-bottom: 2px solid #ccc; padding: 4px;">Cant.</th>
            <th style="text-align: right; border-bottom: 2px solid #ccc; padding: 4px;">Total</th>
        </tr>
    </thead>
    <tbody>
    {% for item in items %}
        <tr>
            <td style="padding: 4px; border-bottom: 1px solid #eee;">{{ item.name }}</td>
            <td style="padding: 4px; border-bottom: 1px solid #eee; text-align: right;">{{ item.price }}</td>
            <td style="padding: 4px; border-bottom: 1px solid #eee; text-align: right;">{{ item.quantity }}</td>
            <td style="padding: 4px; border-bottom: 1px solid #eee; text-align: right;">{{ item.total }}</td>
        </tr>
    {% endfor %}
    </tbody>
    <tfoot>
        <tr>
            <td colspan="3" style="text-align: right; padding-top: 10px; font-weight: bold;">TOTAL:</td>
            <td style="text-align: right; padding-top: 10px; font-weight: bold;">{{ invoice.total }}</td>
        </tr>
    </tfoot>
</table>`;

        case "Header":
        case "Footer":
            return `${spaces}<div style="${styleString}; width: 100%;">\n${children}\n${spaces}</div>`;

        default:
            return `${spaces}<div style="${styleString}">\n${children}\n${spaces}</div>`;
    }
}

function getStyles(props: any): string {
    const styleMap: Record<string, any> = {
        padding: props.padding ? `${props.padding}px` : undefined,
        margin: `${props.marginTop || 0}px ${props.marginRight || 0}px ${props.marginBottom || 0}px ${props.marginLeft || 0}px`,
        "background-color": props.backgroundColor,
        border: props.borderWidth ? `${props.borderWidth}px solid ${props.borderColor}` : undefined,
        "border-radius": props.borderRadius ? `${props.borderRadius}px` : undefined,
        width: props.width,
        height: props.height,
        // Flex/Grid styles are handled in specific cases to be safer
        gap: props.gap ? `${props.gap}px` : undefined,
    };

    return Object.entries(styleMap)
        .filter(([_, value]) => value !== undefined && value !== "transparent" && value !== 0 && value !== "0px 0px 0px 0px")
        .map(([key, value]) => `${key}: ${value}`)
        .join("; ");
}
