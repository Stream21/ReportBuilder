<?php

namespace App\Adapter;

use App\Port\PdfGeneratorInterface;
use App\Model\TemplateConfig;
use Knp\Snappy\Pdf;

class SnappyPdfAdapter implements PdfGeneratorInterface
{
    public function __construct(
        private Pdf $snappy
    ) {}

    public function htmlToPdf(string $html, TemplateConfig $config): string
    {
        $options = [
            'orientation' => $config->orientation,
            'margin-top'    => $config->margins['top'] . 'mm',
            'margin-bottom' => $config->margins['bottom'] . 'mm',
            'margin-left'   => $config->margins['left'] . 'mm',
            'margin-right'  => $config->margins['right'] . 'mm',
            'encoding'      => 'UTF-8'
        ];

        // Handle Paper Size vs Custom Dimensions
        if (strtolower($config->paperType) === 'continuous' && $config->paperWidth) {
             $options['page-width'] = $config->paperWidth . 'mm';
             // Height might be auto or very long to simulate continuous
             if ($config->paperHeight) {
                 $options['page-height'] = $config->paperHeight . 'mm';
             }
        } else {
             $options['page-size'] = $config->paperType; // A4, Letter, etc.
        }

        return $this->snappy->getOutputFromHtml($html, $options);
    }
}
