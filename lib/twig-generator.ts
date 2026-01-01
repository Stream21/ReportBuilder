import { Node } from "@craftjs/core";

export function generateTwig(nodes: Record<string, Node>) {
    // Find the ROOT node, which should be our "Page" component
    const rootNodeId = Object.keys(nodes).find(id => nodes[id].data.isCanvas && nodes[id].data.displayName === "Page") || "ROOT";
    const rootNode = nodes[rootNodeId] || nodes["ROOT"];

    if (!rootNode) return "";

    return renderNode(rootNode, nodes);
}

function renderNode(node: Node, nodes: Record<string, Node>, indent = 0): string {
    const { type, props, nodes: childIds, custom } = node.data;
    const spaces = "  ".repeat(indent);

    // Resolve component name safely
    // Craft.js stores the component name in 'type.resolvedName' or we can check 'custom.displayName'
    // or fall back to the key in the resolver.
    let componentName = (type as any).resolvedName || custom?.displayName || "Container";

    // Specific fix for "Page" sometimes being just a div in older versions
    if (node.id === "ROOT" && componentName === "div") componentName = "Page";

    // Recursively render children
    const children = childIds
        ? childIds.map((id) => renderNode(nodes[id], nodes, indent + 1)).join("\n")
        : "";

    const styleString = getStyles(props);

    switch (componentName) {
        case "Page":
            // The root page container
            // Corresponds to page.tsx
            // We apply the padding and gap. Margins might be applied to the 'body' or '@page' by the printer, 
            // but here we render them as a wrapper div to ensure Wysiwyg.
            const { padding, gap, backgroundColor } = props;

            // Note: Margin is usually handled by the PDF generator (puppeteer page.pdf margin), 
            // but if we want to simulate it here:
            const pageStyles = `
        display: flex; 
        flex-direction: column; 
        padding: ${padding}px; 
        gap: ${gap}px; 
        background-color: ${backgroundColor};
        min-height: 100vh;
        box-sizing: border-box;
      `.replace(/\s+/g, ' ').trim();

            return `${spaces}<div class="page-container" style="${pageStyles}">\n${children}\n${spaces}</div>`;

        case "Header":
        case "Footer":
            // Corresponds to header.tsx / footer.tsx
            if (props.visible === false) return ""; // Skip if not visible

            const regionStyles = `
        width: 100%;
        display: flex;
        flex-direction: ${props.flexDirection || 'column'};
        align-items: ${props.alignItems || 'flex-start'};
        justify-content: ${props.justifyContent || 'flex-start'};
        padding: ${props.padding || 0}px;
        gap: ${props.gap || 0}px;
        height: ${props.height === 'auto' ? 'auto' : props.height};
        ${styleString}
      `.replace(/\s+/g, ' ').trim();

            // Semantic HTML for Header/Footer
            const tag = componentName.toLowerCase();
            return `${spaces}<${tag} style="${regionStyles}">\n${children}\n${spaces}</${tag}>`;

        case "Container":
            // Corresponds to container.tsx
            const { flexDirection, alignItems, justifyContent, flexWrap, layout, columns } = props;

            let containerStyles = styleString;

            if (layout === "grid") {
                containerStyles += ` display: grid; grid-template-columns: repeat(${columns}, 1fr); gap: ${props.gap}px;`;
            } else {
                // Default flex
                containerStyles += ` display: flex; flex-direction: ${flexDirection}; align-items: ${alignItems}; justify-content: ${justifyContent}; flex-wrap: ${flexWrap}; gap: ${props.gap}px;`;
            }

            return `${spaces}<div style="${containerStyles}">\n${children}\n${spaces}</div>`;

        case "Text":
        case "Texto":
            // Corresponds to text.tsx
            // This is dynamic text. It might contain {{ invoice.number }}.
            const { text, fontSize, fontWeight, color, textAlign, lineHeight, fontFamily } = props;
            const textStyles = `
        font-size: ${fontSize}px; 
        font-weight: ${fontWeight}; 
        color: ${color}; 
        text-align: ${textAlign}; 
        line-height: ${lineHeight}; 
        font-family: ${fontFamily}; 
        ${styleString}
      `.replace(/\s+/g, ' ').trim();

            // We interpret the 'text' prop. If it contains newlines, we might want to respect them w/ white-space: pre-wrap
            return `${spaces}<div style="${textStyles}">${text}</div>`;

        case "Image":
        case "Imagen":
            // Corresponds to image.tsx
            return `${spaces}<img src="${props.url}" style="${styleString}; display: block; max-width: 100%;" />`;

        case "Logo":
        case "GioComponent":
            // Corresponds to logo.tsx
            // Hardcoded variable for the company logo as per requirement
            // We use the container styles (width/height/alignment) or defaults
            return `${spaces}<img src="{{ empresa.logo }}" style="${styleString}; object-fit: contain; display: block;" alt="Logo Empresa" />`;

        case "Divider":
            // Corresponds to divider.tsx
            const dividerColor = props.color || "#e2e8f0";
            const dividerHeight = props.height || 1;
            const dividerWidth = props.width || "100%";
            const lineStyle = props.lineStyle || "solid";

            const divStyle = `
        width: 100%; 
        display: flex; 
        justify-content: center; 
        align-items: center; 
        padding: ${props.marginTop}px 0 ${props.marginBottom}px 0;
      `.replace(/\s+/g, ' ').trim();

            const hrStyle = `
        width: ${dividerWidth}; 
        border: 0; 
        border-top: ${dividerHeight}px ${lineStyle} ${dividerColor};
      `.replace(/\s+/g, ' ').trim();

            return `${spaces}<div style="${divStyle}"><hr style="${hrStyle}" /></div>`;

        case "Table":
        case "Tabla":
            // Corresponds to table.tsx
            // This is the tricky one.
            // 1. If it's a generic static table designed by user -> Render <table> rows.
            // 2. If it's THE "Invoice Items" table -> replacing body with Loop.

            // Heuristic: If we detect column headers like "Precio", "Total", "Cantidad",
            // we assume it's the main items table and we inject the Twig Loop logic.

            const rows = props.data || [];
            const headers = rows[0] || [];
            const isItemsTable = headers.some((h: string) =>
                ["Precio", "Price", "Total", "Importe", "Amount"].some(k => h.includes(k))
            );

            const tableStyle = `
        width: 100%; 
        border-collapse: collapse; 
        font-family: ${props.fontFamily}; 
        font-size: ${props.fontSize}px;
        ${styleString}
      `.replace(/\s+/g, ' ').trim();

            // Helper for cells
            const getCellStyle = (isHeader: boolean, rowIndex: number) => `
        border: 1px solid ${props.borderColor};
        padding: ${props.padding}px;
        text-align: ${isHeader ? 'center' : 'left'};
        background-color: ${isHeader ? props.headerBgColor : (rowIndex % 2 === 0 ? props.rowBgColor : props.alternateRowColor)};
        color: ${isHeader ? props.headerTextColor : 'inherit'};
        font-weight: ${isHeader ? 'bold' : 'normal'};
      `.replace(/\s+/g, ' ').trim();

            let tableHtml = `${spaces}<table style="${tableStyle}">\n`;

            // THEAD
            tableHtml += `${spaces}  <thead>\n${spaces}    <tr>\n`;
            headers.forEach((h: string) => {
                tableHtml += `${spaces}      <th style="${getCellStyle(true, 0)}">${h}</th>\n`;
            });
            tableHtml += `${spaces}    </tr>\n${spaces}  </thead>\n`;

            // TBODY
            tableHtml += `${spaces}  <tbody>\n`;

            if (isItemsTable) {
                // AUTOMATIC TWIG LOOP MODE
                // We assume standard invoice item fields map to columns by index or name
                // For simplicity in this demo: We iterate 'items' and assume columns: [Concepto, Cantidad, Precio, Total]
                // You can make this smarter by mapping column names to item.props

                tableHtml += `${spaces}    {% for item in items %}\n`;
                tableHtml += `${spaces}    <tr>\n`;

                // This mapping is fragile. Ideally, we'd have a column-mapping config.
                // For now, let's just dump standard item properties in order.
                tableHtml += `${spaces}      <td style="${getCellStyle(false, 0)}">{{ item.name | default(item.concepto) }}</td>\n`;
                tableHtml += `${spaces}      <td style="${getCellStyle(false, 0)}">{{ item.quantity | default(1) }}</td>\n`;
                tableHtml += `${spaces}      <td style="${getCellStyle(false, 0)}">{{ item.price | format_currency('EUR') }}</td>\n`;
                tableHtml += `${spaces}      <td style="${getCellStyle(false, 0)}">{{ item.total | format_currency('EUR') }}</td>\n`;

                tableHtml += `${spaces}    </tr>\n`;
                tableHtml += `${spaces}    {% endfor %}\n`;

            } else {
                // STATIC MODE (What you see is what you get)
                // Skip header row
                for (let i = 1; i < rows.length; i++) {
                    const row = rows[i];
                    tableHtml += `${spaces}    <tr>\n`;
                    row.forEach((cell: string) => {
                        // If the cell contains {{ }}, it will be evaluated by Twig
                        tableHtml += `${spaces}      <td style="${getCellStyle(false, i)}">${cell}</td>\n`;
                    });
                    tableHtml += `${spaces}    </tr>\n`;
                }
            }

            tableHtml += `${spaces}  </tbody>\n`;
            tableHtml += `${spaces}</table>`;
            return tableHtml;

        default:
            // Fallback for unknown components
            return `${spaces}<!-- Unknown component: ${componentName} -->\n${spaces}<div style="${styleString}">\n${children}\n${spaces}</div>`;
    }
}

function getStyles(props: any): string {
    if (!props) return "";

    const styleMap: Record<string, any> = {
        "background-color": props.backgroundColor,
        "border-radius": props.borderRadius ? `${props.borderRadius}px` : undefined,
        width: props.width,
        height: props.height,
    };

    // Border logic
    if (props.borderWidth && props.borderColor) {
        styleMap["border"] = `${props.borderWidth}px solid ${props.borderColor}`;
    }

    // Margin logic (some components use individual props)
    const margins = [
        props.marginTop || 0,
        props.marginRight || 0,
        props.marginBottom || 0,
        props.marginLeft || 0
    ];
    if (margins.some(m => m !== 0)) {
        styleMap["margin"] = margins.map(m => `${m}px`).join(" ");
    }

    // Padding logic
    if (props.padding) {
        styleMap["padding"] = `${props.padding}px`;
    }

    return Object.entries(styleMap)
        .filter(([_, value]) => value !== undefined && value !== "" && value !== "transparent")
        .map(([key, value]) => `${key}: ${value}`)
        .join("; ");
}

