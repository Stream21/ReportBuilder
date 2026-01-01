import { NextResponse } from "next/server";
import { generateTwig } from "@/lib/twig-generator";
// @ts-ignore
import twig from "twig";
import puppeteer from "puppeteer";

// Disable Twig caching for development
twig.cache(false);

export async function POST(req: Request) {
    try {
        const { nodes, data } = await req.json();

        if (!nodes) {
            return NextResponse.json({ error: "Missing nodes" }, { status: 400 });
        }

        console.log("1. [BFF] Recibido JSON visual. Nodos:", Object.keys(nodes).length);

        // 1. Generar la plantilla Twig desde el JSON (Responsabilidad de Next.js)
        const templateString = generateTwig(nodes);
        console.log("2. [BFF] Plantilla Twig generada:\n", templateString.substring(0, 100) + "...");

        // 2. Compilar la plantilla con los datos (Simulando lo que haría Symfony)
        // En producción: Next.js enviaría 'templateString' a Symfony.
        // Aquí: Lo procesamos nosotros para darte el PDF ya.
        const template = (twig as any).twig({
            data: templateString,
            allowInlineIncludes: true
        });

        const finalHtml = template.render(data || {});
        console.log("3. [BFF] HTML Renderizado. Longitud:", finalHtml.length);

        // 3. Generar PDF (Impresora Virtual)
        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });
        const page = await browser.newPage();

        // Estilos base para resetear y definir tamaño A4
        const baseCss = `
      <style>
        @page { size: A4; margin: 0; }
        body { margin: 0; padding: 0; font-family: sans-serif; -webkit-print-color-adjust: exact; }
      </style>
    `;

        await page.setContent(baseCss + finalHtml, {
            waitUntil: "networkidle0" // Esperar a que carguen imágenes
        });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true, // Importante para colores de fondo
        });

        await browser.close();
        console.log("4. [BFF] PDF Generado.");

        // 4. Retornar el PDF
        return new NextResponse(pdfBuffer as any, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": 'attachment; filename="documento-simulado.pdf"',
            },
        });

    } catch (error: any) {
        console.error("Error en generación PDF:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
