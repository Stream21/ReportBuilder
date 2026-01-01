<?php

namespace App\Controller;

use App\Service\DocumentGenerator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PrintController extends AbstractController
{
    public function __construct(
        private DocumentGenerator $generator
    ) {}

    #[Route('/print/{id}', name: 'app_print', methods: ['POST', 'GET'])]
    public function print(string $id, Request $request): Response
    {
        // 1. In a real app, fetch JSON from DB using $id
        // $template = $repository->find($id);
        // $json = $template->getJson();
        
        // Mock data for simulation
        $jsonPayload = json_decode($request->getContent(), true);
        $mockData = [
            'invoice' => ['number' => '2024-001', 'date' => '2024-01-01'],
            'items' => [
                ['name' => 'Service A', 'quantity' => 1, 'price' => 100],
                ['name' => 'Service B', 'quantity' => 2, 'price' => 50],
            ]
        ];

        try {
            // 2. Generate
            $result = $this->generator->generate($jsonPayload['nodes'] ?? [], $mockData, 'pdf');

            // 3. Return Binary Response
            return new Response(
                $result->getContent(),
                200,
                [
                    'Content-Type' => $result->getMimeType(),
                    'Content-Disposition' => 'inline; filename="' . $result->getFilename() . '"'
                ]
            );

        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], 500);
        }
    }
}
