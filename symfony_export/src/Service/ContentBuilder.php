<?php

namespace App\Service;

class ContentBuilder
{
    public function __construct(private ComponentFactory $componentFactory)
    {
    }

    public function buildHtml(array $rootNode, array $nodes, array $data): string
    {
        return $this->renderNode($rootNode, $nodes, $data);
    }

    private function renderNode(array $nodeData, array $nodes, array $data): string
    {
        $type = $nodeData['custom']['displayName'] ?? $nodeData['type']['resolvedName'] ?? 'Container';
        $props = $nodeData['props'] ?? [];
        
        // Get Renderer
        $renderer = $this->componentFactory->getRenderer($type);

        // Recursively render children
        $childrenHtml = "";
        if (!empty($nodeData['nodes'])) {
            foreach ($nodeData['nodes'] as $childId) {
                if (isset($nodes[$childId])) {
                    $childrenHtml .= $this->renderNode($nodes[$childId], $nodes, $data);
                }
            }
        }

        // Render current node
        return $renderer->render($props, $childrenHtml, $data);
    }
}
