<?php

namespace App\Renderer;

class FooterRenderer implements ComponentRendererInterface
{
    public function render(array $props, string $childrenHtml, array $context): string
    {
        $height = $props['height'] ?? 'auto';
        $padding = $props['padding'] ?? 20;
        $backgroundColor = $props['backgroundColor'] ?? 'transparent';

        $style = sprintf(
            'height:%s; padding:%spx; background-color:%s; border-top:1px solid #eee; width:100%%; margin-top:auto;',
            $height,
            $padding,
            $backgroundColor
        );

        return "<footer style=\"{$style}\">{$childrenHtml}</footer>";
    }

    public function supports(string $type): bool
    {
        return $type === 'Footer';
    }
}
