<?php

namespace App\Renderer;

class GridRenderer implements ComponentRendererInterface
{
    public function render(array $props, string $childrenHtml, array $context): string
    {
        $cols = $props['columns'] ?? 2;
        $rows = $props['rows'] ?? 1;
        $gap = $props['gap'] ?? 10;
        $padding = $props['padding'] ?? 10;
        $minHeight = $props['minHeight'] ?? '100px';

        $style = sprintf(
            'display:grid; grid-template-columns:repeat(%s, 1fr); grid-template-rows:repeat(%s, 1fr); gap:%spx; padding:%spx; min-height:%s; width:100%%;',
            $cols,
            $rows,
            $gap,
            $padding,
            $minHeight
        );

        return "<div style=\"{$style}\">{$childrenHtml}</div>";
    }

    public function supports(string $type): bool
    {
        return $type === 'Grid';
    }
}
