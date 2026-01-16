<?php

namespace App\Renderer;

class LabelValueRenderer implements ComponentRendererInterface
{
    public function render(array $props, string $childrenHtml, array $context): string
    {
        // Based on frontend LabelValue component logic
        $flexDirection = $props['flexDirection'] ?? 'row';
        $gap = $props['gap'] ?? 10;
        $alignItems = $props['alignItems'] ?? 'center';
        $marginTop = $props['marginTop'] ?? 0;
        $marginBottom = $props['marginBottom'] ?? 10;
        $labelWidth = $props['labelWidth'] ?? 'auto';

        // NOTE: The childrenHtml here usually contains the Label Text and the Value Text components.
        // But in Craft.js backend export, children nodes are rendered recursively.
        // LabelValue in Editor has 2 children: Element(Text) for Label, Element(Text) for Value.
        // So $childrenHtml will contain the HTML for those 2 text elements.
        // We just need to wrap them in the flex container.

        $style = sprintf(
            'display:flex; flex-direction:%s; gap:%spx; align-items:%s; margin-top:%spx; margin-bottom:%spx; width:100%%;',
            $flexDirection,
            $gap,
            $alignItems,
            $marginTop,
            $marginBottom
        );

        return "<div style=\"{$style}\">{$childrenHtml}</div>";
    }

    public function supports(string $type): bool
    {
        // Must match the node type name sent from frontend export.
        return $type === 'LabelValue';
    }
}
