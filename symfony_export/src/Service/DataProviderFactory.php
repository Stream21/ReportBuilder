<?php

namespace App\Service;

use App\Provider\DataProviderInterface;
use Symfony\Component\DependencyInjection\Attribute\TaggedIterator;

class DataProviderFactory
{
    /**
     * @param iterable|DataProviderInterface[] $providers
     */
    public function __construct(
        #[TaggedIterator('app.data_provider')] private iterable $providers
    ) {}

    public function getProvider(string $reportType): DataProviderInterface
    {
        foreach ($this->providers as $provider) {
            if ($provider->supports($reportType)) {
                return $provider;
            }
        }

        throw new \RuntimeException("No provider found for report type: $reportType");
    }
}
