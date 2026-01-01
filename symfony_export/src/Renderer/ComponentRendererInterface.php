<?php

namespace App\Renderer;

interface ComponentRendererInterface
{
    /**
     * @param array $props Properties from the JSON node (padding, color, etc.)
     * @param string $childrenHtml Already rendered HTML of child nodes
     * @param array $context Global data context (invoice, items, etc.)
     * @return string The final HTML for this component
     */
    public function render(array $props, string $childrenHtml, array $context): string;

    /**
     * @param string $type The component type (e.g., 'Text', 'Container')
     * @return bool
     */
    public function supports(string $type): bool;
}
