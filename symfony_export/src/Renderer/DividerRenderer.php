<?php

namespace App\Renderer;

class DividerRenderer implements ComponentRendererInterface
{
    public function render(array $props, string $childrenHtml, array $context): string
    {
        $height = $props['height'] ?? 1;
        $color = $props['color'] ?? '#ccc';
        $styleType = $props['style'] ?? 'solid';
        $width = $props['width'] ?? '100%';
        $margin = $props['margin'] ?? 20;

        // Container implementation to center or align? Usually dividers are full width block
        // Inner line logic
        $lineCss = "width:{$width}; margin:{$margin}px 0; height:{$height}px;";
        
        if ($styleType === 'solid') {
             $lineCss .= "background-color:{$color};"; 
        } else {
             // For dotted/dashed, we use border-top instead of background
             $lineCss .= "background-color:transparent; border-top:{$height}px {$styleType} {$color};";
        }

        return "<div style='display:flex; justify-content:center; width:100%;'><div style=\"{$lineCss}\"></div></div>";
    }

    public function supports(string $type): bool
    {
        return $type === 'Divider';
    }
}
