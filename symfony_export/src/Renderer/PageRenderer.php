<?php

namespace App\Renderer;

class PageRenderer implements ComponentRendererInterface
{
    public function render(array $props, string $childrenHtml, array $context): string
    {
        $style = sprintf(
            'padding:%spx; gap:%spx; margin:%spx %spx %spx %spx; background-color:%s; display:flex; flex-direction:column; min-height:100%%;',
            $props['padding'] ?? 8,
            $props['gap'] ?? 10,
            $props['marginTop'] ?? 0,
            $props['marginRight'] ?? 0,
            $props['marginBottom'] ?? 0,
            $props['marginLeft'] ?? 0,
            $props['backgroundColor'] ?? '#ffffff'
        );

        return "<div style=\"{$style}\">{$childrenHtml}</div>";
    }

    public function supports(string $type): bool
    {
        return $type === 'Page';
    }
}
