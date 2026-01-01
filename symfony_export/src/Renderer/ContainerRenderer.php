<?php

namespace App\Renderer;

class ContainerRenderer implements ComponentRendererInterface
{
    public function render(array $props, string $childrenHtml, array $context): string
    {
        // 1. Base Box Model Styles (Dimensions, Margins, Padding, Borders, Background)
        $style = sprintf(
            'width:%s; height:%s; min-height:%s; margin:%spx %spx %spx %spx; padding:%spx; gap:%spx; background-color:%s; border:%spx solid %s; border-radius:%spx;',
            $props['width'] ?? '100%',
            $props['height'] ?? 'auto',
            $props['minHeight'] ?? '50px',
            $props['marginTop'] ?? 0, $props['marginRight'] ?? 0, $props['marginBottom'] ?? 0, $props['marginLeft'] ?? 0,
            $props['padding'] ?? 10,
            $props['gap'] ?? 10,
            $props['backgroundColor'] ?? 'transparent',
            $props['borderWidth'] ?? 0, $props['borderColor'] ?? 'transparent',
            $props['borderRadius'] ?? 0
        );

        // 2. Box Shadow
        if (!empty($props['boxShadow']) && $props['boxShadow'] !== 'none') {
            $shadows = [
                'sm' => '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                'md' => '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                'lg' => '0 10px 15px -3px rgb(0 0 0 / 0.1)'
            ];
            if (isset($shadows[$props['boxShadow']])) {
                $style .= "box-shadow:{$shadows[$props['boxShadow']]};";
            }
        }

        // 3. Layout Handling (Grid vs Flex)
        $layout = $props['layout'] ?? 'flex';

        if ($layout === 'grid') {
            $cols = $props['columns'] ?? 1;
            $rows = $props['rows'] ?? 1;
            // Generate Grid Styles
            $style .= "display:grid; grid-template-columns:repeat({$cols}, 1fr); grid-template-rows:repeat({$rows}, 1fr);";
        } else {
            // Generate Flex Styles
            $style .= sprintf(
                'display:flex; flex-direction:%s; flex-wrap:%s; justify-content:%s; align-items:%s; flex-grow:%s;',
                $props['flexDirection'] ?? 'column',
                $props['flexWrap'] ?? 'nowrap',
                $props['justifyContent'] ?? 'flex-start',
                $props['alignItems'] ?? 'flex-start',
                $props['flexGrow'] ?? 0
            );
        }

        // 4. Return Wrapper
        return "<div style=\"{$style}\">{$childrenHtml}</div>";
    }

    public function supports(string $type): bool
    {
        return $type === 'Container';
    }
}
