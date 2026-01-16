<?php

namespace App\Renderer;

class GioRenderer implements ComponentRendererInterface
{
    public function render(array $props, string $childrenHtml, array $context): string
    {
        $width = $props['width'] ?? '150px';
        $height = $props['height'] ?? 'auto';
        $marginTop = $props['marginTop'] ?? 0;
        $marginBottom = $props['marginBottom'] ?? 0;
        $marginLeft = $props['marginLeft'] ?? 0;
        $marginRight = $props['marginRight'] ?? 0;

        // In a real scenario, this might fetch the logo URL from $context['variables']['empresa']['logotipo']
        // For now, we use the static path or a placeholder as in the frontend mock.
        $logoUrl = '/adrian-logo.png'; 
        // If we want absolute path for PDF generation (e.g. dompdf), we might need system path.
        // Assuming browser-based PDF or relative path works for now.

        $containerStyle = sprintf(
            'width:%s; height:%s; margin:%spx %spx %spx %spx; display:flex; justify-content:center; align-items:center;',
            $width,
            $height,
            $marginTop, $marginRight, $marginBottom, $marginLeft
        );

        $imgStyle = 'width:100%; height:auto; object-fit:contain;';

        return "<div style=\"{$containerStyle}\"><img src=\"{$logoUrl}\" style=\"{$imgStyle}\" alt=\"Logotipo\" /></div>";
    }

    public function supports(string $type): bool
    {
        return $type === 'GioComponent' || $type === 'Gio'; // Handle both potential type names
    }
}
