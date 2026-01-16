<?php

namespace App\Renderer;

class HeaderRenderer implements ComponentRendererInterface
{
    public function render(array $props, string $childrenHtml, array $context): string
    {
        $height = $props['height'] ?? 'auto';
        $padding = $props['padding'] ?? 20;
        $backgroundColor = $props['backgroundColor'] ?? 'transparent';

        // Headers typically have a fixed position or flow at the top.
        // For simple HTML report simulation, we render it as a block.
        // In a real PDF generator (like wkhtmltopdf), headers might be handled differently (separate HTML file or --header-html).
        // Here we simulate it as a visible section at the top.

        $style = sprintf(
            'height:%s; padding:%spx; background-color:%s; border-bottom:1px solid #eee; width:100%%;',
            $height,
            $padding,
            $backgroundColor
        );

        return "<header style=\"{$style}\">{$childrenHtml}</header>";
    }

    public function supports(string $type): bool
    {
        return $type === 'Header';
    }
}
