<?php

namespace App\Service;

use App\Model\OutputResult;
use App\Model\TemplateConfig;

class DocumentGenerator
{
    public function __construct(
        private ChannelFactory $channelFactory,
        private DataProviderFactory $dataProviderFactory,
        // private TemplateRepository $repository, 
    ) {}

    /**
     * @param string $templateId ID of the template definition
     * @param array  $context    Bag of IDs (store_id, sale_id, etc.)
     * @param string $transport  'download', 'email', 'cloud_print'
     */
    public function generate(string $templateId, array $context, string $transport = 'download'): OutputResult
    {
        // 1. Fetch Template JSON + Metadata from DB
        // $templateEntity = $this->repository->find($templateId);
        // $craftJson = $templateEntity->getJson();
        // $reportType = $templateEntity->getReportType(); // e.g. 'invoice'
        
        // Mocking Metadata:
        $craftJson = []; 
        $reportType = 'invoice';
        
        // **NEW**: Load Physical Page Config from DB
        $templateConfig = new TemplateConfig(
            paperType: 'A4',       // $templateEntity->getPaperType()
            orientation: 'Portrait', // $templateEntity->getOrientation()
            margins: ['top'=>0, 'right'=>0, 'bottom'=>0, 'left'=>0] // $templateEntity->getMargins()
        );

        // 2. Load Data Strategy
        // Context-aware provider: it knows how to use 'store_id' or 'sale_id'
        $provider = $this->dataProviderFactory->getProvider($reportType);
        $data = $provider->getData($context);

        // 3. Select Channel Strategy (PDF, EmailBody, etc.)
        // Map transport modes to internal channel types if needed
        $channelType = match($transport) {
            'email' => 'html', // Email uses HTML body
            default => 'pdf',  // Download/Print uses PDF
        };
        $channel = $this->channelFactory->create($channelType);

        // 4. Execute Generation with Config
        return $channel->generate($craftJson, $data, $templateConfig);
    }
}
