<?php

namespace App\Service;

use App\Renderer\ComponentRendererInterface;
use Symfony\Component\DependencyInjection\Attribute\TaggedIterator;

class ComponentFactory
{
    /**
     * @param iterable|ComponentRendererInterface[] $renderers
     */
    public function __construct(
        #[TaggedIterator('app.component_renderer')] private iterable $renderers
    ) {}

    public function getRenderer(string $type): ComponentRendererInterface
    {
        foreach ($this->renderers as $renderer) {
            if ($renderer->supports($type)) {
                return $renderer;
            }
        }
        
        // Fallback or Exception? Let's fallback to Container if unknown, or throw
        // For robustness, let's assume we always have a renderer or we try 'Container' as generic
        foreach ($this->renderers as $renderer) {
            if ($renderer->supports('Container')) {
                return $renderer;
            }
        }

        throw new \RuntimeException("No renderer found for type: $type");
    }
}
