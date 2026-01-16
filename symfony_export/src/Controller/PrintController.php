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

    #[Route('/print/{templateId}', name: 'app_print', methods: ['POST'])]
    public function print(string $templateId, Request $request): Response
    {
        // Payload structure:
        // {
        //    "context": { "store_id": 12, "sale_id": 4500, "graduation_id": null },
        //    "transport": "download" | "email" | "cloud_print",
        //    "metadata": { "email_to": "customer@example.com" }
        // }
        
        $payload = $request->toArray();
        $context = $payload['context'] ?? []; // The bag of IDs (store_id, sale_id...)
        $transport = $payload['transport'] ?? 'download';
        
        try {
            // DocumentGenerator handles the orchestration
            // It uses templateId to find the ReportType (Invoice, Optometric)
            // Then passes $context to the specific DataProvider
            $result = $this->generator->generate($templateId, $context, $transport);

            // Handle Transport Response
            return match ($transport) {
                'download' => new Response(
                    $result->getContent(),
                    200,
                    [
                        'Content-Type' => $result->getMimeType(),
                        'Content-Disposition' => 'attachment; filename="' . $result->getFilename() . '"'
                    ]
                ),
                'preview' => new Response(
                    $result->getContent(), // Binary
                    200,
                    ['Content-Type' => $result->getMimeType()] // Inline
                ),
                'email', 'cloud_print' => $this->json(['status' => 'queued', 'job_id' => $result->getJobId()]),
                default => throw new \InvalidArgumentException("Invalid transport mode")
            };

        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], 500);
        }
    }
}
