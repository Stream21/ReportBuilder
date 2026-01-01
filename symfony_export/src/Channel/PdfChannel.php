<?php

namespace App\Channel;

use App\Service\ContentBuilder;
use App\Model\OutputResult;
use App\Model\TemplateConfig;
use App\Port\PdfGeneratorInterface;

class PdfChannel implements ChannelInterface
{
    public function __construct(
        private ContentBuilder $builder,
        private PdfGeneratorInterface $pdfGenerator
    ) {}

    public function generate(array $json, array $data, TemplateConfig $config): OutputResult
    {
        // 1. Build the HTML structure (The visual layout)
        $bodyContent = $this->builder->buildHtml($json, $json['nodes'] ?? [], $data);
        
        // 2. Wrap skeleton
        $html = $this->createPdfSkeleton($bodyContent);

        // 3. Convert to PDF Binary via Port, passing the physical config (A4, landscape...)
        $pdfBinary = $this->pdfGenerator->htmlToPdf($html, $config);

        return new OutputResult(
            $pdfBinary,
            'application/pdf',
            'document.pdf'
        );
    }

    public function getName(): string
    {
        return 'pdf';
    }

    private function createPdfSkeleton(string $content): string
    {
        // We do NOT set @page margins here because Snappy handles them via options
        return "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <style>
                body { margin: 0; padding: 0; font-family: sans-serif; -webkit-print-color-adjust: exact; }
                * { box-sizing: border-box; }
            </style>
        </head>
        <body>
            {$content}
        </body>
        </html>";
    }
}
