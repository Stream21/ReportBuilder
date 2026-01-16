<?php

namespace App\Renderer;

class ImageRenderer implements ComponentRendererInterface
{
    public function render(array $props, string $childrenHtml, array $context): string
    {
        $src = $props['src'] ?? 'https://via.placeholder.com/150';
        $alt = $props['alt'] ?? 'Image';
        $width = $props['width'] ?? 'auto';
        $height = $props['height'] ?? 'auto';
        
        // Handling Percentage vs Pixels if needed, but basic string pass-through usually works for CSS
        $style = sprintf(
            'width:%s; height:%s; object-fit:contain;',
            $width,
            $height
        );

        return "<img src=\"{$src}\" alt=\"{$alt}\" style=\"{$style}\" />";
    }

    public function supports(string $type): bool
    {
        return $type === 'Image';
    }
}
