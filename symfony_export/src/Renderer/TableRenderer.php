<?php

namespace App\Renderer;

use Twig\Environment;

class TableRenderer implements ComponentRendererInterface
{
    public function __construct(private Environment $twig)
    {
    }

    public function render(array $props, string $childrenHtml, array $context): string
    {
        // Pass all relevant props to the Twig template
        // The Twig template handles the loop logic ( {% for item in items %} )
        return $this->twig->render('components/table.html.twig', [
            'props' => [
                'fontSize' => $props['fontSize'] ?? 12,
                'padding' => $props['padding'] ?? 8,
                'borderColor' => $props['borderColor'] ?? '#cbd5e1',
                'headerBgColor' => $props['headerBgColor'] ?? '#e2e8f0',
                'headerTextColor' => $props['headerTextColor'] ?? '#1e293b',
                'rowBgColor' => $props['rowBgColor'] ?? '#ffffff',
                'alternateRowColor' => $props['alternateRowColor'] ?? '#f8fafc',
                'data' => $props['data'] ?? [], // The headers and placeholder data
            ],
            // Inyect actual items explicitly
            'items' => $context['items'] ?? [], 
        ]);
    }

    public function supports(string $type): bool
    {
        return $type === 'Table';
    }
}
