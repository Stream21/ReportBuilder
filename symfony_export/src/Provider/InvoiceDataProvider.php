<?php

namespace App\Provider;

class InvoiceDataProvider implements DataProviderInterface
{
    // In a real app, inject Repositories here
    // public function __construct(private InvoiceRepository $repository) {}

    public function getData(string $entityId): array
    {
        // 1. Fetch from DB
        // $invoice = $this->repository->find($entityId);
        
        // 2. Mock Data
        return [
            'invoice' => [
                'number' => 'INV-' . $entityId,
                'date' => date('d/m/Y'),
                'total' => '150.00 €'
            ],
            'client' => [
                'name' => 'Empresa Cliente S.L.',
                'address' => 'C/ Ejemplo 123'
            ],
            'items' => [
                ['name' => 'Servicio A', 'quantity' => 1, 'price' => 100],
                ['name' => 'Servicio B', 'quantity' => 2, 'price' => 25],
            ]
        ];
    }

    public function supports(string $reportType): bool
    {
        return $reportType === 'invoice';
    }
}
