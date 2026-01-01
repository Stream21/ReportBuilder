<?php

namespace App\Port;

use App\Model\TemplateConfig;

interface PdfGeneratorInterface
{
    /**
     * Converts HTML string to PDF binary string, respecting page config options.
     */
    public function htmlToPdf(string $html, TemplateConfig $config): string;
}
