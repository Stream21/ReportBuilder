<?php

namespace App\Renderer;

use Twig\Environment;

class TextRenderer implements ComponentRendererInterface
{
    public function __construct(private Environment $twig)
    {
    }

    public function render(array $props, string $childrenHtml, array $context): string
    {
        // 1. Interpolate Text Content (Twig Variable Replacement)
        $rawText = $props['text'] ?? '';
        try {
            $template = $this->twig->createTemplate($rawText);
            $content = $template->render($context);
        } catch (\Exception $e) {
            // Fallback in case of Twig error (e.g. invalid syntax)
            $content = $rawText; 
        }

        // 2. Build Style String
        $style = sprintf(
            'font-size:%spx; font-weight:%s; font-style:%s; text-decoration:%s; color:%s; text-align:%s; margin:%spx %spx %spx %spx;', 
            $props['fontSize'] ?? 14,
            $props['fontWeight'] ?? 'normal',
            $props['fontStyle'] ?? 'normal',
            $props['textDecoration'] ?? 'none',
            $props['color'] ?? '#000000',
            $props['textAlign'] ?? 'left',
            $props['marginTop'] ?? 0, 
            $props['marginRight'] ?? 0, 
            $props['marginBottom'] ?? 0, 
            $props['marginLeft'] ?? 0
        );

        // 3. Render Div with Styles
        return "<div style=\"{$style}\">{$content}</div>";
    }

    public function supports(string $type): bool
    {
        return $type === 'Text';
    }
}
