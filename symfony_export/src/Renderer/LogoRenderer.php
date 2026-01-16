<?php

namespace App\Renderer;

class LogoRenderer implements ComponentRendererInterface
{
    public function render(array $props, string $childrenHtml, array $context): string
    {
        $width = $props['width'] ?? '150px';
        $height = $props['height'] ?? 'auto';
        
        // In a real app, this might pull the actual company logo from the context/user session
        // For the simulation, we use a placeholder text or default image
        $src = 'https://via.placeholder.com/150x50?text=LOGO';

        $style = sprintf(
            'width:%s; height:%s; display:block;',
            $width,
            $height
        );

        return "<img src=\"{$src}\" alt=\"Logo Empresa\" style=\"{$style}\" class=\"report-logo\" />";
    }

    public function supports(string $type): bool
    {
        return $type === 'Logo';
    }
}
